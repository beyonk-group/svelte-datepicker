// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".chevron.svelte-twxu81{margin-left:-16px}.chevron.svelte-twxu81::before{margin:8px;border-style:solid;border-width:0.4em 0.4em 0 0;content:'';display:inline-block;height:0.75em;left:0.15em;position:relative;top:0.15em;transform:rotate(-45deg);vertical-align:top;width:0.75em}.chevron.bottom.svelte-twxu81:before{top:0;transform:rotate(135deg)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}