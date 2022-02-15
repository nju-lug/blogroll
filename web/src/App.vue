<script setup>
import SummaryCard from './components/SummaryCard.vue'
import opmlJson from './assets/opml.json'
import dataJson from './assets/data.json'
</script>

<template>
  <header id="header">
    <div id="header-inner">
      Header
    </div>
  </header>

  <div id="container">
    <main>
      <div id="main">
        <article v-for="item in dataJson">
          <SummaryCard :props="item" />
        </article>
      </div>
    </main>
  
    <aside>
      <div id="sidebar">Something</div>
    </aside>
  </div>

</template>

<style>
@import "./assets/base.css";
</style>
