import { dayjs } from './date-utils'

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

export {
  sanitizeInitialValue
}
