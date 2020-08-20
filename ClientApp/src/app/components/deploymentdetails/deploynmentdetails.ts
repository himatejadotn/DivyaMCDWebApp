/* Defines the product entity */
export interface DeploynmentDetails {
    id:number;
    deploymentID: string;
    deploymentName: string;
    effectiveDate: string;
    status: string;
    release: string;
    createdBy: string;
    market:string;
    comments:string;
    createdDate:string;
    targetStores : targetStoresDTO[];
  }
  export interface targetStoresDTO{
    storeId: string;
    status: string;
    details: string;
}