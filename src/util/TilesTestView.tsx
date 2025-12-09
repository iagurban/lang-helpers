/** TILING METHODS TEST STUFF */
import { createUsableContext } from '@grbn/kit/react/react.ts';
import { Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, ReactElement, useMemo } from 'react';
import { renderToString } from 'react-dom/server';

import { Label } from '../parts/styling/label.tsx';
import { prepareTileStep, TileSvgContent, WithTiledBackground } from './tiles-pattern-svg.tsx';

const TileSvg = observer<{
  color: string;
  width: number;
  step: number;
  flip?: boolean;
}>(function TileSvg({ color, step, width, flip }) {
  step = prepareTileStep(step, width);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${step}px`}
      height={`${step}px`}
      viewBox={`0 0 ${step} ${step}`}
      style={{
        color,
        strokeLinecap: `square`,
        strokeWidth: width,
      }}
    >
      <TileSvgContent width={width} step={step} flip={flip} />
    </svg>
  );
});

const svgTilesContext = createUsableContext<Record<`lightGray`, string>>(`SvgTilesContext`);

const renderSvgToString = (e: ReactElement) => `url("data:image/svg+xml;base64,${btoa(renderToString(e))}")`;

const SvgTilesMaker = observer<PropsWithChildren>(function SvgTilesMaker({ children }) {
  const data = useMemo(
    (): ReturnType<typeof svgTilesContext.use> => ({
      lightGray: renderSvgToString(<TileSvg color="#44a" width={3} step={5} />),
    }),
    []
  );
  return <svgTilesContext.provider value={data}>{children}</svgTilesContext.provider>;
});

export const TilesTestView = observer(function TilesTestView() {
  const testTile = () => <TileSvg color="#44a" width={3} step={5} />;

  const tileSVg = useMemo(() => renderSvgToString(testTile()), []);
  const tileSVgSymboled = useMemo(
    () =>
      renderSvgToString(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={`${10}px`}
          height={`${10}px`}
          viewBox={`0 0 ${10} ${10}`}
        >
          {/*<use href={anchored(svgDefsIds.lightGrayTile)}></use>*/}
        </svg>
      ),
    []
  );

  // console.log(tileSVg);
  return (
    <>
      <SvgTilesMaker>
        <Flex style={{ display: `inline-flex` }}>
          <div
            style={{
              // position: `absolute`,
              // border: `1px solid #a83`,
              // left: 100,
              // top: 100,
              width: 150,
              height: 184,
              backgroundImage: tileSVg,
              backgroundRepeat: `repeat`,
            }}
          >
            <Label color="#000" text="Background full svg" />
          </div>
          <div
            style={{
              position: `relative`,
              border: `1px solid #a83`,
              // left: 100,
              // top: 100,
              // width: 150,
              height: 184,
            }}
          >
            <WithTiledBackground color="#bad" width={10} step={10}>
              <span>WithTiledBackground</span>
            </WithTiledBackground>
          </div>
        </Flex>
      </SvgTilesMaker>
    </>
  );
});
