<script setup>
defineProps({
  props: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green"><a :href="props.link">{{ props.title }}</a></h1>
    <h3>{{ props.name + '    ' + props.pubDateYYMMDD }}</h3>
    <p v-html="props.summary"></p>
  </div>
</template>

<style scoped>
</style>
