import express from "express"
import bodyParser from "body-parser"
import path from "path"
import fs from "fs"

export const api = express.Router()

const outDir = path.join(process.cwd(), "out")

api.use(
  bodyParser.raw({
    type: "image/png",
    limit: "10mb",
  }),
)

api.post("/saveFrame/:fid", (req, res) => {
  const { fid } = req.params
  if (isNaN(Number(fid))) {
    req.statusCode = 400
    return "failure"
  }

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)

  const data: string = req.body.toString()
  fs.writeFileSync(path.join(outDir, `out.${pad(fid, 5)}.png`), data, "base64")
  res.json("success")
})

function pad(n: string, width: number) {
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n
}
