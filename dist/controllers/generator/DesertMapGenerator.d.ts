import { BaseMapGenerator } from './BaseMapGenerator';
import { Chunk } from 'src/models/Chunk';
export declare class DesertMapGenerator implements BaseMapGenerator {
    generate(chunk: Chunk): void;
    populate(chunk: Chunk): void;
}
export declare const desert: DesertMapGenerator;
