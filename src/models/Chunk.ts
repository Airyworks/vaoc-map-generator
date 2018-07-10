import { Climate } from 'src/Constants'
import { Grid } from './Grid'
import { MapGenerator } from 'src/controllers'

export class Chunk {
  public noise: string | number
  public id: number
  public x: number
  public y: number
  public side: number
  public grids: Grid[][] = []
  public climate: Climate
  public isPreserved: boolean = false

  constructor(id: number, side: number, noise: string) {
      this.id = id
      this.side = side
      this.noise = noise
  }

  public loadGrids() {    
    let mapGen: any

    switch (this.climate) {
      case Climate.Desert:
        mapGen = MapGenerator.desert
        break
      case Climate.Grassland:
        mapGen = MapGenerator.grassland
        break
      case Climate.Iceland:
        mapGen = MapGenerator.iceland
        break
      case Climate.Ocean:
        mapGen = MapGenerator.ocean
        break
      case Climate.Origin:
        mapGen = MapGenerator.origin
        break
      case Climate.Tropical:
        mapGen = MapGenerator.tropical
        break
      default:
        throw new Error(`Climate ${this.climate} is invalid`)
    }
    mapGen.generate(this)
    mapGen.populate(this)

    this.isPreserved = true
  }

  public releaseGrids() {
    if (this.isPreserved) {
      const grids: Grid[][] = []
      this.grids = grids
      this.isPreserved = false
    }
  }
}
