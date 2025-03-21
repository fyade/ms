type EventCallback = () => void

class EventBus {
  private events = new Map<string, EventCallback[]>()

  emit(eventName: string) {
    if (!this.events.has(eventName)) {
      return
    }
    const callbacks = this.events.get(eventName)
    callbacks!.forEach(callback => callback())
  }

  on(eventName: string, callback: EventCallback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [])
    }
    this.events.get(eventName)!.push(callback)
  }
}

export default new EventBus()
