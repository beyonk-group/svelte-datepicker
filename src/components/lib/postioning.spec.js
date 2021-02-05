import { stub } from 'sinon'
import { suite as Suite } from 'uvu'
import assert from 'uvu/assert'
import { getDistanceToEdges, getTranslate } from './positioning.js'

const scenarios = [
  {
    scenario: 'mobile: fits horizontally on screen',
    w: 380,
    distance: { bottom: 123, top: 0, left: 0, right: 0 },
    y: 123,
    x: 0
  },
  {
    scenario: 'mobile: too far left',
    w: 380,
    distance: { bottom: 123, top: 0, left: -14, right: 0 },
    y: 123,
    x: 21
  },
  {
    scenario: 'mobile: too far right',
    w: 380,
    distance: { bottom: 123, top: 0, left: 0, right: -14 },
    y: 123,
    x: 7
  },
  {
    scenario: 'tablet: too far left',
    w: 481,
    distance: { bottom: 123, top: 0, left: -14, right: 0 },
    y: 0,
    x: 14
  },
  {
    scenario: 'tablet: too far right',
    w: 481,
    distance: { bottom: 123, top: 0, left: 0, right: -14 },
    y: 0,
    x: -14
  },
  {
    scenario: 'desktop: offscreen top',
    w: 481,
    distance: { bottom: 123, top: -14, left: 0, right: 0 },
    y: 14,
    x: 0
  },
  {
    scenario: 'desktop: offscreen bottom',
    w: 481,
    distance: { bottom: -14, top: 0, left: 0, right: 0 },
    y: -14,
    x: 0
  },
  {
    scenario: 'desktop: centred',
    w: 481,
    distance: { bottom: 1, top: 1, left: 1, right: 1 },
    y: 0,
    x: 0
  }
]

const suite = Suite('positioning/getTranslate')

scenarios.forEach(({ scenario, w, distance, y, x }) => {
  suite(`${scenario} y`, () => {
    const position = getTranslate(w, distance)
    assert.is(position.y, y)
  })

  suite(`${scenario} x`, () => {
    const position = getTranslate(w, distance)
    assert.is(position.x, x)
  })
})

suite.run()

const edges = Suite('positioning/getDistanceToEdges')

edges.before(async () => {
  const rect = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  }
  const window = {
    innerHeight: 100,
    document: {
      body: {
        clientWidth: 140
      }
    }
  }
  const wrapper = {
    getBoundingClientRect: stub().returns(rect)
  }
  edges.ctx = {
    bounds: await getDistanceToEdges(window, wrapper, 123, 456)
  }
})

edges('calculates top', () => {
  assert.is(edges.ctx.bounds.top, -446)
})

edges('calculates bottom', () => {
  assert.is(edges.ctx.bounds.bottom, 546)
})

edges('calculates left', () => {
  assert.is(edges.ctx.bounds.left, -113)
})

edges('calculates right', () => {
  assert.is(edges.ctx.bounds.right, 253)
})

edges.run()
