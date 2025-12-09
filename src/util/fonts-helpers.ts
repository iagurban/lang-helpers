export type FontConfig = {
  fontFamily: string;
  type?: `serif` | `sans-serif` | `monospace` | `cursive` | `fantasy`; // default = sans-serif
  fallbackFamilies?: readonly string[];
};

const wrapFontFamily = (ff: string) => (ff.indexOf("'") ? `"${ff}"` : `'${ff}'`);

export const cssFontFamily = (f: FontConfig, dflt: Exclude<FontConfig[`type`], undefined> = 'sans-serif') =>
  [
    wrapFontFamily(f.fontFamily),
    ...(f.fallbackFamilies?.map(wrapFontFamily) || []),
    // last type doesn't needed to be wrapped in quotes
    f.type ?? dflt,
  ].join(`,`);
