<template>
  <Column_div>

    <Switch_head></Switch_head>

    <!-- 一言接口 -->
    <Line_light></Line_light>
    <Yi_yan></Yi_yan>
    <Line_light></Line_light>
    <!-- 页体 -->
    <Paper_title_index></Paper_title_index>
    <!-- 页脚 -->
    <div v-if="foot_show">
      <Line_light></Line_light>
      <Label_footer></Label_footer>
    </div>

  </Column_div>
</template>

<script setup>
import {inject, provide, ref} from 'vue'
import Label_footer from "../Foot/Label_footer.vue";
import Line_light from "../Beauti/Line_light.vue";
import Paper_title_index from "../Paper/Paper_title_index.vue";
import Yi_yan from "./Yi_yan.vue";
import Column_div from "../Beauti/Column_div.vue";
import Switch_head from "./Switch_head.vue";


const foot_show = ref(false)
document.title = 'hty.ink'

const paper_title_list_json_fetch = ref()
const paper_title_list_json = ref('[{"title":"--","time":"","id":null,"like":null,"year":null}]')
paper_title_list_json.value = eval('(' + paper_title_list_json.value + ')')
provide('paper_title_list_json', ref(paper_title_list_json))

const api_hty_url = inject('api-hty')


function json_fetch() {
  fetch(`${api_hty_url}/blog/paper`)
      .then(data => {
        return data.text()
      })
      .then(result => {
        // console.log(result)
        paper_title_list_json_fetch.value = eval('(' + result + ')')
        // console.log('文章标题数据')
        // console.log(paper_title_list_json_fetch._rawValue)
        paper_title_list_json.value = paper_title_list_json_fetch.value
        paper_title_list_json.value.sort(function (a, b) {
          return Date.parse(b.time) - Date.parse(a.time);//时间正序  return的值  *-1 则为倒序
        });
        // console.log(paper_title_list_json._rawValue)
        foot_show.value = true
      })
}

json_fetch()


</script>



