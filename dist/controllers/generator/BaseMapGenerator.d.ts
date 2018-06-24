import { Chunk } from '@/models';
import { GridType } from '@/Constants';
export interface BaseMapGenerator {
    generate(chunk: Chunk): void;
    populate(chunk: Chunk): void;
}
export declare function intToGridType(x: number): GridType;
