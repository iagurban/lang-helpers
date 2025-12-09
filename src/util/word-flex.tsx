import { Flex, FlexProps } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

export const WordFlex = observer<PropsWithChildren<FlexProps>>(function WordFlex({
  children,
  style,
  ...props
}) {
  return (
    <Flex align="baseline" style={{ gap: `0.1rem`, ...style }} {...props}>
      {children}
    </Flex>
  );
});
