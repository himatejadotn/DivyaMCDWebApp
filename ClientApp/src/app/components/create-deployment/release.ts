import { ReleaseComponent } from "../create-deployment/releaseComponent";

export interface Release{
    id:number;
    name: string,
    components: Array<ReleaseComponent>
}