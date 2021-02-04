import { suite as Suite } from 'uvu'
import assert from 'uvu/assert'
import { dayjs } from './date-utils.js'
import MockDate from 'mockdate'
import { buildDaySelectionValidator } from './day-selection-validator.js'

const validator = Suite('buildDaySelectionValidator/no-selectable-callback')

const start = dayjs('2020-07-20')
const end = dayjs('2020-07-24')

validator.before(() => {
  MockDate.set('2020-04-20')
  validator.ctx = {
    fn: buildDaySelectionValidator(start, end)
  }
})

validator.after(() => {
  MockDate.reset()
})

validator('returns a function', () => {
  assert.type(validator.ctx.fn, 'function')
})

validator('with today', () => {
  const given = dayjs('2020-04-20')
  assert.equal(
    validator.ctx.fn(given),
    {
      isInRange: false,
      selectable: false,
      isToday: true
    }
  )
})

validator('later today', () => {
  const given = dayjs().endOf('day')
  assert.equal(
    validator.ctx.fn(given),
    {
      isInRange: false,
      selectable: false,
      isToday: true
    }
  )
})

validator('with date before start', () => {
  assert.equal(
    validator.ctx.fn(start.subtract(1, 'day')),
    {
      isInRange: false,
      selectable: false,
      isToday: false
    }
  )
})

validator('with first day of range', () => {
  assert.equal(
    validator.ctx.fn(start),
    {
      isInRange: true,
      selectable: true,
      isToday: false
    }
  )
})

validator('with last day of range', () => {
  assert.equal(
    validator.ctx.fn(end),
    {
      isInRange: true,
      selectable: true,
      isToday: false
    }
  )
})

validator('with date after end', () => {
  assert.equal(
    validator.ctx.fn(end.add(1, 'day')),
    {
      isInRange: false,
      selectable: false,
      isToday: false
    }
  )
})

validator.run()
