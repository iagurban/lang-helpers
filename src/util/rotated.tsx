import { useResizeObserver } from '@grbn/kit/react/mobx';
import { Flex, FlexProps } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useState } from 'react';

export const Rotated = observer<
  PropsWithChildren<{
    rootProps?: FlexProps;
  }>
>(function Rotated({ rootProps: { style: rootStyle, ...rootProps } = {}, children }) {
  const [size, setSize] = useState<{ width?: number; height?: number }>(() => ({}));
  const o = useResizeObserver(e => {
    setSize({ width: e.borderBoxSize[0].blockSize, height: e.borderBoxSize[0].inlineSize });
  });
  return (
    <Flex style={{ ...size, ...rootStyle }} {...rootProps}>
      <Flex
        style={{
          display: `flex`,
          transform: `rotate(-90deg) translateX(-100%)`,
          transformOrigin: `left top`,
          position: `absolute`,
          alignItems: `center`,
        }}
        ref={o.ref}
      >
        {children}
      </Flex>
    </Flex>
  );
});
