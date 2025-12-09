import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

export const Label = observer<
  PropsWithChildren<{
    color: string;
    text?: string;
    bold?: boolean;
    small?: boolean;
  }>
>(function Label({ text, color, bold, small, children }) {
  return (
    <Flex
      style={{
        color,
        fontWeight: bold ? 'bold' : undefined,
        alignItems: `baseline`,
        fontSize: small ? `75%` : undefined,
        gap: `1px`,
        whiteSpace: `nowrap`,
      }}
    >
      <Flex style={{ fontWeight: `bold` }}>/</Flex>
      {text}
      {children}
      <Flex style={{ fontWeight: `bold` }}>/</Flex>
    </Flex>
  );
});
