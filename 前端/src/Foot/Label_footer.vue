<script setup>


const href_hty_text = '关于我'
const href_hty_href = "/resume"
// '[[' +
// '{"href": "/resume", "text": ""},' +
// '{"href": "https://beian.miit.gov.cn/#", "text": "京ICP备2021032418号-1"}' +
// '],' + '[' +
// '{"href": "/netspeed", "text": "流量消耗器"}' +
// ']]'
</script>

<template>
  <div class="footer_css_1">
    <div>
      <div class="footer_css_2">
        <router-link :to=href_hty_href> {{ href_hty_text }}</router-link>
        <a href="https://beian.miit.gov.cn/#" target="_blank">京ICP备2021032418号-1</a>
      </div>
      <!--<div class="footer_css_2">-->
      <!--  <a href="https://lubiao.hty.ink/" class="footer_css_3" target="_blank">路标导航系统</a>-->
      <!--</div>-->
    </div>
  </div>

</template>


<style scoped>

.footer_css_1 {
  padding: 0.5rem 0 2.5rem 0;
  font-size: 13px;
}


.footer_css_2 {
  display: flex;
  padding: 0.5rem 0 0.3rem 0;
  justify-content: space-between;
}

.footer_css_3 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  color: #6d859f;;
}

a {
  color: #fa8c01;
}

a:hover {
  color: #00aeec;
}
</style>
