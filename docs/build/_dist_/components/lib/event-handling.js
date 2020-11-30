
const once = (el, evt, cb) => {
  function handler () {
    cb.apply(this, arguments)
    el.removeEventListener(evt, handler)
  }
  el.addEventListener(evt, handler)
}

export {
  once
}
