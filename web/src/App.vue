<script setup>
import SummaryCard from './components/SummaryCard.vue'
import opmlJson from './assets/opml.json'
import dataJson from './assets/data.json'
</script>

<template>
  <header>
    <div class="wrapper">
      </div>
  </header>

  <main>
    <div  v-for="item in dataJson">
      <SummaryCard :props="item"/>
    </div>
  </main>
</template>

<style>
@import './assets/base.css';
</style>
