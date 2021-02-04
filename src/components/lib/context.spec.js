import { suite as Suite } from 'uvu'
import assert from 'uvu/assert'
import { setup } from './context.js'
import { dayjs } from './date-utils.js'
import MockDate from 'mockdate'
import { get } from 'svelte/store'

const suite = Suite('setup/range-picker')

const config = {
	start: dayjs().subtract(1, 'year'),
	end: dayjs().add(1, 'year'),
	isRangePicker: true
}
let output

suite.before(() => {
	MockDate.set('2020-04-20')
})

suite.after(() => {
	MockDate.reset()
})

suite.before.each(() => {
	output = setup(undefined, config)
})

suite('has correct start date', () => {
	const selectedStartDate = get(output.selectedStartDate)
	assert.equal(selectedStartDate.toDate(), dayjs('2020-04-20').toDate())
})

suite('has correct end date', () => {
	const selectedEndDate = get(output.selectedEndDate)
	assert.equal(selectedEndDate.toDate(), dayjs('2020-05-20').toDate())
})

suite('has two years worth of months plus one extra', () => {
	assert.equal(output.months.length, 25)
})

suite('has correct view component', () => {
	const component = get(output.component)
	assert.equal(component, 'date-view')
})

suite('has today', () => {
	assert.equal(output.today, dayjs().startOf('day'))
})

suite('has correct left date', () => {
	const leftCalendarDate = get(output.leftCalendarDate)
	assert.equal(leftCalendarDate.toDate(), dayjs('2020-04-20').toDate())
})

suite('has correct right date', () => {
	const rightCalendarDate = get(output.rightCalendarDate)
	assert.equal(rightCalendarDate.toDate(), dayjs('2020-05-20').toDate())
})

suite('has passed configuration', () => {
	assert.equal(output.config, config)
})

suite('has correct open state', () => {
	const state = get(output.isOpen)
	assert.not(state)
})

suite('has correct closing state', () => {
	const state = get(output.isClosing)
	assert.not(state)
})

suite('has correct highlighted day', () => {
	const highlightedDay = get(output.highlighted)
	assert.equal(highlightedDay.toDate(), dayjs().toDate())
})

suite('does not have a chosen date', () => {
	const isDateChosen = get(output.isDateChosen)
	assert.not(isDateChosen)
})

suite('has correct user state', () => {
	const isSelectingFirstDate = get(output.isSelectingFirstDate)
	assert.ok(isSelectingFirstDate)
})

suite('has reset function', () => {
	assert.type(output.resetView, 'function')
})

suite.run()
