<template>
  <div class="line-css">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" :width=width_svg :height=height_svg fill="currentColor"
           class="bi bi-eye-fill"
           viewBox="0 0 16 16">
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
      </svg>
      {{ like_num }}
    </div>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" :width=width_svg :height=height_svg fill="currentColor"
           class="bi bi-pencil-fill"
           viewBox="0 0 16 16">
        <path
            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
      </svg>
      {{ time_num }}
    </div>
  </div>
</template>
<script setup>
import {inject, ref, watch} from "vue";

const width_svg = ref('11')
const height_svg = ref('11')
const like_num = ref("")
const time_num = ref("")
const paper_content_list_json = inject('paper_content_list_json')
watch(paper_content_list_json, () => {
  // console.log(paper_content_list_json._rawValue)
  like_num.value = paper_content_list_json._rawValue.like

  const date = new Date(paper_content_list_json._rawValue.time);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 补零
  const day = date.getDate().toString().padStart(2, '0'); // 补零
  time_num.value = `${year}-${month}-${day}`
})


</script>
<style scoped>
.line-css {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  padding: 0 0 0.5rem 0;
  color: #1a9276;
}
</style>