<template>
  <div class="collapsible" :class="{ expanded: isExpanded }">
    <div class="card">
      <div
        class="card-body d-flex align-items-center justify-content-between"
        role="button"
        @click="isExpanded = !isExpanded"
      >
        <div class="body-slot flex-fill" data-testid="header">
          <slot name="header"></slot>
        </div>

        <div class="icon ms-4">
          <i class="bi bi-chevron-down"></i>
        </div>
      </div>

      <div class="card-footer body" data-testid="body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * A generic component with an always-visible heading and collapsible body.
 */
import { ref } from 'vue';

const isExpanded = ref(false);
</script>

<style scoped>
.body {
  max-height: 0;
  padding: 0 1rem;
  overflow: hidden;
  transition: all 0.25s ease-in-out;
}

.expanded .body {
  max-height: 10rem;
  padding: 0.5rem 1rem;
}

.expanded .icon {
  transform: scaleY(-1);
  transition: transform 0.25s ease-in-out;
}
</style>
