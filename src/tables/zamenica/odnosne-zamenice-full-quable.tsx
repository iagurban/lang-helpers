import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { endingQuellNormalHeight, endingQuellSmallHeight } from '../../const/whatewer.ts';
import { StandardJdMnMSZHeader } from '../../parts/standard-jd-mn-m-s-z-header.tsx';
import { DimensionSizesDefinition, Quable, quableStructure } from '../../util/Quable.tsx';
import { breakStripeWidth, useLayouter } from '../columns-definitions.tsx';
import { OdnosneZameniceQuells } from './odnosne-zamenice-quells.tsx';
import { odnosneImenicePadezi, pokazneImenicePadezi } from './padezi.ts';

export const OdnosneZameniceFullQuable = observer(function OdnosneZameniceFullQuable() {
  const layouter = useLayouter();

  const info = useMemo(() => {
    const cellWidth = layouter.endingQuellNormalWidth * 1.1;

    const odnosneImeniceColumnsDesc = DimensionSizesDefinition.builder()
      // padezi
      .add(endingQuellNormalHeight * 6 /* TODO */, 1)
      // pokazni
      .add(endingQuellNormalHeight, 1)
      .add(cellWidth, StandardJdMnMSZHeader.colSpan)
      // upitne
      .add(endingQuellNormalHeight, 1)
      .add(cellWidth, StandardJdMnMSZHeader.colSpan)
      // pravi
      .add(endingQuellNormalHeight, 1)
      .add(endingQuellNormalHeight * 3, 2)
      .finish();

    const fullRowsCount =
      StandardJdMnMSZHeader.rowSpan + odnosneImenicePadezi.length + 1 + pokazneImenicePadezi.length;

    return { odnosneImeniceColumnsDesc, fullRowsCount };
  }, [layouter]);

  const quable = useMemo(
    (): ReturnType<typeof quableStructure.use> => ({
      rows: DimensionSizesDefinition.builder()
        .add(breakStripeWidth, 1)
        .add(endingQuellSmallHeight, 2)
        .add(endingQuellNormalHeight, odnosneImenicePadezi.length)
        .add(breakStripeWidth, 1)
        .finish(endingQuellNormalHeight), // <- rest
      cols: info.odnosneImeniceColumnsDesc,

      rowsCount: info.fullRowsCount + 1,
    }),
    [layouter, info]
  );

  return (
    <>
      <quableStructure.provider value={quable}>
        <Quable>
          <OdnosneZameniceQuells />
        </Quable>
      </quableStructure.provider>
    </>
  );
});
