import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

export const Chip = observer<{
  text: string;
  color: string;
}>(function Chip({ color, text }) {
  return (
    <Flex
      style={{
        fontSize: `0.6rem`,
        background: color,
        borderRadius: `4px`,
        color: `#fff`,
        padding: `0px 4px`,
        fontWeight: `bold`,
        position: `absolute`,
        right: `-8px`,
        bottom: `3px`,
        opacity: 0.7,
      }}
    >
      {text}
    </Flex>
  );
});
