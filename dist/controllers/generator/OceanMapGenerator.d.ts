import { BaseMapGenerator } from './BaseMapGenerator';
import { Chunk } from '@/models/Chunk';
export declare class OceanMapGenerator implements BaseMapGenerator {
    generate(chunk: Chunk): void;
    populate(chunk: Chunk): void;
}
export declare const ocean: OceanMapGenerator;
