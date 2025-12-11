import {
  IconCaretLeftFilled as ArrowLeftIcon,
  IconCaretRightFilled as ArrowRightIcon,
} from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { ComponentProps } from 'react';

import { palette } from '../../const/lang-palettes.tsx';
import { HeadingHeadingTile } from '../../parts/tiles.tsx';
import { BasicQuell } from '../../util/Quable.tsx';
import { spreadLTRB } from '../../util/spread-ltrb.tsx';
import styles from './custom-quells.module.scss';

export const JDMNQuell = observer<{
  x: number;
  y: number;
  w?: number;
  mn?: boolean;
}>(function JDMNQuell({ x, y, w, mn }) {
  return (
    <HeadingQuell x={x} y={y} w={w} h={1} rootProps={{ style: { fontStyle: mn ? 'italic' : undefined } }}>
      {mn ? 'mn' : 'jd'}.
    </HeadingQuell>
  );
});

export const HeadingQuell = observer<
  ComponentProps<typeof BasicQuell> & {
    big?: boolean;
    bright?: boolean;
  }
>(function HeadingQuell({
  big,
  bright,
  children,
  rootProps: { style: rootStyle, ...rootProps } = {},
  ...props
}) {
  return (
    <BasicQuell
      rootProps={{
        ...rootProps,
        className: styles.headQuell,
        style: {
          fontSize: big ? undefined : `0.8rem`,
          background: bright ? undefined : palette.headerBg,
          color: palette.headerFg,
          ...spreadLTRB(`0.5rem`, `padding`, `l`, `r`),
          ...rootStyle,
        },
      }}
      {...props}
    >
      {children}
    </BasicQuell>
  );
});

export const HeadingHeadingQuell = observer<ComponentProps<typeof BasicQuell> & { rtl?: boolean }>(
  function HeadingHeadingQuell({
    children,
    rtl,
    rootProps: { style: rootStyle, ...rootProps } = {},
    ...props
  }) {
    return (
      <HeadingQuell
        rootProps={{
          ...rootProps,
          style: {
            justifyContent: rtl ? `start` : `end`,
            padding: `0 0.5rem`,
            opacity: 0.85,
            fontStyle: `italic`,
            ...rootStyle,
          },
        }}
        {...props}
        bright
      >
        <HeadingHeadingTile />
        {rtl ? (
          <>
            <ArrowLeftIcon className={styles.rightIcon} />
            {children}
          </>
        ) : (
          <>
            {children}
            <ArrowRightIcon className={styles.rightIcon} />
          </>
        )}
      </HeadingQuell>
    );
  }
);
