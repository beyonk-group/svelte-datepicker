'use strict'

import dayjs from 'dayjs/esm'
import DateView from './view/date-view/DateView.svelte'
import { derived, writable, get } from 'svelte/store'

function createMonthView (months, year, month) {
  let monthIndex = 0

  return derived([ year, month ], ([ $year, $month ]) => {
    for (let i = 0; i < months.length; i += 1) {
      if (months[i].month === $month && months[i].year === $year) {
        monthIndex = i
      }
    }

    return {
      monthIndex,
      visibleMonth: months[monthIndex]
    }
  })
}

function createViewContext (isStart, date, months, config) {
  const year = writable(get(date).getFullYear())
  const month = writable(get(date).getMonth())
  const isDaytime = derived(date, $date => {
    if (!$date) { return true }
    const [ h ] = dayjs($date).format('HH:mm').split(':').map(d => parseInt(d))
    return h > config.morning && h < config.night
  })

  return {
    isStart,
    view: DateView,
    allDatesChosen: writable(false),
    date,
    isDaytime,
    year,
    month,
    monthView: createMonthView(months, year, month)
  }
}

export {
  createViewContext
}
