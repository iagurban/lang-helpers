import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import classes from '../parts/inline-switch.module.scss';

export const InlineSwitch = observer(function InlineSwitch<T extends string>({
  options,
  onChange,
  value,
}: {
  options: readonly { key: T; label: string }[];
  value: string;
  onChange: (key: T) => void;
}) {
  return (
    <div className={classes.root}>
      {options.map(({ key, label }) => (
        <Flex
          key={key}
          style={(value === key && { color: `#fff`, background: `#62a` }) || undefined}
          onClick={() => onChange(key)}
        >
          {label}
        </Flex>
      ))}
    </div>
  );
});
