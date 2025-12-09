import { samplesBy } from '@grbn/kit';
import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';

import { HeadingTile } from '../../parts/tiles.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { HeadingHeadingQuell, HeadingQuell } from '../quells/custom-quells.tsx';

export const LicneZameniceSubheaderQuells = observer<{
  x: number;
  y: number;
  headColSpan: number;
  extendedMode: boolean;
}>(function LicneZameniceSubheaderQuells({ x, y, headColSpan, extendedMode }) {
  const tx = numberWrap(x);
  return (
    <>
      <HeadingHeadingQuell x={tx.takeAndAdd(headColSpan)} y={y} w={headColSpan} h={1}>
        <Flex>rod</Flex>
      </HeadingHeadingQuell>
      <HeadingQuell x={tx.takeAndAdd(4)} y={y} w={4}>
        <HeadingTile />
      </HeadingQuell>
      {samplesBy(2, i => (
        <Fragment key={i}>
          <HeadingQuell x={tx.takeAndAdd(1)} y={y} w={1}>
            m.
          </HeadingQuell>
          <HeadingQuell x={tx.takeAndAdd(1)} y={y} w={1}>
            s.
          </HeadingQuell>
          <HeadingQuell x={tx.takeAndAdd(1)} y={y} w={1}>
            ž.
          </HeadingQuell>
        </Fragment>
      ))}
      <HeadingQuell x={tx.takeAndAdd(1)} y={y - (extendedMode ? 2 : 0)} w={2} h={1 + (extendedMode ? 2 : 0)}>
        <HeadingTile />
      </HeadingQuell>
    </>
  );
});
