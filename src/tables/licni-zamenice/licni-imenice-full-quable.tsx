import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { endingQuellNormalHeight, endingQuellSmallHeight } from '../../const/whatewer.ts';
import { useRootStore } from '../../storage.ts';
import { DimensionSizesDefinition, Quable, quableStructure } from '../../util/Quable.tsx';
import { breakStripeWidth, licneImenicePadezi, useLayouter } from '../columns-definitions.tsx';
import { LicniZameniceQuells } from './licni-zamenice-quells.tsx';

export const LicniImeniceFullQuable = observer(function LicniImeniceFullQuable() {
  const store = useRootStore();
  const extendedMode = !store.predikatiOpened;

  const layouter = useLayouter();

  const quable = useMemo(
    (): ReturnType<typeof quableStructure.use> => ({
      rows: DimensionSizesDefinition.builder()
        // break stripe
        .add(breakStripeWidth, 1)
        // rod header
        .add(endingQuellSmallHeight)
        .cond(extendedMode, b => b.add(endingQuellSmallHeight, 2))
        // rest rows
        .finish(endingQuellNormalHeight),
      cols: layouter.licniImeniceColumnsDesc,

      rowsCount: 1 + licneImenicePadezi.length + 1 + (extendedMode ? 2 : 0),
    }),
    [extendedMode, layouter]
  );

  return (
    <quableStructure.provider value={quable}>
      <Quable>
        <LicniZameniceQuells extendedMode={extendedMode} />
      </Quable>
    </quableStructure.provider>
  );
});
