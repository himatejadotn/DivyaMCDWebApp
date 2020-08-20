export interface SaveTargetData {
  market: string;
  name: string;
  filters: FiltersDTO[];
  stores: Stores[];
}
export interface Stores {
  market: string;
  storeId: string;
  region: string;
  allDayStoreType: string;
  ownerOperator: string;
}

export interface FiltersDTO {
  storeId: string;
  region: string;
  allDayStoreType: string;
  ownerOperator: string;
}