import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { ComponentProps, forwardRef, PropsWithChildren } from 'react';

import classes from './ea-box.module.scss';

export const SeparatedVBox = observer(
  forwardRef<HTMLDivElement, PropsWithChildren<ComponentProps<`div`>>>(function SeparatedVBox(
    { children, className, ...props },
    ref
  ) {
    return (
      <div ref={ref} className={clsx(classes.eaBoxRoot, className)} {...props}>
        {children}
      </div>
    );
  })
);
