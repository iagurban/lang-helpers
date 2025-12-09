import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

import { vrstStyle } from '../../const/styles-parts.tsx';

export const VrstLabel = observer<PropsWithChildren>(function VrstLabel({ children }) {
  return <span style={vrstStyle}>{children}</span>;
});
