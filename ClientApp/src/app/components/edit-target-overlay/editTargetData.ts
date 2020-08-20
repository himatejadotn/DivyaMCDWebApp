export interface EditTargetData{
    id:number;
    market:string;
    name:string;
    filters : FiltersDTO[];
}
export interface FiltersDTO{
    storeId: string;
    region: string;
    allDayStoreType: string;
    ownerOperator: string;
}