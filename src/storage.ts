import {
  checked,
  isArrayOf,
  isBoolean,
  isSomeObject,
  isSomeOf,
  isString,
  isUndefined,
  uidGenerator,
} from '@grbn/kit';
import { createUsableContext } from '@grbn/kit/react';
import { action, autorun, makeObservable, observable } from 'mobx';
import { fromSnapshot, getSnapshot, Model, model, prop } from 'mobx-keystone';
import { Roarr as log } from 'roarr';

import { emptyChar } from './const/unicode.tsx';
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

class FontConfigStore implements FontConfig {
  constructor(data: Pick<FontConfigStore, `fontFamily` | `type` | `fallbackFamilies`>) {
    this.fontFamily = data.fontFamily;
    this.type = data.type;
    this.fallbackFamilies = data.fallbackFamilies;

    makeObservable(this);
  }

  static fromSnapshot(snapshot: { [K in keyof ReturnType<FontConfigStore[`toSnapshot`]>]?: unknown }) {
    return new FontConfigStore({
      fontFamily: checked(snapshot.fontFamily, isString, () => `"fontFamily" is not a string`),
      type: checked(
        snapshot.type,
        (o: unknown): o is `serif` | `sans-serif` | `monospace` | `cursive` | `fantasy` | undefined =>
          o === undefined || [`serif`, `sans-serif`, `monospace`, `cursive`, `fantasy`].includes(o as string),
        () => `"type" is not a valid font type`
      ),
      fallbackFamilies: checked(
        snapshot.fallbackFamilies,
        isSomeOf(isUndefined, isArrayOf({ item: isString })),
        () => `"fallbackFamilies" is not an array of strings`
      ),
    });
  }

  toSnapshot() {
    return {
      fontFamily: this.fontFamily,
      type: this.type,
      fallbackFamilies: this.fallbackFamilies,
    };
  }

  @observable
  fontFamily: FontConfig[`fontFamily`];
  @action
  setFontFamily(ff: string) {
    this.fontFamily = ff;
  }

  @observable
  type?: FontConfig[`type`];
  @action
  setType(t: typeof this.type) {
    this.type = t;
  }

  @observable
  fallbackFamilies?: FontConfig[`fallbackFamilies`];
  @action
  setFallbackFamilies(ff: typeof this.fallbackFamilies) {
    this.fallbackFamilies = ff;
  }
}

export class _FontsConfig {
  constructor(data: Pick<_FontsConfig, `main`>) {
    this.main = data.main;
  }

  static fromSnapshot(snapshot: { [K in keyof ReturnType<_FontsConfig[`toSnapshot`]>]?: unknown }) {
    return new _FontsConfig({
      main: FontConfigStore.fromSnapshot(
        checked(snapshot.main, isSomeObject, () => `"main" is not an object`)
      ),
    });
  }

  toSnapshot() {
    return {
      main: this.main.toSnapshot(),
    };
  }

  main: FontConfigStore;
}

class _RootStore {
  constructor(
    params: {
      fonts: _FontsConfig;
    } & Pick<
      _RootStore,
      | `posvojneMode`
      | `pokazniMode`
      | `upitneMode`
      | `padezniMode`
      | `subjektiOpened`
      | `predikatiOpened`
      | `imeniceOpened`
      | `showAorist`
      | `showDvovidne`
      | `showImperativ`
    >
  ) {
    this.fonts = params.fonts;
    this.posvojneMode = params.posvojneMode;
    this.pokazniMode = params.pokazniMode;
    this.upitneMode = params.upitneMode;
    this.padezniMode = params.padezniMode;
    this.subjektiOpened = params.subjektiOpened;
    this.predikatiOpened = params.predikatiOpened;
    this.imeniceOpened = params.imeniceOpened;
    this.showAorist = params.showAorist;
    this.showDvovidne = params.showDvovidne;
    this.showImperativ = params.showImperativ;

    makeObservable(this);
  }

  static fromSnapshot(snapshot: { [K in keyof ReturnType<_RootStore[`toSnapshot`]>]: unknown }) {
    return new _RootStore({
      fonts: _FontsConfig.fromSnapshot(
        checked(snapshot.fonts, isSomeObject, () => `"fonts" is not an object`)
      ),
      posvojneMode: checked(
        snapshot.posvojneMode,
        (o: unknown): o is `m` | `t` => [`m`, `t`].includes(o as string),
        () => `"posvojneMode" is not "m" or "t`
      ),
      pokazniMode: checked(
        snapshot.pokazniMode,
        (o: unknown): o is `t` | `v` | `n` => [`t`, `v`, `n`].includes(o as string),
        () => `"pokazniMode" is not "t" or "v" or "n`
      ),
      upitneMode: checked(
        snapshot.upitneMode,
        (o: unknown): o is `k` | `c` => [`k`, `c`].includes(o as string),
        () => `"upitneMode" is not "k" or "c`
      ),
      padezniMode: checked(
        snapshot.padezniMode,
        (o: unknown): o is typeof emptyChar | `ne` => [emptyChar, `ne`].includes(o as string),
        () => `"padezniMode" is not "${emptyChar}" or "ne`
      ),
      subjektiOpened: checked(snapshot.subjektiOpened, isBoolean, () => `"subjektiOpened" is not a boolean`),
      predikatiOpened: checked(
        snapshot.predikatiOpened,
        isBoolean,
        () => `"predikatiOpened" is not a boolean`
      ),
      imeniceOpened: checked(snapshot.imeniceOpened, isBoolean, () => `"imeniceOpened" is not a boolean`),
      showAorist: checked(snapshot.showAorist, isBoolean, () => `"showAorist" is not a boolean`),
      showDvovidne: checked(snapshot.showDvovidne, isBoolean, () => `"showDvovidne" is not a boolean`),
      showImperativ: checked(snapshot.showImperativ, isBoolean, () => `"showImperativ" is not a boolean`),
    });
  }

  toSnapshot() {
    return {
      fonts: this.fonts.toSnapshot(),
      posvojneMode: this.posvojneMode,
      pokazniMode: this.pokazniMode,
      upitneMode: this.upitneMode,
      padezniMode: this.padezniMode,
      subjektiOpened: this.subjektiOpened,
      predikatiOpened: this.predikatiOpened,
      imeniceOpened: this.imeniceOpened,
      showAorist: this.showAorist,
      showDvovidne: this.showDvovidne,
      showImperativ: this.showImperativ,
    };
  }

  @observable
  page: `montenegrin` | `english-tenses` = `english-tenses`;
  @action
  setPage(page: typeof this.page) {
    this.page = page;
  }

  readonly fonts: _FontsConfig;

  @observable
  subjektiOpened: boolean;
  @action
  setSubjektiOpened(opened: boolean) {
    this.subjektiOpened = opened;
  }

  @observable
  predikatiOpened: boolean;
  @action
  setPredikatiOpened(opened: boolean) {
    this.predikatiOpened = opened;
  }

  @observable
  imeniceOpened: boolean;
  @action
  setImeniceOpened(opened: boolean) {
    this.imeniceOpened = opened;
  }

  @observable
  posvojneMode: KeysOfVariationBuilder<typeof posvojneContent>;
  @action
  setPosvojneMode(mode: typeof this.posvojneMode) {
    this.posvojneMode = mode;
  }

  @observable
  pokazniMode: KeysOfVariationBuilder<typeof pokazniContent>;
  @action
  setPokzniMode(mode: typeof this.pokazniMode) {
    this.pokazniMode = mode;
  }

  @observable
  upitneMode: KeysOfVariationBuilder<typeof upitneContent>;
  @action
  setUpitneMode(mode: typeof this.upitneMode) {
    this.upitneMode = mode;
  }

  @observable
  padezniMode: KeysOfVariationBuilder<typeof padezniContent>;
  @action
  setPadezniMode(mode: typeof this.padezniMode) {
    this.padezniMode = mode;
  }

  @observable
  showAorist: boolean;
  @action
  setShowAorist(show: boolean) {
    this.showAorist = show;
  }

  @observable
  showDvovidne: boolean;
  @action
  setShowDvovidne(show: boolean) {
    this.showDvovidne = show;
  }

  @observable
  showImperativ: boolean;
  @action
  setShowImperativ(show: boolean) {
    this.showImperativ = show;
  }
}

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

  @action
  setFontsViewerOpened(opened: boolean) {
    this.fontsViewerOpened.set(opened);
  }

  @action
  setSidebarOpened(opened: boolean) {
    this.sidebarOpened.set(opened);
  }
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
