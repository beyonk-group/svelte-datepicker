<svelte:head>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
</svelte:head>

<Route path="/iframe-demo/*">
  <Route path="/">
    <div class="demo">
      <DatePicker
        range={true}
      >
        <div>Open Calendar</div>
      </DatePicker>
    </div>
  </Route>
</Route>
<Route path="/*">
  <header>
    <div class="container">
      <div class="row">
        <div class="col-lg-2 col-xs-12 left">
          <div id="logo">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 263.2 127" style="enable-background:new 0 0 263.2 127;" xml:space="preserve">
            <title>Beyonk-octothorpe</title>
            <g id="Layer_2_1_">
              <g id="Layer_1-2">
                <path class="st0" d="M263.2,28.5v-5.9h-22.5V0h-5.9v22.5H28.5V0h-5.9v22.5H0v5.9h22.5v70.1H0v5.9h22.5V127h5.9v-22.5h206.4V127
                  h5.9v-22.5h22.5v-5.9h-22.5V28.5H263.2z M234.8,98.5H28.5V28.5h206.4V98.5z M50.9,52.2h9.3c1.7-0.1,3.4,0.4,4.7,1.5
                  c1.1,1.1,1.7,2.7,1.6,4.3c0,1-0.2,2-0.6,2.8c-0.4,0.8-1.1,1.4-1.9,1.9c0.7,0.1,1.5,0.4,2.1,0.7c0.6,0.3,1,0.7,1.4,1.2
                  c0.4,0.5,0.6,1,0.8,1.6c0.2,0.6,0.2,1.3,0.2,1.9c0,1-0.2,1.9-0.6,2.8c-0.4,0.8-0.9,1.5-1.6,2.1c-0.7,0.6-1.5,1-2.4,1.2
                  c-1.1,0.3-2.1,0.4-3.2,0.4H51L50.9,52.2z M56.8,61.1h1.7c1.8,0,2.8-0.7,2.8-2.2s-0.9-2.2-2.8-2.2h-1.7V61.1z M56.8,70.2h1.9
                  c1.1,0.1,2.2-0.1,3.2-0.6c1-0.7,1.3-2.1,0.5-3.1c-0.1-0.2-0.3-0.4-0.5-0.5c-1-0.5-2.1-0.6-3.2-0.6h-1.9V70.2z M93,57.2h-9.9V61
                  h9.6v5h-9.6v3.9H93v5H77.2V52.2H93V57.2z M108.2,65.7l-8.2-13.5h7l4.2,7.3l4.2-7.3h7L114,65.7v9h-5.8V65.7z M126,63.5
                  c0-1.6,0.3-3.2,0.9-4.7c1.2-2.9,3.6-5.2,6.5-6.3c3.2-1.2,6.8-1.2,10.1,0c1.5,0.6,2.9,1.4,4,2.5c1.1,1.1,2,2.4,2.5,3.8
                  c1.2,3,1.2,6.4,0,9.4c-0.6,1.4-1.5,2.7-2.6,3.8c-1.1,1.1-2.5,2-4,2.5c-3.2,1.2-6.8,1.2-10.1,0c-1.5-0.6-2.8-1.4-3.9-2.5
                  c-1.1-1.1-2-2.4-2.6-3.8C126.3,66.7,126,65.1,126,63.5z M132.1,63.5c0,0.9,0.2,1.7,0.5,2.5c0.6,1.5,1.9,2.7,3.4,3.3
                  c2.4,1,5.1,0.4,6.9-1.3c0.6-0.6,1.1-1.2,1.4-2c0.7-1.6,0.7-3.4,0-5c-0.3-0.8-0.8-1.4-1.4-2c-1.9-1.7-4.5-2.2-6.9-1.3
                  c-1.5,0.6-2.7,1.8-3.4,3.4C132.3,61.8,132.1,62.6,132.1,63.5L132.1,63.5z M158.6,74.8V52.2h5.9L175.3,66V52.2h5.8v22.5h-5.8
                  L164.5,61v13.8H158.6z M196.7,61.5l7.1-9.3h7.2l-8.9,10.7l9.8,11.9h-7.6l-7.6-9.8v9.8h-5.9V52.2h5.9V61.5z"/>
              </g>
            </g>
            </svg>
          </div>
        </div>
        <div class="col-lg-8 col-md-7 col-xs-12">
          <div class="slogan">
            Svelte DatePicker Developer Documentation
          </div>
        </div>
        <div class="col-lg-2 col-md-3 col-xs-12 right">
          <a class="btn" href="http://www.github.com/beyonk-adventures/svelte-datepicker">Github</a>
        </div>
      </div>
    </div>
  </header>
  <section class="content">
    <div class="container">
      <div class="content-wrap">
        <div class="row">
          <aside>
            <div class="menu-box">
              <h4>Navigation</h4>	
              <nav class="side-nav">
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/date-picker">Date Picker</a></li>
                  <li><a href="/range-picker">Range Picker</a></li>
                </ul>					
              </nav>
            </div>
          </aside>
          <div class="content-info">
            <Route path="/">
              <h1>Svelte Date Range Picker</h1>
              <nav>
                <a href="/range-picker/with-time">With Time</a>
                <a href="/range-picker/without-time">Without Time</a>
              </nav>
            </Route>
            <Route path="/date-picker/*">
              <Route path="/*">
                <nav>
                  <a href="/date-picker/with-time">With Time</a>
                  <a href="/date-picker/without-time">Without Time</a>
                  <a href="/date-picker/without-time/with-date-restriction">With Date Restriction</a>
                  <a href="/date-picker/with-time/with-selected-date">With Selected Date</a>
                  <a href="/date-picker/with-time/with-minute-step">With Minute Step</a>
                  <a href="/date-picker/with-events">With Events</a>
                  <a href="/date-picker/with-custom-button">With Custom Button</a>
                </nav>
                <h1>Svelte Date Picker</h1>
              </Route>
              <Route path="/without-time/*">
                <h2>Without Time Choice</h2>
                <Route path="/*">
                  <Route path="/">
                    <div class="demo">
                      <DatePicker format='ddd, DD MMM YYYY' />
                    </div>
                  </Route>
                </Route>
                <Route path="/with-date-restriction/*">
                  <h2>With Date Restriction</h2>
                  <p>Restrict date from the start of the year until today</p>
                  <div class="demo">
                    <DatePicker
                      start={dayjs().startOf('year').toDate()}
                      end={dayjs().endOf('day').toDate()}
                    />
                  </div>
                </Route>
              </Route>
              <Route path="/with-time/*">
                <Route path="/*">
                  <h2>With Time Choice</h2>
                </Route>
                <Route path="/">
                  <div class="demo">
                    <DatePicker format='ddd, DD MMM YYYY HH:mm' time={true} />
                  </div>
                </Route>
                <Route path="/with-selected-date">
                  <h3>With Selected Date</h3>
                  <div class="demo">
                    <DatePicker
                    format='ddd, DD MMM YYYY HH:mm'
                    selected={dayjs('2020-04-20T16:15:33.000Z').toDate()}
                    time={true} />
                  </div>
                </Route>
                <Route path="/with-minute-step">
                  <h3>With Minute Step</h3>
                  <div class="demo">
                    <DatePicker
                    format='ddd, DD MMM YYYY HH:mm'
                    minuteStep={15}
                    time={true} />
                  </div>
                </Route>
              </Route>
              <Route path="/with-events">
                <h2>With Events</h2>
                <div class="demo">
                  <DatePicker
                    format='ddd, DD MMM YYYY'
                    bind:selected={firedEventsValue}
                    on:date-selected={e => {
                      firedEvents = [
                        ...firedEvents,
                        `Picked date ${e.detail.date} (${firedEventsValue})`
                      ]
                    }}
                    on:change={e => {
                      firedEvents = [
                        ...firedEvents,
                        'Change fired'
                      ]
                    }}
                  />
                </div>
                <ul>
                  {#each firedEvents as fired}
                  <li>{fired}</li>
                  {:else}
                  <li>Pick date to see events</li>
                  {/each}
                </ul>
              </Route>
              <Route path="/with-custom-button">
                <h3>With Custom Button</h3>
                <div class="demo">
                  <DatePicker
                    bind:selected={customSelected}>
                    <button class="custom-button">
                      {#if customSelected}
                        Beach Time! {dayjs(customSelected).fromNow()}
                      {:else}
                        Beach Time?
                      {/if}
                    </button>
                  </DatePicker>
                </div>
                <p>* Beach Time <a href="https://codepen.io/merkund">by merkund</a></p>
              </Route>
            </Route>
            <Route path="/range-picker/*">
              <Route path="/*">
                <nav>
                  <a href="/range-picker/with-time">With Time</a>
                  <a href="/range-picker/without-time">Without Time</a>
                  <a href="/range-picker/without-time/with-responsive-positioning">With Responsive Positioning</a>
                  <a href="/range-picker/without-time/with-responsive-positioning/inside-iframe">Responsive inside iframe</a>
                  <a href="/range-picker/without-time/with-date-restriction">With Date Restriction</a>
                  <a href="/range-picker/with-time/with-selected-dates">With Selected Dates</a>
                  <a href="/range-picker/with-time/with-events">With Events</a>
                </nav>
                <h1>Svelte Range Picker</h1>
              </Route>
              <Route path="/without-time/*">
                <h2>Without Time Choice</h2>
                <Route path="/">
                  <div class="demo">
                    <DatePicker format='ddd, DD MMM YYYY' range={true} />
                  </div>
                </Route>
                <Route path="/with-responsive-positioning/*">
                  <h2>With Responsive Positioning</h2>
                  <p>Scrolls calendar into view on small screens.</p>
                  <Route path="/">
                    <p>Button is down there to the right!</p>
                    <div class="demo">
                      <DatePicker
                        range={true}
                      >
                        <div class="offscreen-button off-top">Open Calendar</div>
                      </DatePicker>
                      <DatePicker
                        range={true}
                      >
                        <div class="offscreen-button off-bottom">Open Calendar</div>
                      </DatePicker>
                    </div>
                  </Route>
                </Route>
                <Route path="/with-responsive-positioning/inside-iframe/*">
                  <p>Oh no! Iframes!</p>
                  <Route path="/">
                    <div class="demo">
                      <iframe src="/iframe-demo" title="iframe-demo">
                      </iframe>
                    </div>
                  </Route>
                </Route>
                <Route path="/with-date-restriction/*">
                  <h2>With Date Restriction</h2>
                  <p>Restrict date from the start of the year until today</p>
                  <Route path="/">
                    <div class="demo">
                      <DatePicker
                        format='ddd, DD MMM YYYY'
                        range={true}
                        start={dayjs().startOf('year').toDate()}
                        end={dayjs().endOf('day').toDate()}
                      />
                    </div>
                  </Route>
                </Route>
              </Route>
              <Route path="/with-time/*">
                <Route path="/*">
                  <h2>With Time Choice</h2>
                </Route>
                <Route path="/">
                  <div class="demo">
                    <DatePicker format='ddd, DD MMM YYYY HH:mm' range={true} time={true} />
                  </div>
                </Route>
                <Route path="/with-selected-dates">
                  <h3>With Selected Dates</h3>
                  <div class="demo">
                    <DatePicker
                    format='ddd, DD MMM YYYY HH:mm'
                    selected={[ dayjs('2020-04-20T16:15:33.000Z').toDate(), dayjs('2020-05-20T05:23:12.000Z').toDate() ]}
                    range={true}
                    time={true} />
                  </div>
                </Route>
                <Route path="/with-events">
                  <h2>With Events</h2>
                  <div class="demo">
                    <DatePicker
                    format='ddd, DD MMM YYYY'
                    range={true}
                    time={true}
                    on:range-selected={e => {
                      firedEvents = [
                        ...firedEvents,
                        `Picked range ${e.detail.from} to ${e.detail.to}`
                      ]
                    }}
                    on:change={e => {
                      firedEvents = [
                        ...firedEvents,
                        'Change fired'
                      ]
                    }}
                  />
                  </div>
                  <ul>
                  {#each firedEvents as fired}
                  <li>{fired}</li>
                  {:else}
                  <li>Pick date to see events</li>
                  {/each}
                  </ul>
                </Route>
              </Route>
            </Route>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="footer-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 center">
          Powered by Beyonk Open Source
        </div>
      </div>
    </div>
  </div>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 center">
          
        </div>
      </div>
    </div>
  </footer>
</Route>

<script>
  import { Route } from 'tinro'
  import './normalize.css'
  import './prettify.css'
  import './style.css'
  import { DatePicker } from './main.js'
  import dayjs from 'dayjs/esm'
  import relativeTime from 'dayjs/plugin/relativeTime'

  dayjs.extend(relativeTime)

  let firedEvents = []
  let firedEventsValue = null
  let customSelected = null
</script>

<style>
  #logo svg {
    height: 42px;
    stroke: white;
    fill: white;
  }

  h1,
  h2,
  h3,
  h4 {
    display: inline;
    font-size: 16px;
    font-weight: 600;
  }

  h1:not(:last-child)::after,
  h2:not(:last-child)::after,
  h3:not(:last-child)::after,
  h4:not(:last-child)::after {
    content: ' // ';
    font-weight: 400;
    color: goldenrod;
  }

  nav:not(.side-nav) {
    display: flex;
    flex-wrap: wrap;
    margin: 12px 0;
  }

  nav:not(.side-nav) a {
    border: 1px solid grey;
    padding: 12px;
    margin: 6px;
  }

  .demo {
    margin: 24px 0;
  }

  .offscreen-button {
    border: 4px solid red;
    padding: 12px;
    position: fixed;
  }

  .offscreen-button.off-bottom {
    bottom: 30px;
    right: -50px;
  }

  .offscreen-button.off-top {
    top: 30px;
    left: -50px;
  }

  .content {
    display: flex;
    flex: 1;
  }

  iframe {
    height: 40vh;
  }

  .custom-button {
    -webkit-appearance: none;
    background: -webkit-gradient(to right, #a2ccb6 0%, #fceeb5 50%, #ee786e 100%);
    background: linear-gradient(to right, #a2ccb6 0%, #fceeb5 50%, #ee786e 100%);
    background-size: 500%;
    border: none;
    border-radius: 5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    color: #fff;
    cursor: pointer;
    font: 1.5em Raleway, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 5rem;
    letter-spacing: 0.05em;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 20rem;
  }

  .custom-button:hover {
    animation-name: gradient;
    -webkit-animation-name: gradient;
    animation-duration: 2s;
    -webkit-animation-duration: s;
    animation-iteration-count: 1;
    -webkit-animation-iteration-count: 1;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100%;
    }
  }
</style>