import { observer } from 'mobx-react-lite';

import { palette } from '../const/lang-palettes.tsx';
import { boldNumbers } from './parts.tsx';

export const NT4 = observer(function NT4() {
  return (
    <div
      style={{
        display: 'inline-block',
        //background: palette.skupina,
        //color: '#fff',
        color: palette.skupina,

        //borderRadius: 4,
        //padding: 2,

        fontSize: 10,
        fontStyle: `normal`,
        // fontWeight: 'bold',
        marginLeft: 2,
        marginRight: 2,
        lineHeight: 1.1,
        marginBottom: `-100%`,
      }}
    >
      (<span style={{ fontSize: '0.8rem' }}>{boldNumbers['4']}</span>
      <div style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 1, textAlign: 'center' }}>
        <div>n</div>
        <div
          style={{
            height: 1,
            background: palette.skupina, // '#fff',
          }}
        ></div>
        <div>t</div>
      </div>
      )
    </div>
  );
});
