import { Flex } from '@mantine/core';
import { IconCaretLeftFilled as ArrowLeftIcon } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';

import { AsteriskVarDecl } from '../../parts/asterisk-var.tsx';
import { VrstLabel } from '../../parts/styling/vrst-label.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { HeadingQuell } from '../quells/custom-quells.tsx';

const trpniModeRenderVariant = 2 as 1 | 2;

export const RadniTrpniDescrQuells = observer<{
  x: number;
  y: number;
  w: number;
}>(function RadniTrpniDescrQuells({ x, y, w }) {
  const tx = numberWrap(x);
  const ty = numberWrap(y);

  return (
    <>
      <HeadingQuell x={tx.take()} y={ty.take()} w={w} h={1} bright rootProps={{ justify: `flex-start` }}>
        <Flex align="center" style={{ width: `2.8rem` }}>
          <ArrowLeftIcon style={{ width: '0.8rem' }} />
          <VrstLabel>radni</VrstLabel>
        </Flex>
        {/*<Anchor decl>GPR</Anchor>*/}

        <Flex>
          <AsteriskVarDecl>-l-</AsteriskVarDecl>
        </Flex>
      </HeadingQuell>

      <HeadingQuell
        x={tx.takeAndAdd(w)}
        y={ty.take() + 1}
        w={w}
        h={1}
        bright
        rootProps={{ justify: `flex-start` }}
      >
        <Flex align="center" style={{ width: `2.8rem` }}>
          <ArrowLeftIcon style={{ width: '0.8rem' }} />
          <VrstLabel>trpni</VrstLabel>
        </Flex>

        <Flex>
          <AsteriskVarDecl>
            {trpniModeRenderVariant === 2 ? (
              <>
                -t|
                <span style={{ fontSize: '0.85rem', opacity: 0.75 }}>
                  <span style={{ opacity: 0.4 }}>(</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.95 }}>
                    <span style={{ opacity: 0.5 }}>(</span>j<span style={{ opacity: 0.5 }}>)</span>
                  </span>
                  e<span style={{ opacity: 0.4 }}>)</span>
                </span>
                n-
              </>
            ) : (
              <>-t|n|en|jen-</>
            )}
          </AsteriskVarDecl>
        </Flex>
      </HeadingQuell>
    </>
  );
});
