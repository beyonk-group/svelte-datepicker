import { writable } from '../../../../web_modules/svelte/store.js'
import dayjs from '../../../../web_modules/dayjs/esm.js'

function format (h, m) {
  return [
    String(h).padStart(2, '0'),
    String(m).padStart(2, '0')
  ].join(':')
}

function createStore (date) {
  const time = writable(dayjs(date).format('HH:mm'))

  function increment (segment) {
    time.update(t => {
      let [ h, m ] = t.split(':')
      if (segment === 'hour' && h < 23) { ++h }
      if (segment === 'minute' && m < 59) { ++m }
      return format(h, m)
    })
  }

  function decrement (segment) {
    time.update(t => {
      let [ h, m ] = t.split(':')
      if (segment === 'hour' && h > 0) { --h }
      if (segment === 'minute' && m > 0) { --m }
      return format(h, m)
    })
  }

  function set (t) {
    time.set(t)
  }
  return {
    increment,
    decrement,
    time,
    set
  }
}

export {
  createStore
}
