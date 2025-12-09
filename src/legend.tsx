import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, ReactElement } from 'react';

export const LegendItem = observer<
  PropsWithChildren<{
    underline?: boolean;
  }>
>(function LegendItem({ children, underline }) {
  return (
    <Flex
      style={{
        position: `relative`,
        borderBottom: underline ? '1px dotted #000' : undefined,
      }}
      align={'center'}
      gap="0.25rem"
      py="0.25rem"
    >
      {children}
    </Flex>
  );
});

export const Legend = observer<
  PropsWithChildren<{
    preSlot?: ReactElement;
  }>
>(function Legend({ preSlot, children }) {
  return (
    <Flex gap="1rem" align="center" justify="stretch">
      {preSlot}
      {children}
    </Flex>
  );
});
