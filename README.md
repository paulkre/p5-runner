# P5 Runner

A tool for running and exporting P5 sketches in a modern ESNext environment.

## Usage

1. `mkdir my-sketch && cd my-sketch`
2. `npm init -y`
3. `npm install -S p5-runner`
4. Create index.js:

```javascript
import { runSketch } from "p5-runner"

const size = 512
const fps = 50

const { sin, cos, PI, random } = Math
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

    // if (p.frameCount <= 250) api.saveFrame()
  }

  const getPos = frameCount => {
    const t = frameCount / fps / 2
    const x = sin(t * 2 * PI) * r
    const y = cos(t * 3 * PI) * r
    return p.createVector(x, y)
  }
})
```

5. Add start script to package.json:

```json
...
  "scripts": {
    "start": "p5-runner"
  }
...
```

6. `npm start`
7. Go to [http://localhost:3000](http://localhost:3000)

## Saving frames as PNG files

When you call the `api.saveFrame()` method in your sketch file, P5 Runner will render the current frame to a PNG file and store it in a directory called "out" in your current working directory.