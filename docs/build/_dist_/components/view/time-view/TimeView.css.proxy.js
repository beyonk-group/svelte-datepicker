// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".time-container.svelte-rhdfo1.svelte-rhdfo1{padding:10px;display:flex;flex:1 0 auto;flex-direction:column;justify-content:space-evenly;align-items:center;background-color:white;transition:background 0.15s ease}@media(min-height: 600px){.time-container.svelte-rhdfo1.svelte-rhdfo1{min-height:300px}}.chosen-date.svelte-rhdfo1.svelte-rhdfo1{margin:6px 0 12px 0;color:var(--button-text-color);font-weight:600;font-size:20px}.time-container.is-night.svelte-rhdfo1 .chosen-date.svelte-rhdfo1{color:var(--night-mode-text-color)}.time-container.is-night.svelte-rhdfo1.svelte-rhdfo1{background-color:var(--night-mode-background-color)}.cta.svelte-rhdfo1.svelte-rhdfo1{display:flex;margin:24px 0;height:40px;width:100%;justify-content:center}.button.svelte-rhdfo1.svelte-rhdfo1{font-size:16px;border:0;width:60%;border-radius:5px;font-weight:600;color:var(--time-confirm-button-text-color);background-color:var(--time-confirm-button-color)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}