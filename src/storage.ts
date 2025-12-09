import { uidGenerator } from '@grbn/kit';
import { createUsableContext } from '@grbn/kit/react';
import { autorun, observable } from 'mobx';
import { fromSnapshot, getSnapshot, Model, model, prop } from 'mobx-keystone';
import { Roarr as log } from 'roarr';

import { $uid } from './const/whatewer.ts';
import { outfitVariableFontFace } from './fonts/variable/outfit.ts';
import { padezniContent } from './tables/zamenica/padezni-zamenice-quells.tsx';
import { pokazniContent } from './tables/zamenica/pokazni-zamenice-quells.tsx';
import { posvojneContent } from './tables/zamenica/posvojne-moj-zamenice-quells.tsx';
import { upitneContent } from './tables/zamenica/upitne-zamenice-quells.tsx';
import { FontConfig } from './util/fonts-helpers.ts';
import type { KeysOfVariationBuilder } from './util/variations-util.ts';

@model(`tables/FontsConfig`)
export class FontsConfig extends Model({
  main: prop<FontConfig>(),
}) {}

@model(`tables/RootStore`)
export class RootStore extends Model({
  page: prop<`montenegrin` | `english-tenses`>(`english-tenses`).withSetter(),

  fonts: prop<FontsConfig>(),

  subjektiOpened: prop<boolean>().withSetter(),
  predikatiOpened: prop<boolean>().withSetter(),
  imeniceOpened: prop<boolean>().withSetter(),

  posvojneMode: prop<KeysOfVariationBuilder<typeof posvojneContent>>().withSetter(),
  pokazniMode: prop<KeysOfVariationBuilder<typeof pokazniContent>>().withSetter(),
  upitneMode: prop<KeysOfVariationBuilder<typeof upitneContent>>().withSetter(),
  padezniMode: prop<KeysOfVariationBuilder<typeof padezniContent>>().withSetter(),

  showAorist: prop<boolean>(true).withSetter(),
  showDvovidne: prop<boolean>(true).withSetter(),
  showImperativ: prop<boolean>(true).withSetter(),
}) {
  readonly [$uid] = uidGenerator();

  readonly fontsViewerOpened = observable.box(false);
  readonly sidebarOpened = observable.box(false);
}

export const {
  use: useRootStore,
  useIfProvided: useRootStoreOrNo,
  provider: RootStoreProvider,
} = createUsableContext<RootStore>(`TablesRootStore`);

export const loadFromLocalstorageSnapshot = () => {
  try {
    const raw = localStorage.getItem(`srpski-tables-dev`);
    if (!raw) {
      throw new Error(`!!@@zzyy`);
    }
    return fromSnapshot<RootStore>(JSON.parse(raw));
  } catch (error) {
    const createNew = () =>
      new RootStore({
        fonts: new FontsConfig({ main: { fontFamily: outfitVariableFontFace } }),
        subjektiOpened: false,
        predikatiOpened: false,
        imeniceOpened: false,

        posvojneMode: `m`,
        pokazniMode: `t`,
        upitneMode: `k`,
        padezniMode: `∅`,
      });

    if (error instanceof Error) {
      if (error.message === `!!@@zzyy`) {
        log(`created new data!`);
        return createNew();
      } else if (error.name === `TypeError` && error.message.startsWith(`Cannot read properties`)) {
        log({}, `failed to parse: [TypeError] %s`, error.message);
        return createNew();
      }
    }
    throw error;
  }
};

export const startSavingSnapshot = (s: RootStore, key: string) =>
  autorun(() => {
    log({}, `saving root store %s`, s[$uid]);
    localStorage.setItem(key, JSON.stringify(getSnapshot(s)));
  });
