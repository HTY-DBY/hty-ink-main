<template>
    <div class="body_main">
        <slot></slot>
    </div>
</template>

<style scoped>
.body_main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>