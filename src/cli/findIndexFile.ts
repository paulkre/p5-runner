import path from "path"
import fs from "fs"

const supportedExtensions = ["js", "ts"]

export function findIndexFile(): string | null {
  for (const ext of supportedExtensions) {
    const filePath = path.join(process.cwd(), `index.${ext}`)
    if (fs.existsSync(filePath)) return filePath
  }

  return null
}
