import { createUsableContext } from '@grbn/kit/react';
import { observer } from 'mobx-react-lite';
import { ComponentProps, PropsWithChildren } from 'react';

import { BasicQuell } from '../../util/Quable.tsx';

export const { useIfProvided: useCellContentProps, provider: ProvideCellContentProps } = createUsableContext<{
  mn?: boolean;
  color?: string;
}>('CellContentProps');

export const NormalQuell = observer<
  PropsWithChildren<
    ComponentProps<typeof BasicQuell> & {
      mn?: boolean;
    }
  >
>(function NormalQuell({ mn, color, rootProps: { style, ...rootProps } = {}, children, ...props }) {
  const config = useCellContentProps();
  if (config) {
    mn ??= config.mn;
    color = config.color;
  }
  return (
    <BasicQuell
      rootProps={{
        ...rootProps,
        style: {
          ...(mn && { fontStyle: `italic` }),
          ...(color && { color }),

          gap: `0.4rem`,
          ...style,
        },
      }}
      {...props}
    >
      {children}
    </BasicQuell>
  );
});
