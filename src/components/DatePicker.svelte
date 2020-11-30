<script>
  import Popover from './Popover.svelte'
  import { contextKey, setup } from './lib/context'
  import { createEventDispatcher, setContext, getContext, onDestroy } from 'svelte'
  import { CalendarStyle } from '../calendar-style.js'
  import { createViewContext } from './view-context.js'
  import View from './view/View.svelte'

  export let range = false
  export let placeholder = 'Choose Date'
  export let format = 'DD / MM / YYYY'
  export let start = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate())
  export let end = new Date(start.getFullYear() + 1, start.getMonth(), start.getDate())
  export let dateChosen = false
  export let trigger = null
  export let selectableCallback = null
  export let weekStart = 0
  export let styling = new CalendarStyle()
  export let selected = range ? [ new Date(), new Date() ] : [ new Date() ]
  export let closeOnFocusLoss = true
  export let time = false
  export let morning = 7
  export let night = 19

  const dispatch = createEventDispatcher()

  const startContextKey = {}
  const endContextKey = {}

  const config = {
    start,
    end,
    isRangePicker: range,
    isTimePicker: time,
    closeOnFocusLoss,
    format,
    morning,
    night,
    selectableCallback,
    weekStart
  }

  setContext(contextKey, setup(selected, config))
  const {
    selectedStartDate,
    selectedEndDate,
    isOpen,
    isClosing,
    highlighted,
    formatter,
    choices,
    months,
    pickStartDate,
    pickEndDate, 
    pickStartTime,
    pickEndTime,
    destroy
  } = getContext(contextKey)

  setContext(startContextKey, createViewContext(true, selectedStartDate, months, config))
  setContext(endContextKey, createViewContext(false, selectedEndDate, months, config))

  $: dateChosen = $choices.isDateChosen

  let popover

  function registerClose () {
    dispatch('close')
  }

  function initialisePicker () {
    highlighted.set(new Date($selectedStartDate))
    dispatch('open')
  }

  onDestroy(destroy)
</script>

<style>
  .datepicker {
    display: inline-block;
    text-align: center;
    overflow: visible;
  }

  .calendar-button {
    padding: 10px 20px;
    border: 1px solid var(--button-border-color);
    display: block;
    text-align: center;
    width: 300px;
    text-decoration: none;
    cursor: pointer;
    background: var(--button-background-color);
    color: var(--button-text-color);
    border-radius: 7px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  .contents {
    display: flex;
    flex-direction: column;
    width: 320px;
  }

  @media (min-width: 600px) {
    .contents {
      flex-direction: row;
    }

    .contents.is-range-picker {
      width: 680px;
    }
  }
</style>

<div
  class="datepicker"
  class:open={$isOpen}
  class:closing={$isClosing}
  style={styling.toWrapperStyle()}>
  <Popover
    {trigger}
    bind:this={popover}
    on:opened={initialisePicker}
    on:closed={registerClose}>
    <div slot="trigger">
      <slot formatted={$formatter}>
        {#if !trigger}
          <button class="calendar-button" type="button">
            {#if $choices.isDateChosen}
              {$formatter.formattedCombined}
            {:else}
              {placeholder}
            {/if}
          </button>
        {/if}
      </slot>
    </div>
    <div class="contents" slot="contents" class:is-range-picker={config.isRangePicker}>
      <View
        viewContextKey={startContextKey}
        on:date-chosen={() => pickStartDate()}
        on:time-chosen={() => pickStartTime()}
        on:close={() => popover.close()}
      />
      {#if config.isRangePicker}
      <View
        viewContextKey={endContextKey}
        on:date-chosen={() => pickEndDate()}
        on:time-chosen={() => pickEndTime()}
        on:close={() => popover.close()}
      />
      {/if}
    </div>
  </Popover>
</div>
