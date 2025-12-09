import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { semiHeaderQuellStyle, vrstStyle } from '../../const/styles-parts.tsx';
import { StandardJdMnMSZHeader } from '../../parts/standard-jd-mn-m-s-z-header.tsx';
import { HardBreakTile, SoftBreakTile } from '../../parts/tiles.tsx';
import { useRootStore } from '../../storage.ts';
import { InlineSwitch } from '../../util/InlineSwitch.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell } from '../../util/Quable.tsx';
import { PadeziLinesQuells } from '../quells/padezi-lines-quells.tsx';
import { VerticalQuell } from '../quells/vertical-quell.tsx';
import { OstaleZamenicaHeaderQuells } from './ostale-zamenica-header-quells.tsx';
import { odnosneImenicePadezi, pokazneImenicePadezi } from './padezi.ts';
import { PokazniZameniceQuells } from './pokazni-zamenice-quells.tsx';
import { PosvojneMojZameniceQuells } from './posvojne-moj-zamenice-quells.tsx';
import { PosvojneZaMnZameniceQuells } from './posvojne-za-mn-zamenice-quells.tsx';
import { UpitneZameniceQuells } from './upitne-zamenice-quells.tsx';

export const OdnosneZameniceQuells = observer(function OdnosneZameniceQuells() {
  const store = useRootStore();

  const tx = numberWrap(0);
  const ty = numberWrap(1);

  const contentStartY = StandardJdMnMSZHeader.rowSpan + 1;

  return (
    <>
      <BasicQuell x={tx.take()} y={0} w={StandardJdMnMSZHeader.colSpan * 2 + 2 + 1} h={1} noBorders>
        <HardBreakTile />
      </BasicQuell>
      <OstaleZamenicaHeaderQuells x={tx.take()} y={ty.takeAndAdd(StandardJdMnMSZHeader.rowSpan)} />
      <PadeziLinesQuells
        list={odnosneImenicePadezi}
        x={tx.takeAndAdd(1)}
        y={ty.takeAndSet(contentStartY)}
        contentColsWidth={StandardJdMnMSZHeader.colSpan * 2 + 2}
      />
      <VerticalQuell
        x={tx.takeAndAdd(1)}
        y={ty.take()}
        w={1}
        h={odnosneImenicePadezi.length}
        rootProps={{ style: semiHeaderQuellStyle }}
        label={<Flex style={vrstStyle}>posvojne</Flex>}
      >
        <InlineSwitch
          options={[
            { key: `m`, label: `m` },
            { key: `t`, label: `t` },
          ]}
          value={store.posvojneMode}
          onChange={key => store.setPosvojneMode(key)}
        />
      </VerticalQuell>
      <PosvojneMojZameniceQuells
        x={tx.takeAndAdd(PosvojneMojZameniceQuells.colSpan + 1)}
        y={ty.takeAndSet(contentStartY)}
        mode={store.posvojneMode}
      />
      <PosvojneZaMnZameniceQuells
        x={tx.takeAndSet(0)}
        y={ty.takeAndAdd(odnosneImenicePadezi.length)}
        mode={
          store.posvojneMode === `t` ? `v` : `n` /* same as jd. posvojne */
          /* TODO can be linked to jd. posvojne, can be separated (3-way switch) */
        }
      />

      <BasicQuell x={tx.take()} y={ty.takeAndAdd(1)} w={StandardJdMnMSZHeader.colSpan * 2 + 2 + 1} h={1}>
        <SoftBreakTile />
      </BasicQuell>

      <PadeziLinesQuells
        list={pokazneImenicePadezi}
        x={tx.takeAndAdd(1)}
        y={ty.takeAndSet(contentStartY + odnosneImenicePadezi.length + 1)}
        contentColsWidth={StandardJdMnMSZHeader.colSpan * 2 + 2}
      />

      <VerticalQuell
        x={tx.takeAndAdd(1)}
        y={ty.take()}
        w={1}
        h={pokazneImenicePadezi.length}
        rootProps={{ style: semiHeaderQuellStyle }}
        label={<Flex style={vrstStyle}>pokazni</Flex>}
      >
        <InlineSwitch
          options={[
            { key: `v`, label: `v` },
            { key: `t`, label: `t` },
            { key: `n`, label: `n` },
          ]}
          value={store.pokazniMode}
          onChange={key => store.setPokazniMode(key)}
        />
      </VerticalQuell>
      <PokazniZameniceQuells
        x={tx.takeAndAdd(PokazniZameniceQuells.colSpan)}
        y={ty.take()}
        mode={store.pokazniMode}
      />

      <VerticalQuell
        x={tx.takeAndAdd(1)}
        y={ty.take()}
        w={1}
        h={pokazneImenicePadezi.length}
        rootProps={{ style: semiHeaderQuellStyle }}
        label={<Flex style={vrstStyle}>upitne</Flex>}
      >
        <InlineSwitch
          options={[
            { key: `k`, label: `k` },
            { key: `c`, label: `ć` },
          ]}
          value={store.upitneMode}
          onChange={key => store.setUpitneMode(key)}
        />
      </VerticalQuell>

      <UpitneZameniceQuells
        x={tx.takeAndAdd(UpitneZameniceQuells.colSpan)}
        y={ty.takeAndAdd(0)}
        mode={store.upitneMode}
      />
    </>
  );
});
