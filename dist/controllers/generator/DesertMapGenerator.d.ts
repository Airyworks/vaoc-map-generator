import { BaseMapGenerator } from './BaseMapGenerator';
import { Chunk } from '@/models/Chunk';
export declare class DesertMapGenerator implements BaseMapGenerator {
    generate(chunk: Chunk): void;
    populate(chunk: Chunk): void;
}
export declare const desert: DesertMapGenerator;
