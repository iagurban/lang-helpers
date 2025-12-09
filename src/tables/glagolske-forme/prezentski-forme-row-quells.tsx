import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { palette } from '../../const/lang-palettes.tsx';
import { enlargedFont } from '../../const/styles-parts.tsx';
import { EmptyChar } from '../../parts/empty-char.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell } from '../../util/Quable.tsx';
import { WordFlex } from '../../util/word-flex.tsx';
import { helpItemsGlagolsCurrentTime } from '../help-items.tsx';
import { HelpBadgesGroup, HelpItemBadge, WithHelpItemTooltip } from '../imenica-block/help-badges.tsx';
import { ExchangeSymbol } from '../imenica-block/subjects-content-quells.tsx';
import { EAIQuell } from '../quells/eai-quell.tsx';
import { NormalQuell } from '../quells/normal-quell.tsx';

const createLineStyle = () =>
  ({
    position: `absolute`,
    background: `#666`,
    height: 1,
    width: `25%`,
    top: `50%`,
  }) as const;

export const PrezentskiBitiQuells = observer<{
  x: number;
  y: number;
}>(function PrezentskiBitiQuells({ x, y }) {
  const lineStyle = useMemo(() => createLineStyle(), []);

  const tx = numberWrap(x);

  const commonSubCellStyle = {
    position: `relative`,
    width: `30%`,
    textAlign: `center`,
    transform: `translateY(-1px)`,
  } as const;

  const values = [`sam`, `smo`, `si`, `ste`, `je`, `su`] as const;
  return (
    <>
      {values.map((v, i) => {
        const w = i > 3 ? 3 : 1;
        return (
          <NormalQuell key={i} x={tx.takeAndAdd(w)} y={y} w={w} h={2} mn={!!(i % 2)}>
            <Flex style={{ color: palette.kratkiPomocni, fontSize: enlargedFont }}>{v}</Flex>
            <Flex
              style={{ position: `absolute`, left: 0, top: 0, bottom: 0, right: 0, padding: `4px` }}
              direction="column"
              justify="space-between"
            >
              {v === `je` ? (
                <>
                  <div style={{ color: palette.naglaseniPomocni, ...commonSubCellStyle, alignSelf: `end` }}>
                    st
                  </div>
                  <div style={{ ...lineStyle, right: 0 }} />
                </>
              ) : (
                <div style={{ color: palette.naglaseniPomocni, ...commonSubCellStyle }}>je</div>
              )}
              <div style={{ ...lineStyle, left: 0 }} />
              <div style={{ color: palette.zanjekaniPomocni, ...commonSubCellStyle }}>ni</div>
            </Flex>
          </NormalQuell>
        );
      })}
    </>
  );
});

export const PrezentskiHtetiQuells = observer<{
  x: number;
  y: number;
}>(function PrezentskiHtetiQuells({ x, y }) {
  const lineStyle = useMemo(() => createLineStyle(), []);

  const tx = numberWrap(x);

  const commonSubCellStyle = {
    position: `relative`,
    width: `30%`,
    textAlign: `center`,
    transform: `translateY(-1px)`,
  } as const;

  const values = [`ću`, `ćemo`, `ćeš`, `ćete`, `će`] as const;
  return (
    <>
      {values.map((v, i) => {
        const w = i > 3 ? 6 : 1;
        return (
          <NormalQuell key={i} x={tx.takeAndAdd(w)} y={y} w={w} h={2} mn={!!(i % 2)}>
            <Flex style={{ color: palette.kratkiPomocni, fontSize: enlargedFont }}>{v}</Flex>
            <Flex
              style={{ position: `absolute`, left: 0, top: 0, bottom: 0, right: 0, padding: `4px` }}
              direction="column"
              justify="space-between"
            >
              <div style={{ color: palette.naglaseniPomocni, ...commonSubCellStyle }}>ho</div>
              <div style={{ ...lineStyle, left: 0 }} />
              <div style={{ color: palette.zanjekaniPomocni, ...commonSubCellStyle }}>ne</div>
            </Flex>
          </NormalQuell>
        );
      })}
    </>
  );
});

export const PrezentskiEAIQuells = observer<{
  x: number;
  y: number;
}>(function PrezentskiEAIQuells({ x, y }) {
  const tx = numberWrap(x);
  const ty = numberWrap(y);

  return (
    <>
      <EAIQuell
        x={tx.takeAndAdd(1)}
        y={ty.take()}
        w={1}
        h={3}
        postESlot={
          <HelpBadgesGroup rtl>
            <HelpItemBadge item={helpItemsGlagolsCurrentTime.l1_jd_note1} />
          </HelpBadgesGroup>
        }
      >
        m
      </EAIQuell>
      <EAIQuell x={tx.takeAndAdd(1)} y={ty.take()} w={1} h={3} italic>
        mo
      </EAIQuell>
      <EAIQuell x={tx.takeAndAdd(1)} y={ty.take()} w={1} h={3}>
        š
      </EAIQuell>
      <EAIQuell x={tx.takeAndAdd(1)} y={ty.take()} w={1} h={3} italic>
        te
      </EAIQuell>
      <EAIQuell x={tx.takeAndAdd(3)} y={ty.take()} w={3} h={3}>
        <EmptyChar />
      </EAIQuell>

      <BasicQuell x={tx.take()} y={ty.takeAndAdd(1)} w={3} h={1} italic>
        <HelpBadgesGroup rtl>
          <HelpItemBadge item={helpItemsGlagolsCurrentTime.l3_mn_note2} />
        </HelpBadgesGroup>

        <WordFlex>
          -(
          <WithHelpItemTooltip item={helpItemsGlagolsCurrentTime.e_l3_mn_note1}>
            <Flex opacity={0.5} fz="80%">
              (e)
            </Flex>
          </WithHelpItemTooltip>
          j)u
        </WordFlex>
        <WithHelpItemTooltip item={helpItemsGlagolsCurrentTime.e_palat}>
          <ExchangeSymbol color={palette.palatizacija} />
        </WithHelpItemTooltip>
      </BasicQuell>
      <BasicQuell x={tx.take()} y={ty.takeAndAdd(1)} w={3} h={1} italic>
        -aju
      </BasicQuell>
      <BasicQuell x={tx.take()} y={ty.takeAndAdd(1)} w={3} h={1} italic>
        -e
      </BasicQuell>
    </>
  );
});

export const PrezentskiFormeRowQuells = observer<{
  x: number;
  y: number;
  type: `e` | `a` | `i` | `bude`;
}>(function PrezentskiFormeRowQuells({ x, y, type }) {
  const tx = numberWrap(x);

  const prefix = `${type === `bude` ? `` : `-`}${type === `e` ? `(j)` : ``}`;
  const values = [
    `${type}m`,
    `${type}mo`,
    `${type}š`,
    `${type}te`,
    `${type}`,
    `${type === `e` ? `u` : type === `a` ? `aju` : type === `bude` ? `budu` : `e`}`,
  ] as const;

  return (
    <>
      {values.map((v, i) => {
        const w = i > 3 ? 3 : 1;
        return (
          <NormalQuell
            key={i}
            x={tx.takeAndAdd(w)}
            y={y}
            w={w}
            h={1}
            mn={!!(i % 2)}
            rootProps={{ style: type === `bude` ? { color: palette.dvovidniPresent } : undefined }}
          >
            {prefix}
            {v}
          </NormalQuell>
        );
      })}
    </>
  );
});
