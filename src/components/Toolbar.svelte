<div class="toolbar">
  <button type="button" class="button" on:click|preventDefault={progress}>
    Continue
  </button>
</div>

<script>
  import { getContext, createEventDispatcher } from 'svelte'
  import { contextKey } from './lib/context.js'
  import { dayjs } from './lib/date-utils.js'
  
  const dispatch = createEventDispatcher()

  const { config, component, selectedStartDate, selectedEndDate, isDateChosen } = getContext(contextKey)

  function swapDatesIfRequired () {
    if (!config.isRangePicker) { return }
    const from = dayjs($selectedStartDate)
    const to = dayjs($selectedEndDate)
    if (to.isBefore(from)) {
      selectedStartDate.set(to.toDate())
      selectedEndDate.set(from.toDate())
    }
  }

  function finalise () {
    isDateChosen.set(true)
    dispatch('close')
  }

  function progress () {
    swapDatesIfRequired()
    isDateChosen.set(false)
    if ($component === 'date-view') {
      if (config.isTimePicker) {
        component.set('time-view')
      } else {
        finalise()
      }
    } else if ($component === 'time-view') {
      finalise()
    }
  }
</script>

<style>
  .toolbar {
    padding: 0;
    display: flex;
    flex: 1 0 auto;
    justify-content: flex-end;
  }

  .button {
    font-size: 16px;
    flex: 1 0 auto;
    padding: 12px 6px;
    border: 0;
    font-weight: 500;
    color: var(--time-confirm-button-text-color);
    background-color: var(--time-confirm-button-color);
  }

  @media (min-width: 600px) {
    .toolbar {
      border-top: 1px solid var(--toolbar-border-color);
      padding: 6px;
    }

    .button {
      flex: 0 0 auto;
      padding: 6px 12px;
      border-radius: 5px;
    }
  }
</style>