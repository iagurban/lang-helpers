import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

export const FontsViewer = observer<
  PropsWithChildren<{
    fonts: readonly { fontFamily: string }[];
  }>
>(function FontsViewer({ fonts, children }) {
  return (
    <Flex
      direction="column"
      style={{
        padding: 1,
      }}
    >
      {fonts.map(({ fontFamily }, i) => (
        <Flex key={i} align="baseline">
          <Flex style={{ marginRight: 1 }}>{fontFamily}:</Flex>
          <Flex style={{ fontFamily }}>{children}</Flex>
        </Flex>
      ))}
    </Flex>
  );
});
