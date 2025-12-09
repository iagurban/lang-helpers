import { observer } from 'mobx-react-lite';

import { palette } from '../../const/lang-palettes.tsx';
import { AsteriskVar } from '../../parts/asterisk-var.tsx';
import { EmptyChar } from '../../parts/empty-char.tsx';
import { Ending } from '../../parts/styling/ending.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell } from '../../util/Quable.tsx';
import { ProvideCellContentProps } from '../quells/normal-quell.tsx';

const OptGpA = observer(function OptLetters() {
  return <span style={{ color: palette.zaSuglasnikon }}>(a)</span>;
});

export const GlagolskiPridjevEndingsQuells = observer<{
  x: number;
  y: number;
}>(function GlagolskiPridjevEndingsQuells({ x, y }) {
  const tx = numberWrap(x);
  const ty = y;
  return (
    <>
      <BasicQuell x={tx.take()} y={ty} w={1} h={1}>
        <Ending>
          <OptGpA />o
        </Ending>
      </BasicQuell>
      <BasicQuell x={tx.takeAndAdd(1)} y={ty + 1} w={1} h={1}>
        <Ending>
          <AsteriskVar />
          <EmptyChar />
        </Ending>
      </BasicQuell>
      <BasicQuell x={tx.takeAndAdd(1)} y={ty} w={1} h={2}>
        <Ending>
          <AsteriskVar />o
        </Ending>
      </BasicQuell>
      <BasicQuell x={tx.takeAndAdd(1)} y={ty} w={1} h={2}>
        <Ending>
          <AsteriskVar />a
        </Ending>
      </BasicQuell>
      <ProvideCellContentProps value={{ mn: true }}>
        <BasicQuell x={tx.takeAndAdd(1)} y={ty} w={1} h={2}>
          <Ending>
            <AsteriskVar />i
          </Ending>
        </BasicQuell>
        <BasicQuell x={tx.takeAndAdd(1)} y={ty} w={1} h={2}>
          <Ending>
            <AsteriskVar />a
          </Ending>
        </BasicQuell>
        <BasicQuell x={tx.takeAndAdd(1)} y={ty} w={1} h={2}>
          <Ending>
            <AsteriskVar />e
          </Ending>
        </BasicQuell>
      </ProvideCellContentProps>
    </>
  );
});
