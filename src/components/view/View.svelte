<div class="calendar" class:is-range-picker={config.isRangePicker} class:day={$isDaytime} class:night={!$isDaytime}>
  <svelte:component
    {viewContextKey}
    this={$component === 'date-view' ? DateView : TimeView}
    on:chosen
  />
</div>

<script>
  import { contextKey } from '../lib/context'
  import { getContext } from 'svelte'
  import DateView from './date-view/DateView.svelte'
  import TimeView from './time-view/TimeView.svelte'

  export let viewContextKey

  const { config, component } = getContext(contextKey)
  const { isDaytime } = getContext(viewContextKey)
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