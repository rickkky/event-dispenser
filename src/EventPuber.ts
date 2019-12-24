export interface EventHandler<T> {
  (event: Readonly<T>): void
}

const map = Symbol('event-handler-map')

export class EventPuber<T> {
  // Map<handler, isAsync>
  private [map] = new Map<EventHandler<T>, boolean>()

  public on(handler: EventHandler<T>, isAsync = false) {
    // if handler already exists, replace it to the end of queue
    this[map].delete(handler)
    this[map].set(handler, isAsync)
  }

  public once(handler: EventHandler<T>, isAsync = false) {
    let fired = false

    const magic = (event: Readonly<T>) => {
      if (fired) {
        return
      }

      fired = true
      this.off(magic)
      handler(event)
    }

    this.on(magic, isAsync)
  }

  public off(handler: EventHandler<T>) {
    return this[map].delete(handler)
  }

  public emit(event: T) {
    const readonlyEvent = Object.freeze(event)
    const promise = Promise.resolve()

    this[map].forEach((isAsync, handler) => {
      if (isAsync) {
        promise.then(() => handler(readonlyEvent))
      } else {
        handler(readonlyEvent)
      }
    })
  }
}

export default EventPuber
