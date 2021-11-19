<template>
  <div class="shipments-list">
    <div class="item" v-for="item in items" :key="item.id">
      <div v-if="isActionableShipment(item)">
        <Collapsible>
          <template v-slot:header>
            <ShipmentItem :item="item" />
          </template>

          <template v-slot:body>
            <p>
              This item has been suspended. Choose an action to resolve the
              issue.
            </p>

            <button
              type="button"
              class="btn btn-primary me-3"
              :disabled="item.isProcessing"
              @click="$emit('pay', item)"
            >
              Pay
            </button>

            <button
              type="button"
              class="btn btn-primary"
              :disabled="item.isProcessing"
              @click="$emit('return', item)"
            >
              Return
            </button>
          </template>
        </Collapsible>
      </div>

      <div v-else>
        <div class="card">
          <div class="card-body hoverable">
            <ShipmentItem :item="item" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="items.length === 0">No shipments for this status</div>
  </div>
</template>

<script setup lang="ts">
/**
 * Displays a list of shipment items of given type (with given status).
 * For suspended items renders an expandable panel which shipment-specific actions.
 */
import { Shipment } from '@typings/shipments';
import { Status } from '@typings/shipments.enum';
import Collapsible from './Collapsible.vue';
import ShipmentItem from './ShipmentItem.vue';

defineProps<{
  items: Shipment[];
}>();

defineEmits<{
  (event: 'pay', item: Shipment): void;
  (event: 'return', item: Shipment): void;
}>();

/**
 * Returns true for suspended shipments. False otherwise.
 * Used to show shipment-specific actions.
 */
function isActionableShipment(item: Shipment) {
  return `${item?.status}` === Status.SUSPENDED.toString();
}
</script>

<style scoped>
.item {
  margin-bottom: 0.5rem;
}

.hoverable:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
