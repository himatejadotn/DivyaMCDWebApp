export interface Deployment {
    id:number;
    market: string,
    status: string,
    createdBy: string,
    storeLimit: number,
    targetStoreCount: number,
    releaseId: number,
    targetId: number,
    releaseName: string,
    targetName: string
    deploymentDetails: DeploymentDetails[];
}

export interface DeploymentDetails {
    deploymentName: string
    effectiveDate: Date
    comments: string

}

