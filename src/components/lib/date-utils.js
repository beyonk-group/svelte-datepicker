import dayjs from 'dayjs/esm'
import localeData from 'dayjs/esm/plugin/localeData'
import minMax from 'dayjs/esm/plugin/minMax'
import isSameOrBefore from 'dayjs/esm/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/esm/plugin/isSameOrAfter'

dayjs.extend(localeData)
dayjs.extend(minMax)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export {
  dayjs
}
