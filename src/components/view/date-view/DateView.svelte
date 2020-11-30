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
  // import { createKeyboardHandler } from './keyboard.js'
  import { getContext, createEventDispatcher } from 'svelte'

  export let viewContextKey

  const { date, year, month } = getContext(viewContextKey)
  const { months, shouldShakeDate } = getContext(contextKey)
  const dispatch = createEventDispatcher()

  // const keyboardHandler = createKeyboardHandler({
  //   incrementDayHighlighted,
  //   incrementMonth,
  //   registerSelection: () => registerSelection($highlighted),
  //   close: () => dispatch('close')
  // })

  // onMount(() => {
  //   document.addEventListener('keydown', keyboardHandler)
  //   return () => {
  //     document.removeEventListener('keydown', keyboardHandler)
  //   }
  // })

  $: visibleMonthsId = $year + $month / 100

  function registerSelection (chosen) {
    if (!checkIfVisibleDateIsSelectable(months, chosen)) {
      return shakeDate(shouldShakeDate, chosen)
    }

    date.set(chosen)
    dispatch('date-chosen')
    return true
  }
</script>