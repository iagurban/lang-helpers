import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { ComponentProps, PropsWithChildren } from 'react';

import { endingQuellNormalHeight } from '../const/whatewer.ts';

export const PraQuell = observer<
  PropsWithChildren<{
    width?: number;
    vertical?: boolean;
    align?: 'left' | 'right' | 'center';
    rootProps?: Omit<ComponentProps<typeof Flex>, `style`>;
    enableAllBorders?: boolean;
  }>
>(function PraQuell({ children, width, vertical, rootProps, enableAllBorders, align }) {
  return (
    <Flex
      style={{
        border: '1px solid #333',
        ...(!enableAllBorders && {
          borderLeft: 'none',
          borderTop: 'none',
        }),
        [vertical ? 'width' : 'height']: endingQuellNormalHeight,
        [vertical ? 'height' : 'width']: width || undefined,
        justifyContent:
          align === 'left'
            ? 'flex-start'
            : align === 'right'
              ? 'flex-end'
              : align === 'center'
                ? 'center'
                : undefined,
      }}
      {...rootProps}
    >
      <Flex
        style={{
          gap: '0 10px',
          // alignSelf: vertical ? 'flex-end' : 'flex-start',
          transform: vertical ? 'rotate(-90deg) translateX(-100%)' : undefined,
          transformOrigin: 'left top',
          padding: `4px`,
          paddingTop: `2px`,
          paddingBottom: 0,
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
});
