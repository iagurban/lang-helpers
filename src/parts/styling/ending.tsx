import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { forwardRef, PropsWithChildren } from 'react';

import { palette } from '../../const/lang-palettes.tsx';
import { endingQuellNormalHeight } from '../../const/whatewer.ts';
import { useCellContentProps } from '../../tables/quells/normal-quell.tsx';
import { Label } from './label.tsx';

export const Ending = observer(
  forwardRef<
    HTMLDivElement,
    PropsWithChildren<{
      secondary?: boolean;
      bold?: boolean;
      labelType?: `zaPalatalnim` | `neodreden`;
      shiftTop?: boolean;
      mn?: boolean;
      underline?: boolean;
    }>
  >(function Ending({ children, secondary, bold, labelType, shiftTop, mn, underline }, ref) {
    const config = useCellContentProps();

    return (
      <Flex
        ref={ref}
        align="baseline"
        style={{
          opacity: secondary ? 0.6 : undefined,
          fontWeight: bold ? `bold` : undefined,
          marginTop: shiftTop ? endingQuellNormalHeight : undefined,
          fontStyle: config?.mn || mn ? `italic` : undefined,
          gap: `1px`,
          textDecoration: underline ? `underline 1px dotted` : undefined,
        }}
      >
        {labelType ? (
          <Label color={palette[labelType]}>
            <Flex>-</Flex>
            {children}
          </Label>
        ) : (
          <>
            <Flex>-</Flex>
            {typeof children === `string` ? <Flex>{children}</Flex> : children}
          </>
        )}
      </Flex>
    );
  })
);
