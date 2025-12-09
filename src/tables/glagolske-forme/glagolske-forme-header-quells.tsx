import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { numberWrap } from '../../util/number-wrap.tsx';
import { HeadingHeadingQuell, HeadingQuell, JDMNQuell } from '../quells/custom-quells.tsx';

export const GlagolskeFormeHeaderQuells = Object.assign(
  observer<{
    x: number;
    y: number;
    headerColSpan: number;
  }>(function GlagolskeFormeHeader({ x, y, headerColSpan }) {
    const tx = numberWrap(x);
    const ty = numberWrap(y);

    const renderHeadBlock = (lice: number) => {
      const w2 = lice === 3 ? 3 : 1;
      return (
        <>
          <HeadingQuell x={tx.take()} y={y} w={w2 * 2} h={1}>
            {lice}.
          </HeadingQuell>
          <JDMNQuell x={tx.takeAndAdd(w2)} y={y + 1} w={w2} />
          <JDMNQuell x={tx.takeAndAdd(w2)} y={y + 1} w={w2} mn />
        </>
      );
    };

    return (
      <>
        <HeadingHeadingQuell x={tx.take()} y={ty.takeAndAdd(1)} w={headerColSpan} h={1}>
          <Flex>lice</Flex>
        </HeadingHeadingQuell>
        <HeadingHeadingQuell x={tx.takeAndAdd(headerColSpan)} y={ty.takeAndAdd(1)} w={headerColSpan} h={1}>
          <Flex>broj</Flex>
        </HeadingHeadingQuell>

        {renderHeadBlock(1)}
        {renderHeadBlock(2)}
        {renderHeadBlock(3)}
      </>
    );
  }),
  { rowSpan: 2, colSpan: 1 + 2 + 2 + 3 * 2 }
);
