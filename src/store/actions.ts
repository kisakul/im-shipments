import { ShipmentData } from '@typings/shipments';
import { Status } from '@typings/shipments.enum';
import { ActionType } from '@typings/store.enum';
import { store } from '.';

/**
 * Commits store action which replaces shipment objects for given status.
 *
 * @param status Shipment status
 * @param data Object with shipments list and total count of shipments
 */
export function replaceShipments(
  status: Status,
  data: ShipmentData = { data: [], total: 0 }
) {
  store.commit(ActionType.SET_SHIPMENT_ITEMS, { status, data });
}

/**
 * Commits store action which appends given shipments to current list of shipments for given status.
 *
 * @param status Shipment status
 * @param data Object with shipments list and total count of shipments
 */
export function appendShipments(
  status: Status,
  data: ShipmentData = { data: [], total: 0 }
) {
  store.commit(ActionType.APPEND_SHIPMENT_ITEMS, { status, data });
}

/**
 * Commits store action which activates global loading indicator.
 */
export function showLoadingIndicator() {
  store.commit(ActionType.SHOW_LOADING_INDICATOR);
}

/**
 * Commits store action which deactivates global loading indicator.
 */
export function hideLoadingIndicator() {
  store.commit(ActionType.HIDE_LOADING_INDICATOR);
}

/**
 * Commits store action which updates total count of shipments in given status.
 *
 * @param status Shipment status
 * @param total Total number of shipments in given status
 */
export function setTotal(status: Status, total: number) {
  store.commit(ActionType.SET_TOTAL, { status, total });
}

/**
 * Commits store action which sets a flag in shipment object which indicates that
 * the shipment is currently being acted on.
 *
 * @param id Shipment id
 */
export function setItemProcessing(id: string) {
  store.commit(ActionType.SET_ITEM_PROCESSING_STATE, { id, isProcessing: true });
}
