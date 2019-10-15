export async function saveFrame() {
  // @ts-ignore
  const canvas: HTMLCanvasElement = document.querySelector(
    "#canvas-wrapper > canvas",
  )

  const res = await fetch("/api/saveFrame", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "image/png",
    },
    body: canvas.toDataURL().replace(/^data:image\/png;base64,/, ""),
  })
  return await res.json()
}
