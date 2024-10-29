<template>
  <div>
    <Paper_b_i v-for="item in paper_title_list" :item="item">
    </Paper_b_i>
  </div>
</template>

<script setup>
import Paper_b_i from './Paper_b_i.vue';
import {inject, watch} from "vue";

// 提取 year
let paper_title_list = inject('paper_title_list_json');
watch(paper_title_list, () => {
  paper_title_list = paper_title_list._rawValue
  // console.log(paper_title_list)
  for (let i = 0; i < paper_title_list.length; i++) {

    let year_date = new Date(paper_title_list[i].time)

    paper_title_list[i].year = year_date.getFullYear()
    paper_title_list[i].time = (year_date.getMonth() + 1) + '-' + year_date.getDate()
  }
  console.log('文章标题数据')
// console.log(paper_title_list)

// 根据年进行分组
  let arr = paper_title_list
  const map = {},
      dest = [];
  for (let i = 0; i < arr.length; i++) {
    const ai = arr[i];
    if (!map[ai.year]) {
      dest.push({
        year: ai.year,
        in_year: [ai]
      });
      map[ai.year] = ai;
    } else {
      for (let j = 0; j < dest.length; j++) {
        const dj = dest[j];
        if (dj.year === ai.year) {
          dj.in_year.push(ai);
          break;
        }
      }
    }
  }
  paper_title_list = dest
  console.log(dest)

})

</script>

<style scoped>
div {
  padding: 0.5rem 0 0.5rem 0;
}
</style>