import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { ComponentProps, PropsWithChildren, ReactElement } from 'react';

import { palette } from '../../const/lang-palettes.tsx';
import { enlargedFont } from '../../const/styles-parts.tsx';
import classes from '../../parts/parts.module.scss';
import { BasicQuell } from '../../util/Quable.tsx';
import { helpItemsGlagolsCurrentTime } from '../help-items.tsx';
import { WithHelpItemTooltip } from '../imenica-block/help-badges.tsx';
import { ExchangeSymbol } from '../imenica-block/subjects-content-quells.tsx';

export const EAIQuell = observer<
  PropsWithChildren<ComponentProps<typeof BasicQuell>> & {
    postESlot?: ReactElement;
  }
>(function EAIQuell({ children, postESlot, ...props }) {
  return (
    <BasicQuell {...props}>
      <div className={classes.eaSuffix}>
        <Flex align="center" justify="center" pos="relative">
          <Flex>-(j)e</Flex>
          <WithHelpItemTooltip item={helpItemsGlagolsCurrentTime.e_palat}>
            <ExchangeSymbol color={palette.palatizacija} />
          </WithHelpItemTooltip>
          {postESlot}
        </Flex>
        <Flex align="center" justify="center">
          <Flex>-a</Flex>
        </Flex>
        <Flex align="center" justify="center">
          <Flex>-i</Flex>
        </Flex>
      </div>
      <Flex style={{ fontSize: enlargedFont }}>{children}</Flex>
    </BasicQuell>
  );
});
