import { action, computed, makeObservable, observable } from 'mobx';

import { TrackingResizeObserver } from './use-resize-observer-2.tsx';

class ObservableRect {
  constructor(
    public absLeft: number,
    public absTop: number,
    public width: number,
    public height: number,
    public parent?: { left: number; top: number }
  ) {
    makeObservable(this, {
      absLeft: observable,
      absTop: observable,
      width: observable,
      height: observable,
      parent: false,

      left: computed,
      top: computed,
      centerLeft: computed,
      centerTop: computed,
      absRight: computed,
      absBottom: computed,
      right: computed,
      bottom: computed,

      absPosition: computed,
      position: computed,

      setAbs: action,
      set: action,
    });
  }

  get left() {
    return this.absLeft - (this.parent ? this.parent.left : 0);
  }

  get top() {
    return this.absTop - (this.parent ? this.parent.top : 0);
  }

  get centerLeft() {
    return this.left + this.width / 2;
  }

  get centerTop() {
    return this.top + this.height / 2;
  }

  get absRight() {
    return this.absLeft + this.width;
  }

  get right() {
    return this.left + this.width;
  }

  get absBottom() {
    return this.absTop + this.height;
  }

  get bottom() {
    return this.top + this.height;
  }

  get absPosition() {
    return {
      left: this.absLeft,
      top: this.absTop,
    };
  }

  get position() {
    return {
      left: this.left,
      top: this.top,
    };
  }

  setAbs(left: number, top: number, width: number, height: number) {
    this.absLeft = left;
    this.absTop = top;
    this.width = width;
    this.height = height;
  }

  set(left: number, top: number, width: number, height: number) {
    this.absLeft = left + (this.parent ? this.parent.left : 0);
    this.absTop = top + (this.parent ? this.parent.top : 0);
    this.width = width;
    this.height = height;
  }
}

export class DOMSyncedRect {
  constructor(
    readonly resizeObserverInstance: TrackingResizeObserver,
    parent?: { left: number; top: number }
  ) {
    this.rect = new ObservableRect(0, 0, 0, 0, parent);

    makeObservable<this, `observedNode` | `callback`>(this, {
      rect: false,
      observedNode: false,
      ref: action.bound,
      callback: false,
      retrigger: action.bound,
    });
  }

  readonly rect: ObservableRect;

  protected observedNode: Element | null = null;

  private readonly callback = (e: ResizeObserverEntry) => {
    this.rect.setAbs(...arrayFromDOMRect(e.target.getBoundingClientRect()));
  };

  ref(e: Element | null) {
    if (e) {
      if (this.observedNode) {
        throw new Error(`ref is used possible on different elements`);
      }
      this.resizeObserverInstance.observe(e, this.callback);
      this.observedNode = e;
    } else {
      if (!this.observedNode) {
        throw new Error(`ref is used possible on different elements`);
      }
      this.resizeObserverInstance.unobserve(this.observedNode);
      this.observedNode = null;
    }
  }

  retrigger() {
    if (!this.observedNode) {
      return false;
    }
    this.rect.setAbs(...arrayFromDOMRect(this.observedNode.getBoundingClientRect()));
    return true;
  }
}

export const copyDOMRect = ({ left, top, width, height }: DOMRect) => ({ left, top, width, height }) as const;

export const arrayFromDOMRect = ({ left, top, width, height }: DOMRect) =>
  [left, top, width, height] as const;
