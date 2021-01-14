import { getDay } from './get-day.js'

let shakeHighlightTimeout

function checkIfVisibleDateIsSelectable (months, date) {
  const proposedDay = getDay(
    months,
    date.month(),
    date.date(),
    date.year()
  )
  return proposedDay && proposedDay.selectable
}

function shakeDate (shouldShakeDate, date) {
  clearTimeout(shakeHighlightTimeout)
  shouldShakeDate.set(date)
  shakeHighlightTimeout = setTimeout(() => {
    shouldShakeDate.set(false)
  }, 700)
}

export {
  checkIfVisibleDateIsSelectable,
  shakeDate
}
