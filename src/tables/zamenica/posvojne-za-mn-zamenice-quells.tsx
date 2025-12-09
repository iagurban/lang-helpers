import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { palette } from '../../const/lang-palettes.tsx';
import { GNCellContent } from '../../parts/gn-cell-content.tsx';
import { SeparatedVBox } from '../../parts/separated-v-box.tsx';
import { StandardJdMnMSZHeader } from '../../parts/standard-jd-mn-m-s-z-header.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { KeysOfVariationBuilder, makeVariationsBuilder } from '../../util/variations-util.ts';
import { WordFlex } from '../../util/word-flex.tsx';
import { NormalQuell, ProvideCellContentProps } from '../quells/normal-quell.tsx';
import { odnosneImenicePadezi } from './padezi.ts';

export const mnozinePosvojneContent = makeVariationsBuilder(
  parts =>
    Object.fromEntries([`n`, `v`].map(t => [t, parts.flatMap(part => [t, part]).join(``)])) as Record<
      `n` | `v`,
      string
    >
)({
  m1n: [`aš`],
  s1n: [`aše`],
  ms1g: [`ašeg(a)`],
  ms1i: [`ašim`],
  ms1dl: [`ašem(u)`],
  z1n: [`aša`],
  z1a: [`ašu`],
  z1g: [`aše`],
  z1i: [`ašom`],
  z1dl: [`ašoj`],
  mNn: [`aši`],
  mNa: [`aš`], // +[e/a] at end will be rendered in place
  sNn: [`aša`],
  sNa: [`aše`],
  zNna: [`aše`],
  mszNg: [`aših`],
  mszNidl: [`ašim(a)`],
});

export const PosvojneZaMnZameniceQuells = Object.assign(
  observer<{
    x: number;
    y: number;
    mode: KeysOfVariationBuilder<typeof mnozinePosvojneContent>;
  }>(function PosvojneZaMnZameniceQuells({ x, y, mode }) {
    const tx = numberWrap(x);
    const ty = numberWrap(y);

    return (
      <>
        <NormalQuell x={tx.take()} y={ty.take()} w={1} h={1}>
          {mnozinePosvojneContent.m1n[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take() + 1} y={ty.takeAndAdd(1)} w={1} h={2}>
          {mnozinePosvojneContent.s1n[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          <GNCellContent />
        </NormalQuell>

        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={2} h={1}>
          {mnozinePosvojneContent.ms1g[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={2} h={1}>
          {mnozinePosvojneContent.ms1i[mode]}
        </NormalQuell>
        <NormalQuell x={tx.takeAndAdd(2)} y={ty.takeAndSet(y)} w={2} h={1}>
          {mnozinePosvojneContent.ms1dl[mode]}
        </NormalQuell>

        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {mnozinePosvojneContent.z1n[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {mnozinePosvojneContent.z1a[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {mnozinePosvojneContent.z1g[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {mnozinePosvojneContent.z1i[mode]}
        </NormalQuell>
        <NormalQuell x={tx.takeAndAdd(1)} y={ty.takeAndSet(y)} w={1} h={1}>
          {mnozinePosvojneContent.z1dl[mode]}
        </NormalQuell>

        <ProvideCellContentProps value={{ mn: true }}>
          <NormalQuell x={tx.take()} y={ty.take()} w={1} h={1}>
            {mnozinePosvojneContent.mNn[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.take() + 1} w={1} h={1}>
            <WordFlex>
              {mnozinePosvojneContent.mNa[mode]}
              <SeparatedVBox>
                <Flex style={{ color: palette.zivo }}>e</Flex>
                <Flex>a</Flex>
              </SeparatedVBox>
            </WordFlex>
          </NormalQuell>
          <NormalQuell x={tx.take() + 1} y={ty.take()} w={1} h={1}>
            {mnozinePosvojneContent.sNn[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take() + 1} y={ty.take() + 1} w={1} h={1}>
            {mnozinePosvojneContent.sNa[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take() + 2} y={ty.takeAndAdd(2)} w={1} h={2}>
            {mnozinePosvojneContent.zNna[mode]}
          </NormalQuell>

          <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={3} h={1}>
            {mnozinePosvojneContent.mszNg[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.takeAndSet(y)} w={3} h={2}>
            {mnozinePosvojneContent.mszNidl[mode]}
          </NormalQuell>
        </ProvideCellContentProps>
      </>
    );
  }),
  { rowSpan: odnosneImenicePadezi.length, colSpan: StandardJdMnMSZHeader.colSpan }
);
