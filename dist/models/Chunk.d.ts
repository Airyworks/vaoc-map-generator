import { Climate } from '../Constants';
import { Grid } from './Grid';
export declare class Chunk {
    noise: string | number;
    id: number;
    x: number;
    y: number;
    side: number;
    grids: Grid[][];
    climate: Climate;
    isPreserved: boolean;
    constructor(id: number, side: number, noise: string);
    loadGrids(): void;
    releaseGrids(): void;
}
