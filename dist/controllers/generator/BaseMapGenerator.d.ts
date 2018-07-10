import { Chunk } from 'src/models';
import { GridType } from 'src/Constants';
export interface BaseMapGenerator {
    generate(chunk: Chunk): void;
    populate(chunk: Chunk): void;
}
export declare function intToGridType(x: number): GridType;
