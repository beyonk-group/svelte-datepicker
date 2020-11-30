import { tick } from 'svelte'

const getTranslate = async (w, contentsWrapper, translateX, translateY) => {
  const dist = await getDistanceToEdges(contentsWrapper, translateX, translateY)
  let x
  let y
  if (w < 480) {
    y = dist.bottom
  } else if (dist.top < 0) {
    y = Math.abs(dist.top)
  } else if (dist.bottom < 0) {
    y = dist.bottom
  } else {
    y = 0
  }
  if (dist.left < 0) {
    x = Math.abs(dist.left)
  } else if (dist.right < 0) {
    x = dist.right
  } else {
    x = 0
  }
  return { x, y }
}

export {
  getTranslate
}

const getDistanceToEdges = async (contentsWrapper, translateX, translateY) => {
  await tick()
  const rect = contentsWrapper.getBoundingClientRect()
  return {
    top: rect.top + (-1 * translateY),
    bottom: window.innerHeight - rect.bottom + translateY,
    left: rect.left + (-1 * translateX),
    right: document.body.clientWidth - rect.right + translateX
  }
}
