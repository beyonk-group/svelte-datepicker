<script>
  import { dayjs } from '../../lib/date-utils.js'
  import { contextKey } from '../../lib/context.js'
  import TimeInput from './TimeInput.svelte'
  import { getContext } from 'svelte'

  export let viewContextKey
  const { date, isDaytime } = getContext(viewContextKey)
  const { config } = getContext(contextKey)
</script>

<div class="time-container" class:is-night={!$isDaytime}>
  <span class="chosen-date">{dayjs($date).format(config.format)}</span>
  <TimeInput {viewContextKey} />
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
</style>