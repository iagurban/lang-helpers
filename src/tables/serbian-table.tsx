import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../storage.ts';
import { Collapsible } from '../util/collapsible.tsx';
import { GlagolskiFormeFullQuable } from './glagolske-forme/glagolski-forme-full-quable.tsx';
import { ImenicaBlockFullQuable } from './imenica-block/imenica-block-full-quable.tsx';
import { LicniImeniceFullQuable } from './licni-zamenice/licni-imenice-full-quable.tsx';
import { OdnosneZameniceFullQuable } from './zamenica/odnosne-zamenice-full-quable.tsx';

export const SerbianTable = observer(function MainTable() {
  const store = useRootStore();
  return (
    <Flex direction="column">
      <Collapsible
        opened={store.subjektiOpened}
        onOpenChange={opened => store.setSubjektiOpened(opened)}
        headerContent={() => <Flex style={{ cursor: `pointer` }}>Subjekti</Flex>}
      >
        <ImenicaBlockFullQuable />
      </Collapsible>

      <Collapsible
        opened={store.predikatiOpened}
        onOpenChange={opened => store.setPredikatiOpened(opened)}
        headerContent={() => <Flex style={{ cursor: `pointer` }}>Predikate</Flex>}
      >
        <GlagolskiFormeFullQuable />
      </Collapsible>

      <Collapsible
        opened={store.imeniceOpened}
        onOpenChange={opened => store.setImeniceOpened(opened)}
        headerContent={() => <Flex style={{ cursor: `pointer` }}>Imenice</Flex>}
      >
        <LicniImeniceFullQuable />
        <OdnosneZameniceFullQuable />
      </Collapsible>
    </Flex>
  );
});

export default SerbianTable;
