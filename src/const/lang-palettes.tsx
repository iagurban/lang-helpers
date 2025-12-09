export const allPadeziDescriptions = {
  v: {
    n: `vokativ`,
    ns: `vok`,
    c: '#baa300',
  },
  n: {
    n: `nominativ`,
    ns: `nom`,
    c: '#a50cd1',
  },
  a: {
    n: `akuzativ`,
    ns: `akz`,
    c: '#cd225d',
  },
  g: {
    n: `genitiv`,
    ns: `gen`,
    c: '#2540da',
  },
  i: {
    n: `instrumental`,
    ns: `ins`,
    c: '#c3671b',
  },
  d: {
    n: `dativ`,
    ns: `dat`,
    c: '#2b8f03',
  },
  l: {
    n: `lokativ`,
    ns: `lok`,
    c: '#079191',
  },
} as const;

export const palette = {
  skupina: '#370fa1',
  neodreden: '#6110c3',
  asteriskVar: '#d42ea5',
  vrstHeaderLabel: '#611630',
  kratkiPomocni: '#1245b6',
  naglaseniPomocni: '#1a5422',
  zanjekaniPomocni: '#4e15a2',
  dvovidniPresent: '#e37a92',
  zaSuglasnikon: '#dc7724',
  zaSamoglasnikon: '#cb42af',
  zaJom: '#4b27bd',
  zaPalatalnim: '#0c5297',
  licni: '#bd123f',

  zivo: '#7e6816',
  nezivo: '#238779',

  sibilizacija: '#5b06ec',
  palatizacija: '#df0969',

  headerFg: '#454545',
  headerBg: '#dddddd',

  komparativ: `#931889`,
  superlativ: `#1465a8`,
} as const;
