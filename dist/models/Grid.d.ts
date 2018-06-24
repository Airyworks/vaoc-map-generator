import { Chunk } from './Chunk';
import { Entity } from './Entity';
import { Climate, GridType, Surface } from '@/Constants';
export declare class Grid {
    private static id;
    climate: Climate;
    terrain: number;
    gridId: number;
    x: number;
    y: number;
    chunk: Chunk;
    gridType: GridType;
    surface: Surface;
    appendix: Entity;
    passable: boolean;
    constructor();
}
