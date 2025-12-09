const mappingForLTRB = {
  l: `Left`,
  t: `Top`,
  r: `Right`,
  b: `Bottom`,
} as const;

export const spreadLTRB = <K extends `l` | `t` | `r` | `b`, KK extends readonly K[], P extends string, V>(
  value: V,
  prefix: P,
  ...keys: KK
) =>
  Object.fromEntries(keys.map(k => [`${prefix}${mappingForLTRB[k]}`, value])) as {
    [_K in KK[number] as _K extends string
      ? _K extends `l`
        ? `${P}Left`
        : _K extends `t`
          ? `${P}Top`
          : _K extends `r`
            ? `${P}Right`
            : `${P}Bottom`
      : never]: V;
  };

export const spreadLR = <V, P>(value: V, prefix: P) => ({
  [`${prefix}Left`]: value,
  [`${prefix}Right`]: value,
});

export const spreadTB = <V, P>(value: V, prefix: P) => ({
  [`${prefix}Top`]: value,
  [`${prefix}Bottom`]: value,
});

export const spreadLTR = <V, P>(value: V, prefix: P) => ({
  [`${prefix}Left`]: value,
  [`${prefix}Top`]: value,
  [`${prefix}Right`]: value,
});

export const spreadRBL = <V, P>(value: V, prefix: P) => ({
  [`${prefix}Right`]: value,
  [`${prefix}Bottom`]: value,
  [`${prefix}Left`]: value,
});
