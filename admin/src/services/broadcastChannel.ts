type EventCallback<T> = (data: T) => (Promise<void> | void)

interface EventMap {
  login: { username: string, loginRole: string };
}

class BroadcastChannelService {
  private channel: BroadcastChannel
  private events = new Map<string, EventCallback<any>[]>()

  constructor() {
    this.channel = new BroadcastChannel('custom-channel')
    this.channel.onmessage = async (event: MessageEvent) => {
      const { eventName, data } = event.data;
      if (!this.events.has(eventName)) {
        return
      }
      const funcs = this.events.get(eventName);
      for (const func of funcs!) {
        await func(data)
      }
    }
  }

  emit<K extends keyof EventMap>(eventName: K, data: EventMap[K]) {
    this.channel.postMessage({ eventName, data })
  }

  on<K extends keyof EventMap>(eventName: K, callback: EventCallback<EventMap[K]>) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [])
    }
    this.events.get(eventName)!.push(callback)
  }
}

export const BCService = new BroadcastChannelService()
