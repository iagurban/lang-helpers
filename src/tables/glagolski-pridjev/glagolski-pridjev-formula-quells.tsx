import { IconDirectionSign as DirectionSignIcon } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';

import { Anchor } from '../../parts/styling/anchor.tsx';
import { makeFormulaFrameProps } from '../../parts/tiles.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell } from '../../util/Quable.tsx';
import { WordFlex } from '../../util/word-flex.tsx';
import { SquareBracedExpr } from '../glagolske-forme/glagolski-forme-left-header-quells.tsx';
import { TileFramedQuell } from '../quells/tile-framed-quell.tsx';

export const GlagolskiPridjevFormulaQuells = observer<{
  x: number;
  y: number;
  w?: number;
  h: number;
  formulaRowSpan: number;
  formulaColSpan: number;
}>(function GlagolskiPridjevFormulaQuells({ x, y, w = 1, h, formulaRowSpan, formulaColSpan = 1 }) {
  const tx = numberWrap(x);
  const ty = numberWrap(y);
  return (
    <>
      <TileFramedQuell
        x={tx.take()}
        y={ty.take()}
        w={formulaRowSpan}
        h={formulaColSpan}
        {...makeFormulaFrameProps()}
      />

      <BasicQuell x={tx.takeAndAdd(1)} y={ty.take()} w={w} h={h}>
        <SquareBracedExpr>
          <Anchor>OP</Anchor>
        </SquareBracedExpr>
        <WordFlex>+</WordFlex>
        <DirectionSignIcon style={{ transform: `rotate(90deg)` }} />
      </BasicQuell>
    </>
  );
});
