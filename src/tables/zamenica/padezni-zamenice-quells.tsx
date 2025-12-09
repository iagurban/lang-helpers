import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { palette } from '../../const/lang-palettes.tsx';
import { emptyChar } from '../../const/unicode.tsx';
import { SeparatedVBox } from '../../parts/separated-v-box.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { KeysOfVariationBuilder, makeVariationsBuilder } from '../../util/variations-util.ts';
import { WordFlex } from '../../util/word-flex.tsx';
import { NormalQuell, ProvideCellContentProps } from '../quells/normal-quell.tsx';
import { pokazneImenicePadezi } from './padezi.ts';

export const padezniContent = makeVariationsBuilder(
  parts =>
    Object.fromEntries(
      [``, `ne`].map(t => [t === `` ? emptyChar : t, parts.flatMap(part => [t, part]).join(``)])
    ) as Record<typeof emptyChar | `ne`, string>
)({
  zn: [`(t)ko`],
  za: [`koga`],
  nna: [`što/`, `šta`],
  zg: [`kog(a)`],
  ng: [`čeg(a)`],
  zd: [`kom(u)`],
  zl: [`kom`], // [e/u] must be rendered in table
  ndl: [`čem(u)`],
  zi: [`kim(e)`],
  ni: [`čim(e)`],
});

export const PadezniZameniceQuells = Object.assign(
  observer<{
    x: number;
    y: number;
    mode: KeysOfVariationBuilder<typeof padezniContent>;
  }>(function PadezniZameniceQuells({ x, y, mode }) {
    const tx = numberWrap(x);
    const ty = numberWrap(y);

    return (
      <>
        <ProvideCellContentProps value={{ color: palette.zivo }}>
          <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
            {padezniContent.zn[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
            {padezniContent.za[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
            {padezniContent.zg[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
            {padezniContent.zd[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
            <WordFlex>
              {padezniContent.zl[mode]}
              <SeparatedVBox>
                <Flex>e</Flex>
                <Flex>u</Flex>
              </SeparatedVBox>
            </WordFlex>
          </NormalQuell>
          <NormalQuell x={tx.takeAndAdd(1)} y={ty.takeAndAdd(-5)} w={1} h={1}>
            {padezniContent.zi[mode]}
          </NormalQuell>
        </ProvideCellContentProps>

        <ProvideCellContentProps value={{ color: palette.nezivo }}>
          <NormalQuell x={tx.take()} y={ty.takeAndAdd(2)} w={1} h={2}>
            {padezniContent.nna[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
            {padezniContent.ng[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.takeAndAdd(2)} w={1} h={2}>
            {padezniContent.ndl[mode]}
          </NormalQuell>
          <NormalQuell x={tx.takeAndAdd(1)} y={ty.takeAndAdd(-5)} w={1} h={1}>
            {padezniContent.ni[mode]}
          </NormalQuell>
        </ProvideCellContentProps>
      </>
    );
  }),
  { rowSpan: pokazneImenicePadezi.length, colSpan: 2 }
);
