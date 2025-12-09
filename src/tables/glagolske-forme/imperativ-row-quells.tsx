import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { DirectionSignOffIcon } from '../../const/icons.ts';
import { palette } from '../../const/lang-palettes.tsx';
import { EmptyChar } from '../../parts/empty-char.tsx';
import { ZaSamoglOrJ } from '../../parts/parts.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { WordFlex } from '../../util/word-flex.tsx';
import { NormalQuell } from '../quells/normal-quell.tsx';
import { SquareBracedExpr } from './glagolski-forme-left-header-quells.tsx';

export const ImperativRowQuells = observer<{
  x: number;
  y: number;
  type: `base` | `bude`;
}>(function ImperativRowQuells({ x, y, type }) {
  const tx = numberWrap(x);
  const ty = numberWrap(y);

  const ij = <ZaSamoglOrJ sText="i" jText="j" />;

  const values =
    type === `base`
      ? [
          <>-{ij}mo</>,
          <>
            -{ij}
            <EmptyChar />
          </>,
          <>-{ij}te</>,
          <>
            <DirectionSignOffIcon
              style={{
                position: `absolute`,
                left: 0,
                height: `1.3rem`,
                top: `50%`,
                transform: `translateY(-50%)`,
              }}
            />
            neka{' '}
            <SquareBracedExpr>
              <Flex fs="italic">prezent 3. lica</Flex>
            </SquareBracedExpr>
          </>,
        ]
      : [`budemo`, `budi`, `budite`, `neka bude`, `neka budu`];

  return (
    <>
      {values.map((v, i) => {
        const w = i > 2 ? (type === `base` ? 6 : 3) : 1;
        return (
          <NormalQuell
            key={i}
            x={tx.takeAndAdd(w)}
            y={i === values.length - 1 ? ty.takeAndAdd(1) : ty.take()}
            w={w}
            h={1}
            mn={!(i % 2)}
            rootProps={{
              style: type === `bude` ? { color: palette.naglaseniPomocni } : undefined,
            }}
          >
            <WordFlex>{v}</WordFlex>
          </NormalQuell>
        );
      })}
    </>
  );
});
