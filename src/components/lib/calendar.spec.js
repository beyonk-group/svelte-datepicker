import { suite as Suite } from 'uvu'
import assert from 'uvu/assert'
import { getMonths } from './calendar.js'
import { dayjs } from './date-utils.js'
import MockDate from 'mockdate'
import { stub } from 'sinon'
import * as daySelectionValidator from './day-selection-validator.js'

const suite = Suite('calendar/getMonths')

suite.before(() => {
  MockDate.set('2020-04-20')
  stub(daySelectionValidator, 'buildDaySelectionValidator').returns(() => {})
})

suite.after(() => {
  MockDate.reset()
  daySelectionValidator.buildDaySelectionValidator.restore()
})

const config = {
  start: dayjs('2020-03-10'),
  end: dayjs('2020-06-25'),
  selectableCallback: () => {}
}

suite('has correct month count', () => {
  const months = getMonths(config)

  assert.equal(
    months.length,
    4
  )
})

suite('calls day selection validator with correct arguments', () => {
  getMonths(config)

  assert.equal(
    daySelectionValidator.buildDaySelectionValidator.firstCall.args,
    [ config.start, config.end, config.selectableCallback ]
  )
})

suite.run()
