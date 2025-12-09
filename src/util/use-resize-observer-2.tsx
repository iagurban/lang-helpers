import { createUsableContext } from '@grbn/kit/react';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useCallback, useMemo, useRef } from 'react';

class ObserverTracking<ResizeObserverEntry extends { target: Node }> {
  protected readonly callbacks = new Map<Node, (e: ResizeObserverEntry) => void>();

  observed(entries: readonly ResizeObserverEntry[]) {
    for (const entry of entries) {
      const callback = this.callbacks.get(entry.target);
      if (!callback) {
        throw new Error(`sdgdfjfjgnsdfd`);
      }
      callback(entry);
    }
  }

  observe(node: Element, callback: (e: ResizeObserverEntry) => void) {
    if (this.callbacks.has(node)) {
      throw new Error(`already observing node`);
    }
    this.callbacks.set(node, callback);
  }

  unobserve(node: Element) {
    if (!this.callbacks.delete(node)) {
      throw new Error(`not observing node`);
    }
  }
}

export class TrackingResizeObserver {
  protected readonly callbacks = new ObserverTracking<ResizeObserverEntry>();
  protected readonly observer = new ResizeObserver(entries => this.callbacks.observed(entries));

  observe(node: Element, callback: (e: ResizeObserverEntry) => void) {
    this.callbacks.observe(node, callback);
    this.observer.observe(node);
  }

  unobserve(node: Element) {
    this.callbacks.unobserve(node);
    this.observer.unobserve(node);
  }
}

const { use: useResizeObserverInstance, provider: ResizeObserverInstanceProvider } =
  createUsableContext<TrackingResizeObserver>(`TrackingResizeObserver`);

type MutationObserverCallback = (e: MutationRecord) => void;

class MutationObserverInstance {
  protected readonly callbacks = new ObserverTracking<MutationRecord>();
  protected readonly observer = new MutationObserver(entries => this.callbacks.observed(entries));

  observe(node: Element, callback: MutationObserverCallback) {
    this.callbacks.observe(node, callback);
    this.observer.observe(node, { attributes: true });
  }

  unobserve(node: Element) {
    this.callbacks.unobserve(node);
    // this.observer.unobserve(node);
  }
}

const { use: useMutationObserverInstance, provider: MutationObserverInstanceProvider } =
  createUsableContext<MutationObserverInstance>(`MutationObserverInstance`);

export const makeObserverHook =
  <
    Entry,
    ResizeObserverInstance extends {
      observe: (node: Element, callback: (e: Entry) => void) => void;
      unobserve(node: Element): void;
    },
  >(
    useInstance: () => ResizeObserverInstance
  ) =>
  (callback: (e: Entry) => void) => {
    const engine = useInstance();

    const observedRef = useRef<{ e: Element; c: (e: Entry) => void }>();
    const engineRef = useRef<ResizeObserverInstance>();

    if (engineRef.current && engineRef.current !== engine && observedRef.current) {
      engineRef.current?.unobserve(observedRef.current.e);
      engine.observe(observedRef.current.e, observedRef.current.c);
    }
    engineRef.current = engine;

    const callbackRef = useRef<(e: Entry) => void>();
    callbackRef.current = callback;

    const ref = useCallback(
      (e: Element | null) => {
        if (e) {
          if (observedRef.current) {
            throw new Error(`ref is used possible on different elements`);
          }
          const c = (e: Entry) => callbackRef.current!(e);
          engine.observe(e, c);
          observedRef.current = { e, c };
        } else {
          if (!observedRef.current) {
            throw new Error(`ref is used possible on different elements`);
          }
          engine.unobserve(observedRef.current.e);
          observedRef.current = undefined;
        }
      },
      [engine]
    );

    return { ref, observed: observedRef };
  };

export const useResizeObserver2 = makeObserverHook<ResizeObserverEntry, TrackingResizeObserver>(
  useResizeObserverInstance
);
export const useMutationObserver2 = makeObserverHook<MutationRecord, MutationObserverInstance>(
  useMutationObserverInstance
);

export const ProvideResizeObserverEngine = observer<PropsWithChildren>(function ProvideResizeObserverEngine({
  children,
}) {
  const engine = useMemo(() => new TrackingResizeObserver(), []);
  return <ResizeObserverInstanceProvider value={engine}>{children}</ResizeObserverInstanceProvider>;
});

export const ProvideMutationObserverEngine = observer<PropsWithChildren>(
  function ProvideMutationObserverEngine({ children }) {
    const engine = useMemo(() => new MutationObserverInstance(), []);
    return <MutationObserverInstanceProvider value={engine}>{children}</MutationObserverInstanceProvider>;
  }
);
