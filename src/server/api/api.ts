import express from "express"
import bodyParser from "body-parser"
import path from "path"
import fs from "fs"
import isValidPath from "is-valid-path"
import mkdirp from "mkdirp"

export const api = express.Router()

api.use(
  bodyParser.raw({
    type: "image/png",
    limit: "10mb",
  }),
)

api.post("/saveFrame/:filePath", async (req, res) => {
  const filePath = path.join(
    process.cwd(),
    decodeURIComponent(req.params.filePath),
  )

  if (!isValidPath(filePath)) {
    req.statusCode = 400
    res.json("failure")
    return
  }

  const outDir = path.dirname(filePath)
  if (!fs.existsSync(outDir)) await mkdirp.sync(outDir)

  const data: string = req.body.toString()
  fs.writeFileSync(filePath, data, "base64")

  res.json("success")
})
