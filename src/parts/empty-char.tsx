import { Box } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { emptyChar } from '../const/unicode.tsx';
import { spreadLTRB } from '../util/spread-ltrb.tsx';

export const EmptyChar = observer(function EmptyChar() {
  return <Box style={spreadLTRB(`-2px`, `margin`, `l`, `r`)}>{emptyChar}</Box>;
});
