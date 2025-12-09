import { Collapse, Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

import { PraQuell } from '../parts/pra-quell.tsx';

export const Collapsible = observer<
  PropsWithChildren<{
    headerContent: () => JSX.Element;
    opened: boolean;
    onOpenChange: (opened: boolean) => unknown;
  }>
>(function Collapsible({ headerContent, opened, onOpenChange, children }) {
  return (
    <>
      <Flex align="stretch" direction={opened ? `row` : `column`}>
        <PraQuell
          vertical={opened}
          rootProps={{
            onClick: () => {
              onOpenChange(!opened);
            },
            sx: opened ? undefined : { flex: `1` },
          }}
          enableAllBorders
        >
          {headerContent()}
        </PraQuell>
        <Collapse in={opened}>
          <Flex direction="column">{children}</Flex>
        </Collapse>
      </Flex>
    </>
  );
});
