<template>
  <Section :status="status" />
</template>

<script setup lang="ts">
import Section from '@/components/Section.vue';
import { Status } from '@typings/shipments.enum';

const status = Status.DELIVERED;
</script>
