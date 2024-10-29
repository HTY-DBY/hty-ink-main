<template>
  <div class="paper_title_css">{{ content }}</div>
</template>
<script setup>
defineProps(['content'])
</script>
<style scoped>
.paper_title_css {
  font-size: 30px;
  padding: 15px;
  text-align: center;
  
}
</style>