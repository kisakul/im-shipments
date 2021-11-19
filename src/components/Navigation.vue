<template>
  <div class="navigation m-3 mb-0">
    <ul class="nav nav-pills nav-fill">
      <li v-for="section in sections" class="nav-item" :key="section.section">
        <a
          class="nav-link d-flex align-items-center justify-content-center"
          :class="{ active: section.section === activeTab }"
          @click="router.push(section.section)"
        >
          <i
            :class="section.icon + ' section-icon me-2'"
            :style="{ color: section.iconColor }"
          ></i>

          <span class="section-title">{{ section.title }}</span>

          <span class="d-inline-block ms-2 badge rounded-pill bg-secondary">{{
            totals[section.status]
          }}</span></a
        >
      </li>
    </ul>

    <h5 class="heading mt-3">{{ activeSectionTitle }}</h5>
  </div>
</template>

<script setup lang="ts">
/**
 * Main navigation menu with tabs. Clicking on a tab navigates to the route related
 * to corresponding section (category of shipments).
 */
import { AppSectionDefinition } from '@typings/shipments';
import { AppSection, Status } from '@typings/shipments.enum';
import { ShipmentsMonitorState } from '@typings/store';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

// Definition of navigation sections/tabs.
const sections: AppSectionDefinition[] = [
  {
    section: AppSection.PROCESSING,
    status: Status.PROCESSING,
    title: 'Processing',
    icon: 'bi bi-gear',
    iconColor: '#0d6efd',
  },
  {
    section: AppSection.SUSPENDED,
    status: Status.SUSPENDED,
    title: 'Suspended',
    icon: 'bi bi-stoplights',
    iconColor: '#dc3545',
  },
  {
    section: AppSection.DELIVERED,
    status: Status.DELIVERED,
    title: 'Delivered',
    icon: 'bi bi-truck',
    iconColor: '#198754',
  },
  {
    section: AppSection.RETURNED,
    status: Status.RETURNED,
    title: 'Returned',
    icon: 'bi bi-arrow-return-left',
    iconColor: '#ffc107',
  },
];

const router = useRouter();
const route = useRoute();
const store = useStore<ShipmentsMonitorState>();

// Tab which is active based on current route.
const activeTab = ref(sections[0].section);

// Stores number of shipments in each category.
const totals = computed(() => store.getters.totals);

// Title of currently visible section. Used in case of smaller displays.
const activeSectionTitle = computed(
  () => sections.find(({ section }) => section === activeTab.value)?.title
);

// Updates active tab whenever route changes
watch(
  () => route.name,
  (name) => (activeTab.value = (name || sections[0].section) as AppSection)
);
</script>

<style scoped>
.nav-link:not(.active) {
  cursor: pointer;
}
.nav-link.active .section-icon {
  color: #fff !important;
}

.section-icon {
  font-size: 1.5rem;
}

.section-title {
  display: none;
}

@media (min-width: 800px) {
  .section-title {
    display: inline-block;
  }

  .heading {
    display: none;
  }
}
</style>
