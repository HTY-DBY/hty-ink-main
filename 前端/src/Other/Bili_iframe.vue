<template>
  <div class="to_home">
    <router-link to="/">返回主页</router-link>
  </div>

  <video id="videoElement" controls class="centeredVideo" width="1024" height="576"></video>

</template>


<script setup>
import {onMounted} from "vue";

function loadJs(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.src = src;
    document.body.appendChild(script);

    script.onload = () => {
      resolve();
    }
    script.onerror = () => {
      reject();
    }
  })
}

onMounted(() => {
  loadJs('/js-mine/flv.min.js').then(() => {
    // 加载成功，进行后续操作
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById('videoElement');
      var flvPlayer = flvjs.createPlayer({
        type: 'mp4',
        url: '/video/答辩.mp4'
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      // flvPlayer.play();
    }
  })
})


</script>

<style scoped>
.to_home {
  font-size: 55px;
  display: flex;
  justify-content: center;
}

.centeredVideo {

  width: 100%;
  margin-bottom: auto;
}

</style>