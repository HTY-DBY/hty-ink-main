<template>
  <p id="hitokoto_text" class="yiyan">
    &nbsp;
  </p>
</template>

<script setup>
// 一言接口
fetch('https://v1.hitokoto.cn?c=a&c=b&c=c')
    .then(response => response.json())
    .then(data => {
      if (document.querySelector('#hitokoto_text')) {
        const hitokoto = document.querySelector('#hitokoto_text')
        hitokoto.innerText = data.hitokoto
      }

    })
    .catch(console.error)
</script>

<style scoped>
.yiyan {
  text-align: center;
  padding: 0.5rem 0 0.5rem 0;
  font-size: 13px;
}
</style>