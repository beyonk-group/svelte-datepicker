import { suite as Suite } from 'uvu'
import assert from 'uvu/assert'
import { getCalendarPage } from './calendar-page.js'
import { dayjs } from './date-utils.js'
import MockDate from 'mockdate'

const suite = Suite('calendar-page/getCalendarPage')

suite.before(() => {
  MockDate.set('2020-04-20')
  const date = dayjs()
  suite.ctx = {
    date,
    page: getCalendarPage(date, () => ({
      isInRange: true,
      isSelected: true,
      isToday: true
    }))
  }
})

suite.after(() => {
  MockDate.reset()
})

suite('returns calendar page month', () => {
  assert.equal(
    suite.ctx.page.month,
    suite.ctx.date.month()
  )
})

suite('returns calendar page year', () => {
  assert.equal(
    suite.ctx.page.year,
    suite.ctx.date.year()
  )
})

suite('returns calendar page weeks', () => {
  assert.equal(
    suite.ctx.page.weeks.length,
    5
  )
})

suite.run()
