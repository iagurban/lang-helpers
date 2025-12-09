import { Flex, FlexProps } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { ComponentProps, PropsWithChildren } from 'react';

import { BasicQuell, QuellCoords } from '../../util/Quable.tsx';
import { WithTiledBackground } from '../../util/tiles-pattern-svg.tsx';

export const TileFrame = observer<
  PropsWithChildren<ComponentProps<typeof WithTiledBackground> & { rootProps?: FlexProps }>
>(function TileFrame({ children, rootProps: { style, ...rootProps } = {}, ...props }) {
  return (
    <Flex {...rootProps} style={{ position: `relative`, ...style }}>
      <WithTiledBackground {...props}>
        {children && (
          <Flex
            style={{
              flex: `1 0 auto`,
              width: `100%`,
              height: `100%`,
              background: `#fff`,
              borderRadius: `0.4rem`,
            }}
            align="stretch"
            justify="stretch"
          >
            {children}
          </Flex>
        )}
      </WithTiledBackground>
    </Flex>
  );
});

export const TileFramedQuell = observer<
  PropsWithChildren<QuellCoords & ComponentProps<typeof TileFrame> & {}>
>(function TileFramedQuell({
  rootProps: { style: rootSx, ...rootProps } = {},
  x,
  y,
  w,
  h,
  children,
  ...props
}) {
  return (
    <BasicQuell x={x} y={y} w={w} h={h} rootProps={{ align: `stretch` }} noBorders>
      <TileFrame rootProps={{ ...rootProps, style: { flex: `1`, ...rootSx } }} {...props}>
        {children}
      </TileFrame>
    </BasicQuell>
  );
});
