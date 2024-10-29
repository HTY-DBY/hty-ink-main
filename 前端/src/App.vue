<template>
  <link type="text/css" rel="stylesheet" href="/css-mine/style_body.css">
  <link type="text/css" rel="stylesheet" href="/css-mine/vue-main.css">
  <link rel="stylesheet" href="/css-mine/github-markdown-light.css">
  <link rel="stylesheet" href="/css-mine/github-markdown-dark.css">
  <!-- 页头 -->
  <keep-alive>
    <router-view></router-view>
  </keep-alive>

</template>

<script setup>
import {provide} from 'vue'
import Switch_head from "./Head/Switch_head.vue";

const api_hty_url = 'https://api.hty.ink'

provide('api-hty', api_hty_url)

</script>