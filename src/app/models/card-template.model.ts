import { CanvasAsset } from './canvas-asset.model';

export class CardTemplate {
    public title: string;
    public aspect_ratio: number
    public width: number;
    public height: number;
    public schema: any;
    public card_assets: CanvasAsset[];

    constructor() {
    }
}
