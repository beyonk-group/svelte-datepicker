function sizes (w) {
  const contentWidth = [ ...w.document.body.children ].reduce((a, el) => Math.max(
    a, el.getBoundingClientRect().right), 0
  ) - w.document.body.getBoundingClientRect().x

  return {
    pageWidth: Math.min(w.document.body.scrollWidth, contentWidth),
    pageHeight: w.document.body.scrollHeight,
    viewportHeight: w.innerHeight
  }
}

const dimensions = {
  medium: {
    single: {
      height: 415,
      width: 340
    },
    range: {
      height: 415,
      width: 680
    }
  },
  small: {
    single: {
      height: 330,
      width: 340
    },
    range: {
      height: 614,
      width: 320
    }
  }
}

function getPosition (w, e, config) {
  const { isRangePicker } = config
  const { pageWidth, viewportHeight } = sizes(w)

  const display = pageWidth < 480 ? 'small' : 'medium'
  const mode = isRangePicker ? 'range' : 'single'
  const { width, height } = dimensions[display][mode]

  const padding = 6

  let left = Math.max(padding, e.pageX - (width / 2))

  if ((left + width) > pageWidth) {
    left = (pageWidth - width) - padding
  }

  let top = Math.max(padding, e.pageY - (height / 2))

  const willExceedViewableArea = (top + height) > viewportHeight
  if (willExceedViewableArea) {
    top = viewportHeight - height - padding
  }

  return { top, left }
}

export {
  getPosition
}
