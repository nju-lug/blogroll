<script setup>
import SummaryCard from './components/SummaryCard.vue'
import BlogInfoCard from './components/BlogInfoCard.vue'
import dataJson from './assets/data.json'
import opmlJson from './assets/opml.json'
</script>

<template>
  <header id="header">
    <div id="header-inner">
      <span id="logo-left">
        <img id="logo" src="./assets/logo.png" alt="Logo" />
        <span id="logo-text">NJU-LUG Blogroll</span>
      </span>
      <a id="logo-right" target="_blank" href="https://github.com/nju-lug/blogroll">
        <img id="logo-github" src="./assets/github.png" alt="Logo" />
        <span id="logo-text">GitHub</span>
      </a>
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
      <div id="sidebar">
        <div id="sidebar-content">
          <template v-for="item in opmlJson">
            <BlogInfoCard :props="item" />
          </template>
        </div>
      </div>
    </aside>
  </div>
</template>

<style>
@import "./assets/base.css";
</style>
