import P5 from "p5"

import { createApi, Api } from "./api"

export function runSketch(sketch: (p: P5, api: Api) => void) {
  new P5((p: P5) => {
    sketch(p, createApi(p))
  })
}
