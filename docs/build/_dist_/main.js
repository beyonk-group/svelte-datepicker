import { polyfill } from '../web_modules/es6-object-assign.js'

import { CalendarStyle } from './calendar-style.js'
import SvelteCalendar from './components/DatePicker.js'
polyfill()

export {
  CalendarStyle,
  SvelteCalendar
}
