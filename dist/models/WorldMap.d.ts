import { Chunk } from './Chunk';
import { Climate } from 'src/Constants';
export declare class WorldMap {
    static randomClimate(hash: string): Climate;
    private static calculatePosition;
    side: number;
    hashes: string[];
    chunks: Chunk[];
    position: Chunk[][];
    constructor(side: number);
    loadBlockHash(hashes: string[]): void;
    generateChunks(): void;
    addChunk(hash: string): void;
    private generateFirstChunk;
}
export declare const world: WorldMap;
