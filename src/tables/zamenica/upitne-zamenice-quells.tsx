import { observer } from 'mobx-react-lite';

import { GNCellContent } from '../../parts/gn-cell-content.tsx';
import { StandardJdMnMSZHeader } from '../../parts/standard-jd-mn-m-s-z-header.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { KeysOfVariationBuilder, makeVariationsBuilder } from '../../util/variations-util.ts';
import { NormalQuell, ProvideCellContentProps } from '../quells/normal-quell.tsx';
import { odnosneImenicePadezi } from './padezi.ts';

export const upitneContent = makeVariationsBuilder(
  parts =>
    Object.fromEntries(
      [`ko`, `či`].map(t => [t === `ko` ? `k` : `c`, parts.flatMap(part => [t, part]).join(``)])
    ) as Record<`k` | `c`, string>
)({
  m1n: [`ji`],
  s1na: [`je`],
  ms1g: [`jeg(a)`],
  ms1d: [`jem(u)`],
  ms1li: [`jim`],

  z1n: [`ja`],
  z1a: [`ju`],
  z1g: [`je`],
  z1dli: [`joj`],

  mNn: [`ji`],
  mNa: [`je`],
  sNna: [`ja`],
  zNna: [`je`],
  mszNg: [`jih`],
  mszNdli: [`jim(a)`],
});

export const UpitneZameniceQuells = Object.assign(
  observer<{
    x: number;
    y: number;
    mode: KeysOfVariationBuilder<typeof upitneContent>;
  }>(function UpitneZameniceQuells({ x, y, mode }) {
    const tx = numberWrap(x);
    const ty = numberWrap(y);

    return (
      <>
        {/*/!* 2 jd. *!/*/}
        <NormalQuell x={tx.take()} y={ty.take()} w={1} h={1}>
          {upitneContent.m1n[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take() + 1} y={ty.takeAndAdd(1)} w={1} h={2}>
          {upitneContent.s1na[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          <GNCellContent />
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={2} h={1}>
          {upitneContent.ms1g[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={2} h={1}>
          {upitneContent.ms1d[mode]}
        </NormalQuell>
        <NormalQuell x={tx.takeAndAdd(2)} y={ty.takeAndSet(y)} w={2} h={2}>
          {upitneContent.ms1li[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {upitneContent.z1n[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {upitneContent.z1a[mode]}
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          {upitneContent.z1g[mode]}
        </NormalQuell>
        <NormalQuell x={tx.takeAndAdd(1)} y={ty.takeAndSet(y)} w={1} h={3}>
          {upitneContent.z1dli[mode]}
        </NormalQuell>
        <ProvideCellContentProps value={{ mn: true }}>
          <NormalQuell x={tx.take()} y={ty.take()} w={1} h={1}>
            {upitneContent.mNn[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.take() + 1} w={1} h={1}>
            {upitneContent.mNa[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take() + 1} y={ty.take()} w={1} h={2}>
            {upitneContent.sNna[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take() + 2} y={ty.takeAndAdd(2)} w={1} h={2}>
            {upitneContent.zNna[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={3} h={1}>
            {upitneContent.mszNg[mode]}
          </NormalQuell>
          <NormalQuell x={tx.take()} y={ty.takeAndSet(y)} w={3} h={3}>
            {upitneContent.mszNdli[mode]}
          </NormalQuell>
        </ProvideCellContentProps>
      </>
    );
  }),
  { rowSpan: odnosneImenicePadezi.length, colSpan: StandardJdMnMSZHeader.colSpan }
);
