import { Button, Drawer, Flex, Switch } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { useRootStore } from './storage.ts';

export const SidePanel = observer(function SidePanel() {
  const store = useRootStore();
  return (
    <Drawer opened={store.sidebarOpened.get()} onClose={() => store.setSidebarOpened(false)}>
      <Flex gap={'1rem'} align={'start'} direction="column">
        {/*<Toolbar>*/}
        {store.page !== `montenegrin` && (
          <Button onClick={() => (store.setPage(`montenegrin`), store.setSidebarOpened(false))}>
            Got to serbian
          </Button>
        )}
        {store.page === `montenegrin` && (
          <Button onClick={() => (store.setPage(`english-tenses`), store.setSidebarOpened(false))}>
            Got to english
          </Button>
        )}
        <Button onClick={() => store.fontsViewerOpened.set(!store.fontsViewerOpened.get())}>fonts</Button>
        {store.page === `montenegrin` && (
          <>
            <Switch
              checked={store.showAorist}
              onChange={e => store.setShowAorist(e.target.checked)}
              label="Aorist"
            />
            <Switch
              checked={store.showImperativ}
              onChange={e => store.setShowImperativ(e.target.checked)}
              label="Imperativ"
            />
            <Switch
              checked={store.showDvovidne}
              onChange={e => store.setShowDvovidne(e.target.checked)}
              label="Dvovidne"
            />

            {/*<RunawayA size={`100px`} />*/}

            {/*</Toolbar>*/}

            {/*<TilePatternSvg*/}
            {/*  color={`#f00`}*/}
            {/*  width={2}*/}
            {/*  step={2}*/}
            {/*  svgProps={{ width: `200px`, height: `100px` }}*/}
            {/*  holeInset={10}*/}
            {/*/>*/}
          </>
        )}
      </Flex>
    </Drawer>
  );
});
