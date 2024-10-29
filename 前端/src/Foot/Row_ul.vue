<template>
  <div class="Label_paper_ul">
    <slot></slot>
  </div>
</template>

<style scoped>
.Label_paper_ul {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline-start: 0;
  padding: 0.5rem 0 2.5rem 0;
}
</style>