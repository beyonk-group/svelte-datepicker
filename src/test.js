import { polyfill } from 'es6-object-assign'
import App from './App.svelte'
polyfill()

const app = new App({
  target: document.body,
  data: {}
})

export default app
