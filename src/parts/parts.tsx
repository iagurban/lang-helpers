import { observer } from 'mobx-react-lite';

import { palette } from '../const/lang-palettes.tsx';

export const ZaSugl = observer<{
  text: string;
}>(function ZaSugl({ text }) {
  return (
    <>
      <span style={{ color: palette.zaSuglasnikon }}>({text})</span>
    </>
  );
});

export const ZaSamoglOrJ = observer<{
  sText: string;
  jText: string;
}>(function ZaSugl({ sText, jText }) {
  return (
    <>
      <span style={{ color: palette.zaJom }}>({sText}</span>
      <span style={{ color: palette.zaSamoglasnikon }}>{jText})</span>
    </>
  );
});

export { doubleStruckNumbers as boldNumbers } from '../const/extra-numbers.tsx';
