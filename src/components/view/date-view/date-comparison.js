import dayjs from 'dayjs/esm'

export function areDatesEquivalent (a, b) {
  return a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
}

export function isDateBetweenSelected (a, b, c) {
  const start = dayjs(a).startOf('day').toDate()
  const stop = dayjs(b).startOf('day').toDate()
  const day = dayjs(c).startOf('day').toDate()
  return day > start && day < stop
}
