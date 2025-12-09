import { IconCaretDownFilled } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { ComponentProps, PropsWithChildren } from 'react';

import { BasicQuell } from '../../util/Quable.tsx';
import { Rotated } from '../../util/rotated.tsx';

export const VerticalQuell = observer<
  PropsWithChildren<
    {
      label: JSX.Element;
      noArrow?: boolean;
      labelRotatedProps?: ComponentProps<typeof Rotated>;
    } & ComponentProps<typeof BasicQuell>
  >
>(function VerticalQuell({ children, label, noArrow, rootProps, labelRotatedProps, ...props }) {
  return (
    <BasicQuell
      {...props}
      rootProps={{ direction: `column`, justify: `space-between`, pb: `0.5rem`, ...rootProps }}
    >
      <Rotated {...labelRotatedProps}>
        {label}
        {!noArrow && <IconCaretDownFilled height="0.8rem" />}
      </Rotated>
      {children}
    </BasicQuell>
  );
});
