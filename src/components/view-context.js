'use strict'

import { dayjs } from './lib/date-utils'
import DateView from './view/date-view/DateView.svelte'
import { derived } from 'svelte/store'

function createMonthView (months, displayedDate) {
  let monthIndex = 0

  return derived([ displayedDate ], ([ $displayedDate ]) => {
    const month = $displayedDate.month()
    const year = $displayedDate.year()
    for (let i = 0; i < months.length; i += 1) {
      if (months[i].month === month && months[i].year === year) {
        monthIndex = i
      }
    }

    return {
      monthIndex,
      visibleMonth: months[monthIndex]
    }
  })
}

function createViewContext (isStart, mainContext) {
  const { config, months, displayedStartDate, displayedEndDate, selectedStartDate, selectedEndDate } = mainContext
  const [ date, displayedDate ] = isStart ? [ selectedStartDate, displayedStartDate ] : [ selectedEndDate, displayedEndDate ]
  const isDaytime = derived(date, $date => {
    if (!$date) { return true }
    const [ h ] = dayjs($date).format('HH:mm').split(':').map(d => parseInt(d))
    return h > config.morning && h < config.night
  })

  return {
    isStart,
    date,
    view: DateView,
    isDaytime,
    displayedDate,
    monthView: createMonthView(months, displayedDate)
  }
}

export {
  createViewContext
}
