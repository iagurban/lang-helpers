import { observer } from 'mobx-react-lite';

import { EmptyCellTile } from '../../parts/tiles.tsx';
import { useRootStore } from '../../storage.ts';
import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell } from '../../util/Quable.tsx';
import { AoristRowQuells } from './aorist-row-quells.tsx';
import { ImperativRowQuells } from './imperativ-row-quells.tsx';
import {
  PrezentskiBitiQuells,
  PrezentskiEAIQuells,
  PrezentskiFormeRowQuells,
  PrezentskiHtetiQuells,
} from './prezentski-forme-row-quells.tsx';

const prezentFormsViewJoinedMode = true;

export const GlagolskiFormeQuellsKit = observer<{
  x: number;
  y: number;
}>(function GlagolskiFormeQuellsKit({ x, y }) {
  const store = useRootStore();

  const tx = numberWrap(x);
  const ty = numberWrap(y);

  return (
    <>
      {prezentFormsViewJoinedMode ? (
        <PrezentskiEAIQuells x={tx.take()} y={ty.takeAndAdd(3)} />
      ) : (
        <>
          <PrezentskiFormeRowQuells x={tx.take()} y={ty.takeAndAdd(1)} type={`e`} />
          <PrezentskiFormeRowQuells x={tx.take()} y={ty.takeAndAdd(1)} type={`a`} />
          <PrezentskiFormeRowQuells x={tx.take()} y={ty.takeAndAdd(1)} type={`i`} />
        </>
      )}
      <PrezentskiBitiQuells x={tx.take()} y={ty.takeAndAdd(2)} />
      {store.showDvovidne && <PrezentskiFormeRowQuells x={tx.take()} y={ty.takeAndAdd(1)} type={`bude`} />}
      <PrezentskiHtetiQuells x={tx.take()} y={ty.takeAndAdd(2)} />

      {store.showAorist && (
        <>
          <AoristRowQuells x={tx.take()} y={ty.takeAndAdd(1)} type={`base`} />
          <AoristRowQuells x={tx.take()} y={ty.takeAndAdd(1)} type={`bi`} />
          <AoristRowQuells x={tx.take()} y={ty.takeAndAdd(1)} type={`htjedo`} />
        </>
      )}
      {store.showImperativ && (
        <>
          <BasicQuell x={4} y={ty.take()} w={1} h={2}>
            <EmptyCellTile />
          </BasicQuell>
          <ImperativRowQuells x={tx.take() + 1} y={ty.takeAndAdd(1)} type={`base`} />
          <ImperativRowQuells x={tx.take() + 1} y={ty.takeAndAdd(1)} type={`bude`} />
        </>
      )}
    </>
  );
});
