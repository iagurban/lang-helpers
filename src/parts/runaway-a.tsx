import { uidGenerator } from '@grbn/kit';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { figtreeVariableFontFace } from '../fonts/variable/figtree.ts';
import { montserratVariableFontFace } from '../fonts/variable/montserrat.ts';
import { anchored, useTileRenderer, xmlns } from '../util/tiles-pattern-svg.tsx';

export const RunawayA1 = observer<{ size?: number | string }>(function RunawayA1({ size = `1rem` }) {
  const {
    item: { id: tileId, size: tileSize },
  } = useTileRenderer({ width: 7, step: 9, flip: true }).get();
  const patternId = useMemo(() => `_auto_tile-pattern-${uidGenerator()}`, []);

  const { maskId } = useMemo(() => ({ maskId: `__runaway_mask_${uidGenerator()}` }), []);

  return (
    <>
      <svg xmlns={xmlns} style={{ width: size, height: size }} viewBox={'0 0 100 100'}>
        <defs>
          {
            <mask id={maskId}>
              <rect width="100%" height="100%" fill="black" />
              <circle cx="50%" cy="50%" r="45%" stroke="white" strokeWidth={10} fill="none" />
            </mask>
          }
          <pattern id={patternId} patternUnits="userSpaceOnUse" width={tileSize} height={tileSize}>
            <use href={anchored(tileId)} />
          </pattern>
        </defs>
        <rect fill={`url(#${patternId})`} mask={`url(#${maskId})`} width="100%" height="100%" />
        <text
          x="50%"
          y="50%"
          fontSize={110}
          fontFamily={figtreeVariableFontFace}
          fill="black"
          style={{ textAnchor: `middle`, dominantBaseline: `middle`, fontWeight: `bold` }}
        >
          a
        </text>
      </svg>
    </>
  );
});

export const RunawayA2 = observer<{ size?: number | string }>(function RunawayA2({ size = `1rem` }) {
  const {
    item: { id: tileId, size: tileSize },
  } = useTileRenderer({ width: 5.4, step: 9.7, flip: false }).get();
  const patternId = useMemo(() => `_auto_tile-pattern-${uidGenerator()}`, []);

  const { maskId } = useMemo(() => ({ maskId: `__runaway_mask_${uidGenerator()}` }), []);

  return (
    <>
      <svg xmlns={xmlns} style={{ width: size, height: size, color: `#555` }} viewBox={'0 0 100 100'}>
        <defs>
          {
            <mask id={maskId}>
              <rect width="100%" height="100%" fill="black" />
              <circle cx="50%" cy="50%" r="50%" stroke="none" fill="white" />
              <text
                x="50%"
                y="50%"
                fontSize={130}
                fontFamily={montserratVariableFontFace}
                fill="black"
                style={{ textAnchor: `middle`, dominantBaseline: `middle`, fontWeight: `bold` }}
              >
                a
              </text>
            </mask>
          }
          <pattern id={patternId} patternUnits="userSpaceOnUse" x={-6} width={tileSize} height={tileSize}>
            <use href={anchored(tileId)} />
          </pattern>
        </defs>
        <rect fill={`url(#${patternId})`} mask={`url(#${maskId})`} width="100%" height="100%" />
        {/*<circle cx="50%" cy="50%" r="48%" stroke="black" strokeWidth={5} strokeDasharray={'10'} fill="none" />*/}
      </svg>
    </>
  );
});

export const RunawayA = RunawayA2;
