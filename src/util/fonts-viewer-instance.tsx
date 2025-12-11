import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { alegreyaVariableFontFace } from '../fonts/variable/alegreya.ts';
import { crimsonProVariableFontFace } from '../fonts/variable/crimson-pro.ts';
import { dancingScriptVariableFontFace } from '../fonts/variable/dancing-script.ts';
import { exo2VariableFontFace } from '../fonts/variable/exo-2.ts';
import { figtreeVariableFontFace } from '../fonts/variable/figtree.ts';
import { jostVariableFontFace } from '../fonts/variable/jost.ts';
import { leagueSpartanVariableFontFace } from '../fonts/variable/league-spartan.ts';
import { merriweatherSansVariableFontFace } from '../fonts/variable/merriweather-sans.ts';
import { montserratVariableFontFace } from '../fonts/variable/montserrat.ts';
import { notoSansVariableFontFace } from '../fonts/variable/noto-sans.ts';
import { nunitoVariableFontFace } from '../fonts/variable/nunito.ts';
import { outfitVariableFontFace } from '../fonts/variable/outfit.ts';
import { piazzollaVariableFontFace } from '../fonts/variable/piazzolla.ts';
import { recursiveVariableFontFace } from '../fonts/variable/recursive.ts';
import { robotoCondensedVariableFontFace } from '../fonts/variable/roboto-condensed.ts';
import { robotoFlexVariableFontFace } from '../fonts/variable/roboto-flex.ts';
import { robotoSerifVariableFontFace } from '../fonts/variable/roboto-serif.ts';
import { robotoSlabVariableFontFace } from '../fonts/variable/roboto-slab.ts';
import { FontsViewer } from './FontsViewer.tsx';

export const FontsViewerInstance = observer(function FontsViewerInstance() {
  return (
    <FontsViewer
      fonts={[
        alegreyaVariableFontFace,
        crimsonProVariableFontFace,
        dancingScriptVariableFontFace,
        exo2VariableFontFace,
        figtreeVariableFontFace,
        jostVariableFontFace,
        leagueSpartanVariableFontFace,
        merriweatherSansVariableFontFace,
        montserratVariableFontFace,
        notoSansVariableFontFace,
        nunitoVariableFontFace,
        outfitVariableFontFace,
        piazzollaVariableFontFace,
        recursiveVariableFontFace,
        robotoCondensedVariableFontFace,
        robotoFlexVariableFontFace,
        robotoSerifVariableFontFace,
        robotoSlabVariableFontFace,
      ].map(s => ({ fontFamily: s }))}
    >
      <Flex style={{ whiteSpace: `pre-wrap`, fontSize: `2rem` }}>
        Test <span style={{ fontWeight: 800 }}>Text</span>
        <span style={{ fontStyle: `italic` }}>cursive ščćđ</span>
      </Flex>
    </FontsViewer>
  );
});

export default FontsViewerInstance;
