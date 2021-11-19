import { useLoadingIndicator } from '@/composables/useLoadingIndicator';
import { useMonitoring } from '@/composables/useMonitoring';
import { monitoringInterval } from '@/config';
import {
  appendShipments,
  replaceShipments,
  setItemProcessing,
  setTotal,
} from '@/store/actions';
import { FilterParam, ShipmentData } from '@typings/shipments';
import { FilterCondition, Status } from '@typings/shipments.enum';
import axios from 'axios';
import { getApiBaseUrl } from './config';

export const { start, stop, wrap } = useMonitoring(async () => {
  await updateTotals();
}, monitoringInterval);

const { wrap: wrapWithLoadingIndicator } = useLoadingIndicator();

// A cache of stringified filter definitions for fetching shipments with given status.
const filtersPerStatus: Record<string, string> = {};

/**
 * Returns stringified filter object used for fetching shipments with given status from the API.
 *
 * @param status Status of the shipment
 * @returns Stringified filter object
 */
function getFilterPerStatus(status: Status) {
  if (!(status in filtersPerStatus)) {
    filtersPerStatus[status] = JSON.stringify([
      {
        k: 'status',
        c: FilterCondition.EQ,
        v: status,
      } as FilterParam,
    ]);
  }

  return filtersPerStatus[status];
}

/**
 * Calls the API to fetch list of shipments with given status.
 *
 * @param status Shipment status
 * @param skip How many shipments should be skipped from the beginning of the list
 * @param take How many shipments should be returted
 * @returns A Promise with list of shipments
 */
async function fetchData(status: Status, skip = 0, take = 20) {
  try {
    const params = new URLSearchParams([
      ['skip', `${skip}`],
      ['take', `${take}`],
      ['filter', getFilterPerStatus(status)],
    ]);

    return (
      await axios.get<ShipmentData>(`${getApiBaseUrl()}/api/cargo`, {
        params,
      })
    ).data;
  } catch (error) {
    console.error(
      'Error while fetching data',
      status,
      getFilterPerStatus(status),
      skip,
      take,
      error
    );

    return { data: [], total: 0 };
  }
}

/**
 * Loads list of shipments from the API (and activates global loading indicator during the load).
 * Afterwards updates (replaces) list of shipments of given status in store with the result.
 *
 * @param status Shipment status
 * @param skip How many shipments should be skipped from the beginning of the list
 * @param take How many shipments should be returted
 */
export async function loadItems(status: Status, skip = 0, take = 20) {
  await wrapWithLoadingIndicator(async () => {
    replaceShipments(status, await fetchData(status, skip, take));
  });
}

/**
 * Loads list of shipments from the API (and activates global loading indicator during the load).
 * Afterwards updates list of shipments of given status in store by appending the result.
 *
 * @param status Shipment status
 * @param skip How many shipments should be skipped from the beginning of the list
 * @param take How many shipments should be returted
 */
export async function appendItems(status: Status, skip = 0, take = 20) {
  await wrapWithLoadingIndicator(async () => {
    appendShipments(status, await fetchData(status, skip, take));
  });
}

/**
 * Triggers an API call which updates state of suspended shipment.
 *
 * @param id Shipment id
 * @param method One of available shipment actions ("pay" or "return")
 */
async function updateShipment(
  id: string,
  method: 'pay' | 'return'
): Promise<void> {
  await wrapWithLoadingIndicator(async () => {
    stop();

    setItemProcessing(id);

    try {
      await axios.post(`${getApiBaseUrl()}/api/cargo/${method}`, {
        id,
      });
    } catch (error) {
      console.error('Error while updating shipment', id, method, error);
    } finally {
      start(true);
    }
  });
}

/**
 * Triggers an API call which marks shipment with gived id as paid for.
 *
 * @param id Shipment id
 */
export async function payForShipment(id: string) {
  await updateShipment(id, 'pay');
}

/**
 * Triggers an API call which marks shipment with gived id as requested for return.
 *
 * @param id Shipment id
 */
export async function returnShipment(id: string) {
  await updateShipment(id, 'return');
}

/**
 * Queries backend API for all 4 statuses of shipments and saves total count for each status
 * in the store.
 */
async function updateTotals() {
  [
    Status.PROCESSING,
    Status.SUSPENDED,
    Status.RETURNED,
    Status.DELIVERED,
  ].forEach(async (status) => {
    const shipmentData = await fetchData(status, 0, 1);

    setTotal(status, shipmentData?.total ?? 0);
  });
}
