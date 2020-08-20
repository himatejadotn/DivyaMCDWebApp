export interface components{
    softwares: software[];
    deploymentModels:deploymentModels[];
}
export interface software{
    id:number;
    software:string;
}
export interface deploymentModels{
    id:number;
    model:string;
}
 