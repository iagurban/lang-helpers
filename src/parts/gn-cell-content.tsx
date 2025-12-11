import { Flex, Tooltip } from '@mantine/core';
import { IconMan as PersonIcon, IconTree as TreeIcon } from '@tabler/icons-react';
import { clsx } from 'clsx';
import { observer } from 'mobx-react-lite';

import { palette } from '../const/lang-palettes.tsx';
import { svgDefsIds } from '../const/whatewer.ts';
import { anchored, xmlns } from '../util/tiles-pattern-svg.tsx';
import classes from './gn-cell-content.module.scss';

export const GNCellContent = observer(function GNCellContent() {
  return (
    <Tooltip
      label={
        <Flex direction="column">
          <Flex>Ako je živo – deklinira se kao genitiv, inače – kao nominativ</Flex>
          <Flex fs="italic">Čovek – Vidim čoveka</Flex>
          <Flex fs="italic">Drvo – Vidim drvo</Flex>
        </Flex>
      }
    >
      <Flex className={classes.gnCell}>
        <Flex className={clsx(classes.pair, classes.unanimated)} style={{ color: palette.nezivo }}>
          <svg xmlns={xmlns} className={classes.arrow}>
            <use href={anchored(svgDefsIds.gnArrow)}></use>
          </svg>
          <Flex>
            <TreeIcon className={classes.icon} />
          </Flex>
        </Flex>
        <Flex className={clsx(classes.pair, classes.animated)} style={{ color: palette.zivo }}>
          <Flex>
            <PersonIcon className={classes.icon} />
          </Flex>
          <svg xmlns={xmlns} className={classes.arrow}>
            <use href={anchored(svgDefsIds.gnArrow)}></use>
          </svg>
        </Flex>
      </Flex>
    </Tooltip>
  );
});
