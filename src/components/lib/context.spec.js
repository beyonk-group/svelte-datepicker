import { suite as Suite } from 'uvu'
import assert from 'uvu/assert'
import { setup } from './context.js'
import { dayjs } from './date-utils.js'
import MockDate from 'mockdate'
import { get } from 'svelte/store'

const defaults = Suite('setup/range-picker/defaults')

defaults.before(() => {
  MockDate.set('2020-04-20')
  defaults.ctx = {
    config: {
      start: dayjs().subtract(1, 'year'),
      end: dayjs().add(1, 'year'),
      isRangePicker: true
    }
  }
  defaults.ctx.output = setup(undefined, defaults.ctx.config)
})

defaults.after(() => {
  MockDate.reset()
})

defaults('has correct start date', () => {
  const selectedStartDate = get(defaults.ctx.output.selectedStartDate)
  assert.equal(selectedStartDate.toDate(), dayjs('2020-04-20').toDate())
})

defaults('has correct end date', () => {
  const selectedEndDate = get(defaults.ctx.output.selectedEndDate)
  assert.equal(selectedEndDate.toDate(), dayjs('2020-05-20').toDate())
})

defaults('has two years worth of months plus one extra', () => {
  assert.equal(defaults.ctx.output.months.length, 25)
})

defaults('has correct view component', () => {
  const component = get(defaults.ctx.output.component)
  assert.equal(component, 'date-view')
})

defaults('has today', () => {
  assert.equal(defaults.ctx.output.today, dayjs().startOf('day'))
})

defaults('has correct left date', () => {
  const leftCalendarDate = get(defaults.ctx.output.leftCalendarDate)
  assert.equal(leftCalendarDate.toDate(), dayjs('2020-04-20').toDate())
})

defaults('has correct right date', () => {
  const rightCalendarDate = get(defaults.ctx.output.rightCalendarDate)
  assert.equal(rightCalendarDate.toDate(), dayjs('2020-05-20').toDate())
})

defaults('has passed configuration', () => {
  assert.is(defaults.ctx.output.config, defaults.ctx.config)
})

defaults('has correct open state', () => {
  const state = get(defaults.ctx.output.isOpen)
  assert.not(state)
})

defaults('has correct closing state', () => {
  const state = get(defaults.ctx.output.isClosing)
  assert.not(state)
})

defaults('has correct highlighted day', () => {
  const highlightedDay = get(defaults.ctx.output.highlighted)
  assert.equal(highlightedDay.toDate(), dayjs().toDate())
})

defaults('does not have a chosen date', () => {
  const isDateChosen = get(defaults.ctx.output.isDateChosen)
  assert.not(isDateChosen)
})

defaults('has correct user state', () => {
  const isSelectingFirstDate = get(defaults.ctx.output.isSelectingFirstDate)
  assert.ok(isSelectingFirstDate)
})

defaults('has reset function', () => {
  assert.type(defaults.ctx.output.resetView, 'function')
})

defaults.run()

const sameMonth = Suite('setup/date-range/selected-dates/same-month')

sameMonth.before(() => {
  MockDate.set('2020-04-20')
  sameMonth.ctx = {
    config: {
      start: dayjs().subtract(1, 'year'),
      end: dayjs().add(1, 'year'),
      selected: [
        dayjs('2020-04-25'),
        dayjs('2020-04-27')
      ],
      isRangePicker: true
    }
  }
  sameMonth.ctx.output = setup(undefined, sameMonth.ctx.config)
})

sameMonth.after(() => {
  MockDate.reset()
})

sameMonth('correct left-hand month is displayed', () => {
  const date = get(sameMonth.ctx.output.leftCalendarDate)
  assert.equal(date.toDate(), dayjs('2020-04-01').toDate())
})

sameMonth('correct right-hand month is displayed', () => {
  const date = get(sameMonth.ctx.output.rightCalendarDate)
  assert.equal(date.toDate(), dayjs('2020-05-01').toDate())
})

sameMonth.run()

const withSelectedEndInsideRange = Suite('setup/date-range/default-dates/selected-inside-range')

withSelectedEndInsideRange.before(() => {
  MockDate.set('2021-02-04')
  withSelectedEndInsideRange.ctx = {
    config: {
      start: dayjs('2021-01-11'),
      end: dayjs('2021-04-18'),
      isRangePicker: true
    }
  }
  withSelectedEndInsideRange.ctx.output = setup(undefined, withSelectedEndInsideRange.ctx.config)
})

withSelectedEndInsideRange.after(() => {
  MockDate.reset()
})

withSelectedEndInsideRange('left-hand month is start of default selection', () => {
  const date = get(withSelectedEndInsideRange.ctx.output.leftCalendarDate)
  assert.equal(date.format('YYYY-MM-DD'), '2021-02-01')
})

withSelectedEndInsideRange('right hand month is next month', () => {
  const date = get(withSelectedEndInsideRange.ctx.output.rightCalendarDate)
  assert.equal(date.format('YYYY-MM-DD'), '2021-03-01')
})

withSelectedEndInsideRange.run()
