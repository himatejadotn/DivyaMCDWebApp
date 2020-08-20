import { Region } from './Region';
import { StoreType } from './StoreType';

export interface Stores {
    stores: StoreList[];
    regions: Region[];
    allDayStoreTypes: StoreType[];
}

export interface StoreList {
    market: string;
    storeId: string;
    regionId: number;
    region: string;
    storeTypeId: string;
    allDayStoreType: string;
    ownerOperator: string;
}