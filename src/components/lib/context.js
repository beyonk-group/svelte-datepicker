import { writable } from 'svelte/store'
import { createFormatter } from './formatter.js'
import { dayjs } from './date-utils'

const contextKey = {}

function moveDateWithinAllowedRange (date, config, isStart) {
  const isOutsideRange = (
    date.getTime() < config.start.getTime() ||
    date.getTime() > config.end.getTime()
  )

  if (isOutsideRange) {
    console.warn('Provided date', dayjs(date).format(), 'is outside specified start-and-end range', dayjs(config.start).format(), 'to', dayjs(config.end).format())
    return isStart ? config.start : config.end
  }

  return date
}

function sanitizeInitialValue (value, config) {
  let isDateChosen = false
  let chosen

  if (config.isRangePicker) {
    const [ from, to ] = value || []
    isDateChosen = Boolean(from).valueOf() && Boolean(to).valueOf()
    chosen = isDateChosen ? value : [ dayjs().toDate(), dayjs().add(1, 'month').toDate() ]
  } else {
    isDateChosen = Boolean(value).valueOf()
    chosen = [ isDateChosen ? value : dayjs().toDate() ]
  }

  const [ from, to ] = chosen

  return {
    isDateChosen,
    chosen: [
      moveDateWithinAllowedRange(from, config, true),
      ...config.isRangePicker ? [ moveDateWithinAllowedRange(to, config, false) ] : []
    ]
  }
}

function getNavBarStores (date) {
  return [
    writable(date.getFullYear()),
    writable(date.getMonth())
  ]
}

function setup (given, config) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { isDateChosen, chosen: [ preSelectedStart, preSelectedEnd ] } = sanitizeInitialValue(given, config)
  const selectedStartDate = writable(preSelectedStart)
  const selectedEndDate = writable(preSelectedEnd)
  const { formatter } = createFormatter(selectedStartDate, selectedEndDate, config)
  const component = writable('date-view')

  const [ startYear, startMonth ] = getNavBarStores(preSelectedStart)
  const [ endYear, endMonth ] = config.isRangePicker ? getNavBarStores(preSelectedEnd) : []

  return {
    months: getMonths(config),
    component,
    today,
    selectedStartDate,
    selectedEndDate,
    startYear,
    startMonth,
    endYear,
    endMonth,
    config,
    shouldShakeDate: writable(false),
    isOpen: writable(false),
    isClosing: writable(false),
    highlighted: writable(today),
    formatter,
    isDateChosen: writable(isDateChosen),
    resetView: () => {
      component.set('date-view')
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
