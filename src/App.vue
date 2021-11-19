<template>
  <div id="app" class="container vh-100 px-0">
    <div class="top-section">
      <Header />

      <Navigation />
    </div>

    <div class="content p-3 pt-0">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Navigation from './components/Navigation.vue';
</script>

<style scoped>
.container {
  display: grid;
  grid-template-rows: auto 1fr;
  max-width: 960px !important;
}

.content {
  overflow-y: auto;
}
</style>
