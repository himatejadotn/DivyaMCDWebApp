export interface EditData{
    id:number,
    market:string;
    releaseName:string;
    releaseStatus:string;
    components :Softcomponents[];
}
export interface Softcomponents{
    software:string;
    deploymentModel: string;
    version:string; 
}