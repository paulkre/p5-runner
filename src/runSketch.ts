import P5 from "p5"

export function runSketch(sketch: (p: P5) => void) {
  window.addEventListener("DOMContentLoaded", () => {
    const wrapperEl = document.getElementById("canvas-wrapper")
    if (wrapperEl) new P5(sketch, wrapperEl)
  })
}
