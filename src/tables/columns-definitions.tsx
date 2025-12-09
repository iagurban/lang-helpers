import { once } from '@grbn/kit';
import { createUsableContext } from '@grbn/kit/react';

import { allPadeziDescriptions } from '../const/lang-palettes.tsx';
import { endingQuellNormalHeight } from '../const/whatewer.ts';
import { BorderType, DimensionSizesDefinition } from '../util/Quable.tsx';

export const skupinaOrder: [0, 1, 2] | [1, 0, 2] = [1, 0, 2];

export const breakStripeWidth = 8;

export const makeLayouter = (_fullWidth: number) => {
  const fullWidth = Math.max(1200, _fullWidth);

  const endingQuellNormalWidth = fullWidth * 0.041;
  const leftHeadersWidth = fullWidth * 0.17;
  const pridjevHeader = endingQuellNormalHeight * 1.3;
  const imeniceHeader = pridjevHeader;
  const imeniceSubHeader = imeniceHeader * 0.8;

  const rightHeadersWidth = fullWidth * 0.1;

  const imeniceFullWidth =
    fullWidth - leftHeadersWidth - (pridjevHeader + endingQuellNormalWidth * 6 + rightHeadersWidth);
  const skupIwidth =
    imeniceFullWidth -
    imeniceHeader -
    imeniceSubHeader /* here */ -
    2 * /* 2-3 skupine */ (2 * endingQuellNormalWidth + imeniceSubHeader);
  const skupIMnWidth = endingQuellNormalWidth * 2;
  const skupIJdWidth = skupIwidth - skupIMnWidth;
  const skupIJdOWidth = skupIJdWidth / 4;
  return {
    endingQuellNormalWidth,
    leftHeadersWidth,
    pridjevHeader,
    imeniceHeader,
    imeniceSubHeader,

    get pridjevColumnsDesc() {
      return once(
        this,
        `pridjevColumnsDesc`,
        true,
        DimensionSizesDefinition.builder().add(endingQuellNormalWidth, 6).finish()
      );
    },
    get imeniceColumnsDesc() {
      return once(
        this,
        `imeniceColumnsDesc`,
        true,
        DimensionSizesDefinition.builder()
          .add(imeniceHeader, 1)
          .update(
            (adders => b => {
              skupinaOrder.forEach(i => adders[i](b.add(imeniceSubHeader, 1)));
            })([
              b => b.add(endingQuellNormalWidth, 2),
              b => b.add(skupIJdOWidth, 4).add(skupIMnWidth / 2, 2),
              b => b.add(endingQuellNormalWidth, 2),
            ] as const satisfies readonly ((
              b: ReturnType<typeof DimensionSizesDefinition.builder>
            ) => typeof b)[])
          )
          .finish()
      );
    },

    get subjectsColumnsDesc() {
      return once(
        this,
        `subjectsColumnsDesc`,
        true,
        DimensionSizesDefinition.builder()
          .add(leftHeadersWidth, 1)

          .join(this.imeniceColumnsDesc)

          .add(pridjevHeader, 1)

          .join(this.pridjevColumnsDesc)
          .finish()
      );
    },

    get glagloskeFormeInnerColumnsDesc() {
      const full1and2width = imeniceFullWidth * 0.6;
      const full3width = imeniceFullWidth - full1and2width;

      const full3jdWidth = full3width * 0.54;
      const full3mnWidth = full3width - full3jdWidth;

      const width1and2 = full1and2width / 4;
      const width3z = full3jdWidth * 0.45;
      const width3ms = (full3jdWidth - width3z) / 2;

      return once(
        this,
        `glagloskeFormeInnerColumnsDesc`,
        true,
        DimensionSizesDefinition.builder()
          .repeat(2, r =>
            r
              .add(width1and2, 1, { borders: { right: BorderType.bold } })
              .add(width1and2, 1, { borders: { right: BorderType.bolder } })
          )
          .repeat(1, r => r.add(width3ms, 2).add(width3z, 1, { borders: { right: BorderType.bold } }))
          .repeat(1, r => r.add(full3mnWidth / 3, 3, { borders: { right: BorderType.bold } }))

          .finish()
      );
    },
    get glagloskeFormeColumnsDesc() {
      return once(
        this,
        `glagloskeFormeColumnsDesc`,
        true,
        DimensionSizesDefinition.builder()
          .add(imeniceHeader, 1, { borders: { right: BorderType.bolder } })
          .add(endingQuellNormalHeight, 1, { borders: { right: BorderType.bolder } })
          .add(leftHeadersWidth - endingQuellNormalHeight * 2 - imeniceHeader, 1)
          .add(endingQuellNormalHeight, 1, { borders: { right: BorderType.bolder } })

          .join(this.glagloskeFormeInnerColumnsDesc)

          .add(pridjevHeader, 1)

          .join(this.pridjevColumnsDesc)

          .add(rightHeadersWidth, 1)

          .finish()
      );
    },
    get povratneImeniceColumnsDesc() {
      return once(
        this,
        `povratneImeniceColumnsDesc`,
        true,
        DimensionSizesDefinition.builder()
          .add(endingQuellNormalHeight, 1)
          .add(endingQuellNormalWidth, 1)
          .finish()
      );
    },
    get padezniImeniceColumnsDesc() {
      return once(
        this,
        `padezniImeniceColumnsDesc`,
        true,
        DimensionSizesDefinition.builder()
          .add(endingQuellNormalHeight, 1)
          .add(endingQuellNormalWidth * 1.1, 2)
          .finish()
      );
    },
    get licniImeniceColumnsDesc() {
      return once(
        this,
        `licniImeniceColumnsDesc`,
        true,
        DimensionSizesDefinition.builder()
          .add(leftHeadersWidth - endingQuellNormalHeight - this.padezniImeniceColumnsDesc.fullSize, 1)
          .join(this.padezniImeniceColumnsDesc)
          .add(endingQuellNormalHeight, 1)
          .join(this.glagloskeFormeInnerColumnsDesc)
          .add(endingQuellNormalHeight, 1)
          .add(100, 1)
          .finish()
      );
    },
  };
};

export const {
  use: useLayouter,
  useIfProvided: useLayouterOrNo,
  provider: LayouterProvider,
} = createUsableContext<ReturnType<typeof makeLayouter>>(`Layouter`);

export const licneImenicePadezi: readonly ((typeof allPadeziDescriptions)[keyof typeof allPadeziDescriptions] & {
  bold?: boolean;
})[][] = [
  // [allPadeziDescriptions.v],
  [{ ...allPadeziDescriptions.n, bold: true }],
  [allPadeziDescriptions.a],
  [allPadeziDescriptions.g],
  [allPadeziDescriptions.d],
  [allPadeziDescriptions.l],
  [allPadeziDescriptions.i],
];
