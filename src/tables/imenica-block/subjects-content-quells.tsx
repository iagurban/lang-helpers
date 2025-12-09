import { Flex, lighten, Tooltip } from '@mantine/core';
import {
  IconArrowsTransferUpDown,
  IconNotes,
  IconRepeat,
  IconReplace,
  IconTransform,
} from '@tabler/icons-react';
import { css } from 'chroma.ts';
import { observer } from 'mobx-react-lite';
import React, { forwardRef, Fragment, PropsWithChildren, ReactElement } from 'react';

import { allPadeziDescriptions, palette } from '../../const/lang-palettes.tsx';
import { EmptyChar } from '../../parts/empty-char.tsx';
import { GNCellContent } from '../../parts/gn-cell-content.tsx';
import { NT4 } from '../../parts/nt4.tsx';
import { RunawayA } from '../../parts/runaway-a.tsx';
import { SeparatedVBox } from '../../parts/separated-v-box.tsx';
import { Ending } from '../../parts/styling/ending.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell } from '../../util/Quable.tsx';
import { spreadLR } from '../../util/spread-ltrb.tsx';
import { WithTiledBackground } from '../../util/tiles-pattern-svg.tsx';
import { skupinaOrder } from '../columns-definitions.tsx';
import { HelpItem, helpItemsImenice, helpItemsPridjev } from '../help-items.tsx';
import { ProvideCellContentProps } from '../quells/normal-quell.tsx';
import { PadeziLinesQuells, SubjectSymbol } from '../quells/padezi-lines-quells.tsx';
import { VerticalQuell } from '../quells/vertical-quell.tsx';
import { HelpBadgesGroup, HelpItemBadge, WithHelpItemTooltip } from './help-badges.tsx';
import { SubjectsHeaders } from './subjects-headers.tsx';

const subjectsPadezi: readonly ((typeof allPadeziDescriptions)[keyof typeof allPadeziDescriptions] & {
  bold?: boolean;
})[][] = [
  [allPadeziDescriptions.v],
  [{ ...allPadeziDescriptions.n, bold: true }],
  [allPadeziDescriptions.a],
  [allPadeziDescriptions.g],
  [allPadeziDescriptions.i],
  [allPadeziDescriptions.d, allPadeziDescriptions.l],
];

const KGH2ZCSRule = observer(function KGH2ZCSRule() {
  return <Flex>ispred -i u množini k, g i h prelaze u c, z, s (svedok, svedoci)</Flex>;
});

const WrappedRunawayA = observer(
  forwardRef<
    HTMLDivElement,
    {
      rtl?: boolean;
    }
  >(function WrappedRunawayA({ rtl }, ref) {
    return (
      <Flex
        style={{
          // maxWidth: 0,
          // overflow: `visible`,
          position: 'absolute',
          [rtl ? `right` : `left`]: 2,
          cursor: 'pointer',
        }}
        ref={ref}
      >
        {/*<Flex style={{ minWidth: `1rem`, overflow: `visible` }}>*/}
        <RunawayA />
        {/*</Flex>*/}
      </Flex>
    );
  })
);

export const ExchangeSymbolContent = observer<{
  color: string;
}>(function ExchangeSymbolContent({ color }) {
  const Icon = [IconTransform, IconReplace, IconArrowsTransferUpDown, IconRepeat][3];
  return <Icon style={{ color, transform: 'rotate(90deg)' }} />;
});

export const ExchangeSymbol = observer(
  forwardRef<
    HTMLDivElement,
    {
      color: string;
      rtl?: boolean;
    }
  >(function ExchangeSymbol({ color, rtl }, ref) {
    return (
      <Flex
        style={{
          position: 'absolute',
          [rtl ? `right` : `left`]: 2,
          top: 0,
          width: `0.75rem`,
          ...spreadLR(`-2px`, `margin`),
          marginTop: -5,
          cursor: 'pointer',
        }}
        ref={ref}
      >
        <ExchangeSymbolContent color={color} />
      </Flex>
    );
  })
);

const tileBaseProps = (color: string) =>
  ({
    step: 4,
    width: 4,
    background: '#fff',
    zIndex: 50,
    color: lighten(color, 0.8),
    // opacity: 0.4,
  }) as const;

const declencijeHeaderTiles = [
  () => <WithTiledBackground {...tileBaseProps('#24c5bf')} />,
  () => <WithTiledBackground {...tileBaseProps('#8009bc')} />,
  () => <WithTiledBackground {...tileBaseProps('#0956af')} />,
];

const ImeniceIjdQuells = observer<{
  x: number;
  y: number;
}>(function ImeniceIjdQuells({ x, y }) {
  const ty = numberWrap(y);
  return (
    <>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <Ending secondary>
          <SeparatedVBox>
            <Flex>o</Flex>
            <WithHelpItemTooltip item={helpItemsImenice.skI_vok_jd_licni}>
              <Flex style={{ color: palette.licni }}>a</Flex>
            </WithHelpItemTooltip>
          </SeparatedVBox>
        </Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <Ending bold>a</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <Ending>u</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <Ending>e</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <Ending>om</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <WithHelpItemTooltip item={helpItemsImenice.skI_dat_lok_jd_sibil}>
          <ExchangeSymbol color={palette.sibilizacija} />
        </WithHelpItemTooltip>
        <Ending>i</Ending>
      </BasicQuell>
    </>
  );
});

const ImeniceImnQuells = observer<{
  x: number;
  y: number;
}>(function ImeniceImnQuells({ x, y }) {
  const ty = numberWrap(y);

  return (
    <ProvideCellContentProps value={{ mn: true }}>
      <BasicQuell x={x} y={ty.takeAndAdd(3)} w={1} h={3}>
        <Ending>e</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <HelpBadgesGroup rtl>
          <HelpItemBadge item={helpItemsImenice.skI_gen_mn_note1} />
        </HelpBadgesGroup>
        <WithHelpItemTooltip item={helpItemsImenice.skI_gen_mn_nepostA}>
          <WrappedRunawayA />
        </WithHelpItemTooltip>

        <Ending>a</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(2)} w={1} h={2}>
        <Ending>ama</Ending>
      </BasicQuell>
    </ProvideCellContentProps>
  );
});

const ImeniceIIjdQuells = observer<{
  x: number;
  y: number;
}>(function ImeniceIIjdQuells({ x, y }) {
  const ty = numberWrap(y);

  return (
    <>
      <BasicQuell x={x} y={ty.take()} w={1} h={1}>
        <WithHelpItemTooltip item={helpItemsImenice.skII_vok_jd_palat}>
          <ExchangeSymbol color={palette.palatizacija} />
        </WithHelpItemTooltip>
        <Ending secondary>
          <SeparatedVBox>
            <Flex>e</Flex>
            <WithHelpItemTooltip item={helpItemsImenice.skII_vok_jd_meki}>
              <Flex c={palette.zaPalatalnim}>u</Flex>
            </WithHelpItemTooltip>
          </SeparatedVBox>
        </Ending>
      </BasicQuell>
      <BasicQuell x={x + 1} y={ty.take()} w={1} h={1}>
        <Ending secondary>
          <EmptyChar />
        </Ending>
      </BasicQuell>
      <BasicQuell x={x + 2} y={ty.take()} w={1} h={3}>
        <Ending bold>o</Ending>
      </BasicQuell>
      <BasicQuell x={x + 3} y={ty.takeAndAdd(1)} w={1} h={3}>
        <Ending bold>e</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={2} h={1}>
        <WithHelpItemTooltip item={helpItemsImenice.skII_nom_jd_gen_mn_m_neposA}>
          <WrappedRunawayA />
        </WithHelpItemTooltip>

        <Ending bold>
          <EmptyChar />
        </Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={2} h={1}>
        <GNCellContent />
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={6} h={1}>
        <Ending>
          <NT4 />a
        </Ending>
        <WithHelpItemTooltip item={helpItemsImenice.skII_nom_jd_gen_mn_m_neposA}>
          <WrappedRunawayA rtl />
        </WithHelpItemTooltip>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={4} h={1}>
        <Ending>
          <NT4 />
          <SeparatedVBox>
            <Flex>o</Flex>
            <WithHelpItemTooltip item={helpItemsImenice.skII_ins_jd_meki}>
              <Flex c={palette.zaPalatalnim}>e</Flex>
            </WithHelpItemTooltip>
          </SeparatedVBox>
          m
        </Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={4} h={1}>
        <Ending>
          <NT4 />u
        </Ending>
      </BasicQuell>
    </>
  );
});

const ImeniceIImnQuells = observer<{
  x: number;
  y: number;
}>(function ImeniceIImnQuells({ x, y }) {
  const ty = numberWrap(y);

  return (
    <ProvideCellContentProps value={{ mn: true }}>
      <BasicQuell x={x} y={ty.take()} w={1} h={2}>
        <WithHelpItemTooltip item={helpItemsImenice.skII_vok_ins_dat_lok_mn_sibil}>
          <ExchangeSymbol color={palette.sibilizacija} />
        </WithHelpItemTooltip>

        <Ending shiftTop>i</Ending>
      </BasicQuell>
      <BasicQuell x={x + 1} y={ty.takeAndAdd(2)} w={1} h={3}>
        <Ending>
          <NT4 />a
        </Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(2)} w={1} h={1}>
        <Ending>e</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(2)} w={2} h={2}>
        <WithHelpItemTooltip item={helpItemsImenice.skII_vok_ins_dat_lok_mn_sibil}>
          <ExchangeSymbol color={palette.sibilizacija} />
        </WithHelpItemTooltip>

        <Ending>
          <NT4 />
          ima
        </Ending>
      </BasicQuell>
    </ProvideCellContentProps>
  );
});

const ImeniceIIIQuells = observer<{
  x: number;
  y: number;
}>(function ImeniceIIIQuells({ x, y }) {
  const ty = numberWrap(y);

  return (
    <>
      <BasicQuell x={x} y={ty.take()} w={1} h={1}>
        <Ending secondary>i</Ending>
      </BasicQuell>
      <BasicQuell x={x + 1} y={ty.takeAndAdd(1)} w={1} h={3}>
        <Ending secondary mn>
          i
        </Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(2)} w={1} h={2}>
        <WithHelpItemTooltip item={helpItemsImenice.skIII_note_nepostA}>
          <WrappedRunawayA />
        </WithHelpItemTooltip>
        <Ending bold>
          <EmptyChar />
        </Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={2} h={1}>
        <Ending>i</Ending>
      </BasicQuell>
      <BasicQuell x={x + 1} y={ty.take() - 1} w={1} h={1} noBorders>
        <HelpBadgesGroup rtl>
          <HelpItemBadge item={helpItemsImenice.skIII_gen_mn_iju} />
        </HelpBadgesGroup>
      </BasicQuell>
      <BasicQuell x={x} y={ty.take()} w={1} h={1}>
        <HelpBadgesGroup>
          <HelpItemBadge item={helpItemsImenice.skIII_ins_jd_J} />
          <HelpItemBadge item={helpItemsImenice.skIII_ins_jd_I} />
        </HelpBadgesGroup>
        <Ending>ju</Ending>
      </BasicQuell>
      <BasicQuell x={x + 1} y={ty.takeAndAdd(1)} w={1} h={2}>
        <Ending mn>ima</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <Ending>i</Ending>
      </BasicQuell>
    </>
  );
});

const imeniceRenders = [
  (tx, ty) => (
    <>
      <ImeniceIjdQuells x={tx.takeAndAdd(1)} y={ty} />
      <ImeniceImnQuells x={tx.takeAndAdd(1)} y={ty} />
    </>
  ),
  (tx, ty) => (
    <>
      <ImeniceIIjdQuells x={tx.takeAndAdd(4)} y={ty} />
      <ImeniceIImnQuells x={tx.takeAndAdd(2)} y={ty} />
    </>
  ),
  (tx, ty) => (
    <>
      <ImeniceIIIQuells x={tx.takeAndAdd(3)} y={ty} />
    </>
  ),
] as const satisfies ((tx: ReturnType<typeof numberWrap>, ty: number) => ReactElement)[];

const PridjevMSJdQuells = observer<{
  x: number;
  y: number;
}>(function PridjevMSJdQuells({ x, y }) {
  const ty = numberWrap(y);

  return (
    <>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={2} h={1}>
        <WithHelpItemTooltip item={helpItemsPridjev.neodr_vok_note}>
          <Ending secondary>i</Ending>
        </WithHelpItemTooltip>
      </BasicQuell>
      <BasicQuell x={x} y={ty.take()} w={1} h={1}>
        <Ending>i</Ending>
        <WithHelpItemTooltip item={helpItemsPridjev.neodr_nom_m_jd_nepostA}>
          <Ending labelType="neodreden">
            <EmptyChar />
          </Ending>
        </WithHelpItemTooltip>
      </BasicQuell>
      <BasicQuell x={x + 1} y={ty.takeAndAdd(1)} w={1} h={2}>
        <Ending>
          <SeparatedVBox>
            <Flex>o</Flex>
            <WithHelpItemTooltip item={helpItemsPridjev.odr_m_s_meki}>
              <Flex style={{ color: palette.zaPalatalnim }}>e</Flex>
            </WithHelpItemTooltip>
          </SeparatedVBox>
        </Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <GNCellContent />
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={2} h={1}>
        <Ending>
          <SeparatedVBox>
            <Flex>o</Flex>
            <WithHelpItemTooltip item={helpItemsPridjev.odr_m_s_meki}>
              <Flex style={{ color: palette.zaPalatalnim }}>e</Flex>
            </WithHelpItemTooltip>
          </SeparatedVBox>
          <Flex>
            g
            <WithHelpItemTooltip item={helpItemsPridjev.odr_gen_dat_m_s_kratki}>
              <Flex>(a)</Flex>
            </WithHelpItemTooltip>
          </Flex>
        </Ending>
        <Ending labelType="neodreden">a</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={2} h={1}>
        <Ending>im</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={2} h={1}>
        <Ending>
          <SeparatedVBox>
            <Flex>o</Flex>
            <WithHelpItemTooltip item={helpItemsPridjev.odr_m_s_meki}>
              <Flex style={{ color: palette.zaPalatalnim }}>e</Flex>
            </WithHelpItemTooltip>
          </SeparatedVBox>
          <Flex>m</Flex>
          <WithHelpItemTooltip item={helpItemsPridjev.odr_gen_dat_m_s_kratki}>
            <Flex style={{ color: allPadeziDescriptions.d.c }}>(</Flex>
          </WithHelpItemTooltip>
          <WithHelpItemTooltip item={helpItemsPridjev.odr_dat_lok_ome}>
            <SeparatedVBox>
              <Flex>u</Flex>
              <Flex>e</Flex>
            </SeparatedVBox>
          </WithHelpItemTooltip>
          <WithHelpItemTooltip item={helpItemsPridjev.odr_gen_dat_m_s_kratki}>
            <Flex style={{ color: allPadeziDescriptions.d.c }}>)</Flex>
          </WithHelpItemTooltip>
        </Ending>
        <Ending labelType="neodreden">u</Ending>
      </BasicQuell>
    </>
  );
});

const PridjevZJdQuells = observer<{
  x: number;
  y: number;
}>(function PridjevZJdQuells({ x, y }) {
  const ty = numberWrap(y);

  return (
    <>
      <BasicQuell x={x} y={ty.takeAndAdd(2)} w={1} h={2}>
        <Ending shiftTop>a</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <Ending>u</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <Ending>e</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <Ending>om</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <Ending>oj</Ending>
      </BasicQuell>
    </>
  );
});

const PridjevMnQuells = observer<{
  x: number;
  y: number;
}>(function PridjevMnQuells({ x, y }) {
  const ty = numberWrap(y);

  return (
    <ProvideCellContentProps value={{ mn: true }}>
      <BasicQuell x={x} y={ty.take()} w={1} h={2}>
        <Ending shiftTop>i</Ending>
      </BasicQuell>
      <BasicQuell x={x + 1} y={ty.take()} w={1} h={3}>
        <Ending>a</Ending>
      </BasicQuell>
      <BasicQuell x={x + 2} y={ty.takeAndAdd(2)} w={1} h={3}>
        <Ending>e</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={1} h={1}>
        <Ending>e</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(1)} w={3} h={1}>
        <Ending>ih</Ending>
      </BasicQuell>
      <BasicQuell x={x} y={ty.takeAndAdd(2)} w={3} h={2}>
        <Ending>
          im
          <WithHelpItemTooltip item={helpItemsPridjev.odr_ins_dat_lok_mn_ima}>
            <Flex>(a)</Flex>
          </WithHelpItemTooltip>
        </Ending>
      </BasicQuell>
    </ProvideCellContentProps>
  );
});

const padeziUsageDescrs = {
  v: () => <Flex style={{ color: allPadeziDescriptions.v.c }}>hej, ...!</Flex>,
  n: () => <Flex style={{ color: allPadeziDescriptions.n.c }}>to je ...</Flex>,
  a: () => <Flex style={{ color: allPadeziDescriptions.a.c }}>vidim ...</Flex>,
  g: () => <Flex style={{ color: allPadeziDescriptions.g.c }}>bez ...</Flex>,
  i: () => <Flex style={{ color: allPadeziDescriptions.i.c }}>postati ...</Flex>,
  d: () => (
    <Flex style={{ color: allPadeziDescriptions.d.c }}>
      pričati <Flex style={{ color: allPadeziDescriptions.l.c }}>(o)</Flex> ...
    </Flex>
  ),
} as const;

const PadezLabelName = observer<
  PropsWithChildren<{
    symbol: SubjectSymbol;
    i: number;
    count: number;
  }>
>(function PadezLabelName({ symbol: { bold, striped, c }, i, count, children }) {
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        fontWeight: bold ? `bold` : undefined,
        color: css(c).desaturate(1.5).darker(1.4).hex(),
        marginTop: count > 1 ? `${(i > 0 ? 1 : -1) * 0.7}rem` : 0,
        marginLeft: count > 1 ? `${(i > 0 ? 1 : -1) * 0.3}rem` : 0,
      }}
    >
      {striped && <WithTiledBackground color={c} width={3} step={4} opacity={0.1} />}
      <Flex>{children}</Flex>
    </Flex>
  );
});

const CollapsedHelpItems = observer<{
  items: HelpItem[];
}>(function CollapsedHelpItems({ items }) {
  return (
    <Tooltip
      maw="90vw"
      withArrow
      styles={{ tooltip: { whiteSpace: `pre-wrap` } }}
      label={
        <Flex direction="column" gap="sm">
          {items.map((item, i) => (
            <Fragment key={i}>{item.render()}</Fragment>
          ))}
        </Flex>
      }
    >
      <IconNotes color={'#000'} size={'1rem'} style={{ zIndex: 200 }} />
    </Tooltip>
  );
});

const deklinacijaAdditions = [
  () => (
    <CollapsedHelpItems
      items={[
        helpItemsImenice.skI_note_ica,
        helpItemsImenice.skIV_note1,
        helpItemsImenice.skIV_note2,
        helpItemsImenice.skIV_note3,
        helpItemsImenice.skIV_note4,
        helpItemsImenice.skIV_note5,
      ]}
    />
  ),
  () => (
    <CollapsedHelpItems
      items={[
        helpItemsImenice.skII_note_l_o,
        helpItemsImenice.skII_note1,
        helpItemsImenice.skII_note2,
        helpItemsImenice.skII_note3,
        helpItemsImenice.skII_note4,
        helpItemsImenice.skII_note5,
        helpItemsImenice.skII_note6,
        helpItemsImenice.skII_note7,
        helpItemsImenice.skII_note8,
      ]}
    />
  ),
  () => (
    <CollapsedHelpItems
      items={[
        helpItemsImenice.skIII_note_l_o,
        helpItemsImenice.skIII_note1,
        helpItemsImenice.skIII_note2,
        helpItemsImenice.skIII_note3,
      ]}
    />
  ),
] as const;

export const SubjectsContentQuells = observer(function SubjectsContentQuells() {
  const ry = numberWrap(0);

  const tx = numberWrap(2);
  const ty = 2;

  return (
    <>
      <SubjectsHeaders x={0} y={ry.takeAndAdd(SubjectsHeaders.rowSpan)} />

      <PadeziLinesQuells
        list={subjectsPadezi}
        x={0}
        y={ty}
        contentColsWidth={21}
        nameQuellProps={{
          align: `center`,
          justify: `space-between`,
          style: spreadLR(`1rem`, `padding`),
        }}
        renderQuellContent={(symbols, prepare) => {
          return (
            <>
              <Flex flex={`0 0 rem`}>
                {symbols.map((symbol, i) => {
                  const rendered = prepare(symbol);
                  return (
                    rendered && (
                      <PadezLabelName key={i} symbol={symbol} i={i} count={symbols.length}>
                        {rendered}
                      </PadezLabelName>
                    )
                  );
                })}
              </Flex>
              <Flex
                style={{
                  fontSize: '0.9rem',
                  border: `1px dashed ${allPadeziDescriptions[symbols[0].s[0] as keyof typeof allPadeziDescriptions]?.c}`,
                  lineHeight: 1,
                  padding: `0.2rem 0.5rem`,
                  borderRadius: `0.5rem`,
                  opacity: 0.8,
                }}
              >
                {padeziUsageDescrs[symbols[0].s[0] as keyof typeof padeziUsageDescrs]?.()}
              </Flex>
            </>
          );
        }}
      />

      {skupinaOrder.map(i => {
        return (
          <Fragment key={i}>
            <VerticalQuell
              x={tx.takeAndAdd(1)}
              y={ty}
              h={6}
              labelRotatedProps={{ rootProps: { style: { zIndex: 100 } } }}
              label={
                <>
                  <Flex align="baseline" style={{ whiteSpace: `nowrap`, lineHeight: `1` }}>
                    <Flex style={{ fontSize: `100%`, fontWeight: `bold` }}>{[`a`, `o`, `i`][i]}</Flex>
                    <Flex style={{ fontSize: `80%` }}>-deklinacija</Flex>
                  </Flex>
                </>
              }
            >
              {declencijeHeaderTiles[i]()}

              <>{deklinacijaAdditions[i]()}</>
            </VerticalQuell>
            {imeniceRenders[i](tx, ty)}
          </Fragment>
        );
      })}

      <PridjevMSJdQuells x={tx.takeAndAdd(2)} y={ty} />
      <PridjevZJdQuells x={tx.takeAndAdd(1)} y={ty} />
      <PridjevMnQuells x={tx.takeAndAdd(3)} y={ty} />
    </>
  );
});
