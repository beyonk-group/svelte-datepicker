import dayjs from 'dayjs/esm'
import localeData from 'dayjs/plugin/localeData'
import minMax from 'dayjs/plugin/minMax'

dayjs.extend(localeData)
dayjs.extend(minMax)

export {
  dayjs
}
