<div class="toolbar">
  <button type="button" class="button" on:click|preventDefault={progress}>
    Continue
  </button>
</div>

<script>
  import { getContext, createEventDispatcher } from 'svelte'
  import DateView from './view/date-view/DateView.svelte'
  import TimeView from './view/time-view/TimeView.svelte'
  import { contextKey } from './lib/context.js'
  
  const dispatch = createEventDispatcher()

  const { config, component, selectedStartDate, selectedEndDate, isDateChosen } = getContext(contextKey)

  function finalise () {
    isDateChosen.set(true)
    if (config.isRangePicker) {
      dispatch('range-chosen', {
        from: $selectedStartDate,
        to: $selectedEndDate
      })
    } else {
      dispatch('date-chosen', {
        date: $selectedStartDate
      })
    }
    dispatch('close')
  }

  function progress () {
    isDateChosen.set(false)
    if ($component === DateView) {
      if (config.isTimePicker) {
        component.set(TimeView)
      } else {
        finalise()
      }
    } else if ($component === TimeView) {
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