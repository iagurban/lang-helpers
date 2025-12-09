import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { StandardJdMnMSZHeader } from '../../parts/standard-jd-mn-m-s-z-header.tsx';
import { HeadingTile } from '../../parts/tiles.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { HeadingHeadingQuell, HeadingQuell } from '../quells/custom-quells.tsx';
import { odnosneImenicePadezi } from './padezi.ts';

export const OstaleZamenicaHeaderQuells = observer<{
  x: number;
  y: number;
}>(function OstaleZamenicaHeaderQuells({ x, y }) {
  const tx = numberWrap(0);
  const ty = numberWrap(1);

  return (
    <>
      <HeadingHeadingQuell x={tx.take()} y={ty.take()} w={2} h={1}>
        <Flex>rod</Flex>
      </HeadingHeadingQuell>
      <HeadingHeadingQuell x={tx.takeAndAdd(2)} y={ty.take() + 1} w={2} h={1}>
        <Flex>broj</Flex>
      </HeadingHeadingQuell>

      <StandardJdMnMSZHeader x={tx.takeAndAdd(StandardJdMnMSZHeader.colSpan)} y={ty.take()} />

      <HeadingQuell
        x={tx.takeAndAdd(1)}
        y={ty.take()}
        w={1}
        h={StandardJdMnMSZHeader.rowSpan + odnosneImenicePadezi.length}
      >
        <HeadingTile />
      </HeadingQuell>

      <StandardJdMnMSZHeader x={tx.takeAndAdd(StandardJdMnMSZHeader.colSpan)} y={ty.take()} />
    </>
  );
});
