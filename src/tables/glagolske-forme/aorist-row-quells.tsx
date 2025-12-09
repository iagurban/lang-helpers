import { observer } from 'mobx-react-lite';

import { palette } from '../../const/lang-palettes.tsx';
import { EmptyChar } from '../../parts/empty-char.tsx';
import { ZaSugl } from '../../parts/parts.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { WordFlex } from '../../util/word-flex.tsx';
import { NormalQuell } from '../quells/normal-quell.tsx';

export const AoristRowQuells = observer<{
  x: number;
  y: number;
  type: `base` | `bi` | `htjedo`;
}>(function AoristRowQuells({ x, y, type }) {
  const tx = numberWrap(x);
  const ty = numberWrap(y);

  const prefix = `${type === `base` ? `-` : ``}`;
  const O = type === `base` ? <ZaSugl text="o" /> : type;
  const E = type === `base` ? <ZaSugl text="e" /> : type;

  const noEnd =
    type === `base` ? (
      <>
        {prefix}
        {E}
        <EmptyChar />
      </>
    ) : type === `htjedo` ? (
      `htjede`
    ) : (
      type
    );

  const values = [
    <>
      {prefix}
      {O}h
    </>,
    <>
      {prefix}
      {O}smo
    </>,
    noEnd,
    <>
      {prefix}
      {O}ste
    </>,
    noEnd,
    type === `bi` ? (
      `bi(še)`
    ) : (
      <>
        {prefix}
        {O}še
      </>
    ),
  ] as const;

  return (
    <>
      {values.map((v, i) => {
        const w = i > 3 ? 3 : 1;
        return (
          <NormalQuell
            key={i}
            x={tx.takeAndAdd(w)}
            y={i === 5 ? ty.takeAndAdd(1) : ty.take()}
            w={w}
            h={1}
            mn={!!(i % 2)}
            rootProps={{
              style: type === `htjedo` || type === `bi` ? { color: palette.naglaseniPomocni } : undefined,
            }}
          >
            <WordFlex>{v}</WordFlex>
          </NormalQuell>
        );
      })}
    </>
  );
});
