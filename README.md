# p5 runner

A tool for running and exporting [p5.js](https://p5js.org) sketches in a modern ESNext environment.

As soon as you make changes to your sketch file, this package will automatically reload the sketch in the browser. The tool also provides a simple API for getting animation frames out of the browser and saving them as PNG files.

## Usage

1. `npm init -y`
2. `npm install --save p5-runner`
3. Create index.js

```javascript
import { runSketch } from "p5-runner"

const size = 512
const fps = 50

const { sin, cos, PI } = Math
const r = size / 3

runSketch((p, api) => {
  p.setup = () => {
    p.createCanvas(size, size)
    p.frameRate(fps)

    p.noFill()
    p.stroke("pink")
    p.strokeWeight(15)
  }

  p.draw = () => {
    p.background("aquamarine")

    p.translate(size / 2, size / 2)

    p.beginShape()
    for (let i = 0; i < 48; i++) {
      const v = getPos(p.frameCount - i)
      p.vertex(v.x, v.y)
    }
    p.endShape()

    // if (p.frameCount <= 250) api.saveFrame("out/out.#####.png")
  }

  const getPos = frameCount => {
    const t = frameCount / fps / 2
    const x = sin(t * 2 * PI) * r
    const y = cos(t * 3 * PI) * r
    return p.createVector(x, y)
  }
})
```

4. `npx p5-runner` or `npx p5-runner index.js`
5. Go to [http://localhost:3000](http://localhost:3000)

## Exporting your sketch as PNG files

Calling the `api.saveFrame()` method in your sketch file will save the current animation frame in your project's directory. The default output location is "out/out.#####.png" but you can also provide your own destination path like this: `api.saveFrame("renders/sketch01/#####.png")` or `api.saveFrame("still.png")`
