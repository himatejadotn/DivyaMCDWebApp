export interface saveData{
    id:number,
    market:string;
    releaseName:string;
    releaseStatus:string;
    software :components[];
    deploymentModel:components[];
    version:components[];
}
export interface components{
    software:string;
    deploymentModel: string;
    version:string; 
}