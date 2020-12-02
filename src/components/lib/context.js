import { writable } from 'svelte/store'
import DateView from '../view/date-view/DateView.svelte'
import { createFormatter } from './formatter.js'
import { dayjs } from './date-utils'

const contextKey = {}

function moveDateWithinAllowedRange (date, config) {
  const isOutsideRange = (
    date.getTime() < config.start.getTime() ||
    date.getTime() > config.end.getTime()
  )

  if (isOutsideRange) {
    console.warn('Provided date', dayjs(date).format(), 'is outside specified start-and-end range', dayjs(config.start).format(), 'to', dayjs(config.end).format())
    return config.start
  }

  return date
}

function setup (given, config) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let selected = given
  const dateChosen = Boolean(selected).valueOf()
  if (!dateChosen) {
    selected = config.isRangePicker ? [ dayjs().toDate(), dayjs().toDate() ] : dayjs().toDate()
  }

  const months = getMonths(config)

  const [ preSelectedStart, preSelectedEnd ] = Array.isArray(selected) ? selected : [ selected, null ]
  const givenDate = moveDateWithinAllowedRange(preSelectedStart, config)
  const selectedStartDate = writable(givenDate)
  const selectedEndDate = writable(preSelectedEnd)
  const { formatter } = createFormatter(selectedStartDate, selectedEndDate, config)
  const component = writable(DateView)

  return {
    months,
    component,
    today,
    selectedStartDate,
    selectedEndDate,
    config,
    shouldShakeDate: writable(false),
    isOpen: writable(false),
    isClosing: writable(false),
    highlighted: writable(today),
    formatter,
    isDateChosen: writable(dateChosen),
    resetView: () => {
      component.set(DateView)
    }
  }
}

const getCalendarPage = (month, year, dayProps, weekStart) => {
  const date = new Date(year, month, 1)
  date.setDate(date.getDate() - date.getDay() + weekStart)
  const nextMonth = month === 11 ? 0 : month + 1
  // ensure days starts on Sunday
  // and end on saturday
  const weeks = []
  while (date.getMonth() !== nextMonth || date.getDay() !== weekStart || weeks.length !== 6) {
    if (date.getDay() === weekStart) weeks.unshift({ days: [], id: `${year}${month}${year}${weeks.length}` })
    const checkStartDate = new Date(date.getTime())
    const checkEndDate = new Date(date.getTime())
    checkStartDate.setDate(checkStartDate.getDate() - 1)
    checkEndDate.setDate(checkEndDate.getDate() + 1)
    const updated = Object.assign({
      partOfMonth: date.getMonth() === month,
      firstOfMonth: checkStartDate.getMonth() !== date.getMonth(),
      lastOfMonth: checkEndDate.getMonth() !== date.getMonth(),
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      date: new Date(date)
    }, dayProps(date))
    weeks[0].days.push(updated)
    date.setDate(date.getDate() + 1)
  }
  weeks.reverse()
  return { month, year, weeks }
}

function getDayPropsHandler (start, end, selectableCallback) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date => {
    const isInRange = date >= start && date <= end
    return {
      isInRange,
      selectable: isInRange && (!selectableCallback || selectableCallback(date)),
      isToday: date.getTime() === today.getTime()
    }
  }
}

function getMonths (config) {
  const { start, end, selectableCallback } = config
  const firstDay = dayjs(start).startOf('month').startOf('day')
  const lastDay = dayjs(end).startOf('month').startOf('day')
  const months = []
  let date = dayjs(firstDay)
  const dayPropsHandler = getDayPropsHandler(firstDay.toDate(), lastDay.toDate(), selectableCallback)
  while (date.isBefore(lastDay)) {
    months.push(getCalendarPage(date.month(), date.year(), dayPropsHandler, dayjs.localeData().firstDayOfWeek()))
    date = date.add(1, 'month')
  }
  return months
}

export {
  contextKey,
  setup
}
