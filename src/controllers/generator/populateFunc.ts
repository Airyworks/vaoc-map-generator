import SimplexNoise from 'simplex-noise'

export function populateFunc(
  len: number,
  noise: string | number,
  side: number,
  R: number[],
  weight: number[] = [1, 0.75, 0.3, 0.15, 0.06],
) {
  noise = noise.toString()
  const width = side
  const height = side

  function noiseGen(n: SimplexNoise) {
    return (x: number, y: number): number => n.noise2D(x, y) / 2 + 0.5
  }

  const Matrix: number[][] = []

  for (let i = 0; i < len; i++) {
    const noiseG = noiseGen(new SimplexNoise(noise + i.toString()))

    const value: number[][] = []

    for (let y: number = 0; y < height; y++) {
      value[y] = []
      for (let x: number = 0; x < width; x++) {
        const nx = x / width - 0.5
        const ny = y / height - 0.5
  
        let t = 0
  
        for (let _: number = 0; _ < weight.length; _++) {
          t += weight[_] * noiseG(nx * (1 << _), ny * (1 << _))
        }
        t /= weight.reduce((p: number, e: number) => p + e)
        
        value[y][x] = t
      }
    }
    
    for (let yc = 0; yc < height; yc++) {
      for (let xc = 0; xc < width; xc++) {
        let max = 0
        // there are more efficient algorithms than this
        for (let yn = Math.max(yc - R[i], 0); yn <= Math.min(yc + R[i], height - 1); yn++) {
          for (let xn = Math.max(xc - R[i], 0); xn <= Math.min(xc + R[i], width - 1); xn++) {
            const e = value[yn][xn]
            if (e > max) {
              max = e
            }
          }
        }
        if (Matrix[yc] === undefined) {
          Matrix[yc] = []
        }
        if (value[yc][xc] === max) {
          Matrix[yc][xc] = i + 1
        } else if (Matrix[yc][xc] === undefined) {
          Matrix[yc][xc] = 0
        }
      }
    }
  }
  return Matrix
}