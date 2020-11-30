import dayjs from 'dayjs/esm'
import { derived } from 'svelte/store'

function createFormatter (selectedStartDate, selectedEndDate, config) {
  const formatter = derived([ selectedStartDate, selectedEndDate ], ([ $selectedStartDate, $selectedEndDate ]) => {
    const formattedSelected = $selectedStartDate && dayjs($selectedStartDate).format(config.format)
    const formattedSelectedEnd = config.isRangePicker && $selectedEndDate && dayjs($selectedEndDate).format(config.format)

    return {
      formattedSelected,
      formattedSelectedEnd,
      formattedCombined: config.isRangePicker ? `${formattedSelected} - ${formattedSelectedEnd}` : formattedSelected
    }
  })

  return { formatter }
}

export {
  createFormatter
}
