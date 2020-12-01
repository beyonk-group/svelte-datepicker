import { derived, get, writable } from 'svelte/store'
import { createFormatter } from './formatter.js'
import dayjs from 'dayjs/esm'

const contextKey = {}

function createState (config) {
  const chosenStartDate = writable(false)
  const chosenEndDate = writable(false)
  const chosenStartTime = writable(false)
  const chosenEndTime = writable(false)

  return {
    pickStartDate: () => chosenStartDate.set(true),
    pickEndDate: () => chosenEndDate.set(true),
    pickStartTime: () => chosenStartTime.set(true),
    pickEndTime: () => chosenEndTime.set(true),
    resetChoices: () => {
      chosenStartDate.set(false)
      chosenEndDate.set(false)
      chosenStartTime.set(false)
      chosenEndTime.set(false)
    },
    choices: derived([ chosenStartDate, chosenEndDate, chosenStartTime, chosenEndTime ], ([ $chosenStartDate, $chosenEndDate, $chosenStartTime, $chosenEndTime ]) => {
      const validDates = config.isRangePicker ? $chosenStartDate && $chosenEndDate : $chosenStartDate
      const validTimes = config.isTimePicker
        ? (config.isRangePicker ? $chosenEndTime : $chosenStartTime)
        : true
      const finished = validDates && validTimes

      return {
        allDatesChosen: validDates,
        allTimesChosen: validTimes,
        isDateChosen: finished
      }
    })
  }
}

function moveDateWithinAllowedRange (date, config) {
  const isOutsideRange = (
    date.getTime() < config.start.getTime() ||
    date.getTime() > config.end.getTime()
  )

  if (isOutsideRange) {
    console.warn('Provided date', dayjs(date).format(), 'is outside allowed range', dayjs(config.start).format(), 'to', dayjs(config.end).format())
    return config.start
  }

  return date
}

function setup (selected, config) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const months = getMonths(config.start, config.end, config.selectableCallback, config.weekStart)
  const [ preSelectedStart, preSelectedEnd ] = Array.isArray(selected) ? selected : [ selected, null ]
  const givenDate = moveDateWithinAllowedRange(preSelectedStart, config)
  const selectedStartDate = writable(givenDate)
  const selectedEndDate = writable(preSelectedEnd)

  const { formatter } = createFormatter(selectedStartDate, selectedEndDate, config)

  const state = createState(config)
  const swapWatcherUnsubscriber = state.choices.subscribe(({ allDatesChosen, allTimesChosen }) => {
    if (config.isRangePicker && (allDatesChosen || allTimesChosen)) {
      const chosenStart = get(selectedStartDate)
      const chosenEnd = get(selectedEndDate)
      if (chosenEnd < chosenStart) {
        selectedStartDate.set(chosenEnd)
        selectedEndDate.set(chosenStart)
      }
    }
  })

  return Object.assign(
    {
      months,
      today,
      selectedStartDate,
      selectedEndDate,
      config,
      shouldShakeDate: writable(false),
      isOpen: writable(false),
      isClosing: writable(false),
      highlighted: writable(today),
      formatter,
      destroy: swapWatcherUnsubscriber
    },
    state
  )
}

const getCalendarPage = (month, year, dayProps, weekStart = 0) => {
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

function getMonths (start, end, selectableCallback = null, weekStart = 0) {
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)
  const endDate = new Date(end.getFullYear(), end.getMonth() + 1, 1)
  const months = []
  let date = new Date(start.getFullYear(), start.getMonth(), 1)
  const dayPropsHandler = getDayPropsHandler(start, end, selectableCallback)
  while (date < endDate) {
    months.push(getCalendarPage(date.getMonth(), date.getFullYear(), dayPropsHandler, weekStart))
    date.setMonth(date.getMonth() + 1)
    date = new Date(date)
  }
  return months
}

export {
  contextKey,
  setup
}
