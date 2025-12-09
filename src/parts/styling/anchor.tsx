import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

export const Anchor = observer<PropsWithChildren<{ decl?: boolean }>>(function Anchor({ decl, children }) {
  return (
    <Flex style={{ color: '#158023', fontWeight: 'bold' }}>
      {decl && <Flex style={{ color: `#d21430` }}>!</Flex>}#{children}
    </Flex>
  );
});

export const ComplexAnchorDecl = observer<{
  name: string;
  descr: string;
  upperText?: string;
  tight?: boolean;
}>(function ComplexAnchorDecl({ name, descr, upperText = `osnova`, tight }) {
  const inset = `0.25rem`; // `${tight ? 0.2 : 0.5}rem`;

  const labelsStyles = {
    fontSize: `0.65rem`,
    lineHeight: `0.7rem`,
    fontStyle: `italic`,
  } as const;

  const bracesStyles = {
    fontSize: `2.4rem`,
  } as const;

  return (
    <Flex>
      <Flex style={{ ...bracesStyles }}>[</Flex>
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{ padding: `0.2rem ${inset} 0 ${inset}` }}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            ...labelsStyles,
            opacity: 0.5,
            marginTop: `0rem`,
            marginBottom: `-0.25rem`,
          }}
        >
          {upperText}
        </Flex>
        <Anchor decl>{name}</Anchor>
        <Flex
          align="center"
          justify="center"
          style={{
            ...labelsStyles,
            opacity: 0.7,
            marginTop: `-0.25rem`,
          }}
        >
          {descr}
        </Flex>
      </Flex>
      <Flex style={{ ...bracesStyles }}>]</Flex>
    </Flex>
  );
});
