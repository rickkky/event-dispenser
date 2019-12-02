import EventPuber, { EventHandler } from './EventPuber'

export class EventDispenser<M extends { [type: string]: any }> {
  private map: Map<keyof M, EventPuber<any>> = new Map()

  public on<K extends keyof M>(
    type: K,
    handler: EventHandler<M[K]>,
    isAsync = false,
  ) {
    if (!this.map.has(type)) {
      this.map.set(type, new EventPuber<M[K]>())
    }

    ;(this.map.get(type) as EventPuber<M[K]>).on(handler, isAsync)
  }

  public once<K extends keyof M>(
    type: K,
    handler: EventHandler<M[K]>,
    isAsync = false,
  ) {
    if (!this.map.has(type)) {
      this.map.set(type, new EventPuber<M[K]>())
    }

    ;(this.map.get(type) as EventPuber<M[K]>).once(handler, isAsync)
  }

  public off<K extends keyof M>(type: K, handler: EventHandler<M[K]>) {
    const puber = this.map.get(type)

    if (!puber) {
      return false
    }

    return puber.off(handler)
  }

  public emit<K extends keyof M>(type: K, event: M[K]) {
    const puber = this.map.get(type)

    if (!puber) {
      return
    }

    puber.emit(event)
  }
}

export default EventDispenser
