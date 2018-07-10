import { Chunk } from '../../models'
import { GridType } from '../../Constants'
export interface BaseMapGenerator {
  // for generating map
  generate(chunk: Chunk): void 
  // for adding npc & building
  populate(chunk: Chunk): void
}

export function intToGridType(x: number): GridType {
  const bt: GridType = (GridType as any)[x.toString()]
  return bt
}
