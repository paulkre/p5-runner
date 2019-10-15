import P5 from "p5"

export function runSketch(sketch: (p: P5) => void) {
  new P5(sketch)
}
