import { Chunk } from './Chunk'
import { Entity } from './Entity'
import { Climate, GridType, Surface } from './Constants'
export class Grid {
  private static id: number = 0
  public climate: Climate
  public terrain: number
  public gridId: number
  public x: number
  public y: number
  public chunk: Chunk
  public gridType: GridType
  public surface: Surface
  public appendix: Entity
  public passable: boolean = true
  constructor() {
    this.gridId = Grid.id ++
  }
}
