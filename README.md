# P5 Runner

A tool for running and exporting P5 sketches in a modern ESNext environment.

## Usage

1. `mkdir my-sketch && cd my-sketch`
2. `npm init -y`
3. `npm install -S p5-runner`
4. Create index.js:

```javascript
import { runSketch } from "p5-runner"

const size = 1024
const fps = 50

runSketch((p, api) => {
  p.setup = () => {
    p.createCanvas(size, size)
    p.frameRate(fps)
  }

  p.draw = async () => {
		p.background("black")
		// ...
    // api.saveFrame()
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
