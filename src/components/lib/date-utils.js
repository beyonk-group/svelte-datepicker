import dayjs from 'dayjs/esm'
import localeData from 'dayjs/plugin/localeData'
import minMax from 'dayjs/plugin/minMax'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(localeData)
dayjs.extend(minMax)
dayjs.extend(isSameOrBefore)

export {
  dayjs
}
