import { observer } from 'mobx-react-lite';

import { EmptyCellTile } from '../../parts/tiles.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { NormalQuell } from '../quells/normal-quell.tsx';
import { pokazneImenicePadezi } from './padezi.ts';

export const PovratneZameniceQuells = Object.assign(
  observer<{
    x: number;
    y: number;
  }>(function PovratneZameniceQuells({ x, y }) {
    const tx = numberWrap(x);
    const ty = numberWrap(y);
    return (
      <>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          <EmptyCellTile />
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(2)} w={1} h={2}>
          s(eb)e
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          s(eb)i
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          sebi
        </NormalQuell>
        <NormalQuell x={tx.takeAndAdd(1)} y={ty.takeAndSet(1)} w={1} h={1}>
          sobom
        </NormalQuell>
      </>
    );
  }),
  { rowSpan: pokazneImenicePadezi.length, colSpan: 1 }
);
