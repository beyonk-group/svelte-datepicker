<script>
  import { onMount, createEventDispatcher, getContext } from 'svelte'
  import { contextKey } from './lib/context.js'
  import { getCoords } from './lib/positioning.js'
  import { once } from './lib/event-handling.js'

  const { isOpen, isClosing, config, resetView } = getContext(contextKey)
  const dispatch = createEventDispatcher()
  const debounce = (cb, delay) => {
    let debouncing
    return (...args) => {
      clearTimeout(debouncing)
      debouncing = setTimeout(() => cb(...args), delay)
    }
  }

  let popover
  let triggerContainer
  let contentsAnimated
  let calendar
  let top = 0
  let left = 0

  export let trigger

  export function close () {
    isClosing.set(true)
    once(contentsAnimated, 'animationend', () => {
      isClosing.set(false)
      isOpen.set(false)
      dispatch('closed')
    })
  }

  export function recentre () {
    calendar.scrollIntoView()
  }

  function checkForFocusLoss (evt) {
    if (!$isOpen) return
    let el = evt.target
    do {
      if (el === popover) {
        return
      }
      el = el.parentNode
    } while (el)
    close()
  }

  onMount(() => {
    config.closeOnFocusLoss && document.addEventListener('click', checkForFocusLoss)
    if (!trigger) { return }
    triggerContainer.appendChild(trigger.parentNode.removeChild(trigger))

    return () => {
      config.closeOnFocusLoss && document.removeEventListener('click', checkForFocusLoss)
    }
  })

  const doOpen = async () => {
    if (!$isOpen) { isOpen.set(true) }

    const distance = await getCoords({ win: window, calendar, trigger: triggerContainer })

    top = distance.top
    left = distance.left

    isOpen.set(true)
    resetView()

    dispatch('opened')
  }

  const resize = debounce(async () => {
    const distance = await getCoords({ win: window, calendar, trigger: triggerContainer })
    top = distance.top
    left = distance.left
  }, 200)
</script>

<svelte:window on:resize={resize} />
<div class="sc-popover" bind:this={popover}>
  <div class="trigger" on:click={doOpen} bind:this={triggerContainer}>
    <slot name="trigger">
    </slot>
  </div>
  <div 
    class="contents-wrapper" 
    class:visible={$isOpen}
    class:shrink={$isClosing}
    style="top: {top}px; left: {left}px;"
    bind:this={calendar}>
    <div class="wrapper" bind:this={contentsAnimated}>
      <div class="contents-inner">
        <slot name="contents"></slot>
      </div>
    </div>
  </div>
</div>

<style>
  .sc-popover { 
    position: relative;
  }

  .contents-wrapper {
    position: fixed;
    transition: none;
    z-index: 2;
    display: none;
  }

  .wrapper { 
    background: #fff;
    box-shadow: 0 10px 26px rgba(0,0,0,0.4) ;
    opacity: .8; 
    padding-top: 0;
    display: none;
    animation: grow 200ms forwards cubic-bezier(.92,.09,.18,1.05);
  }

  .contents-inner { 
    animation: fadeIn 400ms forwards;
  }

  .contents-wrapper.visible { 
    display: block;
  }

  .contents-wrapper.visible .wrapper { 
    opacity: 1; 
    transform: scale(1);
    display: block;
  }

  .contents-wrapper.shrink .wrapper { 
    animation: shrink 150ms forwards cubic-bezier(.92,.09,.18,1.05);
  }

  @keyframes grow { 
    0% { 
      transform: scale(.9,.1); 
      opacity: 0; 
    }
    30% { 
      opacity: 1; 
    }
    100% { 
      transform: scale(1);
    }
  }

  @keyframes shrink { 
    0% { 
      transform: scale(1); 
      opacity: 1; 
    }
    70% { 
      opacity: 1; 
    }
    100% { 
      opacity: 0; 
      transform: scale(.9,.1);
    }
  }

  @keyframes fadeIn { 
    0% { 
      opacity: 0; 
    }
    50% { 
      opacity: 0;
    }
    100% { 
      opacity: 1; 
    }
  }
</style>
