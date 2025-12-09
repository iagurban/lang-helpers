import { Flex } from '@mantine/core';
import { makeObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

import { palette } from '../const/lang-palettes.tsx';
import { SquareBracedExpr } from '../tables/glagolske-forme/glagolski-forme-left-header-quells.tsx';
import { Destructors } from '../util/destructors.ts';
import { DOMSyncedRect } from '../util/dom-synced-rect.ts';
import { xmlns } from '../util/tiles-pattern-svg.tsx';
import { TrackingResizeObserver } from '../util/use-resize-observer-2.tsx';

class SuperAndComparPridjevFormulaHelperStore {
  constructor() {
    makeObservable(this, {
      root: false,
      prefix: true,
      base: false,
      suffix: false,
      postfix: false,
      komparativ: false,
      superlativ: false,
      resizeObserverInstance: false,
    });
  }

  readonly autodestroy = new Destructors();

  init() {
    // this.autodestroy.put(
    //   reaction(
    //     () => this.root.rect.absPosition,
    //     () => {
    //       this.prefix.retrigger();
    //       this.base.retrigger();
    //       this.suffix.retrigger();
    //       this.postfix.retrigger();
    //       this.komparativ.retrigger();
    //       this.superlativ.retrigger();
    //     }
    //   )
    // );

    return this.destroy;
  }

  destroy = () => {
    this.autodestroy.fire();
  };

  readonly resizeObserverInstance = new TrackingResizeObserver();

  readonly root = new DOMSyncedRect(this.resizeObserverInstance);
  readonly prefix = new DOMSyncedRect(this.resizeObserverInstance, this.root.rect);
  readonly base = new DOMSyncedRect(this.resizeObserverInstance, this.root.rect);
  readonly suffix = new DOMSyncedRect(this.resizeObserverInstance, this.root.rect);
  readonly postfix = new DOMSyncedRect(this.resizeObserverInstance, this.root.rect);
  readonly komparativ = new DOMSyncedRect(this.resizeObserverInstance, this.root.rect);
  readonly superlativ = new DOMSyncedRect(this.resizeObserverInstance, this.root.rect);
}

const SuperAndComparPridjevFormulaSvg = observer<{
  store: SuperAndComparPridjevFormulaHelperStore;
}>(function SuperAndComparPridjevFormulaSvg({ store }) {
  const renderDots = (
    sr: DOMSyncedRect,
    color: string,
    dots: SuperAndComparPridjevFormulaHelperStore[`base`][`rect`][]
  ) => {
    const lineX1 = sr.rect.right;
    const y = sr.rect.centerTop;
    const fy = Math.round(y + 1);
    return (
      <>
        <line
          x1={lineX1 + 2}
          y1={fy}
          x2={dots[0].centerLeft}
          y2={fy}
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray="2 2"
        />
        <line
          x1={dots[0].centerLeft}
          y1={fy}
          x2={dots[dots.length - 1].centerLeft}
          y2={fy}
          stroke={color}
          strokeWidth={1.5}
        />
        {dots.map((p, i) => (
          <circle key={i} cx={p.centerLeft} cy={fy} r={3.5} fill={color} />
        ))}
      </>
    );
  };

  return (
    <svg
      xmlns={xmlns}
      style={{
        position: `absolute`,
        width: `100%`,
        height: `100%`,
        left: 0,
        top: 0,
        overflow: `visible`,
      }}
    >
      {renderDots(store.komparativ, palette.komparativ, [
        store.base.rect,
        store.suffix.rect,
        store.postfix.rect,
      ])}
      {renderDots(store.superlativ, palette.superlativ, [
        store.prefix.rect,
        store.base.rect,
        store.suffix.rect,
        store.postfix.rect,
      ])}
    </svg>
  );
});

export const SuperAndComparPridjevFormula = observer(function SuperAndComparPridjevFormula() {
  const storeRef = useRef<SuperAndComparPridjevFormulaHelperStore>();
  storeRef.current ||= new SuperAndComparPridjevFormulaHelperStore();
  const store = storeRef.current!;

  useEffect(() => store.init(), [store]);

  return (
    <Flex w="100%" h="100%" align="center" justify="center">
      <Flex ref={store.root.ref} pos="relative">
        <Flex direction="column" justify="space-around" align="start" pos="relative" fz="90%" lh="1.2rem">
          <Flex ref={store.komparativ.ref} c={palette.komparativ}>
            komparativ
          </Flex>
          <Flex ref={store.superlativ.ref} c={palette.superlativ}>
            superlativ
          </Flex>
        </Flex>
        <Flex gap="0.25rem" align="center" justify="center" pos="relative" fz="80%">
          <Flex ref={store.prefix.ref}>(naj)</Flex>
          <SquareBracedExpr ref={store.base.ref}>
            <Flex fs="italic">osnova</Flex>
          </SquareBracedExpr>
          <Flex ref={store.suffix.ref}>((i)j)</Flex>
          <SquareBracedExpr ref={store.postfix.ref}>
            <Flex fs="italic">završ.</Flex>
          </SquareBracedExpr>
        </Flex>
        <SuperAndComparPridjevFormulaSvg store={store} />
      </Flex>
    </Flex>
  );
});
