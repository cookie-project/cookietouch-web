export type LiteEventHandler<T> = (data: T) => void | Promise<void>;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ILiteEvent<T> {
  on(handler: LiteEventHandler<T>): void;
  off(handler: LiteEventHandler<T>): void;
  once(handler: LiteEventHandler<T>): void;
}

export default class LiteEvent<T> implements ILiteEvent<T> {
  private handlers: LiteEventHandler<T>[] = [];

  public on(handler: LiteEventHandler<T>): void {
    this.handlers.push(handler);
  }

  public off(handler: LiteEventHandler<T>): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  public once(handler: LiteEventHandler<T>): void {
    const newHandler = (data: T) => {
      handler(data);
      this.off(newHandler);
    };
    this.on(newHandler);
  }

  public async trigger(data: T) {
    for (const h of this.handlers.slice(0)) {
      await h(data);
    }
  }

  public expose(): ILiteEvent<T> {
    return this;
  }
}
