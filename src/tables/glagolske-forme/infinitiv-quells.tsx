import { Flex } from '@mantine/core';
import { IconCaretRightFilled as ArrowRightIcon } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';

import { semiHeaderQuellStyle } from '../../const/styles-parts.tsx';
import { ComplexAnchorDecl } from '../../parts/styling/anchor.tsx';
import { VrstLabel } from '../../parts/styling/vrst-label.tsx';
import { makeFormulaFrameProps } from '../../parts/tiles.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell } from '../../util/Quable.tsx';
import { helpItemsGlagolsCurrentTime } from '../help-items.tsx';
import { HelpBadgesGroup, HelpItemBadge } from '../imenica-block/help-badges.tsx';
import { HeadingQuell } from '../quells/custom-quells.tsx';
import { TileFramedQuell } from '../quells/tile-framed-quell.tsx';

export const InfinitivQuells = Object.assign(
  observer<{
    x: number;
    y: number;
  }>(function InfinitivQuells({ x, y }) {
    const tx = numberWrap(x);
    const ty = numberWrap(y);
    return (
      <>
        <HeadingQuell
          x={tx.take()}
          y={ty.take()}
          w={4}
          h={1}
          big
          bright
          rootProps={{ style: semiHeaderQuellStyle }}
        >
          <VrstLabel>infinitiv</VrstLabel>
          <ArrowRightIcon style={{ width: `0.75em` }} />
        </HeadingQuell>
        <TileFramedQuell x={tx.take() + 4} y={ty.take()} w={10} h={1} {...makeFormulaFrameProps()} />
        <BasicQuell x={tx.take() + 4} y={ty.take()} w={10} h={1}>
          <HelpBadgesGroup rtl>
            <HelpItemBadge item={helpItemsGlagolsCurrentTime.note_infin} />
          </HelpBadgesGroup>
          <ComplexAnchorDecl name="OI" descr="infinitiva" />
          <Flex>+</Flex>
          <Flex align="center" justify="center">
            <Flex
              direction="column"
              align="center"
              justify="center"
              style={{ position: `relative`, marginRight: `0.1rem` }}
            >
              <Flex>t</Flex>
              <Flex
                style={{
                  background: `#000`,
                  height: `1px`,
                  width: `100%`,
                  margin: `-0.25rem 0`,
                }}
              />
              <Flex>ć</Flex>
            </Flex>
            <Flex>i</Flex>
          </Flex>
        </BasicQuell>
      </>
    );
  }),
  { rowSpan: 2, colSpan: 2 }
);
