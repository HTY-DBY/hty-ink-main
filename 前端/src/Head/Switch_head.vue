<template>
  <div class="switch_head_css">
    <Sim_div>
    </Sim_div>
    <Sim_div>
      <router-link to="/" class="home_head">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-door"
             viewBox="0 0 16 16">
          <path
              d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
        </svg>
      </router-link>
    </Sim_div>

    <Sim_div_r>
      <Switch_container></Switch_container>
    </Sim_div_r>
  </div>
</template>

<script setup>
import Sim_div_r from "../Beauti/Sim_div_r.vue";
import Switch_container from "../Beauti/Switch_container.vue";
import Sim_div from "../Beauti/Sim_div.vue";
</script>

<style scoped>
.home_head {
  color: #6d859f;
}

.home_head:hover {
  color: #00aeec;
}

.switch_head_css {
  display: flex;
  flex-direction: row;
  padding: 1.5rem 0 1.5rem 0;
}
</style>