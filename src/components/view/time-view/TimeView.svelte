<script>
  import dayjs from 'dayjs/esm'
  import { contextKey } from '../../lib/context.js'
  import TimeInput from './TimeInput.svelte'
  import { getContext, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let viewContextKey
  const { date, isStart, isDaytime } = getContext(viewContextKey)
  const { config } = getContext(contextKey)
</script>

<div class="time-container" class:is-night={!$isDaytime}>
  <span class="chosen-date">{dayjs($date).format(config.format)}</span>
  <TimeInput {viewContextKey} />
  <div class="cta">
    {#if !(config.isRangePicker && isStart)}
    <button class="button" on:click={() => dispatch('time-chosen')}>confirm</button>
    {/if}
  </div>
</div>

<style>
  .time-container {
    padding: 10px;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: white;
    transition: background 0.15s ease;
  }

  @media (min-height: 600px) {
    .time-container {
      min-height: 300px;
    }
  }

  .chosen-date {
    margin: 6px 0 12px 0;
    color: var(--button-text-color);
    font-weight: 600;
    font-size: 20px;
  }

  .time-container.is-night .chosen-date {
    color: var(--night-mode-text-color);
  }

  .time-container.is-night {
    background-color: var(--night-mode-background-color);
  }

  .cta {
    display: flex;
    margin: 24px 0;
    height: 40px;
    width: 100%;
    justify-content: center;
  }

  .button {
    font-size: 16px;
    border: 0;
    width: 60%;
    border-radius: 5px;
    font-weight: 600;
    color: var(--time-confirm-button-text-color);
    background-color: var(--time-confirm-button-color);
  }
</style>