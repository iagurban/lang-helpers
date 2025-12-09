import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Fragment, PropsWithChildren } from 'react';

import { palette } from '../../const/lang-palettes.tsx';
import { semiHeaderQuellStyle, vrstStyle } from '../../const/styles-parts.tsx';
import { skupinaHeaderOpacity } from '../../const/whatewer.ts';
import { boldNumbers } from '../../parts/parts.tsx';
import { StandardJdMnMSZHeader } from '../../parts/standard-jd-mn-m-s-z-header.tsx';
import { Label } from '../../parts/styling/label.tsx';
import { SoftBreakTile } from '../../parts/tiles.tsx';
import { numberWrap } from '../../util/number-wrap.tsx';
import { BasicQuell } from '../../util/Quable.tsx';
import { Rotated } from '../../util/rotated.tsx';
import { skupinaOrder } from '../columns-definitions.tsx';
import { HeadingHeadingQuell, HeadingQuell, JDMNQuell } from '../quells/custom-quells.tsx';
import { VerticalQuell } from '../quells/vertical-quell.tsx';

const SkupinaHeaderLabel = observer<PropsWithChildren>(function SkupinaHeaderLabel({ children }) {
  return <Flex style={{ color: palette.skupina, opacity: skupinaHeaderOpacity }}>{children}</Flex>;
});

export const SubjectsHeaders = Object.assign(
  observer<{
    x: number;
    y: number;
  }>(function SubjectsHeaders({ x, y }) {
    const imeniceHeaderColSpan = 13;

    const renderImenHeaders = (x: number, y: number) => {
      const tx = numberWrap(x);
      const ty = numberWrap(y);

      const renderPerSkupina = [
        () => (
          <>
            <JDMNQuell x={tx.take()} y={ty.take()} w={1} />
            <JDMNQuell x={tx.take() + 1} y={ty.takeAndAdd(1)} w={1} mn />
            <HeadingQuell x={tx.takeAndAdd(2)} y={ty.takeAndSet(y)} w={2} h={1}>
              <Flex>ž.</Flex>
              <Flex>m.</Flex>
              <SkupinaHeaderLabel>{boldNumbers['1']}</SkupinaHeaderLabel>
            </HeadingQuell>
          </>
        ),
        () => (
          <>
            <JDMNQuell x={tx.take()} y={ty.takeAndAdd(1)} w={4} />
            <HeadingQuell x={tx.takeAndAdd(1)} y={ty.take()} w={1} h={1}>
              <Flex>m.</Flex>
              <SkupinaHeaderLabel>{boldNumbers['2']}</SkupinaHeaderLabel>
            </HeadingQuell>
            <HeadingQuell x={tx.takeAndAdd(1)} y={ty.take()} w={1} h={1}>
              <Flex>s.</Flex>
              <SkupinaHeaderLabel>{boldNumbers['4']}</SkupinaHeaderLabel>
            </HeadingQuell>
            <HeadingQuell x={tx.takeAndAdd(2)} y={ty.takeAndAdd(-1)} w={2} h={1}>
              <Flex>s.</Flex>
              <SkupinaHeaderLabel>{boldNumbers['2']}</SkupinaHeaderLabel>
            </HeadingQuell>
            <JDMNQuell x={tx.take()} y={ty.takeAndAdd(1)} w={2} mn />

            <HeadingQuell x={tx.takeAndAdd(1)} y={ty.take()} w={1} h={1}>
              <Flex>m.</Flex>
              <SkupinaHeaderLabel>{boldNumbers['2']}</SkupinaHeaderLabel>
            </HeadingQuell>
            <HeadingQuell x={tx.takeAndAdd(1)} y={ty.takeAndSet(y)} w={1} h={1}>
              <Flex>s.</Flex>
              <SkupinaHeaderLabel>{boldNumbers['2']}</SkupinaHeaderLabel>
              <SkupinaHeaderLabel>{boldNumbers['4']}</SkupinaHeaderLabel>
            </HeadingQuell>
          </>
        ),
        () => (
          <>
            <JDMNQuell x={tx.take()} y={ty.take()} w={1} />
            <JDMNQuell x={tx.take() + 1} y={ty.takeAndAdd(1)} w={1} mn />
            <HeadingQuell x={tx.takeAndAdd(2)} y={ty.takeAndSet(y)} w={2} h={1}>
              <Flex>ž.</Flex>
              <SkupinaHeaderLabel>{boldNumbers['3']}</SkupinaHeaderLabel>
            </HeadingQuell>
          </>
        ),
      ] as const;

      return (
        <>
          <VerticalQuell
            x={tx.takeAndAdd(1)}
            y={ty.takeAndAdd(0)}
            w={1}
            h={8}
            rootProps={{ style: semiHeaderQuellStyle }}
            label={<Flex style={vrstStyle}>imenice</Flex>}
          >
            <Rotated>
              <Label text="za palatalnim" color={palette.zaPalatalnim} bold small />
            </Rotated>
            <Rotated>
              <Label text="lični" color={palette.licni} bold small />
            </Rotated>
          </VerticalQuell>
          {skupinaOrder.map(i => (
            <Fragment key={i}>
              <BasicQuell x={tx.takeAndAdd(1)} y={ty.take()} h={2}>
                <SoftBreakTile />
              </BasicQuell>
              {renderPerSkupina[i]()}
            </Fragment>
          ))}
        </>
      );
    };

    const renderPridHeaders = (x: number, y: number) => {
      const tx = numberWrap(x);

      return (
        <>
          <VerticalQuell
            x={tx.take()}
            y={y}
            w={1}
            h={8}
            rootProps={{ style: semiHeaderQuellStyle }}
            label={<Flex style={vrstStyle}>pridjev</Flex>}
          >
            <Rotated>
              <Label text="neodređen" color={palette.neodreden} bold small />
            </Rotated>
          </VerticalQuell>

          <StandardJdMnMSZHeader x={tx.take() + 1} y={y} />
        </>
      );
    };

    const tx = numberWrap(x);
    const ry = numberWrap(y);

    return (
      <>
        <HeadingHeadingQuell x={tx.take()} y={ry.take()} w={1} h={1}>
          <Flex>broj</Flex>
        </HeadingHeadingQuell>
        <HeadingHeadingQuell x={tx.take()} y={ry.take() + 1} w={1} h={1}>
          <Flex>rod</Flex>
          <Flex style={{ color: palette.skupina, opacity: skupinaHeaderOpacity }}>skupina</Flex>
        </HeadingHeadingQuell>

        {renderImenHeaders(tx.takeAndAdd(imeniceHeaderColSpan + 2) + 1, ry.take())}
        {renderPridHeaders(tx.take(), 0)}
      </>
    );
  }),
  { rowSpan: 3 }
);
