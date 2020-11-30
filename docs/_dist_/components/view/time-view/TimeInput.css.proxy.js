// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".time-picker.svelte-1a3xaoi.svelte-1a3xaoi{display:flex;flex-direction:column;color:var(--highlight-color);width:60%}.time-picker.is-night.svelte-1a3xaoi.svelte-1a3xaoi{color:var(--night-mode-text-color)}.time-picker.is-night.svelte-1a3xaoi input.svelte-1a3xaoi{color:var(--night-mode-text-color)}input.svelte-1a3xaoi.svelte-1a3xaoi{background-color:transparent;display:flex;border-width:0 0 1px 0;border-color:inherit;font-family:inherit;font-size:42px;line-height:42px;text-align:center;letter-spacing:16px;color:var(--button-text-color)}.controls.svelte-1a3xaoi.svelte-1a3xaoi{display:flex;justify-content:space-around;color:var(--highlight-color)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}