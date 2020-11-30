// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "#logo.svelte-l439vz svg.svelte-l439vz{height:42px;stroke:white;fill:white}nav.svelte-l439vz.svelte-l439vz:not(.side-nav){display:flex;margin:12px 0}nav.svelte-l439vz:not(.side-nav) a.svelte-l439vz{border:1px solid grey;padding:12px;margin:6px}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}