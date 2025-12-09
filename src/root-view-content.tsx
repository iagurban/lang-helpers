import { useResizeObserver } from '@grbn/kit/react/mobx';
import { Burger, Flex, Modal, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';

import { PersonIcon, TreeIcon } from './const/icons.ts';
import { palette } from './const/lang-palettes.tsx';
import { endingQuellNormalHeight } from './const/whatewer.ts';
import { dancingScriptVariableFontFace } from './fonts/variable/dancing-script.ts';
import { Legend, LegendItem } from './legend.tsx';
import { RunawayA } from './parts/runaway-a.tsx';
import { Anchor, ComplexAnchorDecl } from './parts/styling/anchor.tsx';
import { Label } from './parts/styling/label.tsx';
import { makeFormulaFrameProps } from './parts/tiles.tsx';
import { SidePanel } from './side-panel.tsx';
import { useRootStore } from './storage.ts';
import { LayouterProvider, makeLayouter } from './tables/columns-definitions.tsx';
import { EnglishTensesMainTable } from './tables/english-tenses/english-tenses-main-table.tsx';
import { GlagolskiFormeFullQuable } from './tables/glagolske-forme/glagolski-forme-full-quable.tsx';
import { SquareBracedExpr } from './tables/glagolske-forme/glagolski-forme-left-header-quells.tsx';
import { ImenicaBlockFullQuable } from './tables/imenica-block/imenica-block-full-quable.tsx';
import { ExchangeSymbolContent } from './tables/imenica-block/subjects-content-quells.tsx';
import { LicniImeniceFullQuable } from './tables/licni-zamenice/licni-imenice-full-quable.tsx';
import { OdnosneZameniceFullQuable } from './tables/zamenica/odnosne-zamenice-full-quable.tsx';
import { Collapsible } from './util/collapsible.tsx';
import { cssFontFamily } from './util/fonts-helpers.ts';
import { FontsViewerInstance } from './util/fonts-viewer-instance.tsx';
import { WithTiledBackground } from './util/tiles-pattern-svg.tsx';
import { useBrowserRerenderBugfix } from './util/use-browser-rerender-bugfix.ts';
import { ProvideResizeObserverEngine } from './util/use-resize-observer-2.tsx';

const MainTable = observer(function MainTable() {
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

export const RootViewContent = observer(function RootViewContent() {
  const store = useRootStore();

  useBrowserRerenderBugfix(false, 1000, 10_000);

  const [debouncedWidth, setDebouncedWidth] = /*useDebounce(10, 1400)*/ useState(1400);
  const resizeObserver = useResizeObserver(e => {
    // console.log(e);
    setDebouncedWidth(e.contentBoxSize[0].inlineSize - endingQuellNormalHeight);
  });

  const layouter = useMemo(() => makeLayouter(debouncedWidth), [debouncedWidth]);

  // console.log(`root width`, debouncedWidth);

  return (
    <ProvideResizeObserverEngine>
      <LayouterProvider value={layouter}>
        <Modal
          opened={store.fontsViewerOpened.get()}
          onClose={() => store.fontsViewerOpened.set(false)}
          style={{ overflow: 'auto' }}
        >
          <FontsViewerInstance />
        </Modal>
        <SidePanel />

        <Flex
          style={{ fontFamily: cssFontFamily(store.fonts.main) }}
          direction="column"
          gap={'0.5rem'}
          p={'8px'}
          ref={resizeObserver.ref}
        >
          {/*<TilesTestView />*/}

          <Legend
            preSlot={
              <Burger
                opened={store.sidebarOpened.get()}
                onClick={() => store.sidebarOpened.set(!store.sidebarOpened.get())}
                aria-label="Toggle sidebar"
              />
            }
          >
            {store.page === `montenegrin` ? (
              <>
                <Flex>Legend:</Flex>
                <Flex gap="1rem" flex="1 0 auto" align="center" justify="space-between" wrap="wrap">
                  <LegendItem>
                    <Flex style={{ color: palette.zivo }}>
                      <PersonIcon /> živo
                    </Flex>
                  </LegendItem>
                  <LegendItem>
                    <Flex style={{ color: palette.nezivo }}>
                      <TreeIcon /> neživo
                    </Flex>
                  </LegendItem>
                  <LegendItem>
                    <Label color={'#000'} small bold>
                      privremena legenda
                    </Label>
                  </LegendItem>
                  <LegendItem underline>
                    <RunawayA />
                    <Text inline display={'inline'}>
                      nepostojano "a"
                    </Text>
                  </LegendItem>
                  <LegendItem underline>
                    <ExchangeSymbolContent color={palette.palatizacija} />
                    <Text inline display={'inline'}>
                      palatizacija
                    </Text>
                  </LegendItem>
                  <LegendItem underline>
                    <ExchangeSymbolContent color={palette.sibilizacija} />
                    <Text inline display={'inline'}>
                      sibilizacija
                    </Text>
                  </LegendItem>
                  <LegendItem>
                    <WithTiledBackground {...makeFormulaFrameProps()} />
                    <Flex p="0.5rem 1rem" ff={dancingScriptVariableFontFace} fz="1.5rem">
                      Formula
                    </Flex>
                  </LegendItem>
                  <LegendItem>
                    <ComplexAnchorDecl name={'DL'} upperText={'deklaracija'} descr={'linka'} />
                  </LegendItem>
                  <LegendItem underline>
                    <SquareBracedExpr>
                      <Anchor>DL</Anchor>
                      <Flex>koriščenje linka</Flex>
                    </SquareBracedExpr>
                  </LegendItem>
                  <LegendItem>
                    <Flex>Za</Flex>
                    <Flex direction="column" fz="80%" lh={1}>
                      <Flex style={{ color: palette.zaSuglasnikon }}>(suglasnikom)</Flex>
                      <Flex style={{ color: palette.zaSamoglasnikon }}>(samoglasnikom)</Flex>
                      <Flex style={{ color: palette.zaJom }}>(J)</Flex>
                    </Flex>
                  </LegendItem>
                </Flex>
              </>
            ) : null}
          </Legend>

          {store.page === `montenegrin` ? (
            <>
              <MainTable />
            </>
          ) : (
            <EnglishTensesMainTable />
          )}
        </Flex>
      </LayouterProvider>
    </ProvideResizeObserverEngine>
  );
});
