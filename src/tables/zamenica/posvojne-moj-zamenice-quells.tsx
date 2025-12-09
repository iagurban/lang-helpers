import { observer } from 'mobx-react-lite';

import { GNCellContent } from '../../parts/gn-cell-content.tsx';
import { StandardJdMnMSZHeader } from '../../parts/standard-jd-mn-m-s-z-header.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { KeysOfVariationBuilder, makeVariationsBuilder } from '../../util/variations-util.ts';
import { NormalQuell, ProvideCellContentProps } from '../quells/normal-quell.tsx';
import { odnosneImenicePadezi } from './padezi.ts';

export const posvojneContent = makeVariationsBuilder(
  parts =>
    Object.fromEntries([`m`, `tv`].map(t => [t[0], parts.flatMap(part => [t, part]).join(``)])) as Record<
      `m` | `t`,
      string
    >
)({
  m1n: [`oj`],
  s1n: [`oje`],
  ms1g: [`ojeg(a)/`, `og(a)`],
  ms1i: [`ojim`],
  ms1dl: [`ojem(u)/`, `om`],
  z1n: [`oja`],
  z1a: [`oju`],
  z1g: [`oje`],
  z1i: [`ojom`],
  z1dl: [`ojoj`],
  mNna: [`oji`],
  sNna: [`oja`],
  zNna: [`oje`],
  mszNg: [`ojih`],
  mszNidl: [`ojim(a)`],
});

export const PosvojneMojZameniceQuells = Object.assign(
  observer<{
    x: number;
    y: number;
    mode: KeysOfVariationBuilder<typeof posvojneContent>;
  }>(function PosvojneMojZameniceQuells({ x, y, mode }) {
    const tx = numberWrap(x);
    const ty = numberWrap(y);

    return (
      <>
        <NormalQuell x={tx.take()} y={ty.take()} w={1} h={1}>
          {posvojneContent.m1n[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take() + 1} y={ty.takeAndAdd(1)} w={1} h={2}>
          {posvojneContent.s1n[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          <GNCellContent />
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={2} h={1}>
          {posvojneContent.ms1g[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={2} h={1}>
          {posvojneContent.ms1i[mode]}
        </NormalQuell>
        <NormalQuell x={tx.takeAndAdd(2)} y={ty.takeAndSet(y)} w={2} h={1}>
          {posvojneContent.ms1dl[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {posvojneContent.z1n[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {posvojneContent.z1a[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {posvojneContent.z1g[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {posvojneContent.z1i[mode]}
        </NormalQuell>
        <NormalQuell x={tx.takeAndAdd(1)} y={ty.takeAndSet(y)} w={1} h={1}>
          {posvojneContent.z1dl[mode]}
        </NormalQuell>
        <ProvideCellContentProps value={{ mn: true }}>
          <NormalQuell x={tx.take()} y={ty.take()} w={1} h={2}>
            {posvojneContent.mNna[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take() + 1} y={ty.take()} w={1} h={2}>
            {posvojneContent.sNna[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take() + 2} y={ty.takeAndAdd(2)} w={1} h={2}>
            {posvojneContent.zNna[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={3} h={1}>
            {posvojneContent.mszNg[mode]}
          </NormalQuell>
          <NormalQuell x={tx.takeAndAdd(4)} y={ty.takeAndSet(y)} w={3} h={2}>
            {posvojneContent.mszNidl[mode]}
          </NormalQuell>
        </ProvideCellContentProps>
      </>
    );
  }),
  { rowSpan: odnosneImenicePadezi.length, colSpan: StandardJdMnMSZHeader.colSpan }
);
