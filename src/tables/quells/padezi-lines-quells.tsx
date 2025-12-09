import { Flex, FlexProps } from '@mantine/core';
import { color as chroma } from 'chroma.ts';
import { observer } from 'mobx-react-lite';
import { ComponentProps } from 'react';

import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell } from '../../util/Quable.tsx';
import { WithTiledBackground } from '../../util/tiles-pattern-svg.tsx';

export type SubjectSymbol = { s: string; c: string; bold?: boolean; striped?: boolean };

const defaultRenderQuellContent = (
  symbols: readonly SubjectSymbol[],
  prepare: (s: SubjectSymbol) => JSX.Element | string | null
) => {
  return (
    <>
      {symbols.map((symbol, i) => {
        const { c, bold, striped: _striped } = symbol;
        const rendered = prepare(symbol);
        return (
          rendered && (
            <Flex
              key={i}
              style={{
                fontWeight: bold ? `bold` : undefined,
                color: c,
                marginTop: symbols.length > 1 ? `${(i > 0 ? 1 : -1) * 0.7}rem` : 0,
                marginLeft: symbols.length > 1 ? `${(i > 0 ? 1 : -1) * 0.3}rem` : 0,
              }}
            >
              {/*{striped && <WithTiledBackground color={c} width={3} step={4} />}*/}
              {rendered}
            </Flex>
          )
        );
      })}
    </>
  );
};

export const identity = <T,>(o: T) => o;

const defaultRenderSymbol = (s: SubjectSymbol) => s.s;

const PadezLineQuells = observer<{
  symbols: readonly SubjectSymbol[];
  x: number;
  y: number;
  contentColsWidth: number;
  noHeader?: boolean;
  renderQuellContent?: (
    symbols: readonly SubjectSymbol[],
    prepare: (s: SubjectSymbol) => JSX.Element | string | null
  ) => JSX.Element;
  renderSymbol?: (s: SubjectSymbol) => JSX.Element | string | null;
  nameQuellProps?: FlexProps;
}>(function PadezLineQuells({
  symbols,
  contentColsWidth,
  noHeader,
  x,
  y,
  renderQuellContent = defaultRenderQuellContent,
  renderSymbol = defaultRenderSymbol,
  nameQuellProps,
}) {
  return (
    <>
      <BasicQuell
        x={x + (noHeader ? 0 : 1)}
        y={y}
        w={contentColsWidth}
        h={1}
        rootProps={{ direction: `column`, gap: 0 }}
        noBorders
      >
        {symbols.map((c, i) => {
          const color = chroma(c.c).desaturate(1.6).mix(chroma(`#fff`), 0.89).hex();
          return (
            <Flex
              key={i}
              style={{
                background: c.striped ? undefined : color,
                opacity: 0.99,
                flex: `1 0 0`,
                width: `100%`,
                position: `relative`,
              }}
            >
              {c.striped && <WithTiledBackground color={color} width={3} step={4} />}
            </Flex>
          );
        })}
      </BasicQuell>
      {!noHeader && (
        <BasicQuell
          x={x}
          y={y}
          w={1}
          h={1}
          // align="stretch"
          // crossAlign="stretch"
          rootProps={nameQuellProps}
        >
          {renderQuellContent(symbols, renderSymbol)}
        </BasicQuell>
      )}
    </>
  );
});

export const PadeziLinesQuells = observer<
  {
    list: readonly (readonly { c: string; n: string; bold?: boolean }[])[];
    x: number;
    y: number;
    contentColsWidth: number;
    noHeader?: boolean;
    nameQuellProps?: FlexProps;
  } & Pick<ComponentProps<typeof PadezLineQuells>, `renderQuellContent` | `renderSymbol`>
>(function PadeziLinesQuells({
  x,
  y,
  noHeader,
  contentColsWidth,
  list,
  renderQuellContent,
  renderSymbol,
  nameQuellProps,
}) {
  const ry = numberWrap(y);
  return (
    <>
      {list.map((s, i) => (
        <PadezLineQuells
          key={i}
          contentColsWidth={contentColsWidth}
          symbols={s.map(s => ({ c: s.c, s: s.n, bold: s.bold, striped: s.n[0] === `v` }))}
          x={x}
          y={ry.takeAndAdd(1)}
          noHeader={noHeader}
          renderQuellContent={renderQuellContent}
          renderSymbol={renderSymbol}
          nameQuellProps={nameQuellProps}
        />
      ))}
    </>
  );
});
