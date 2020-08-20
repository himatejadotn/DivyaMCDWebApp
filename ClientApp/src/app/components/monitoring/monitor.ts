/* Defines the product entity */
export interface Monitor {
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
  }