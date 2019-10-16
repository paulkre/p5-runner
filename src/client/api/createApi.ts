import P5 from "p5"
import { withSaveFrame } from "./withSaveFrame"

export type Api = {
  saveFrame(path?: string): Promise<void> | void
}

export const createApi: (p: P5) => Api = p => ({
  saveFrame: withSaveFrame(p),
})
