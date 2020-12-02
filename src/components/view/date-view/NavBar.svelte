<script>
  import { getContext } from 'svelte'
  import { contextKey } from '../../lib/context'
  import { dayjs } from '../../lib/date-utils.js'

  export let viewContextKey

  const { months, config, highlighted } = getContext(contextKey)
  const { year, month, monthView } = getContext(viewContextKey)

  let monthSelectorOpen = false
  let availableMonths

  $: {
    const isOnLowerBoundary = config.start.getFullYear() === $year
    const isOnUpperBoundary = config.end.getFullYear() === $year
    availableMonths = dayjs.months().map((m, i) => {
      return Object.assign({}, {
        name: m,
        abbrev: dayjs.monthsShort()[i]
      }, {
        selectable:
          (!isOnLowerBoundary && !isOnUpperBoundary) ||
        (
          (!isOnLowerBoundary || i >= config.start.getMonth()) &&
          (!isOnUpperBoundary || i <= config.end.getMonth())
        )
      })
    })
  }

  $: canIncrementMonth = $monthView.monthIndex < months.length - 1
  $: canDecrementMonth = $monthView.monthIndex > 0

  function changeMonth (selectedMonth) {
    month.set(selectedMonth)
    highlighted.set(new Date($year, $month, 1))
  }

  function incrementMonth (direction, day = 1) {
    if (direction === 1 && !canIncrementMonth) return
    if (direction === -1 && !canDecrementMonth) return
    const current = new Date($year, $month, 1)
    current.setMonth(current.getMonth() + direction)
    month.set(current.getMonth())
    year.set(current.getFullYear())
    highlighted.set(new Date($year, $month, day))
  }

  function toggleMonthSelectorOpen () {
    monthSelectorOpen = !monthSelectorOpen
  }

  function monthSelected (event, { monthDefinition, index }) {
    event.stopPropagation()
    if (!monthDefinition.selectable) return
    changeMonth(index)
    toggleMonthSelectorOpen()
  }
</script>

<div class="title">
  <div class="heading-section">
    <div class="control" 
      class:enabled={canDecrementMonth}
      on:click={() => incrementMonth(-1)}>
      <i class="arrow left"></i>
    </div>
    <div class="label" on:click={toggleMonthSelectorOpen}>
      <span>{dayjs.months()[$month]} {$year}</span>
    </div> 
    <div class="control"
      class:enabled={canIncrementMonth}
      on:click={() => incrementMonth(1)}>
      <i class="arrow right"></i>
    </div>
  </div>
  <div class="month-selector" class:open={monthSelectorOpen}>
      {#each availableMonths as monthDefinition, index}
        <div 
          class="month-selector--month" 
          class:selected={index === $month}
          class:selectable={monthDefinition.selectable}
          on:click={e => monthSelected(e, index)}
        >
          <span>{monthDefinition.abbrev}</span>
        </div>
      {/each}
  </div>
</div>

<style>
  .heading-section { 
    font-size: 16px;
    padding: 6px 15px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: #3d4548;
    font-weight: bold;
  }

  @media (min-width: 600px) {
    .heading-section {
      padding: 24px 15px;
    }
  }

  .label,
  .title { 
    cursor: pointer;
    display: flex;
  }
  .month-selector { 
    position: absolute;
    top: 75px; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    background-color: #fff;
    transition: all 300ms; 
    transform: scale(1.2); 
    opacity: 0; 
    visibility: hidden;
    z-index: 2;
    text-align: center;
  }
  .month-selector.open { 
    transform: scale(1); 
    visibility: visible;
    opacity: 1;
  }
  .month-selector--month { 
    width: 31.333%; 
    margin: .5%; 
    height: 21.5%;
    display: inline-block;
    color: #4a4a4a;
    border: 1px solid #efefef;
    opacity: 0.2;
  }
  .month-selector--month.selectable { 
    opacity: 1; 
  }
  .month-selector--month.selectable:hover { 
    cursor: pointer;
    box-shadow: 0px 0px 3px rgba(0,0,0,0.15);
  }
  .month-selector--month.selected { 
    background: var(--highlight-color);
    color: #fff;
  }
  .month-selector--month:before { 
    content: ' ';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  .month-selector--month span { 
    vertical-align: middle; 
    display: inline-block;
  }
  .control { 
    padding: 0 3px;
    opacity: 0.2;
    transform: translateY(3px);
  }

  .control.enabled { 
    opacity: 1; 
    cursor: pointer;
  }

  .arrow {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-style: solid;
    border-color: #a9a9a9;
    border-width: 0;
    border-bottom-width: 2px;
    border-right-width: 2px;
  }

  .arrow.right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .arrow.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  @media (min-width: 600px) {
    .arrow {
      width: 18px;
      height: 18px;
    }
    .control {
      padding: 0 8px;
    }
    .heading-section { 
      font-size: 20px;
    }
    .label {
      margin-left: 5%;
    }
  }
</style>
