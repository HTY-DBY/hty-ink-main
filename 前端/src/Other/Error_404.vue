<template>
  <div class="content" role="main">
    <h1>404</h1>
    <h1>没有找到这个页面</h1>
    <p>这真是太糟糕了</p>
    <p>您可以检查下访问的链接是否有错误</p>
    <p><b>或者访问
      <router-link to="/">主页</router-link>
      查找您需要的东西</b></p>
  </div>
  <div class="content" role="main">
    <h1>404</h1>
    <h1>This page was not found</h1>
    <p>This is really bad</p>
    <p>You can check the links you visited for errors</p>

    <p><b>Or visit
      <router-link to="/">the homepage</router-link>
      to find what you need</b></p>
  </div>
</template>

<script setup>

import Line_light from "@/Beauti/Line_light.vue";
import Switch_head from "@/Head/Switch_head.vue";
import Paper_Survey from "@/Paper/Paper_Survey.vue";
import Yi_yan from "@/Head/Yi_yan.vue";
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  background: #fff;
  color: #202122;
  font: 0.938em/1.6 sans-serif;
}

.content {
  margin: 7% auto 0;
  padding: 0 0 1em;
  max-width: 640px;
  text-align: center
}

img {
  float: left;
  margin: 0 2em 2em 0;
}

a img {
  border: 0;
}

h1 {
  margin-top: 1em;
  font-size: 1.2em;
}

p {
  margin: 0.7em 0 1em 0;
}

a {
  color: #36c;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

em {
  color: #72777d;
  font-style: normal;
}
</style>



