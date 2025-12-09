import { crimsonProVariableFontFace } from '../fonts/variable/crimson-pro.ts';
import { dancingScriptVariableFontFace } from '../fonts/variable/dancing-script.ts';
import { jostVariableFontFace } from '../fonts/variable/jost.ts';
import { palette } from './lang-palettes.tsx';

export const enlargedFont = `1.2rem`;

export const pomocniFontStyle = {
  fontFamily: crimsonProVariableFontFace,
  fontStyle: `italic`,
  fontWeight: `bold`,
} as const;

export const eaiHeaderFontStyle = {
  fontFamily: dancingScriptVariableFontFace,
  fontWeight: `900`,
} as const;

export const vrstStyle = {
  fontFamily: jostVariableFontFace,
  fontWeight: `bold`,
  color: palette.vrstHeaderLabel,
} as const;

export const semiHeaderQuellStyle = {
  background: `#f3f3f3`,
  zIndex: 100,
} as const;
