<script setup>
defineProps({
  props: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <a :key="props.htmlUrl" :href="props.htmlUrl">
    <p class="title">{{ props.title }}</p>
    <span
      style="display: -webkit-box; font-size: 13px; height: 18px; line-height: 18px; color: #999; word-break: break-all; text-overflow: ellipsis; overflow: hidden; -webkit-line-clamp: 1; -webkit-box-orient: vertical;"
    >
      <span style="display: inline-flex; align-items: center;">
        <svg
          class="Zi Zi--InsertLink"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="14"
          height="14"
        >
          <path
            d="M13.414 4.222a4.5 4.5 0 1 1 6.364 6.364l-3.005 3.005a.5.5 0 0 1-.707 0l-.707-.707a.5.5 0 0 1 0-.707l3.005-3.005a2.5 2.5 0 1 0-3.536-3.536l-3.005 3.005a.5.5 0 0 1-.707 0l-.707-.707a.5.5 0 0 1 0-.707l3.005-3.005zm-6.187 6.187a.5.5 0 0 1 .638-.058l.07.058.706.707a.5.5 0 0 1 .058.638l-.058.07-3.005 3.004a2.5 2.5 0 0 0 3.405 3.658l.13-.122 3.006-3.005a.5.5 0 0 1 .638-.058l.069.058.707.707a.5.5 0 0 1 .058.638l-.058.069-3.005 3.005a4.5 4.5 0 0 1-6.524-6.196l.16-.168 3.005-3.005zm8.132-3.182a.25.25 0 0 1 .353 0l1.061 1.06a.25.25 0 0 1 0 .354l-8.132 8.132a.25.25 0 0 1-.353 0l-1.061-1.06a.25.25 0 0 1 0-.354l8.132-8.132z"
          />
        </svg>
      </span>
      <span>{{ props.htmlUrl }}</span>
    </span>
  </a>
</template>

<style scoped>
a {
  color: #444950;
}

.title {
  font-size: large;
  font-weight: bolder;
  margin-bottom: 0px;
}

.link {
  font-size: medium;
}
</style>