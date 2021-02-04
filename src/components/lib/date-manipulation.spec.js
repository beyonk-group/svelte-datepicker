import { suite as Suite } from 'uvu'
import assert from 'uvu/assert'
import { dayjs } from './date-utils.js'
import MockDate from 'mockdate'
import { ensureFutureMonth } from './date-manipulation.js'

const month = Suite('ensureFutureMonth')

month.before(() => {
  MockDate.set('2020-04-20')
})

month.after(() => {
  MockDate.reset()
})

month('when same month', () => {
  const start = dayjs('2020-04-01')
  const end = dayjs('2020-04-30')
  const expected = end.add(1, 'month').month()
  assert.equal(
    ensureFutureMonth(start, end).month(),
    expected
  )
})

month('when future month', () => {
  const start = dayjs('2020-04-30')
  const end = dayjs('2020-05-01')
  const expected = end.month()
  assert.equal(
    ensureFutureMonth(start, end).month(),
    expected
  )
})

month('when previous month', () => {
  const start = dayjs('2020-06-01')
  const end = dayjs('2020-05-31')
  const expected = end.month()
  assert.equal(
    ensureFutureMonth(start, end).month(),
    expected
  )
})

month.run()
