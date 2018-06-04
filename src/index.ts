import * as Model from '@/models'
export { Model }
import * as Controller from '@/controllers'
export { Controller }

const chunk = new Model.Chunk(1, 64, Math.random().toString())
chunk.x = 1
chunk.y = 2
chunk.climate = Model.Constants.Climate.Tropical
chunk.loadGrids()

let c = ''
let d = ''
for (const i of chunk.grids) {
  for (const j of i) {
    if (j.appendix) {
      c += j.appendix.type + ' '
    } else {
      c += '  '
    }
    d += j.gridType.toString() + ' '
  }
  c += '\n'
  d += '\n'
}
console.log('appendix\n' + c)
console.log('terrain\n' + d)