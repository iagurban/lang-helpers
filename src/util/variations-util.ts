export const makeVariationsBuilder =
  <Keys extends string>(prepare: (parts: readonly string[]) => Record<Keys, string>) =>
  <MainKeys extends string>(parts: Record<MainKeys, readonly string[]>) =>
    Object.fromEntries(
      Object.entries(parts).map(([key, value]) => [key, prepare(value as (typeof parts)[MainKeys])])
    ) as Record<MainKeys, ReturnType<typeof prepare>>;

export type KeysOfVariationBuilder<VB extends ReturnType<ReturnType<typeof makeVariationsBuilder>>> =
  keyof VB[keyof VB];
