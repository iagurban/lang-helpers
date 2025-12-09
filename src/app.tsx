import { uidGenerator } from '@grbn/kit';
import { MantineProvider } from '@mantine/core';
import { registerRootStore, setGlobalConfig, unregisterRootStore } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { ArrowsSymbolDefs } from './parts/arrows-symbol-defs.tsx';
import { RootViewContent } from './root-view-content.tsx';
import { loadFromLocalstorageSnapshot, RootStore, RootStoreProvider, startSavingSnapshot } from './storage';
import { theme } from './theme';
import { ProvideTilesManager } from './util/tiles-pattern-svg';

setGlobalConfig({ modelIdGenerator: uidGenerator });

const RootView = observer(function RootView() {
  return (
    <ProvideTilesManager>
      <ArrowsSymbolDefs />

      <RootViewContent />
    </ProvideTilesManager>
  );
});

export const App: FC = () => {
  const [rootStore, setRootStore] = useState<RootStore>();

  useEffect(() => {
    const store = loadFromLocalstorageSnapshot();
    registerRootStore(store);

    const unsub = startSavingSnapshot(store, `srpski-tables-dev`);

    setRootStore(store);
    return () => {
      setRootStore(undefined);
      unsub();
      unregisterRootStore(store);
    };
  }, []);

  return rootStore ? (
    <MantineProvider theme={theme}>
      <RootStoreProvider value={rootStore}>
        {/* <CssBaseline /> */}
        <RootView />
      </RootStoreProvider>
    </MantineProvider>
  ) : null;
};
