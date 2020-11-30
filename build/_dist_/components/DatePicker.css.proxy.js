// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".datepicker.svelte-gg6y73{display:inline-block;text-align:center;overflow:visible}.calendar-button.svelte-gg6y73{padding:10px 20px;border:1px solid var(--button-border-color);display:block;text-align:center;width:300px;text-decoration:none;cursor:pointer;background:var(--button-background-color);color:var(--button-text-color);border-radius:7px;box-shadow:0px 0px 3px rgba(0, 0, 0, 0.1)}.svelte-gg6y73,.svelte-gg6y73:before,.svelte-gg6y73:after{box-sizing:inherit}.contents.svelte-gg6y73{display:flex;flex-direction:column;width:320px}@media(min-width: 600px){.contents.svelte-gg6y73{flex-direction:row}.contents.is-range-picker.svelte-gg6y73{width:680px}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}