import { Flex, Tooltip, TooltipProps } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import React, { ComponentProps, PropsWithChildren } from 'react';

import { HelpItem } from '../help-items.tsx';

export const WithHelpItemTooltip = observer<
  PropsWithChildren<
    {
      item: HelpItem;
    } & Omit<TooltipProps, `multiline` | `label`>
  >
>(function WithHelpItemTooltip({ item, children, ...props }) {
  return (
    <Tooltip multiline label={item.render()} maw="95vw" {...props} withArrow>
      {typeof children === `string` ? <Flex>{children}</Flex> : children}
    </Tooltip>
  );
});

export const HelpItemBadge = observer<Omit<ComponentProps<typeof WithHelpItemTooltip>, `children`>>(
  function HelpItemBadge({ ...props }) {
    return (
      <WithHelpItemTooltip {...props}>
        <Flex
          style={{
            display: `inline`,
            background: props.item.type === `meki` ? `#41a` : `#a23`,
            color: `#fff`,
            fontSize: `0.5rem`,
            borderRadius: `0.1rem`,
            padding: `0.05rem 0.1rem`,
            pointerEvents: `all`,
            zIndex: 100,
          }}
        >
          {props.item.label}
        </Flex>
      </WithHelpItemTooltip>
    );
  }
);

export const HelpBadgesGroup = observer<
  PropsWithChildren<{
    rtl?: boolean;
  }>
>(function HelpBadgesGroup({ children, rtl }) {
  return (
    <Flex
      wrap="wrap"
      gap="0.1rem"
      direction={rtl ? `column` : `row`}
      align={rtl ? 'flex-end' : 'flex-start'}
      justify={rtl ? 'flex-end' : 'flex-start'}
      style={{
        position: `absolute`,
        width: `100%`,
        height: `100%`,
        padding: `0.15rem`,
        pointerEvents: `none`,
      }}
    >
      {children}
    </Flex>
  );
});
