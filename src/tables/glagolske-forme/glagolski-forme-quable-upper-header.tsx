import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { SuperAndComparPridjevFormula } from '../../parts/super-and-compar-pridjev-formula.tsx';
import { HardBreakTile } from '../../parts/tiles.tsx';
import { useRootStore } from '../../storage.ts';
import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell, QuellContent } from '../../util/Quable.tsx';
import { xmlns } from '../../util/tiles-pattern-svg.tsx';
import { ProvideMutationObserverEngine } from '../../util/use-resize-observer-2.tsx';
import { breakStripeWidth } from '../columns-definitions.tsx';
import { GlagolskiPridjevVerticalQuellsKit } from '../glagolski-pridjev/glagolski-pridjev-vertical-quells-kit.tsx';
import { GlagolskeFormeHeaderQuells } from './glagolske-forme-header-quells.tsx';
import { InfinitivQuells } from './infinitiv-quells.tsx';

export const GlagolskiFormeQuableUpperHeader = observer<{
  x: number;
  y: number;
}>(function GlagolskiFormeQuableUpperHeader({ x, y }) {
  const store = useRootStore();

  const renderComparPridjevi = (x: number, y: number) => {
    const tx = numberWrap(x);
    const ty = numberWrap(y);

    return (
      <>
        <BasicQuell x={tx.takeAndAdd(3)} y={ty.takeAndAdd(-1)} w={6} h={2} noBorders>
          <Flex
            h="2.5rem"
            bg="rgba(255,255,255,0.7)"
            pos="absolute"
            left={'50%'}
            top={0}
            w="calc(100% - 4rem)"
            bd="1px solid #000"
            style={{ transform: `translateX(-50%)`, borderTop: `none` }}
          >
            <ProvideMutationObserverEngine>
              <SuperAndComparPridjevFormula />
            </ProvideMutationObserverEngine>
          </Flex>
        </BasicQuell>
      </>
    );
  };

  const tx = numberWrap(x);
  const ty = numberWrap(y);

  return (
    <>
      <InfinitivQuells x={tx.take()} y={ty.takeAndAdd(InfinitivQuells.rowSpan)} />
      <GlagolskeFormeHeaderQuells
        x={tx.take()}
        y={ty.takeAndAdd(GlagolskeFormeHeaderQuells.rowSpan) - 1}
        headerColSpan={4}
      />

      <BasicQuell x={tx.set(14)} y={1} w={1} h={6} noBorders rootProps={{ style: {} }}>
        <svg
          xmlns={xmlns}
          style={{ width: `calc(50% - 4px)`, left: 2, position: `absolute`, overflow: `visible` }}
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            vectorEffect="non-scaling-stroke"
            d="M2,2 Q 98,2,98,20 L 98,80 Q 98,98,2,98"
            strokeLinecap="square"
            stroke="#000"
            strokeWidth={2}
            fill="none"
            clipPath="none"
          />
        </svg>
        <QuellContent
          rotate
          style={{
            fontSize: `0.75rem`,
            fontStyle: `italic`,
            lineHeight: `1rem`,
            whiteSpace: `nowrap`,
            position: 'relative',
            // left: 0,
            background: `#2a2e3c`,
            color: `#fef9ef`,
            border: `1px dashed #fff`,
            borderRadius: `150px`,
            padding: `0 0.5rem 0 0.5rem`,
            transformOrigin: `center`,
          }}
        >
          riječnički obliki
        </QuellContent>
      </BasicQuell>

      <BasicQuell
        x={tx.take()}
        y={2 + (store.subjektiOpened ? 0 : -1)}
        w={1}
        h={5 + (store.subjektiOpened ? 0 : 1)}
        noBorders
      >
        <Flex style={{ width: breakStripeWidth, position: `absolute`, right: 0, height: `100%` }}>
          <HardBreakTile />
        </Flex>
      </BasicQuell>

      <GlagolskiPridjevVerticalQuellsKit x={tx.add(1)} y={ty.set(y)} />

      {renderComparPridjevi(tx.take(), ty.take() - 1)}
    </>
  );
});
