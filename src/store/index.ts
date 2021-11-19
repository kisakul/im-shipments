import { createStore } from 'vuex';
import { ShipmentsMonitorState } from '@typings/store';
import { ShipmentData } from '@typings/shipments';
import { Status } from '@typings/shipments.enum';
import { ActionType } from '@typings/store.enum';

export const store = createStore<ShipmentsMonitorState>({
  state: {
    data: {
      [Status.PROCESSING]: { data: [], total: 0 },
      [Status.SUSPENDED]: { data: [], total: 0 },
      [Status.DELIVERED]: { data: [], total: 0 },
      [Status.RETURNED]: { data: [], total: 0 },
      [Status.PAID]: { data: [], total: 0 },
    },
    isLoading: false,
  },

  mutations: {
    [ActionType.SET_SHIPMENT_ITEMS](
      state,
      { status, data }: { status: Status; data: ShipmentData }
    ) {
      state.data[status] = data;
    },

    [ActionType.APPEND_SHIPMENT_ITEMS](
      state,
      { status, data }: { status: Status; data: ShipmentData }
    ) {
      state.data[status].data = [
        ...(state.data[status].data ?? []),
        ...(data.data ?? []),
      ];
    },

    [ActionType.SET_TOTAL](
      state,
      { status, total }: { status: Status; total: number }
    ) {
      state.data[status].total = total;
    },

    [ActionType.SHOW_LOADING_INDICATOR](state) {
      state.isLoading = true;
    },

    [ActionType.HIDE_LOADING_INDICATOR](state) {
      state.isLoading = false;
    },

    [ActionType.SET_ITEM_PROCESSING_STATE](
      state,
      { id, isProcessing }: { id: string; isProcessing: boolean }
    ) {
      const match = (state.data[Status.SUSPENDED]?.data ?? []).find(
        (item) => item.id === id
      );

      !!match && (match.isProcessing = isProcessing);
    },
  },

  getters: {
    shipmentItems: (state) => (status: Status) =>
      state.data[status]?.data ?? [],
    total: (state) => (status: Status) => state.data[status]?.total ?? 0,
    totals: (state) =>
      Object.values(Status).reduce(
        (result, status) => ({
          ...result,
          [status]: state.data[status as Status]?.total ?? 0,
        }),
        {}
      ),
    isLoading: (state) => state.isLoading,
  },
});
