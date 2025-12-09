import { observer } from 'mobx-react-lite';

import { svgDefsIds } from '../const/whatewer.ts';

export const GNArrowSymbol = observer(function GNArrowSymbol() {
  return (
    <symbol
      id={svgDefsIds.gnArrow}
      viewBox="0 0 10 20"
      style={{ strokeLinecap: `round`, strokeLinejoin: `round` }}
    >
      <path stroke="currentColor" strokeWidth={1.5} fill="none" d="M 3,18 Q -1,12 8,2 L 8,8 M 8,2 L 2,3" />
    </symbol>
  );
});

export const ArrowsSymbolDefs = observer(function ArrowsSymbolDefs() {
  return (
    <svg aria-hidden style={{ position: `absolute`, pointerEvents: `none` }}>
      <defs>
        <GNArrowSymbol />
      </defs>
    </svg>
  );
});
