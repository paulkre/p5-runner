import P5 from "p5"

export type Api = {
  saveFrame(): Promise<void>
}

export const createApi: (p: P5) => Api = p => ({
  saveFrame: async () => {
    const canvas = document.querySelector<HTMLCanvasElement>("body > canvas")
    if (!canvas) return

    p.noLoop()
    await fetch(`/api/saveFrame/${p.frameCount}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "image/png",
      },
      body: canvas.toDataURL().replace(/^data:image\/png;base64,/, ""),
    })
    p.loop()
  },
})
