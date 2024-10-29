<script setup>
const props = defineProps({
    title_paper_todo: Object
})

</script>


<template>
    <p class="title_paper">{{ title_paper_todo.text }}</p>
</template>

<style scoped>
.title_paper {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
}
</style>
