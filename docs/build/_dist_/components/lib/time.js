import { internationalize } from '../../../web_modules/timeUtils.js'

export const weekStart = 0
export const daysOfWeek = [
  [ 'Sunday', 'Sun' ],
  [ 'Monday', 'Mon' ],
  [ 'Tuesday', 'Tue' ],
  [ 'Wednesday', 'Wed' ],
  [ 'Thursday', 'Thu' ],
  [ 'Friday', 'Fri' ],
  [ 'Saturday', 'Sat' ]
]
export const monthsOfYear = [
  [ 'January', 'Jan' ],
  [ 'February', 'Feb' ],
  [ 'March', 'Mar' ],
  [ 'April', 'Apr' ],
  [ 'May', 'May' ],
  [ 'June', 'Jun' ],
  [ 'July', 'Jul' ],
  [ 'August', 'Aug' ],
  [ 'September', 'Sep' ],
  [ 'October', 'Oct' ],
  [ 'November', 'Nov' ],
  [ 'December', 'Dec' ]
]

internationalize({ daysOfWeek, monthsOfYear })
export const sortedDaysOfWeek = weekStart === 0 ? daysOfWeek : (() => {
  const dow = daysOfWeek.slice()
  dow.push(dow.shift())
  return dow
})()
