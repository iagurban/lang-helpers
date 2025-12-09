import { Flex, Tooltip } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { allPadeziDescriptions } from '../../const/lang-palettes.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { NormalQuell, ProvideCellContentProps } from '../quells/normal-quell.tsx';

const VokLabel = observer(function VokLabel() {
  return (
    <Tooltip label={<Flex>Takođe vokativ</Flex>}>
      <Flex
        style={{
          background: allPadeziDescriptions.v.c,
          color: `#fff`,
          fontStyle: `normal`,
          position: `absolute`,
          right: `0.5rem`,
          lineHeight: '1',
          padding: '2px 3px',
          borderRadius: '4px',
          fontSize: '75%',
          fontWeight: 'bold',
          cursor: `default`,
        }}
      >
        V
      </Flex>
    </Tooltip>
  );
});

export const LicneZameniceQuells = observer<{
  x: number;
  y: number;
}>(function LicneZameniceQuells({ x, y }) {
  const tx = numberWrap(x);
  const ty = numberWrap(y);

  return (
    <>
      {/* 1 jd. */}
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
        ja
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(2)} w={1} h={2}>
        me(ne)
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
        m(en)i
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
        meni
      </NormalQuell>
      <NormalQuell x={tx.takeAndAdd(1)} y={ty.takeAndAdd(-5)} w={1} h={1}>
        mnom(e)
      </NormalQuell>
      {/* 1 mn. */}
      <ProvideCellContentProps value={{ mn: true }}>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          mi
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(2)} w={1} h={2}>
          nas
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          nam(a)
        </NormalQuell>
        <NormalQuell x={tx.takeAndAdd(1)} y={ty.takeAndAdd(-4)} w={1} h={2}>
          nama
        </NormalQuell>
      </ProvideCellContentProps>
      {/* 2 jd. */}
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
        ti
        <VokLabel />
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(2)} w={1} h={2}>
        te(be)
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
        t(eb)i
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
        tebi
      </NormalQuell>
      <NormalQuell x={tx.takeAndAdd(1)} y={ty.takeAndAdd(-5)} w={1} h={1}>
        tobom
      </NormalQuell>
      {/* 2 mn. */}
      <ProvideCellContentProps value={{ mn: true }}>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          vi
          <VokLabel />
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(2)} w={1} h={2}>
          vas
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
          vam(a)
        </NormalQuell>
        <NormalQuell x={tx.takeAndAdd(1)} y={ty.takeAndAdd(-4)} w={1} h={2}>
          vama
        </NormalQuell>
      </ProvideCellContentProps>
      {/* 3 jd. M/S */}
      <NormalQuell x={tx.take()} y={ty.take()} w={1} h={1}>
        on
      </NormalQuell>
      <NormalQuell x={tx.take() + 1} y={ty.takeAndAdd(1)} w={1} h={1}>
        ono
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(2)} w={2} h={2}>
        (nje)ga
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={2} h={1}>
        (nje)mu
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={2} h={1}>
        njem(u)
      </NormalQuell>
      <NormalQuell x={tx.takeAndAdd(2)} y={ty.takeAndAdd(-5)} w={2} h={1}>
        njim(e)
      </NormalQuell>
      {/* 3 jd. Ž */}
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
        ona
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
        (n)ju/je
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
        (n)je
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
        (n)joj
      </NormalQuell>
      <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={1} h={1}>
        njoj
      </NormalQuell>
      <NormalQuell x={tx.takeAndAdd(1)} y={ty.takeAndAdd(-5)} w={1} h={1}>
        njom(e)
      </NormalQuell>
      {/* 3 mn. */}
      <ProvideCellContentProps value={{ mn: true }}>
        <NormalQuell x={tx.take()} y={ty.take()} w={1} h={1}>
          oni
        </NormalQuell>
        <NormalQuell x={tx.take() + 1} y={ty.take()} w={1} h={1}>
          ona
        </NormalQuell>
        <NormalQuell x={tx.take() + 2} y={ty.takeAndAdd(1)} w={1} h={1}>
          one
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(2)} w={3} h={2}>
          (nj)ih
        </NormalQuell>
        <NormalQuell x={tx.take()} y={ty.takeAndAdd(1)} w={3} h={1}>
          njima/im
        </NormalQuell>
        <NormalQuell x={tx.takeAndAdd(3)} y={ty.takeAndAdd(-4)} w={3} h={2}>
          njima
        </NormalQuell>
      </ProvideCellContentProps>
    </>
  );
});
