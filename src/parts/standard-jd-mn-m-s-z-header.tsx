import { observer } from 'mobx-react-lite';

import { HeadingQuell, JDMNQuell } from '../tables/quells/custom-quells.tsx';
import { numberWrap } from '../util/number-wrap.tsx';

export const StandardJdMnMSZHeader = Object.assign(
  observer<{
    x: number;
    y: number;
  }>(function StandardJdMnMSZHeader({ x, y }) {
    const tx = numberWrap(x);
    const ty = numberWrap(y);

    return (
      <>
        <JDMNQuell x={tx.takeAndAdd(3)} y={ty.take()} w={3} />
        <JDMNQuell x={tx.takeAndSet(x)} y={ty.takeAndAdd(1)} w={3} mn />
        <HeadingQuell x={tx.takeAndAdd(1)} y={ty.take()} w={1} h={1}>
          m.
        </HeadingQuell>
        <HeadingQuell x={tx.takeAndAdd(1)} y={ty.take()} w={1} h={1}>
          s.
        </HeadingQuell>
        <HeadingQuell x={tx.takeAndAdd(1)} y={ty.take()} w={1} h={1}>
          ž.
        </HeadingQuell>
        <HeadingQuell x={tx.takeAndAdd(1)} y={ty.take()} w={1} h={1}>
          m.
        </HeadingQuell>
        <HeadingQuell x={tx.takeAndAdd(1)} y={ty.take()} w={1} h={1}>
          s.
        </HeadingQuell>
        <HeadingQuell x={tx.takeAndAdd(1)} y={ty.take()} w={1} h={1}>
          ž.
        </HeadingQuell>
      </>
    );
  }),
  { rowSpan: 2, colSpan: 6 }
);
