# event-dispenser

[![npm version](https://badge.fury.io/js/event-dispenser.svg)](https://badge.fury.io/js/event-dispenser)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Install

```
npm i -S event-dispenser
```

## API

### `EventDispenser`

```ts
new EventDispenser<M>()
```

#### `EventDispenser.prototype.on()`

```ts
EventDispenser.prototype.on<K extends keyof M>(
  type: K,
  handler: (event: <M[K]>) => void,
  isAsync = false,
)
```

#### `EventDispenser.prototype.once()`

```ts
EventDispenser.prototype.once<K extends keyof M>(
  type: K,
  handler: (event: <M[K]>) => void,
  isAsync = false,
)
```

#### `EventDispenser.prototype.off()`

```ts
EventDispenser.prototype.off<K extends keyof M>(
  type: K,
  handler: (event: <M[K]>) => void,
)
```

#### `EventDispenser.prototype.emit()`

```ts
EventDispenser.prototype.emit<K extends keyof M>(
  type: K,
  event: M[K]
)
```

## Examples

```ts
import EventDispenser from 'event-dispenser'

interface EventMap {
  succeed: {
    status: 200 | 304
    data: number[]
  }
  fail: {
    status: 500 | 404
    message: string
  }
}

const dispenser = new EventDispenser<EventMap>()

function sendRequest() {
  const promise = new Promise<number[]>((resolve, reject) => {
    // send a request...
  })

  promise.then((data) => {
    dispenser.emit('succeed', {
      status: 200,
      data,
    })
  })

  promise.catch(() => {
    dispenser.emit('fail', {
      status: 500,
      message: 'request failed',
    })
  })

  return promise
}

dispenser.on('succeed', (res) => {
  // ...
})

dispenser.on('fail', (res) => {
  // ...
})
```
