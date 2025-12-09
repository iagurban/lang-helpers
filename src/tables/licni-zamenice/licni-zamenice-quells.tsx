import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { semiHeaderQuellStyle, vrstStyle } from '../../const/styles-parts.tsx';
import { HardBreakTile } from '../../parts/tiles.tsx';
import { useRootStore } from '../../storage.ts';
import { InlineSwitch } from '../../util/InlineSwitch.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell, quableStructure } from '../../util/Quable.tsx';
import { licneImenicePadezi } from '../columns-definitions.tsx';
import { GlagolskeFormeHeaderQuells } from '../glagolske-forme/glagolske-forme-header-quells.tsx';
import { PadeziLinesQuells } from '../quells/padezi-lines-quells.tsx';
import { VerticalQuell } from '../quells/vertical-quell.tsx';
import { LicneZameniceQuells } from '../zamenica/licne-zamenice-quells.tsx';
import { PadezniZameniceQuells } from '../zamenica/padezni-zamenice-quells.tsx';
import { PovratneZameniceQuells } from '../zamenica/povratne-zamenice-quells.tsx';
import { LicneZameniceSubheaderQuells } from './licne-zamenice-subheader-quells.tsx';

export const LicniZameniceQuells = observer<{
  extendedMode: boolean;
}>(function LicniZameniceQuells({ extendedMode }) {
  const store = useRootStore();

  const quable = quableStructure.use();

  const tx = numberWrap(0);
  const ty = numberWrap(1);

  return (
    <>
      <BasicQuell x={0} y={0} w={quable.cols.count} noBorders>
        <HardBreakTile />
      </BasicQuell>

      {extendedMode && <GlagolskeFormeHeaderQuells x={tx.take()} y={ty.takeAndAdd(2)} headerColSpan={5} />}

      <LicneZameniceSubheaderQuells
        x={tx.take()}
        y={ty.takeAndAdd(1)}
        headColSpan={5}
        extendedMode={extendedMode}
      />

      <PadeziLinesQuells
        list={licneImenicePadezi}
        x={tx.takeAndAdd(1)}
        y={ty.take()}
        contentColsWidth={1 + 2 + 2 + 6 + 1 + 2 + 1 + 1}
        renderSymbol={s => s.s[0]}
      />

      <VerticalQuell
        x={tx.takeAndAdd(1)}
        y={ty.take()}
        w={1}
        h={licneImenicePadezi.length}
        rootProps={{ style: semiHeaderQuellStyle }}
        label={<Flex style={vrstStyle}>padežni</Flex>}
      >
        <InlineSwitch
          options={[
            { key: `∅`, label: `∅` },
            { key: `ne`, label: `ne` },
          ]}
          value={store.padezniMode}
          onChange={key => store.setPadezniMode(key)}
        />
      </VerticalQuell>
      <PadezniZameniceQuells
        x={tx.takeAndAdd(PadezniZameniceQuells.colSpan)}
        y={ty.take()}
        mode={store.padezniMode}
      />

      <VerticalQuell
        x={tx.takeAndAdd(1)}
        y={ty.take()}
        w={1}
        h={licneImenicePadezi.length}
        rootProps={{ style: semiHeaderQuellStyle }}
        label={<Flex style={vrstStyle}>lične</Flex>}
      />
      <LicneZameniceQuells x={tx.takeAndAdd(10)} y={ty.take()} />

      <VerticalQuell
        x={tx.takeAndAdd(1)}
        y={ty.take()}
        w={1}
        h={licneImenicePadezi.length}
        rootProps={{ style: semiHeaderQuellStyle }}
        label={<Flex style={vrstStyle}>povratne</Flex>}
      />
      <PovratneZameniceQuells x={tx.takeAndAdd(1)} y={ty.take()} />
    </>
  );
});
