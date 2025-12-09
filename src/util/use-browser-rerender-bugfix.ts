import { useEffect } from 'react';

const forceBrowserRedraw = (pause = 0) => {
  const { style } = document.body;

  const { width, position } = style;
  Object.assign(style, { position: `fixed`, width: `-1px` });
  setTimeout(() => {
    // TODO check if not changed between, warn if was
    // TODO opt that force cleaning instead of restoration
    Object.assign(style, { position, width });
  }, pause);
};

export const useBrowserRerenderBugfix = (
  enable: boolean,
  delay: number,
  interval: number,
  { settingPause }: { settingPause?: number } = {}
) =>
  useEffect(() => {
    if (!enable) {
      return undefined;
    }

    const r: (() => void)[] = [];

    r.push(
      (
        id => () =>
          clearTimeout(id)
      )(
        setTimeout(() => {
          r.push(
            (
              id => () =>
                clearInterval(id)
            )(
              (forceBrowserRedraw(settingPause),
              setInterval(() => forceBrowserRedraw(settingPause), interval))
            )
          );
        }, delay)
      )
    );
    return () => r.forEach(r => r());
  }, [enable, settingPause, delay, interval]);
