import { dayjs } from './date-utils'

function buildDaySelectionValidator (start, end, selectableCallback) {
  const today = dayjs().startOf('day')
  return date => {
    const given = date.toDate()
    const isInRange = given >= start.toDate() && given <= end.toDate()
    return {
      isInRange,
      selectable: isInRange && (!selectableCallback || selectableCallback(given)),
      isToday: given.valueOf() === today.valueOf()
    }
  }
}

export {
  buildDaySelectionValidator
}
