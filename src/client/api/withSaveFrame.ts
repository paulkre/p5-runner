import P5 from "p5"
import isValidPath from "is-valid-path"

const usedPaths: string[] = []

const padZeros = (n: string, width: number) =>
  n.length >= width ? n : new Array(width - n.length + 1).join("0") + n

const validateExtension = (path: string) => {
  if (!path.match(/\.png$/)) throw Error("Output file format must be PNG")
}

const sanitizeOutPath = (path: string, frameCount: number) => {
  if (usedPaths.find(el => el === path))
    throw Error("Cannot use the same output file name twice")

  validateExtension(path)

  const matches = path.match(/(#+)/g)
  if (matches) {
    if (matches.length > 1)
      throw Error("Too many number placeholders in output path")

    const paddedNumber = padZeros(String(frameCount), matches[0].length)
    path = path.replace(matches[0], paddedNumber)
  } else usedPaths.push(path)

  if (!isValidPath(path)) throw Error("Invalid output file path")

  return path
}

export const withSaveFrame = (p: P5) => async (
  path: string = "out/out.#####.png",
) => {
  const canvas = document.querySelector<HTMLCanvasElement>("body > canvas")
  if (!canvas) return

  path = sanitizeOutPath(path, p.frameCount)

  p.noLoop()
  await fetch(`/api/saveFrame/${encodeURIComponent(path)}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "image/png",
    },
    body: canvas.toDataURL().replace(/^data:image\/png;base64,/, ""),
  })
  p.loop()
}
