export const numberWrap = (v = 0) => ({
  v,
  add(v: number) {
    return (this.v += v);
  },
  takeAndAdd(v: number) {
    const r = this.v;
    this.v += v;
    return r;
  },
  takeAndSet(v: number) {
    const r = this.v;
    this.v = v;
    return r;
  },
  take() {
    return this.v;
  },
  set(v: number) {
    return (this.v = v);
  },
});
