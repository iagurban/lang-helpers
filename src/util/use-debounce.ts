import { useEffect, useMemo, useRef, useState } from 'react';

export const useDebounce = <T,>(delay: number, dflt: T | (() => T)) => {
  const data = useRef<{ queued: T; actual: T; stamp: number }>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const [actual, setActual] = useState(dflt);

  const { set, cancel } = useMemo(() => {
    const schedule = (wait: number) => {
      timeout.current ||= setTimeout(() => {
        if (!data.current) {
          throw new Error(`fgdjklhkjgdxzgknhljhlk`);
        }
        setActual((data.current.actual = data.current.queued));
        data.current.stamp = +Date.now();
        timeout.current = undefined;
      }, wait);
    };

    const cancel = () => clearTimeout(timeout.current);

    const set = (v: T) => {
      const now = Date.now();

      if (data.current) {
        data.current.queued = v;
        if (data.current.actual === v) {
          cancel();
          return;
        }
        const passed = now - data.current.stamp;
        if (passed >= delay) {
          setActual((data.current.actual = v));
          data.current.stamp = now;
          cancel();
          return;
        }
        const wait = delay - passed;
        schedule(wait);
      } else {
        data.current = {
          queued: v,
          actual: v,
          stamp: now,
        };
        setActual(v);
      }
    };
    return { set, cancel };
  }, []);

  useEffect(() => cancel, []);

  return [actual, set] as const;
};
