import { polyfill } from '../web_modules/es6-object-assign.js'
import App from './App.js'
polyfill()

const app = new App({
  target: document.body,
  data: {}
})

export default app
