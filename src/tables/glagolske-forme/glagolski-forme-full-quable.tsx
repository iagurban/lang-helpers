import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { endingQuellNormalHeight, endingQuellSmallHeight } from '../../const/whatewer.ts';
import { HardBreakTile, SoftBreakTile } from '../../parts/tiles.tsx';
import { useRootStore } from '../../storage.ts';
import { BasicQuell, DimensionSizesDefinition, Quable, quableStructure } from '../../util/Quable.tsx';
import { breakStripeWidth, useLayouter } from '../columns-definitions.tsx';
import { GlagolskiFormeLeftHeaderQuells } from './glagolski-forme-left-header-quells.tsx';
import { GlagolskiFormeQuableUpperHeader } from './glagolski-forme-quable-upper-header.tsx';
import { GlagolskiFormeQuellsKit } from './glagolski-forme-quells-kit.tsx';

export const GlagolskiFormeFullQuable = observer(function GlagolskiFormeFullQuable() {
  const store = useRootStore();

  const layouter = useLayouter();

  const quable = useMemo(
    (): ReturnType<typeof quableStructure.use> =>
      makeAutoObservable({
        rows: DimensionSizesDefinition.builder()
          // break stripe
          .add(breakStripeWidth, 1)
          // infinitiv row
          .add(endingQuellNormalHeight * 2)
          /// lice/broj headers for glagolski forme
          .add(endingQuellSmallHeight, 2)
          // rest rows
          .finish(endingQuellNormalHeight),
        get rowsCount() {
          return (
            11 + (store.showAorist ? 3 : 0) + (store.showDvovidne ? 1 : 0) + (store.showImperativ ? 2 : 0)
          );
        },

        cols: layouter.glagloskeFormeColumnsDesc,
        get columnsCount() {
          return layouter.glagloskeFormeColumnsDesc.count;
        },
      }),
    [layouter]
  );

  return (
    <quableStructure.provider value={quable}>
      <Quable>
        <BasicQuell x={0} y={0} w={(quable.columnsCount || 0) - 2 - 6} noBorders>
          <HardBreakTile />
        </BasicQuell>
        <BasicQuell x={(quable.columnsCount || 0) - 2 - 6} y={0} w={7} noBorders>
          <SoftBreakTile />
        </BasicQuell>
        <GlagolskiFormeQuableUpperHeader x={0} y={0 + 1} />
        <GlagolskiFormeLeftHeaderQuells x={0} y={3 + 1} />
        <GlagolskiFormeQuellsKit x={4} y={3 + 1} />
      </Quable>
    </quableStructure.provider>
  );
});
