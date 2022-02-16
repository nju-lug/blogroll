<script setup>
defineProps({
  props: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="summary" :key="props.link">
    <a class="summary-title" :href="props.link" target="_blank">{{ props.title }}</a>
    <div class="summary-info">
      <a class="summary-name" :href="props.htmlUrl" target="_blank">{{ props.name }}</a>
      <span class="summary-time">{{ props.pubDateYYMMDD }}</span>
    </div>
    <div v-html="props.summary"></div>
  </div>
</template>

<style scoped>
.summary {
  -webkit-box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  border-radius: 5px;
  background-color: #fff;
  padding: 20px 30px 20px 30px;
  margin: 0px 20px 20px 20px;
}
.summary-title {
  font-size: xx-large;
  font-weight: bolder;
  color: #444950;
  word-break: break-all;
}

.summary-title:hover {
  color: #3273dc;
}

.summary-info {
  margin-top: 15px;
  margin-bottom: 25px;
}

.summary-name {
  display: inline-block;
  font-size: medium;
  font-weight: bold;
  border-radius: 5px;
  color: #fff;
  padding: 5px;
  background-color: #84b3ff;
  margin-right: 10px;
  margin-bottom: 5px;
}

.summary-time {
  display: inline-block;
  font-size: medium;
  font-weight: bold;
  border-radius: 5px;
  color: #fff;
  padding: 5px;
  background-color: #afafaf;
}
</style>
