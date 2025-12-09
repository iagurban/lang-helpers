import { uidGenerator } from '@grbn/kit';
import { ObservableExMap } from '@grbn/kit/mobx';
import { createUsableContext } from '@grbn/kit/react';
import { action, computed, makeObservable, runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ComponentProps, PropsWithChildren, SVGProps, useEffect, useMemo } from 'react';

export const xmlns = 'http://www.w3.org/2000/svg';

export const anchored = (s: string) => `#${s}`;

export const samplesRange = (start: number, end /* not included */ : number, step: number = 1) => {
  const r: number[] = [];
  if (end > start) {
    if (step <= 0) {
      throw new Error(`step must be > 0 if end > start`);
    }
    for (let i = start; i < end; i += step) {
      r.push(i);
    }
  } else {
    if (step >= 0) {
      throw new Error(`step must be < 0 if end < start`);
    }
    for (let i = start; i > end; i += step) {
      r.push(i);
    }
  }
  return r;
};

const safeBase64Encode = (s: string) => encodeURI(btoa(s)).replace(`%`, `_`);

export const prepareTileStep = (step: number, width: number) =>
  Math.max(
    /* get x/y-step from diagonal step */ Math.round(Math.sqrt(step * step * 2)) +
      /* add width to step */ width,
    Number.EPSILON
  );

export type TileParameters = {
  color: string;
  width: number;
  step: number;
  flip?: boolean;
};

const makeTileId = ({ step, flip, width }: Omit<TileParameters, `color`>) =>
  safeBase64Encode(JSON.stringify({ step, flip: flip || false, width }));

export type TileData = {
  id: string;
  rendered: boolean;
  size: number;
  params: Omit<TileParameters, `color`>;
  counter: number;
};

export class TilesManagerStore {
  constructor() {
    makeObservable(this);
  }

  readonly reg = new ObservableExMap<string, TileData>();

  @action
  acquire(params: Omit<TileParameters, `color`>) {
    const { reg } = this;
    const id = makeTileId(params);
    const item = reg.getOrCreate(id, () => ({
      id,
      params,
      rendered: false,
      counter: 0,
      size: prepareTileStep(params.step, params.width),
    }));
    item.counter++;
    return {
      item,
      release: () =>
        runInAction(() => {
          if (item.counter < 1) {
            reg.delete(id);
          } else {
            item.counter--;
          }
        }),
    };
  }
}

export const { use: useTileRendererManager, provider: TileRendererManagerProvider } =
  createUsableContext<TilesManagerStore>(`TileRendererManagerContext`);

export const useTileRenderer = ({ step, flip, width }: Omit<TileParameters, `color`>) => {
  const m = useTileRendererManager();
  const r = useMemo(() => computed(() => m.acquire({ step, flip, width })), [step, flip, width, m]);
  useEffect(() => () => r.get().release(), [r]);
  return r;
};

export const TilePatternSvg = observer<{
  color: string;
  width: number;
  step: number;
  holeInset?: number;
  holeCornersRadius?: number;
  flip?: boolean;
  background?: string;
  zIndex?: number;
  opacity?: number;
  svgProps?: SVGProps<SVGSVGElement>;
}>(function TilePatternSvg({
  color,
  step,
  width,
  flip,
  zIndex,
  opacity,
  background,
  holeInset: inset,
  holeCornersRadius: radius,
  svgProps: { style, ...svgProps } = {},
}) {
  const {
    item: { id: tileId, size: tileSize },
  } = useTileRenderer({ width, step, flip }).get();

  const patternId = useMemo(() => `_auto_tile-pattern-${uidGenerator()}`, []);
  const mask = useMemo(
    () =>
      (inset &&
        inset > 0 && {
          id: `_auto_tile-mask-${uidGenerator()}`,
          r: `${(radius ?? inset) * 2}px`,
          ii: inset * 2,
        }) ||
      undefined,
    [inset]
  );

  return (
    <svg
      xmlns={xmlns}
      style={{ color, background, zIndex: zIndex ?? -1000, opacity, ...style }}
      {...svgProps}
    >
      <defs>
        {mask && (
          <mask id={mask.id}>
            <rect width="100%" height="100%" fill="white" />
            <rect width="100%" height="100%" rx={mask.r} strokeWidth={mask.ii} stroke="white" fill="black" />
          </mask>
        )}
        <pattern id={patternId} patternUnits="userSpaceOnUse" width={tileSize} height={tileSize}>
          <use href={anchored(tileId)} />
        </pattern>
      </defs>
      <rect fill={`url(#${patternId})`} mask={mask && `url(#${mask.id})`} width="100%" height="100%" />
    </svg>
  );
});

export const WithTiledBackground = observer<PropsWithChildren<ComponentProps<typeof TilePatternSvg>>>(
  function WithTiledBackground({ children, svgProps: { style, ...svgProps } = {}, ...props }) {
    return (
      <>
        <TilePatternSvg
          svgProps={{
            height: `100%`,
            width: `100%`,
            style: {
              position: `absolute`,
              left: 0,
              top: 0,
              pointerEvents: `none`,
              ...style,
            },
            'aria-hidden': true,
            ...svgProps,
          }}
          {...props}
        />
        {children}
      </>
    );
  }
);

export const TileSvgContent = observer<{
  width: number;
  step: number;
  flip?: boolean;
}>(function TileSvgContent({ step, flip }) {
  const [y1k, y2k] = flip ? [`y1`, `y2`] : [`y2`, `y1`];
  const yy = { [y1k]: 0, [y2k]: step, stroke: 'currentColor' };

  const bound = step * 2;

  return (
    <>
      {samplesRange(-bound, bound + Number.EPSILON, step).map(x => (
        <line key={x} x1={x} x2={x + step} {...yy} />
      ))}
    </>
  );
});

const TileSvgSymbol = observer<{
  id: string;
  tileData: TileData;
}>(function TileSvgSymbol({
  id,
  tileData: {
    size,
    params: { width, flip },
  },
}) {
  return (
    <symbol
      id={id}
      xmlns={xmlns}
      width={`${size}px`}
      height={`${size}px`}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        strokeLinecap: `square`,
        strokeWidth: width,
      }}
    >
      <TileSvgContent width={width} step={size} flip={flip} />
    </symbol>
  );
});

const TileManagerRenderer = observer(function TileManagerRenderer() {
  const m = useTileRendererManager();

  return (
    <svg xmlns={xmlns} style={{ position: `absolute`, pointerEvents: `none` }}>
      <defs>
        {m.reg.toArray((v, id) => (
          <TileSvgSymbol key={id} id={id} tileData={v} />
        ))}
      </defs>
    </svg>
  );
});

export const ProvideTilesManager = observer<PropsWithChildren>(function ProvideTilesManager({ children }) {
  const store = useMemo(() => new TilesManagerStore(), []);

  return (
    <TileRendererManagerProvider value={store}>
      <TileManagerRenderer />
      {children}
    </TileRendererManagerProvider>
  );
});
