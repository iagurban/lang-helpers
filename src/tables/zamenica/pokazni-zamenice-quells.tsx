import { observer } from 'mobx-react-lite';

import { GNCellContent } from '../../parts/gn-cell-content.tsx';
import { StandardJdMnMSZHeader } from '../../parts/standard-jd-mn-m-s-z-header.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { KeysOfVariationBuilder, makeVariationsBuilder } from '../../util/variations-util.ts';
import { NormalQuell, ProvideCellContentProps } from '../quells/normal-quell.tsx';
import { pokazneImenicePadezi } from './padezi.ts';

export const pokazniContent = makeVariationsBuilder(
  parts =>
    Object.fromEntries(
      [`ov`, `on`, `t`].map(t => [t[t.length - 1], parts.flatMap(part => [t, part]).join(``)])
    ) as Record<`v` | `n` | `t`, string>
)({
  m1n: [`aj`],
  s1na: [`o`],
  ms1g: [`og(a)`],
  ms1d: [`om(u)`],
  ms1l: [`om(e)`],
  ms1i: [`im(e)`],

  z1n: [`a`],
  z1a: [`u`],
  z1g: [`e`],
  z1dl: [`oj`],
  z1i: [`om`],

  mNn: [`i`],
  mNa: [`e`],
  sNna: [`a`],
  zNna: [`e`],
  mszNg: [`ih`],
  mszNdli: [`im(a)`],
});

export const PokazniZameniceQuells = Object.assign(
  observer<{
    x: number;
    y: number;
    mode: KeysOfVariationBuilder<typeof pokazniContent>;
  }>(function PokazniZameniceQuells({ x, y, mode }) {
    const tx = numberWrap(x);
    const ty = numberWrap(y);

    return (
      <>
        {/*/!* 2 jd. *!/*/}
        <NormalQuell x={tx.take()} y={ty.take()} w={1} h={1}>
          {pokazniContent.m1n[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take() + 1} y={ty.takeAndAdd(1)} w={1} h={2}>
          {pokazniContent.s1na[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          <GNCellContent />
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={2} h={1}>
          {pokazniContent.ms1g[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={2} h={1}>
          {pokazniContent.ms1d[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={2} h={1}>
          {pokazniContent.ms1l[mode]}
        </NormalQuell>
        <NormalQuell x={tx.takeAndAdd(2)} y={ty.takeAndSet(y)} w={2} h={1}>
          {pokazniContent.ms1i[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {pokazniContent.z1n[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {pokazniContent.z1a[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {pokazniContent.z1g[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(2)} w={1} h={2}>
          {pokazniContent.z1dl[mode]}
        </NormalQuell>
        <NormalQuell x={tx.takeAndAdd(1)} y={ty.takeAndSet(y)} w={1} h={1}>
          {pokazniContent.z1i[mode]}
        </NormalQuell>
        <ProvideCellContentProps value={{ mn: true }}>
          <NormalQuell x={tx.take()} y={ty.take()} w={1} h={1}>
            {pokazniContent.mNn[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.take() + 1} w={1} h={1}>
            {pokazniContent.mNa[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take() + 1} y={ty.take()} w={1} h={2}>
            {pokazniContent.sNna[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take() + 2} y={ty.takeAndAdd(2)} w={1} h={2}>
            {pokazniContent.zNna[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={3} h={1}>
            {pokazniContent.mszNg[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.takeAndSet(y)} w={3} h={3}>
            {pokazniContent.mszNdli[mode]}
          </NormalQuell>
        </ProvideCellContentProps>
      </>
    );
  }),
  { rowSpan: pokazneImenicePadezi.length, colSpan: StandardJdMnMSZHeader.colSpan }
);
