<template>

  <Switch_head></Switch_head>

  <Paper_hty v-if="see_404"></Paper_hty>
  <Error_404 v-else></Error_404>
</template>
<script setup>

import {inject, provide, ref} from "vue";
import {useRoute} from "vue-router";
import Error_404 from "../Other/Error_404.vue";
import Paper_hty from "./Paper_hty.vue";
import Switch_head from "../Head/Switch_head.vue";


let paper_content_list_json = ref('{"content":"","title": "","time": "","id": "","like":null}')
provide('paper_content_list_json', ref(paper_content_list_json))

const take_id = useRoute().params.id
const see_404 = ref(true)

const api_hty_url = inject('api-hty')

function fetch_fun() {
  fetch(`${api_hty_url}/blog/paper/${take_id}`)
      .then(data => {
        return data.text()
      })
      .then(result => {
        const temp_json = eval('(' + result + ')')
        // console.log(temp_json)
        paper_content_list_json.value = temp_json[0]
        console.log('文章内容数据')
        console.log(paper_content_list_json._rawValue)
        if (isEmpty(paper_content_list_json._rawValue)) {
          console.log('404')
          see_404.value = false
        }
      })
}

fetch_fun()

function isEmpty(value) {
  return value === null || value === undefined;
}
</script>