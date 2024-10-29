<template>
  <div>
    <div class="year_title_css">{{ item.year }}</div>
    <div class="row_div" v-for="it in item.in_year">
      <div class="in_div_date">
        <div class="in_div_moun">
          {{ it.time }}
        </div>
        <div class="svg_fount_size">
          <svg xmlns="http://www.w3.org/2000/svg" :width=width_svg :height=height_svg fill="currentColor"
               class="bi bi-eye-fill"
               viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
          </svg>
          {{ it.like }}
        </div>
      </div>
      <div class="in_div">
        <router-link :to="it.href"> {{ it.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {strings} from "mavon-editor/dist/highlightjs/highlight.min";

defineProps({
  item: Object
})
const width_svg = ref('11')
const height_svg = ref('11')
</script>

<style scoped>
.svg_fount_size {
  font-size: 14px;
  color: #1a9276;
}

.row_div {
  display: flex;
  padding: 0.5rem 0 0.5rem 0;
}

.in_div {
  width: 100%;
  text-align: center;
  font-size: 16px;
}


.in_div_date {
  width: 15%;
  text-align: center;
}

.in_div_mount {
  display: flex;
}

a:hover {
  color: #00aeec;
}


.year_title_css {
  font-size: 1.2rem;
  line-height: 1.4rem;
  color: #d44b0e;
}
</style>