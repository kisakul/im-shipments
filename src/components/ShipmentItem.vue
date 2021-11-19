<template>
  <div class="item-header row align-items-start">
    <div class="col">
      {{ item.name }}
    </div>

    <div class="col text-end">
      {{ formatDate(item.createdAt) }}
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Caption of a shipment item
 */
import { Shipment } from '@typings/shipments';
import { formatDate } from '@/helpers';

defineProps<{
  item: Shipment;
}>();
</script>