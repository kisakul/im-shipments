import { AppSection, Status } from './shipments.enum';

export interface Contractor {
  id?: string;
  name?: string;
}

export interface Shipment {
  id?: string;
  createdAt?: number;
  name?: string;
  contractor?: Contractor;
  status?: Status;
  isProcessing?: boolean;
}

export interface ShipmentData {
  data?: Shipment[];
  skip?: number;
  take?: number;
  total?: number;
}

export interface FilterParam {
  k?: string;
  c?: string;
  v?: FilterValueTypes;
}

export type FilterValueTypes = string | number | string[] | number[];

export interface AppSectionDefinition {
  section: AppSection;
  status: Status;
  icon: string;
  iconColor: string;
  title: string;
}
