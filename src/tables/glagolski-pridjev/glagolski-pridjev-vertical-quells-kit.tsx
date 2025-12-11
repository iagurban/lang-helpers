import { samplesBy } from '@grbn/kit';
import { Flex } from '@mantine/core';
import { IconCaretDownFilled as ArrowDownIcon } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';

import { semiHeaderQuellStyle } from '../../const/styles-parts.tsx';
import { StandardJdMnMSZHeader } from '../../parts/standard-jd-mn-m-s-z-header.tsx';
import { VrstLabel } from '../../parts/styling/vrst-label.tsx';
import { HeadingTile } from '../../parts/tiles.tsx';
import { useRootStore } from '../../storage.ts';
import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell } from '../../util/Quable.tsx';
import { spreadLTRB } from '../../util/spread-ltrb.tsx';
import { HeadingHeadingQuell, HeadingQuell } from '../quells/custom-quells.tsx';
import { GlagolskiPridjevEndingsQuells } from './glagolski-pridjev-endings-quells.tsx';
import { GlagolskiPridjevFormulaQuells } from './glagolski-pridjev-formula-quells.tsx';
import { RadniTrpniDescrQuells } from './radni-trpni-descr-quells.tsx';

export const GlagolskiPridjevVerticalQuellsKit = observer<{
  x: number;
  y: number;
}>(function GlagolskiPridjevVerticalQuellsKit({ x, y }) {
  const store = useRootStore();

  const tx = numberWrap(x);
  const ty = numberWrap(y);

  const dashedBorder = `1px dashed #000`;
  const preRowSpan = 1;

  const renderHeader = (x: number, y: number, w: number, h: number) => {
    const tx = numberWrap(x);
    const ty = numberWrap(y);

    return (
      <HeadingQuell
        x={tx.take()}
        y={ty.takeAndAdd(2)}
        w={w}
        h={h}
        big
        bright
        rootProps={{
          style: { ...spreadLTRB(`1px solid #000`, `border`, `t`, `l`), ...semiHeaderQuellStyle },
        }}
      >
        <VrstLabel>glagolski pridjev</VrstLabel>
        <ArrowDownIcon style={{ width: `0.75em` }} />
      </HeadingQuell>
    );
  };

  const headerColSpan = 1;

  return (
    <>
      {store.subjektiOpened ? (
        samplesBy(6, i => (
          <Fragment key={i}>
            <BasicQuell
              x={tx.take() + i}
              y={ty.takeAndAdd(i >= 5 ? preRowSpan : 0) - 1}
              h={preRowSpan + 1}
              rootProps={{
                style: {
                  borderRight: dashedBorder,
                  borderLeft: i === 0 ? dashedBorder : `none`,
                  borderBottom: `none`,
                },
              }}
            ></BasicQuell>
          </Fragment>
        ))
      ) : (
        <>
          {renderHeader(tx.take(), ty.takeAndAdd(1), 7, 1)}
          <StandardJdMnMSZHeader x={tx.take()} y={ty.takeAndAdd(2)} />
        </>
      )}
      {store.subjektiOpened ? renderHeader(tx.take(), ty.takeAndAdd(2), 7, 2) : undefined}
      <BasicQuell x={tx.takeAndAdd(0) + 6} y={ty.takeAndAdd(0)}>
        <HeadingTile />
      </BasicQuell>
      <GlagolskiPridjevFormulaQuells
        x={tx.takeAndAdd(0)}
        y={ty.takeAndAdd(1)}
        w={6}
        h={1}
        formulaRowSpan={7}
        formulaColSpan={3}
      />
      <GlagolskiPridjevEndingsQuells x={tx.takeAndAdd(6)} y={ty.take()} />
      <RadniTrpniDescrQuells x={tx.take()} y={ty.takeAndAdd(-3)} w={1} />

      <HeadingHeadingQuell x={tx.take()} y={ty.takeAndAdd(1)} w={headerColSpan} h={1} rtl>
        <Flex>lice</Flex>
      </HeadingHeadingQuell>
      <HeadingHeadingQuell x={tx.takeAndAdd(headerColSpan)} y={ty.takeAndAdd(1)} w={headerColSpan} h={1} rtl>
        <Flex>broj</Flex>
      </HeadingHeadingQuell>
    </>
  );
});
