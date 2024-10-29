<template>
  <!--  <div class="switch">-->
  <!--    <button class="vt-switch" type="button" role="switch" aria-label="偏好组合式 API" aria-checked="true"-->
  <!--            @click="Change_container">-->
  <!--      &lt;!&ndash; 中间的小球 &ndash;&gt;-->
  <!--      <span class="vt-switch-check" :class="{ vt_switch_check_dis: switch_active }">-->
  <!--      </span>-->
  <!--    </button>-->
  <!--  </div>-->
  <!--  <div class="switch_icon">-->
  <!--    <div v-if="switch_active_svg">-->
  <!--      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high"-->
  <!--           viewBox="0 0 16 16">-->
  <!--        <path-->
  <!--            d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>-->
  <!--      </svg>-->
  <!--    </div>-->
  <!--    <div v-else>-->
  <!--      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars"-->
  <!--           viewBox="0 0 16 16">-->
  <!--        <path-->
  <!--            d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>-->
  <!--        <path-->
  <!--            d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>-->
  <!--      </svg>-->
  <!--    </div>-->
  <!--  </div>-->

</template>

<script setup>
import {ref} from 'vue';
import {onMounted} from 'vue';

let switch_active_svg
const switch_active = ref()


function to_dark() {
  switch_active.value = true
  document.getElementsByTagName("html")[0].className = 'dark_body';
  if (document.getElementById("github_markdown")) {
    document.getElementById("github_markdown").classList.add('markdown-body-dark')
    document.getElementById("github_markdown").classList.remove('markdown-body-light')
  }
  switch_active_svg = false
}

function to_light() {
  switch_active.value = false
  document.getElementsByTagName("html")[0].className = 'light_body';
  if (document.getElementById("github_markdown")) {
    document.getElementById("github_markdown").classList.add('markdown-body-light')
    document.getElementById("github_markdown").classList.remove('markdown-body-dark')
  }
  switch_active_svg = true
}

function Change_container() {
  if (switch_active.value === false) {
    to_dark()
  } else {
    to_light()
  }
}

to_dark()
to_light()
onMounted(() => {

  // 初始化时查看 用户主题
  to_dark()
  if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
    to_light()

    // t_change_save.value = true

    // // 监听 用户主题的改变
    // const mqList = window.matchMedia('(prefers-color-scheme: dark)');
    // mqList.addEventListener('change', (event) => {
    //   if (event.matches) {
    //     to_dark()
    //   } else {
    //     to_light()
    //   }
    // });
  }

})


</script>

<style scoped>
.switch {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.vt-switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid;
  border-color: var(--vt-theam-r-color);
  background-color: var(--vt-theam-color);
  transition: border-color .25s, background-color .25s;
}


.vt-switch-check {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--vt-theam-r-color);
  transition: background-color .25s, transform .25s;
}

.vt_switch_check_dis {
  transform: translate(18px);
}

.switch_icon {
  width: 25px;
  display: flex;
  justify-content: center;
  height: 23px
}
</style>
