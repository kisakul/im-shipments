export enum Status {
  PROCESSING = 1,
  SUSPENDED,
  PAID,
  DELIVERED,
  RETURNED,
}

export enum FilterCondition {
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  EQ = 'eq',
  NEQ = 'neq',
}

export enum AppSection {
  PROCESSING = 'processing',
  SUSPENDED = 'suspended',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
}
