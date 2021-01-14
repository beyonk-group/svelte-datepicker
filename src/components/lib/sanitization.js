import { dayjs } from './date-utils'

function moveDateWithinAllowedRange (date, config, isStart) {
  const isOutsideRange = (
    date.valueOf() < config.start.valueOf() ||
    date.valueOf() > config.end.valueOf()
  )

  if (isOutsideRange) {
    console.warn('Provided date', date.format(), 'is outside specified start-and-end range', config.start.format(), 'to', config.end.format())
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
    chosen = isDateChosen ? value.map(dayjs) : [ dayjs(), dayjs().add(1, 'month') ]
  } else {
    isDateChosen = Boolean(value).valueOf()
    chosen = [ isDateChosen ? dayjs(value) : dayjs() ]
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
