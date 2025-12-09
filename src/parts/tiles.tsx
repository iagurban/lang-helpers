import { observer } from 'mobx-react-lite';
import { ComponentProps } from 'react';

import { TilePatternSvg, WithTiledBackground } from '../util/tiles-pattern-svg.tsx';

export const HeadingTile = observer(function HeadingTile() {
  return <WithTiledBackground color={'#ccc'} width={4} step={4} zIndex={1} />;
});

export const HardBreakTile = observer(function HardBreakTile() {
  return <WithTiledBackground color="#333" width={3} step={3} />;
});

export const SoftBreakTile = observer(function SoftBreakTile() {
  return <WithTiledBackground color="#bbb" width={3} step={3} />;
});

export const EmptyCellTile = observer(function EmptyCellTile() {
  return <WithTiledBackground color={'#d2d2d2'} width={2} step={2} zIndex={1} />;
});

export const HeadingHeadingTile = observer(function HeadingHeadingTile() {
  return <WithTiledBackground color={'#ccc'} background={'#ddd'} width={4} step={4} />;
});

export const makeFormulaTileProps = (): ComponentProps<typeof TilePatternSvg> =>
  ({
    color: `#a478fd`,
    width: 3,
    step: 3,
  }) as const;

export const makeFormulaFrameProps = (): ComponentProps<typeof TilePatternSvg> =>
  ({
    ...makeFormulaTileProps(),
    holeInset: 4,
    zIndex: 200,
  }) as const;
