import { dayjs } from './date-utils'

function getCalendarPage (date, dayProps) {
  const displayedRangeStart = date.startOf('month').startOf('week')
  const displayedRangeEnd = date.endOf('month').endOf('week').add(1, 'day')

  const weeks = []
  let currentDay = displayedRangeStart
  while (currentDay.isBefore(displayedRangeEnd, 'day')) {
    const weekOfMonth = Math.floor(currentDay.diff(displayedRangeStart, 'days') / 7)
    const isRequestedMonth = currentDay.isSame(date, 'month')
    weeks[weekOfMonth] = weeks[weekOfMonth] || { days: [], id: `${currentDay.format('YYYYMMYYYY')}${weekOfMonth}` }
    weeks[weekOfMonth].days.push(
      Object.assign({
        partOfMonth: isRequestedMonth,
        firstOfMonth: isRequestedMonth && currentDay.date() === 1,
        lastOfMonth: isRequestedMonth && currentDay.date() === date.daysInMonth(),
        day: currentDay.date(),
        month: currentDay.month(),
        year: currentDay.year(),
        date: currentDay
      }, dayProps(currentDay))
    )
    currentDay = currentDay.add(1, 'day')
  }

  return { month: date.month(), year: date.year(), weeks }
}

function getDayPropsHandler (start, end, selectableCallback) {
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

function getMonths (config) {
  const { start, end, selectableCallback } = config
  const firstDay = start.startOf('month').startOf('day')
  const lastDay = end.startOf('month').startOf('day')
  const months = []
  const dayPropsHandler = getDayPropsHandler(firstDay, lastDay, selectableCallback)
  let date = dayjs(firstDay)
  while (date.isBefore(lastDay)) {
    months.push(getCalendarPage(date, dayPropsHandler))
    date = date.add(1, 'month')
  }
  return months
}

export {
  getMonths
}
