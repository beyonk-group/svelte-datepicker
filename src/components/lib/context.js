import { writable } from 'svelte/store'
import { createFormatter } from './formatter.js'
import { getMonths } from './calendar.js'
import { sanitizeInitialValue } from './sanitization.js'

const contextKey = {}

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

export {
  contextKey,
  setup
}
