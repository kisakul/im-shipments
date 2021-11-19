<template>
  <div class="section h-100">
    <LoadingIndicator :class="{ fade: !isLoading }" class="mb-2" />

    <div class="content h-100">
      <ShipmentsList :items="items" @pay="pay" @return="sendBack" />

      <div class="my-3 d-flex justify-content-center">
        <div
          class="spinner-border text-primary"
          :class="{ fade: !isAppending }"
          role="status"
        ></div>
      </div>

      <div v-if="items.length > 0" ref="endOfView" class="end-of-view"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Displays shipment items of given type.
 * Allows to load more items as user scrolls the view.
 */
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import ShipmentsList from '@/components/ShipmentsList.vue';
import { useIntersectionObserver } from '@/composables/useIntersectionObserver';
import { useMonitoring } from '@/composables/useMonitoring';
import { monitoringInterval } from '@/config';
import {
  appendItems,
  loadItems,
  payForShipment,
  returnShipment,
} from '@/services/data-provider';
import { Shipment } from '@typings/shipments';
import { Status } from '@typings/shipments.enum';
import { ShipmentsMonitorState } from '@typings/store';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps<{
  status: Status;
}>();

const store = useStore<ShipmentsMonitorState>();

// Flag which indicates if additional shipment items are being loaded (when user scrolls
// to the end of view)
const isAppending = ref(false);

// Flag is active during backend API calls
const isLoading = computed<boolean>(() => !!store.getters.isLoading);

// Used to periodically reload list of shipments for currently visible type
const { start, stop, wrap } = useMonitoring(async () => {
  await loadItems(props.status, 0, items.value?.length ?? 20);
}, monitoringInterval);

// Shipment items
const items = computed<Shipment[]>(() =>
  store.getters.shipmentItems(props.status)
);

// Used to react to user scrolling to the end of view.
const { observe, disconnect } = useIntersectionObserver(() => {
  wrap(async () => {
    isAppending.value = true;

    await appendItems(props.status, items.value?.length);

    isAppending.value = false;
  });
});

const endOfView = ref<HTMLDivElement>();

onMounted(() => {
  start(true);
});

onUnmounted(() => {
  stop();

  disconnect();
});

// Wait until the reference pointing to div element at the end of view becomes defined.
// When it does - start observing it's rolling into view
const unwatch = watch(
  () => endOfView.value,
  (element) => {
    if (element) {
      unwatch();

      observe(element);
    }
  }
);

/**
 * Handles user's action related to paying fees for suspended shipment.
 */
async function pay(item: Shipment) {
  wrap(async () => {
    await payForShipment(item.id!);
  }, true);
}

/**
 * Handles user's action related to requesting a return of suspended shipment.
 */
async function sendBack(item: Shipment) {
  wrap(async () => {
    await returnShipment(item.id!);
  }, true);
}
</script>

<style scoped>
.section {
  display: grid;
  grid-template-rows: auto 1fr;
}

.content {
  overflow-y: auto;
}

.end-of-view {
  height: 1px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
