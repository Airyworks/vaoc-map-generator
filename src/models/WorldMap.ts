import { Chunk } from './Chunk'
import { Climate } from '@/models/Constants'

let moveIter: [number, number] = [1, 0]
const turn = () => {
  const t = moveIter[0] * 2 + moveIter[1]
  switch (t) {
    case 2:
      // [1, 0]
      moveIter = [0, -1]
      break
    case 1:
      // [0, 1]
      moveIter = [1, 0]
      break
    case -1:
      // [0, -1]
      moveIter = [-1, 0]
      break
    case -2:
      // [-1, 0]
      moveIter = [0, 1]
      break
    default:
      throw new Error(`moveIter:${moveIter} is invalid`)
  }
}

export class WorldMap {
  public static randomClimate(hash: string): Climate {
    const seed = parseInt(hash.slice(-2), 16)
    const target = seed % 5
    let c: Climate = (Climate as any)[target.toString()]
    c = (Climate as any)[c]
    return c
  }
  
  private static *calculatePosition(n: number = 0): Iterable<{x: number, y: number}> {
    let side = 1
    let times = 0
    const pos: [number, number] = [0, 0]
    let turned = 0

    for (let it = 0;;it++) {
      if (it >= n) {
        yield {x: pos[0], y: pos[1]}
      }
      pos[0] += moveIter[0]
      pos[1] += moveIter[1]
      turned++
      if (turned >= side) {
        turn()
        turned = 0
        times++
      }
      if (times > 1) {
        times = 0
        side++
      }
    }
  }
  
  public side: number
  public hashes: string[] = []
  public chunks: Chunk[] = []
  public position: Chunk[][] = []
  
  constructor(side: number) {
    this.side = side
  }

  public loadBlockHash(hashes: string[]) {
    this.hashes = hashes
  }

  public generateChunks() {
    this.generateFirstChunk()
    const posGen = WorldMap.calculatePosition(1)
    for (let i = 1; i < this.hashes.length + 1; i++) {
      const pos: {x: number, y: number} = (posGen as any).next().value
      const chunk = new Chunk(i, this.side, this.hashes[i - 1])
      chunk.x = pos.x
      chunk.y = pos.y
      chunk.climate = WorldMap.randomClimate(chunk.noise.toString())
      this.chunks[i] = chunk
      if (this.position[pos.x] === undefined) {
        this.position[pos.x] = []
      }
      this.position[pos.x][pos.y] = chunk
    }
  }

  public addChunk(hash: string) {
    this.hashes.push(hash)
    const n = this.hashes.length
    const posGen = WorldMap.calculatePosition(n)
    const pos: {x: number, y: number} = (posGen as any).next().value
    const chunk = new Chunk(n, this.side, this.hashes[n - 1])
    chunk.x = pos.x
    chunk.y = pos.y
    chunk.climate = WorldMap.randomClimate(chunk.noise.toString())
    this.chunks[n] = chunk
    if (this.position[pos.x] === undefined) {
      this.position[pos.x] = []
    }
    this.position[pos.x][pos.y] = chunk
  }

  private generateFirstChunk() {
    const chunk: Chunk = new Chunk(0, this.side, '0')
    chunk.x = 0
    chunk.y = 0
    chunk.climate = Climate.Origin
    this.chunks[0] = chunk
    if (this.position[0] === undefined) {
      this.position[0] = []
    }
    this.position[0][0] = chunk
  }
}

export const world: WorldMap = new WorldMap(64)