<div class="calendar" class:is-range-picker={config.isRangePicker} class:day={$isDaytime} class:night={!$isDaytime}>
  <svelte:component
    {viewContextKey}
    this={component}
    on:date-chosen
    on:time-chosen
  />
</div>

<script>
  import { contextKey } from '../lib/context'
  import { getContext, onMount, createEventDispatcher } from 'svelte'
  import DateView from './date-view/DateView.svelte'
  import TimeView from './time-view/TimeView.svelte'

  export let viewContextKey

  const dispatch = createEventDispatcher()

  const { config, choices } = getContext(contextKey)
  const { isDaytime } = getContext(viewContextKey)

  let component = DateView

  onMount(() => {
    return choices.subscribe(({ allDatesChosen, allTimesChosen }) => {
      if (!allDatesChosen) {
        component = DateView
      } else if (allDatesChosen && !allTimesChosen) {
        component = TimeView
      } else if (allDatesChosen && allTimesChosen) {
        dispatch('close')
      }
    })
  })
</script>

<style>
  .calendar {
    box-sizing: border-box;
    position: relative;
    user-select: none;
    width: 100%;
    padding-top: 0;
  }
  
  @media (min-width: 600px) {
    .calendar {
      height: auto;
      max-width: 100%;
      width: 100%;
      display: inline-block;
    }

    .calendar.is-range-picker {
      width: 50%;
    }
  }
</style>