import { BaseMapGenerator, intToGridType } from './BaseMapGenerator'
import { generateFunc } from './generateFunc'
import { Chunk } from 'src/models/Chunk'
import { Grid } from 'src/models/Grid'
import { Climate } from 'src/Constants'

export class OriginMapGenerator implements BaseMapGenerator {  
  public generate(chunk: Chunk): void {
    // load from file
  }

  public populate(chunk: Chunk): void {
    // load from file
  }
}

export const origin = new OriginMapGenerator()