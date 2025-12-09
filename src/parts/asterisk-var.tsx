import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

import { palette } from '../const/lang-palettes.tsx';
import { bigAsterisks } from '../const/unicode.tsx';

export const bigAsterisk = bigAsterisks[0];

export const AsteriskVarDecl = observer<PropsWithChildren>(function AsteriskVarDecl({ children }) {
  return (
    <>
      <span style={{ flex: '0 0 auto', fontWeight: `bold`, fontStyle: `normal`, color: palette.asteriskVar }}>
        {bigAsterisk}=
      </span>
      <Flex align="center" justify="center" flex="1 0 auto" style={{ color: palette.asteriskVar }}>
        <span>{children}</span>
      </Flex>
    </>
  );
});

export const AsteriskVar = observer(function AsteriskVar() {
  return (
    <span style={{ fontWeight: `bold`, fontStyle: `normal`, color: palette.asteriskVar }}>{bigAsterisk}</span>
  );
});
