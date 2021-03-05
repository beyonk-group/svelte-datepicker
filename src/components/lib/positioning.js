import { tick } from 'svelte'

function getFramePosition (win) {
  const selector = `iframe${Array.from(win.frameElement.attributes).map(d => `[${d.name}='${d.value}']`).join('')}`
  const iframe = win.parent.document.querySelector(selector)
  const iframePosition = iframe
    ? iframe.getBoundingClientRect()
    : { top: 0, left: 0, height: 0, width: 0 }

  return {
    top: iframePosition.top,
    left: iframePosition.left,
    height: iframePosition.height,
    width: iframePosition.width
  }
}

function getElementPosition (win, el) {
  const elementPosition = el.getBoundingClientRect()
  const iframePosition = getFramePosition(win)

  return {
    top: elementPosition.top + iframePosition.top,
    left: elementPosition.left + iframePosition.left,
    bottom: elementPosition.bottom + iframePosition.top,
    right: elementPosition.right + iframePosition.left,
    height: elementPosition.height,
    width: elementPosition.width
  }
}

function getDocEl (win) {
  try {
    return win.parent.document.documentElement
  } catch (ex) {
    return win.document.documentElement
  }
}

function parentDimensions (win) {
  const { clientHeight, clientWidth } = getDocEl(win)
  return { height: clientHeight, width: clientWidth }
}

function isElementVisible (win, element) {
  const { height, width } = parentDimensions(win)
  const { top, left, bottom, right } = getElementPosition(win, element)
  return (top >= 0 && left >= 0 && bottom <= height && right <= width)
}

function iframed (win) {
  return win.self !== win.top
}

function isCrossOriginFrame (win) {
  try {
    return (!win.top.location.hostname)
  } catch (e) {
    return true
  }
}

async function getCoords ({ win, calendar, trigger, offset = 10 }) {
  await tick()

  const { height, width } = parentDimensions(win)
  const { width: calWidth, height: calHeight } = calendar.getBoundingClientRect()
  let x, y

  if (iframed(win) && !isCrossOriginFrame(win)) {
    const iframePosition = getFramePosition(win)
    x = (width / 2) - iframePosition.left - (calWidth / 2)
    y = (height / 2) - iframePosition.top - (calHeight / 2)
  }

  if (isCrossOriginFrame(win)) {
    const { bottom } = trigger.getBoundingClientRect()
    x = (width / 2) - (calWidth / 2)
    y = bottom
  }

  if (!iframed(win)) {
    x = (width / 2) - (calWidth / 2)
    y = (height / 2) - (calHeight / 2)
  }

  return { left: x <= 0 ? offset : x, top: y <= 0 ? offset : y }
}

export { getCoords }
