import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { endingQuellNormalHeight, endingQuellSmallHeight } from '../../const/whatewer.ts';
import { DimensionSizesDefinition, Quable, quableStructure } from '../../util/Quable.tsx';
import { useLayouter } from '../columns-definitions.tsx';
import { SubjectsContentQuells } from './subjects-content-quells.tsx';

export const ImenicaBlockFullQuable = observer(function ImenicaBlockFullQuable() {
  const layouter = useLayouter();

  const quable = useMemo(
    (): ReturnType<typeof quableStructure.use> => ({
      rows: DimensionSizesDefinition.builder()
        // broj-rod-skupina header
        .add(endingQuellSmallHeight, 2)
        // rest rows
        .finish(endingQuellNormalHeight),
      cols: layouter.subjectsColumnsDesc,

      rowsCount: 8,
      get columnsCount() {
        return layouter.subjectsColumnsDesc.count;
      },
    }),
    [layouter]
  );

  return (
    <quableStructure.provider value={quable}>
      <Quable style={{ flex: '1 0 auto' }} direction="column">
        <SubjectsContentQuells />
      </Quable>
    </quableStructure.provider>
  );
});
