<template>

  <Switch_head></Switch_head>

  <Column_div>
    <Line_light></Line_light>
    <Yi_yan></Yi_yan>
    <Line_light></Line_light>
    <Paper_title_show :content="file_name"></Paper_title_show>

    <!-- markdown渲染 -->
    <div id="github_markdown">
      <v-md-preview :text="markdown_content"></v-md-preview>
    </div>
    <div v-if="foot_show">
      <Line_light></Line_light>
      <Label_footer></Label_footer>
    </div>
  </Column_div>

</template>

<script setup>
import "katex/dist/katex.css";
import {inject, provide, ref, watch} from 'vue'
import Switch_head from '@/Head/Switch_head.vue'
import Line_light from '@/Beauti/Line_light.vue'
import Column_div from '@/Beauti/Column_div.vue'
import Label_footer from '@/Foot/Label_footer.vue'
import Paper_title_show from "@/Paper/Paper_title_show.vue";
import Yi_yan from "@/Head/Yi_yan.vue";
import Paper_Survey from "@/Paper/Paper_Survey.vue";


// const paper_content_list_json = inject('paper_content_list_json')
const markdown_content = ref("")
const foot_show = ref(false)
const file_name = "resume"
const api_hty_url = inject('api-hty')


// watch(paper_content_list_json, () => {
document.title = file_name
markdown_fetch()

// })

function markdown_fetch() {
  fetch(api_hty_url + "/blog/paperGet/" + file_name + ".md")
      .then(data => {
        return data.text()
      })
      .then(result => {
        if (markdown_content.value !== result)
          markdown_content.value = result
        // console.log(result)
        foot_show.value = true
      })
}

</script>

<style scoped>
</style>


