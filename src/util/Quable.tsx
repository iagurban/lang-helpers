import { samplesBy } from '@grbn/kit';
import { createUsableContext } from '@grbn/kit/react';
import { Flex, FlexProps } from '@mantine/core';
import { computed, makeObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { computedFn } from 'mobx-utils';
import { CSSProperties, PropsWithChildren, useMemo } from 'react';

import { numberWrap } from './number-wrap';

export enum BorderType {
  none,
  normal,
  bold,
  bolder,
  boldest,
}

export type DimensionItemConfig = {
  size: number;
  borders?: Partial<Record<`left` | `right` | `top` | `bottom`, BorderType>>;
};

export class DimensionSizesDefinition {
  static builder() {
    const children: (DimensionItemConfig | DimensionSizesDefinition)[] = [];
    type Builder = {
      add(size: number, count?: number, config?: Omit<DimensionItemConfig, `size`>): Builder;
      update(u: (b: Builder) => unknown): Builder;
      cond(cond: boolean, u: (b: Builder) => unknown): Builder;
      repeat(count: number, fn: (r: Builder) => void | unknown): Builder;
      join(o: DimensionSizesDefinition): Builder;
      finish(restElementsSize?: number): DimensionSizesDefinition;
    };

    const r: Builder = {
      add: (size, count = 1, config) => {
        children.push(...samplesBy(count, () => ({ size, ...config })));
        return r;
      },
      repeat: (count, fn) => {
        for (let i = 0; i < count; ++i) {
          fn(r);
        }
        return r;
      },
      update: u => {
        u(r);
        return r;
      },
      cond: (v, u) => {
        if (v) {
          u(r);
        }
        return r;
      },
      join: o => {
        children.push(o);
        return r;
      },
      finish: restElementsSize => new DimensionSizesDefinition(children, restElementsSize),
    };
    return r;
  }

  protected constructor(
    readonly children: (DimensionItemConfig | DimensionSizesDefinition)[],
    readonly restElementsSize?: number
  ) {
    makeObservable(this);
  }

  @computed
  get flatChildren(): readonly DimensionItemConfig[] {
    return this.children.flatMap(v => (v instanceof DimensionSizesDefinition ? v.flatChildren : [v]));
  }

  @computed
  get sizes(): readonly number[] {
    return this.flatChildren.map(v => v.size);
  }

  @computed
  get offsets() {
    const offset = numberWrap(0);
    return this.sizes.map(v => offset.takeAndAdd(v));
  }

  offset(pos: number) {
    if (pos < 0 || pos !== Math.trunc(pos)) {
      throw new RangeError(`pos = ${pos} (expected > 0)`);
    }
    if (pos >= this.sizes.length) {
      if (this.restElementsSize == null) {
        throw new RangeError(`pos = ${pos} (expected < ${this.sizes.length})`);
      }
      pos -= this.sizes.length;
      return this.fullSize + pos * this.restElementsSize;
    }
    return this.offsets[pos];
  }

  size(offset: number, length: number) {
    if (offset < 0 || offset !== Math.trunc(offset)) {
      throw new RangeError(`offset = ${offset} (expected >= 0)`);
    }
    if (length < 1 || length !== Math.trunc(length)) {
      throw new RangeError(`length = ${length} (expected >= 1)`);
    }
    const end = offset + length;
    if (end > this.sizes.length) {
      if (this.restElementsSize == null) {
        throw new RangeError(`(offset + length) = ${end} (expected <= ${this.sizes.length})`);
      }

      return offset < this.sizes.length
        ? this.fullSize -
            this.offsets[offset] +
            (length - (this.sizes.length - offset)) * this.restElementsSize
        : length * this.restElementsSize;
    }
    if (length === 1) {
      return this.sizes[offset];
    }
    return this.offsets[end - 1] + this.sizes[end - 1] - this.offsets[offset];
  }

  @computed
  get fullSize() {
    const { sizes } = this;
    if (sizes.length < 1) {
      return 0;
    }
    const e = sizes.length - 1;
    return this.offsets[e] + sizes[e];
  }

  @computed
  get count() {
    if (this.restElementsSize != null) {
      throw new Error(`count inaccessible for infinite dimensions`);
    }
    return this.sizes.length;
  }

  readonly configFor = computedFn(function configFor(this: DimensionSizesDefinition, offset: number) {
    if (offset < 0 || offset !== Math.trunc(offset)) {
      throw new RangeError(`offset = ${offset} (expected > 0)`);
    }
    return this.flatChildren[offset] as DimensionItemConfig | undefined;
  });
}

export const quableStructure = createUsableContext<{
  rows: DimensionSizesDefinition;
  cols: DimensionSizesDefinition;

  columnsCount?: number;
  rowsCount?: number;
  fullWidth?: number;
  fullHeight?: number;
}>('QuableStructure');

export const Quable = observer<FlexProps>(function Quable({ style, children, ...props }) {
  const info = quableStructure.use();

  const width = useMemo(
    () =>
      computed(() =>
        info.columnsCount != null && info.columnsCount >= 0
          ? info.cols.size(0, info.columnsCount)
          : info.fullWidth
      ),
    [info]
  );

  const height = useMemo(
    () =>
      computed(() =>
        info.rowsCount != null && info.rowsCount >= 0 ? info.rows.size(0, info.rowsCount) : info.fullHeight
      ),
    [info]
  );

  return (
    <Flex
      style={{
        ...style,
        position: `relative`,
        width: width.get(),
        height: height.get(),
      }}
      {...props}
    >
      {children}
    </Flex>
  );
});

const cellBordersStyles: Record<BorderType, string> = {
  [BorderType.none]: `none`,
  [BorderType.normal]: `1px solid #111`,
  [BorderType.bold]: `3px double #777`,
  [BorderType.bolder]: `4px groove #aaa`,
  [BorderType.boldest]: `4px groove #222`,
};

const useQuell = (x: number, y: number, w: number, h: number) => {
  const info = quableStructure.use();

  const left = useMemo(() => info.cols.offset(x), [info, x]);
  const top = useMemo(() => info.rows.offset(y), [info, y]);
  const width = useMemo(() => info.cols.size(x, w), [info, x, w]);
  const height = useMemo(() => info.rows.size(y, h), [info, y, h]);
  const style = useMemo(
    () =>
      computed(() => {
        const left = info.cols.configFor(x);
        const top = info.rows.configFor(y);
        const right = w > 1 ? info.cols.configFor(x + w - 1) : left;
        const bottom = h > 1 ? info.rows.configFor(y + h - 1) : top;

        const getLT = (b: BorderType | undefined, p: number) =>
          b ? cellBordersStyles[b] : p === 0 ? cellBordersStyles[BorderType.normal] : undefined;

        return {
          borderLeft: getLT(left?.borders?.left, x),
          borderTop: getLT(top?.borders?.top, y),
          borderRight: cellBordersStyles[right?.borders?.right || BorderType.normal],
          borderBottom: cellBordersStyles[bottom?.borders?.bottom || BorderType.normal],
        };
      }),
    [info, x, y, w, h]
  );

  return useMemo(
    () => computed(() => ({ left, top, width, height, ...style.get() })),
    [left, top, width, height, style]
  ).get();
};

export type QuellCoords = { x: number; y: number; w?: number; h?: number };

export const BasicQuell = observer<
  PropsWithChildren<
    QuellCoords & {
      rootProps?: FlexProps;
      noBorders?: boolean;
      color?: string;
      italic?: boolean;
      bold?: boolean;
      align?: CSSProperties[`alignItems`];
      crossAlign?: CSSProperties[`justifyContent`];
    }
  >
>(function BasicQuell({
  x,
  y,
  w = 1,
  h = 1,
  color,
  noBorders,
  align,
  crossAlign,
  rootProps,
  bold,
  italic,
  children,
}) {
  const rectStyle = useQuell(x, y, w, h);
  const { style, ...restRootProps } = rootProps || {};

  // console.log(style);
  return (
    <Flex
      style={{
        position: 'absolute',

        display: 'flex',
        // overflow: 'hidden',

        whiteSpace: `pre-wrap`,
        ...(bold && { fontWeight: `bold` }),
        ...(italic && { fontStyle: `italic` }),
        ...(color && { color }),
        ...rectStyle,
        ...(noBorders && { border: `none` }),

        alignItems: align ?? `center`,
        justifyContent: crossAlign ?? `center`,
        gap: `0.5em`,
        ...style,
      }}
      // align={align ?? (gravity ? undefined : `center`)}
      // crossAlign={crossAlign ?? (gravity ? undefined : `center`)}
      // gravity={gravity}
      {...restRootProps}
    >
      {children}
    </Flex>
  );
});

export const QuellContent = observer<
  PropsWithChildren<
    {
      rotate?: boolean;
    } & FlexProps
  >
>(function QuellContent({ rotate, style, children, ...props }) {
  return (
    <Flex
      style={{ ...(rotate && { transform: `rotate(-90deg)` }), textAlign: `center`, ...style }}
      {...props}
    >
      {children}
    </Flex>
  );
});

export const simpleHeadersDefinitions = (size: number, count: number = 1) =>
  samplesBy(count, () => ({ size }));
