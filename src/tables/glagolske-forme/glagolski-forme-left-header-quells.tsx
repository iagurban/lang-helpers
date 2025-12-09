import { Flex, FlexProps } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { forwardRef, PropsWithChildren } from 'react';

import { DirectionSignIcon } from '../../const/icons.ts';
import { palette } from '../../const/lang-palettes.tsx';
import {
  eaiHeaderFontStyle,
  pomocniFontStyle,
  semiHeaderQuellStyle,
  vrstStyle,
} from '../../const/styles-parts.tsx';
import { Anchor, ComplexAnchorDecl } from '../../parts/styling/anchor.tsx';
import { VrstLabel } from '../../parts/styling/vrst-label.tsx';
import { makeFormulaFrameProps } from '../../parts/tiles.tsx';
import { useRootStore } from '../../storage.ts';
import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell, QuellContent } from '../../util/Quable.tsx';
import { WordFlex } from '../../util/word-flex.tsx';
import { helpItemsGlagolsCurrentTime } from '../help-items.tsx';
import { HelpBadgesGroup, HelpItemBadge } from '../imenica-block/help-badges.tsx';
import { TileFramedQuell } from '../quells/tile-framed-quell.tsx';
import { VerticalQuell } from '../quells/vertical-quell.tsx';

export const SquareBracedExpr = observer(
  forwardRef<
    HTMLDivElement,
    PropsWithChildren<{
      big?: boolean;
    }>
  >(function SquareBracedExpr({ children, big }, ref) {
    const braceStyle = {
      fontWeight: `bold`,
      fontSize: `130%`,
      lineHeight: `1rem`,
      transform: `translateY(0.1rem)`,
    } satisfies FlexProps[`style`];

    return (
      <Flex align="baseline" ref={ref} gap="0.25drem">
        <Flex style={braceStyle}>[</Flex>
        {children}
        <Flex style={braceStyle}>]</Flex>
      </Flex>
    );
  })
);

export const GlagolskiFormeLeftHeaderQuells = observer<{
  x: number;
  y: number;
}>(function GlagolskiFormeLeftHeaderQuells({ x, y }) {
  const store = useRootStore();

  const ty = numberWrap(y);
  void x; // TODO

  return (
    <>
      <VerticalQuell
        x={0}
        y={ty.take()}
        w={1}
        h={7 + (store.showDvovidne ? 1 : 0)}
        rootProps={{ style: semiHeaderQuellStyle }}
        label={<VrstLabel>prezent</VrstLabel>}
      />

      <TileFramedQuell x={2} y={ty.take()} w={12} h={3} {...makeFormulaFrameProps()} />
      <BasicQuell x={2} y={ty.take()} w={2} h={3}>
        <HelpBadgesGroup rtl>
          <HelpItemBadge item={helpItemsGlagolsCurrentTime.note_suvrs} />
        </HelpBadgesGroup>
        <ComplexAnchorDecl name="OP" descr="prezenta" tight />
        <Flex>+</Flex>
        <DirectionSignIcon />
      </BasicQuell>
      <BasicQuell
        x={1}
        y={ty.takeAndAdd(1)}
        w={1}
        h={1}
        rootProps={{ style: { position: 'relative', ...eaiHeaderFontStyle, ...semiHeaderQuellStyle } }}
      >
        <Flex>«E»</Flex>
      </BasicQuell>
      <BasicQuell
        x={1}
        y={ty.takeAndAdd(1)}
        w={1}
        h={1}
        rootProps={{ style: { ...eaiHeaderFontStyle, ...semiHeaderQuellStyle } }}
      >
        «A»
      </BasicQuell>
      <BasicQuell
        x={1}
        y={ty.takeAndAdd(1)}
        w={1}
        h={1}
        rootProps={{ style: { ...eaiHeaderFontStyle, ...semiHeaderQuellStyle } }}
      >
        «I»
      </BasicQuell>

      <BasicQuell
        x={1}
        y={ty.take()}
        w={1}
        h={3}
        color={palette.naglaseniPomocni}
        rootProps={{ style: semiHeaderQuellStyle }}
      >
        <QuellContent style={pomocniFontStyle} rotate>
          "biti"
        </QuellContent>
      </BasicQuell>
      <BasicQuell
        x={2}
        y={ty.takeAndAdd(1)}
        w={2}
        h={1}
        color={palette.naglaseniPomocni}
        rootProps={{ style: semiHeaderQuellStyle }}
      >
        naglašeni
      </BasicQuell>
      <BasicQuell
        x={2}
        y={ty.takeAndAdd(1)}
        w={2}
        h={1}
        color={palette.zanjekaniPomocni}
        rootProps={{ style: semiHeaderQuellStyle }}
      >
        zanjekani
      </BasicQuell>
      {store.showDvovidne && (
        <BasicQuell
          x={2}
          y={ty.takeAndAdd(1)}
          w={2}
          h={1}
          color={palette.dvovidniPresent}
          rootProps={{ style: semiHeaderQuellStyle }}
        >
          <HelpBadgesGroup rtl>
            <HelpItemBadge item={helpItemsGlagolsCurrentTime.dvovidni_note} />
          </HelpBadgesGroup>
          dvovidni
        </BasicQuell>
      )}

      <BasicQuell
        x={1}
        y={ty.take()}
        w={1}
        h={2}
        color={palette.naglaseniPomocni}
        rootProps={{ style: semiHeaderQuellStyle }}
      >
        <QuellContent style={pomocniFontStyle} rotate>
          "hteti"
        </QuellContent>
      </BasicQuell>
      <BasicQuell
        x={2}
        y={ty.takeAndAdd(1)}
        w={2}
        h={1}
        color={palette.naglaseniPomocni}
        rootProps={{ style: semiHeaderQuellStyle }}
      >
        naglašeni
      </BasicQuell>
      <BasicQuell
        x={2}
        y={ty.takeAndAdd(1)}
        w={2}
        h={1}
        color={palette.zanjekaniPomocni}
        rootProps={{ style: semiHeaderQuellStyle }}
      >
        zanjekani
      </BasicQuell>

      {store.showAorist && (
        <>
          <VerticalQuell
            x={0}
            y={ty.take()}
            w={1}
            h={3}
            rootProps={{ style: semiHeaderQuellStyle }}
            label={<Flex style={vrstStyle}>aorist</Flex>}
          />
          <TileFramedQuell x={1} y={ty.take()} w={13} h={1} {...makeFormulaFrameProps()} />

          <BasicQuell x={1} y={ty.takeAndAdd(1)} w={3} h={1}>
            <WordFlex>
              <SquareBracedExpr>
                <Anchor>OI</Anchor>
              </SquareBracedExpr>
            </WordFlex>
            <WordFlex>+</WordFlex>
            <DirectionSignIcon />
          </BasicQuell>
          <BasicQuell
            x={1}
            y={ty.takeAndAdd(1)}
            w={3}
            h={1}
            color={palette.naglaseniPomocni}
            rootProps={{ style: { ...pomocniFontStyle, ...semiHeaderQuellStyle } }}
          >
            "biti"
          </BasicQuell>
          <BasicQuell
            x={1}
            y={ty.takeAndAdd(1)}
            w={3}
            h={1}
            color={palette.naglaseniPomocni}
            rootProps={{ style: { ...pomocniFontStyle, ...semiHeaderQuellStyle } }}
          >
            "hteti"
          </BasicQuell>
        </>
      )}
      {store.showImperativ && (
        <>
          <VerticalQuell
            x={0}
            y={ty.take()}
            w={1}
            h={2}
            rootProps={{ style: semiHeaderQuellStyle }}
            label={
              <Flex style={{ ...vrstStyle, letterSpacing: `-0.5px`, fontSize: `94%`, marginRight: `1px` }}>
                imperativ
              </Flex>
            }
            noArrow
          />
          <TileFramedQuell x={1} y={ty.take()} w={13} h={1} {...makeFormulaFrameProps()} />

          <BasicQuell x={1} y={ty.takeAndAdd(1)} w={3} h={1}>
            <WordFlex>
              <SquareBracedExpr>
                <Anchor>OP</Anchor>
              </SquareBracedExpr>
            </WordFlex>
            <WordFlex>+</WordFlex>
            <DirectionSignIcon />
          </BasicQuell>
          <BasicQuell
            x={1}
            y={ty.takeAndAdd(1)}
            w={3}
            h={1}
            color={palette.naglaseniPomocni}
            rootProps={{ style: { ...pomocniFontStyle, ...semiHeaderQuellStyle } }}
          >
            "biti"
          </BasicQuell>
        </>
      )}
    </>
  );
});
