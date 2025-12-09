import { allPadeziDescriptions } from '../../const/lang-palettes.tsx';

export const odnosneImenicePadezi: readonly ((typeof allPadeziDescriptions)[keyof typeof allPadeziDescriptions] & {
  bold?: boolean;
})[][] = [
  [
    allPadeziDescriptions.v,
    {
      ...allPadeziDescriptions.n,
      bold: true,
    },
  ],
  [allPadeziDescriptions.a],
  [allPadeziDescriptions.g],
  [allPadeziDescriptions.i],
  [allPadeziDescriptions.d, allPadeziDescriptions.l],
];

export const pokazneImenicePadezi: typeof odnosneImenicePadezi = [
  [
    {
      ...allPadeziDescriptions.n,
      bold: true,
    },
  ],
  [allPadeziDescriptions.a],
  [allPadeziDescriptions.g],
  [allPadeziDescriptions.d],
  [allPadeziDescriptions.l],
  [allPadeziDescriptions.i],
];
