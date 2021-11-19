<template>
  <div class="loading-indicator">
    <div class="inner"></div>
  </div>
</template>

<script setup lang="ts">
/**
 * A linear loading indicator component.
 */
</script>

<style scoped>
.loading-indicator {
  background-color: #ddd;
  height: 0.25rem;
  position: relative;
  overflow: hidden;
}

.inner {
  position: absolute;
  height: 100%;
  width: 25%;
  background-color: var(--bs-primary);
  animation: frames 1s infinite linear;
}

@keyframes frames {
  0% {
    left: -25%;
  }
  100% {
    left: 125%;
  }
}
</style>
