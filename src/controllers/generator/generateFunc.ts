import SimplexNoise from 'simplex-noise'

function classifierTerrain(input: number): number {
  if (input > 0.45) {
    return 2
  }
  if (input > 0.3) {
    return 1
  }
  if (input < 0) {
    return -1
  }
  return 0
}

function classifierGridType(input: number): number {
  return Math.floor(7 * input)
}

export function generateFunc(
  vecLength: number,
  side: number,
  exp: number,
  bias: number,
  noise: string | number,
  weightTerrain: number[],
  weightGridType: number[],
) {
  noise = noise.toString()
  const reverse = noise.split('').reverse().join('')
  const width = side
  const height = side

  function noiseGen(n: SimplexNoise) {
    return (x: number, y: number): number => n.noise2D(x, y) / 2 + 0.5
  }

  const [noise1, noise2] = [
    noiseGen(new SimplexNoise(noise)), 
    noiseGen(new SimplexNoise(reverse)),
  ]

  const MatrixT: number[][] = []
  const MatrixB: number[][] = []

  for (let y: number = 0; y < height; y++) {
    MatrixT[y] = []
    MatrixB[y] = []
    for (let x: number = 0; x < width; x++) {
      const nx = x / width - 0.5
      const ny = y / height - 0.5

      let terrain = 0
      let gridType = 0

      for (let i = 0; i < vecLength; i++) {
        terrain += weightTerrain[i] * noise1(nx * (1 << i), ny * (1 << i))
        gridType += weightGridType[i] * noise2(nx * (1 << i), ny * (1 << i))
      }
      terrain /= weightTerrain.slice(0, vecLength)
        .reduce((t: number, e: number) => t + e)
      terrain = Math.pow(terrain, exp) - bias
      gridType /= weightGridType.slice(0, vecLength)
        .reduce((t: number, e: number) => t + e)
      
      MatrixT[y][x] = classifierTerrain(terrain)
      MatrixB[y][x] = classifierGridType(gridType)
    }
  }
  return { terrain: MatrixT, gridType: MatrixB }
}