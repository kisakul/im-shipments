import { ShipmentData } from './shipments';
import { Status } from './shipments.enum';

export interface ShipmentsMonitorState {
  data: Record<Status, ShipmentData>;
  isLoading: boolean;
}
