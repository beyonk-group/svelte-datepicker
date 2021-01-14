<div>
  <NavBar {viewContextKey} />
  <Month
    {viewContextKey}
    id={visibleMonthsId}
    on:chosen={e => registerSelection(e.detail.date)} />
</div>

<style>
  div {
    padding: 10px;
  }
</style>

<script>
  import Month from './Month.svelte'
  import NavBar from './NavBar.svelte'
  import { checkIfVisibleDateIsSelectable, shakeDate } from './feedback.js'
  import { contextKey } from '../../lib/context.js'
  import { getContext } from 'svelte'

  export let viewContextKey

  const { date, displayedDate, isStart } = getContext(viewContextKey)
  const { months, shouldShakeDate, config, selectedStartDate, selectedEndDate } = getContext(contextKey)

  $: visibleMonthsId = $displayedDate.unix()

  function violatesRange (chosen) {
    if (!config.isRangePicker) { return false }
    const startsAfterEnd = isStart && chosen.isAfter($selectedEndDate)
    const endsBeforeStart = !isStart && chosen.isBefore($selectedStartDate)

    return startsAfterEnd || endsBeforeStart
  }

  function registerSelection (chosen) {
    if (!checkIfVisibleDateIsSelectable(months, chosen) || violatesRange(chosen)) {
      return shakeDate(shouldShakeDate, chosen)
    }

    date.set(chosen)
    return true
  }
</script>