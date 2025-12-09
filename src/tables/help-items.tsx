import { Flex, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import React, { PropsWithChildren, ReactNode } from 'react';

import { allPadeziDescriptions } from '../const/lang-palettes.tsx';

export type HelpItem = {
  render: () => ReactNode;
  label: string;
  type?: `defauilt` | `meki` | `nepostojana-a`;
};

const Examples = observer<PropsWithChildren>(function Examples({ children }) {
  return (
    <Text span style={{ fontStyle: `italic` }}>
      {children}
    </Text>
  );
});

const Bold = observer<PropsWithChildren>(function Bold({ children }) {
  return (
    <Text span fw="bold">
      [{children}]
    </Text>
  );
});

const TooltipRoot = observer<PropsWithChildren>(function TooltipRoot({ children }) {
  return <Flex display="inline-block">{children}</Flex>;
});

const interleave = <T, R>(args: readonly T[], fill: (prev: T | null, next: T | null) => R) => {
  const r: (T | R)[] = [args[0]];
  for (const a of args.slice(1)) {
    r.push(fill(r.at(-1) as T, a), a);
  }
  return r;
};

const Emphased = observer<PropsWithChildren>(function Emphased({ children }) {
  return (
    <Text td="underline" fs="italic">
      {children}
    </Text>
  );
});

const Colorized = observer<{
  l?: readonly number[];
  d?: readonly (keyof typeof allPadeziDescriptions)[];
  t?: readonly (`jd` | `mn`)[];
}>(function Colorized({ l, d, t }) {
  return (
    <Bold>
      {interleave(
        [
          ...(l || []).map(d => (
            <Text span key={d}>
              {d}l
            </Text>
          )),
          ...(d || []).map(d => (
            <Text span key={d} c={allPadeziDescriptions[d].c}>
              {allPadeziDescriptions[d].ns}
            </Text>
          )),
          ...(t || []).map(t => (
            <Text span key={t}>
              {t}.
            </Text>
          )),
        ],
        () => (
          <Text span> </Text>
        )
      )}
    </Bold>
  );
});

export const helpItemsImenice = {
  skI_dat_lok_jd_sibil: {
    render: () => (
      /// TODO promjene ili alternacije?
      <TooltipRoot>
        <Text>
          U završecima imenice I skupini u <Colorized d={[`d`, `l`]} t={[`jd`]} /> događa sibilarizacija:{' '}
          <Examples>noga – nozi, ruka – ruci, muha – musi, itd.</Examples>
        </Text>
        <Text>Postoji veliki broj odstupanja od ovog pravila:</Text>
        <Text>
          a) nema promjene u milovanjim riječima:{' '}
          <Examples>baka – baki, seka – seki, koka – koki itd.</Examples>
        </Text>
        <Text>
          b) nema promjene u vlastitm ličnim imenicama:{' '}
          <Examples>Olga – Olgi, Anka – Anki, Luka – Luki, itd.</Examples>
        </Text>
        <Text>
          c) nema promjene u nazivima osobe ženskog pola ako oni se radi od naziva osobe muškog pola sa pomoću
          sufiksa <Bold>-ka</Bold>:{' '}
          <Examples>
            kondukterka – kondukterki, lekarka – lekarki, dokrorka – doktorki, Beograđanka – Beograđanki itd.
          </Examples>
        </Text>
        <Text>
          d) nema promjene ako riječ sadrži suglasnike <Bold>c č z s</Bold> ispred velarnih suglasnika{' '}
          <Bold>k g h</Bold>: <Examples>kocka – kocki, mačka – mački, tačka – tački, itd.</Examples>
        </Text>
        <Text>
          e) jednaki su također oblici sa alternacijom i sa očuvanjem velarnog suglasnika <Bold>k g h</Bold> u
          riječima čija se osnova završava na bilo koju grupu suglasnika:{' '}
          <Examples>pripovetka – pripoveci i pripovetki, plovka – plovci i plovki itd.</Examples>
        </Text>
      </TooltipRoot>
    ),
    label: `sib`,
  },
  skI_note_ica: {
    render: () => (
      <TooltipRoot>
        U vokativu jednine višesložne imenice sa sufiksom <Bold>-ica</Bold>, koji označavaju ženska stvorenja,
        preuzimaju završetak <Bold>-e</Bold>:{' '}
        <Examples>sestrica – sestrice, drugarica – drugarice, itd</Examples>, ali ovo ne radi na ostali rodovi
        <Examples>(poglavica – poglavico, kukavica – kukavico itd.)</Examples>
      </TooltipRoot>
    ),
    label: `-ica?`,
  },
  skI_vok_jd_licni: {
    render: () => (
      <TooltipRoot>
        <Text>
          U <Colorized d={[`v`]} t={[`jd`]} /> formu nominativa zadržavaju trosložni i mnogosložni vlastiti
          lični imenica: <Examples>Nikola, Pantelija, Leposava itd.</Examples>, a također dvosložni ako nesu
          silazni naglasak na prvome slogu: <Examples>Olga, Anka, Milka, Luka, Krsta, Zorka itd.</Examples>
        </Text>
      </TooltipRoot>
    ),
    label: `-a`,
    type: `meki`,
  },
  skI_gen_mn_nepostA: {
    render: () => (
      <TooltipRoot>
        <Text>
          U <Colorized d={[`g`]} t={[`mn`]} /> imenice sa završetkom osnove na <Bold>grupu suglasnika</Bold> (
          <Emphased>osim</Emphased> <Bold>st zd št žd</Bold>) prihvataju između ovima suglasnicima nepostojano
          <Bold>a</Bold>:{' '}
          <Examples>
            devojka – devojaka, guska – gusaka, pripovetka – pripovedaka, sveska – svezaka, itd.
          </Examples>
        </Text>
        <Text>Odstupanja od ovog pravila postoje:</Text>
        <Text>
          a) u glagolskim imenicama formiranim s pomoću sufiksa <Bold>-ba -ǌa</Bold>, i onda umjesto normalnog
          završetka <Bold>-a</Bold> dolazi <Bold>-i</Bold>:{' '}
          <Examples>borba – borbi, molba – molbi, radǌa – radǌi, itd.</Examples>
        </Text>
        <Text>
          b) u nizu imenice, za koji forme s završetkom <Bold>-i</Bold> su obični u modernom jeziku:{' '}
          <Examples>
            majka – majki, vojska – vojski, nepravda – nepravdi, lopta – lopti, kazna – kazni, gošća – gošći,
            taksa – taksi, itd.
          </Examples>
        </Text>
      </TooltipRoot>
    ),
    label: `1`,
    type: 'nepostojana-a',
  },
  skI_gen_mn_note1: {
    render: () => (
      <TooltipRoot>
        <Text>
          Imenica <Bold>noga</Bold>, <Bold>ruka</Bold> i <Bold>sluga</Bold> u{' '}
          <Colorized d={[`g`]} t={[`mn`]} /> očuvaju forme dvojine:{' '}
          <Examples>
            <Bold>nogu, ruku</Bold> i <Bold>slugu</Bold>
          </Examples>
          .
        </Text>
      </TooltipRoot>
    ),
    label: `?`,
  },
  skII_nom_jd_gen_mn_m_neposA: {
    render: () => (
      <TooltipRoot>
        <Text>
          U <Colorized d={[`n`]} t={[`jd`]} /> i <Colorized d={[`g`]} t={[`mn`]} /> muškog roda je posebna
          nepostojana [a], koja ne postoji u ostalih padežima:{' '}
          <Examples>momak – momka – momku itd., vetar – vetra – vetru itd.</Examples>
        </Text>
      </TooltipRoot>
    ),
    label: `2`,
    type: 'nepostojana-a',
  },
  skII_note_l_o: {
    render: () => (
      <TooltipRoot>
        <Text>
          Ako u završetku osnove <Colorized d={[`n`]} t={[`jd`]} /> muškog roda nalazi [-o], koja urađena od
          krajnesložnog sonanta [-l], onda u kosim padežima [-l] se vraća nakon promene granice sloga: pepeo –
          pepela, orao – orla, itd., i također sto – stola, vo – vola, itd., gde nakon promene [l] na [o] je
          dogodilo ujedinjenje dvoje [o].
        </Text>
      </TooltipRoot>
    ),
    label: `-l/o-`,
  },
  skII_vok_jd_meki: {
    render: () => (
      <TooltipRoot>
        <Text>
          U <Colorized d={[`v`]} t={[`jd`]} /> muškog roda imenice tvrdog vrsta imaju završetak [-e], a mekog
          – [-u]: <Examples>jelene, Ivane, narode itd., i konju, oraču, mladiću itd.</Examples>
        </Text>
        <Text>Odstupanja od ovoga pravila:</Text>
        <Text>
          a) imenice muškog roda, koji su urađeni pomoću sufiksa [-ar] i označavaju vršioca, aktivno lice,
          imaju u <Colorized d={[`v`]} t={[`jd`]} /> završetak [-u] jer [r] je bilo mekim:{' '}
          <Examples>pisar – pisaru, lekar – lekaru itd</Examples>. Zbog otvrđenja [r] je takođe postale
          uobičajene forme sa završetkom [-e]: <Examples>pisare, lekare, stolare itd.</Examples>
        </Text>
        <Text>
          b) imenice muškog roda se završavajući u <Colorized d={[`n`]} t={[`jd`]} /> na [-dak -tak -zak -sak
          -čak -ćak -čac] pored sa nepostojanom [a] u <Colorized d={[`a`]} t={[`jd`]} /> uvjek imaju završetak
          [-u]: <Examples>hladak – hlatku, patak – patku, mačak – mačku, paučac – paučcu itd.</Examples>
        </Text>
        <Text>
          c) kao izuzetak:{' '}
          <Examples>
            alah – alahu, konjic – konjicu, strah – strahu, Englez – Englezu, Francuz – Francuzu
          </Examples>
          , a takođe <Examples>tetak – teče</Examples> zajedno sa <Examples>tetku</Examples>.
        </Text>
      </TooltipRoot>
    ),
    label: `meki`,
    type: `meki`,
  },
  skII_vok_jd_palat: {
    render: () => (
      <TooltipRoot>
        <Text>
          Ako osnova muškoga imenica završava na <Bold>[g k h]</Bold> ili <Bold>spojeno [c]</Bold>, ispred
          završetka <Colorized d={[`v`]} t={[`jd`]} /> [-e] dogodi promjena onih suglasnika na{' '}
          <Examples>
            <Bold>[ž č š]</Bold> i <Bold>[č]</Bold>
          </Examples>
          : <Examples>drug – druže, junak – junače, siromah – siromaše, stric – striče itd.</Examples>
        </Text>
      </TooltipRoot>
    ),
    label: `pal`,
  },
  skII_ins_jd_meki: {
    render: () => (
      <TooltipRoot>
        <Text>
          U <Colorized d={[`i`]} t={[`jd`]} /> imenice tvrdog vrsta ima završetak [-om], mekog – [-em]:{' '}
          <Examples>jelenom, ali konjem, selom</Examples>, ali
          <Examples>poljem, momkom</Examples>, ali <Examples>mladićem, likom, ali licem, itd.</Examples>
        </Text>
        <Text>
          Ako finalni suglasnik osnove je otvrđena <Bold>[ž č š c r]</Bold> ili grupe <Bold>[št žd]</Bold>,
          mogući su dvostruki forme:{' '}
          <Examples>
            padež – padežem i padežom, mesec – mesecem i mesecom, pisar – pisarem i pisarom itd.
          </Examples>
        </Text>
        <Text>
          Imenice <Bold>car</Bold> uvijek ima formu <Bold>carem.</Bold>
        </Text>
        <Text>
          Imenice <Bold>put</Bold> obično kad se koristi sa predlogom ima završetak [-om]:{' '}
          <Examples>za putom</Examples>, a bez predloga – [-em]: <Examples>Idi svojim putem.</Examples>
        </Text>
      </TooltipRoot>
    ),
    label: `meki`,
    type: `meki`,
  },
  skII_vok_ins_dat_lok_mn_sibil: {
    render: () => (
      <TooltipRoot>
        <Text>
          Ispred završetka [-i] muškoga imenica u <Colorized d={[`v`, `n`, `i`, `d`, `l`]} t={[`mn`]} />{' '}
          dogode sibilarizacija (ako osnova završava na <Bold>g k h</Bold>, oni se promenju na{' '}
          <Bold>z c s</Bold>
          ):{' '}
          <Examples>
            predlog — predlozi — predlozima, Junak – junaci – junacima, orah – orasi – orasima itd.
          </Examples>
        </Text>
      </TooltipRoot>
    ),
    label: `sib`,
  },
  skIII_note_nepostA: {
    render: () => (
      <TooltipRoot>
        <Text>
          U <Colorized d={[`n`, `a`]} t={[`jd`]} /> imenice sa završetkom osnove na grupu suglasnika (osim [st
          zd št žd]) između ovima suglasnicima je moguće nepostojano [a], koje ispada u ostalih padežima:{' '}
          <Examples>plesan — plesni, bojazan — bojazni, ravan — ravni itd.</Examples>
        </Text>
      </TooltipRoot>
    ),
    label: `3`,
    type: 'nepostojana-a',
  },
  skIII_note_l_o: {
    render: () => (
      <TooltipRoot>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text>
          Если существительное в <Colorized d={[`n`, `a`]} /> оканчивается на -о из конечнослогового л, то во
          всех других падежных формах восстанавливается л: мйсао — мйсли, погйбао — погибли» со — соли и т. п.
          (см. § 6, п. 6).
        </Text>
      </TooltipRoot>
    ),
    label: `-l/o-`,
  },
  skIII_ins_jd_J: {
    render: () => (
      <TooltipRoot>
        <Text>
          Dogodi jotovanje konačnog suglasnika osnove imenica u <Colorized d={[`i`]} t={[`jd`]} />:{' '}
          <Examples>glad – glađu, smart – smrću, krv – krvlju, so – solju itd.</Examples>
        </Text>
        <Text>
          Ali taj suglasnik je meki, no ispada: <Examples>noć – noću itd.</Examples>
        </Text>
        <Text>
          Ako ispred jotovanim suglasnikom nalazi [z s], oni se promenuju na [ž š]:{' '}
          <Examples>bojazan – bojažnju, plesan – plešnju, misao – mišlju itd.</Examples>
        </Text>
      </TooltipRoot>
    ),
    label: `J`,
  },
  skIII_ins_jd_I: {
    render: () => (
      <TooltipRoot>
        <Text>
          Zajedno sa običnim završetkom [-ju] nalazi [-i] u slučajima kad предлог или определяющее слово
          ukazivaju na formu instrumentala imenice: <Examples>vašom pomoći.</Examples>
        </Text>
      </TooltipRoot>
    ),
    label: `-i`,
  },
  skIII_gen_mn_iju: {
    render: () => (
      <TooltipRoot>
        <Text>
          Četvoro imenice u <Colorized d={[`g`]} t={[`mn`]} /> mogu imati završetak [-iju]:{' '}
          <Examples>kost – kostiju, kokoš – kokošiju, vaš (uš) – vašiju (ušiju), prsi – prsiju.</Examples>
        </Text>
      </TooltipRoot>
    ),
    label: `iju`,
  },

  // asdaf: {
  //   render: () => (
  //     <Flex>
  //       <Flex>usneni (labijalni)</Flex>
  //       <Flex>dvousneni (bilabijalni): P, B, M</Flex>
  //       <Flex>usneno-zubni (labiodentalni): F, V</Flex>
  //       <Flex>zubni (dentalni): T, D, S, Z, C</Flex>
  //       <Flex>nadzubni (alveolarni): L, R, N</Flex>
  //       <Flex>prednjonepčani (palatalni): J, Lj, Nj, Ć, Đ, Š, Ž, Č, Dž</Flex>
  //       <Flex>zadnjonepčani (velarni): K, G, H</Flex>
  //
  //       <Flex>sibilarizacija [k g h] → [c z s]</Flex>
  //       <Flex>palatizacija [k g h] → [č ž š]</Flex>
  // jotovanje
  // [t d l  n  c z s k g h] =>
  // [ć đ ǉ ǌ č ž š č ž š]
  //     </Flex>
  //   ),
  //   label: `,mn`,
  // },
  skII_note1: {
    render: () => (
      <TooltipRoot>
        <Text>
          Односложные существительные мужского рода во <Colorized t={[`mn`]} /> расширяют свою основу
          суффиксами [-ов-] или [-ев-] (в зависимости от принадлежности к твердой или мягкой разновидности
          склонения): син — синови, друг — другови, во — волови, но лањ — лањеви, змај — змајеви и т. п. Если
          конечным согласным основы является [ц], то при расширении основы суффиксом [-ев-] происходит
          чередование [ц/ч]: зец — зечеви, стриц — стричеви я т. п.
        </Text>
        <Text>
          Как исключение не расширяют основу во <Colorized t={[`mn`]} /> существительные: а) зуб — зуби, мрав
          — мрави, коњ — коњи, пас — пси, црв — црви, ђак — ђаци, влас — власи, прет — прети, дан — дани, гост
          — гости, спис — списи, јад — јади, а также б) наименование людей по их принадлежности к нации или
          народности: Рус — Руси, Чех — Чеси, Грк — Грци, Влах — Власи и т. п.
        </Text>
        <Text>
          Некоторые односложные существительные во <Colorized t={[`mn`]} /> имеют двоякие формы: вук — вуци и
          вукови, звук — звуци и звукови, брк — брци и бркови и др. Иногда эти формы связаны с определенными
          падежами: зрак — зраци, зракова, зрацима..., знак — знаци, знакова, знацима... Ряд существительных с
          беглым а, не расширяя основы во <Colorized t={[`mn`]} />, изменяют свой звуковой состав: а) теряя т
          или д перед аффрикатами: метак — меци (из * метци), почетак — почеци, предай — преци и т. п.; б)
          теряя л, переходящее в о в конце слога: долац — доца (из * долца), колац — коца и др.
          Существительное отац, имея во <Colorized t={[`mn`]} /> правильную форму очеви, наряду с
          встречающейся оцеви, сохраняет стилистически архаические формы: оци, отаца, оцима...
        </Text>
        <Text>
          Двусложные имена существительные могут расширять свою основу, могут не расширять ее и даже могут
          иметь двоякие параллельные формы, напр.: ветар — ветрови, огањ — огњеви, лакат — лактови; ловац —
          ловци, врабац — врапци; јарац — јарчеви наряду с јарци, соко — соколи и соколови, голуб — голубови и
          голуби, случај — случајеви и случаји и т. п.
        </Text>
        <Text>
          Трехсложные и многосложные существительные никогда не расширяют своей основы: учитељ — учитељи,
          професор — професори, гледалац — гледаоци, староседелац — старо- седеоци и т. п.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skII_note2: {
    render: () => (
      <TooltipRoot>
        <Text>
          Имена существительные мужского рода, означающие наименование людей по их принадлежности к социальной
          группе, роду занятия, народности и т. п., оканчивающиеся на [-ин], как и в русском языке, при
          образовании форм <Colorized t={[`mn`]} /> теряют этот суффикс, принимая окончание [-и]: грађанин —
          грађани, чобанин — чобани, Србин — Срби и т. п. К этой группе относится Турчин — Турци, где основой
          является Турк-, в которой к чередуется в первом случае с [ч], а во втором с [ц].
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skII_note3: {
    render: () => (
      <TooltipRoot>
        <Text>
          Существительные мужского и среднего рода, основа которых оканчивается на два согласных (кроме групп
          [ст, зд, шт, жд]), в <Colorized d={[`g`]} t={[`mn`]} /> между этими согласными принимают беглое [а]:
          старац — <Colorized d={[`g`]} t={[`jd`]} /> старца, основа — старц-,{' '}
          <Colorized d={[`g`]} t={[`mn`]} /> стараца; ловац — <Colorized d={[`g`]} t={[`mn`]} /> ловаца;
          концерт — <Colorized d={[`g`]} t={[`mn`]} /> концерата; студент — студената; ребро — ребара; весло —
          весала; друштво — друштава; звонце — звонаца и т. п. Существительные ерце и пуце имеют формы{' '}
          <Colorized d={[`g`]} t={[`mn`]} /> ердаца и путаца, поскольку в <Colorized d={[`n`]} t={[`jd`]} />{' '}
          они утеряли взрывные [д] и [т] перед аффрикатой [ц] (см. §5, п. 4).
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skII_note4: {
    render: () => (
      <TooltipRoot>
        <Text>
          Имена существительные мужского рода, обозначающие меру чего-либо, в{' '}
          <Colorized d={[`g`]} t={[`mn`]} /> нередко принимают окончание [-и], вместо обычного [-а], при этом
          невозможно появление беглого [а] или расширение основы: хват — хвати, месец — месеци, сат — сати,
          волт — волти наряду, однако, с обычными формами: хватова, месеца и т. п. Как исключение
          существительные прет; нокат и гост в <Colorized d={[`g`]} t={[`mn`]} /> могут иметь окончание [-и]:
          прети, нокти и гости, но чаще сохраняют старые формы двойственного числа: прстију, ноктију, гостију.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skII_note5: {
    render: () => (
      <TooltipRoot>
        <Text>
          Не имеют форм <Colorized t={[`mn`]} />: а) существительное човек; формы <Colorized t={[`mn`]} />{' '}
          образуются, как и в русском языке, от другой основы — људи, <Colorized d={[`g`]} /> — људи,{' '}
          <Colorized d={[`d`]} /> — људима, <Colorized d={[`a`]} /> — људе, <Colorized d={[`v`]} /> — људи,
          <Colorized d={[`i`, `l`]} /> — људима; б) существительное брат; в значении форм{' '}
          <Colorized t={[`mn`]} /> употребляются падежные формы собирательного существительного браћа; в)
          существительные господин и властелин обычно также не имеют форм <Colorized t={[`mn`]} />, которые
          заменяются формами собирательных существительных господа и властела.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skII_note6: {
    render: () => (
      <TooltipRoot>
        <Text>
          Заимствованные из иностранных языков существительные, оканчивающиеся в{' '}
          <Colorized d={[`n`]} t={[`jd`]} /> на [-о] или [-е], обычно выступают в мужском роде и склоняются,
          причем основой служит форма <Colorized d={[`n`]} />: дёпб, депоа, депоу, депо, дёпб, депоом, депоу,
          мн ч. депои, депоа, депоима, депое, депои, депоима, депоима; атеље, атељеа, атељеу и т. п.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skII_note7: {
    render: () => (
      <TooltipRoot>
        <Text>
          Существительные среднего рода <Bold>око</Bold> и <Bold>ухо</Bold> во <Colorized t={[`mn`]} />{' '}
          изменяются по III склонению (тип ствар), сохраняя в <Colorized d={[`g`]} /> старые формы
          двойственного числа: <Colorized d={[`n`, `a`, `v`]} /> очи, уши, <Colorized d={[`g`]} /> очију,
          ушију (реже очи, уши),
          <Colorized d={[`d`, `i`, `l`]} /> очима, ушима. Существительное око в переносном значении: очко;
          отверстие; пролет моста и др. — склоняется и во <Colorized t={[`mn`]} /> по типу село.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skII_note8: {
    render: () => (
      <TooltipRoot>
        <Text>
          Существительные среднего рода <Bold>доба</Bold> и <Bold>подне</Bold> несклоняемы.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },

  skIII_note1: {
    render: () => (
      <TooltipRoot>
        <Text>
          Собирательные существительные, образованные с суффиксом [-ад] (
          <Examples>звёрад, прасад, тёлад и др.</Examples>), могут иметь формы{' '}
          <Colorized d={[`d`, `i`, `l`]} t={[`mn`]} />: зверадма, прасадма, теладма и т. п.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skIII_note2: {
    render: () => (
      <TooltipRoot>
        <Text>
          Существительные звёр, глад, хрйд (а также мрёст и снёт) в одинаковой степени употребительны как в
          мужском, так и в женском роде, соответственно чему склоняются по II или III склонению.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skIII_note3: {
    render: () => (
      <TooltipRoot>
        <Text>
          Существительное мати имеет своей основой матер, которая принимает падежные окончания I склонения во
          всех падежах, кроме <Colorized d={[`n`, `v`]} />, где выступает форма мати, и{' '}
          <Colorized d={[`a`]} /> — форма матёр. Существительное кпй имеет эту форму только в{' '}
          <Colorized d={[`n`]} />, все другие падежные формы правильно образуются от основы кћер по III
          склонению.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },

  skIV_note1: {
    render: () => (
      <TooltipRoot>
        <Text>
          Существительных с основой на -ен, соответствующих русским время — времени, в сербохорватском языке
          довольно много, таковы: врёме — времена, плёме — племена, раме — рамена и т. п.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skIV_note2: {
    render: () => (
      <TooltipRoot>
        <Text>
          К существительным с основой на [-ет] относятся: а) названия подростков у людей и молодняка у
          животных: дёте — дётета,^унуче — унучета, пастйрче — пастйрчета и т. п., пиле — пйлета, теле —
          тёлета, прасе — прасета и т. п. б) ряд иностранных слов преимущественно турецкого происхождения:
          дугме — дугмета, парче — парчета, буре — бурета и т. п. в) некоторые исконно славянские
          существительные, означающие, предметы, и значительное число уменьшительных: дрво — дрвёта, уже —
          ужета, звонце — звонцета и т. п.{' '}
        </Text>
        <Text>
          Существительные, означающие подростков у людей и молодняк у животных, обычно не имеют форм
          <Colorized t={[`mn`]} />, а для выражения множественности служат собирательные существительные на
          [-ад]: унучад, пастирчад, пйлад, тёлад, прасад и т. п., которые относятся к III склонению. Нередко
          для выражения множественности служат также существительные, образованные от других основ того же
          корня: унуче — унучићи, пиле — пилили, теле — тёоци и т. п. Обычно эти формы не имеют
          соответственных форм единственного числа.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skIV_note3: {
    render: () => (
      <TooltipRoot>
        <Text>
          К существительным с основой на [-ес] в современном языке относятся только чудо, тело и нёбо, причем
          в <Colorized t={[`jd`]} /> они уже утеряли свое склонение и изменяются по II склонению (тип село).
          Во <Colorized t={[`mn`]} /> только нёбо всегда сохраняет [-ес] основы: небеса, небеса, небесима н т.
          д., а для чудо и тело формы чудеса, телеса и т. д. звучат архаично и служат для стилистической
          окраски.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skIV_note4: {
    render: () => (
      <TooltipRoot>
        <Text>
          Существительное дёте не имеет форм <Colorized t={[`mn`]} />. Для выражения множественности служит
          собирательное существительное дёца, которое относится к I склонению.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
  skIV_note5: {
    render: () => (
      <TooltipRoot>
        <Text>
          Существительное дрво во <Colorized t={[`mn`]} /> склоняется по IV склонению только в значении дерева
          на корню; в значении лесоматериала или дров оно склоняется только по II склонению.
        </Text>
      </TooltipRoot>
    ),
    label: `asf`,
  },
} as const satisfies Record<string, HelpItem>;

export const helpItemsPridjev = {
  odr_m_s_meki: {
    render: () => (
      <TooltipRoot>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text>
          Если основа прилагательного оканчивается на небный согласный, то в мужском и среднем роде выступают
          окончания [-е], [-ега], [-ему] вместо [-о], [-ога], [-ому]: <Examples>врући чај</Examples>, но{' '}
          <Examples>вруће млеко, врућега млека, врућему млеку; туђи, туђега, туђему и т. п.</Examples>
        </Text>
      </TooltipRoot>
    ),
    label: `meki`,
  },
  odr_gen_dat_m_s_kratki: {
    render: () => (
      <TooltipRoot>
        <Text>
          Прилагательные мужского и среднего рода в род. и дат. п., наряду с полными окончаниями [-ога]
          ([-ега]) и [-ому] ([-ему]), могут иметь усеченные окончания [-ог] ([-ег]) и [-ом] ([-ем]) в
          зависимости от степени логического подчеркивания данного слова.
        </Text>
      </TooltipRoot>
    ),
    label: `kratki`,
  },
  odr_dat_lok_ome: {
    render: () => (
      <TooltipRoot>
        <Text>
          В <Colorized d={[`d`, `l`]} /> нередко встречаются окончания [-оме]:{' '}
          <Examples>зёленбме, жутбме и т. п.,</Examples> — наряду с <Examples>зёленбму, жутбму</Examples>.
        </Text>
      </TooltipRoot>
    ),
    label: `ome`,
  },
  odr_ins_dat_lok_mn_ima: {
    render: () => (
      <TooltipRoot>
        <Text>
          Во <Colorized t={[`mn`]} /> во всех трех родах в <Colorized d={[`d`, `i`, `l`]} />, наряду с обычным
          окончанием [-им], возможно [-има], служащее для логического выделения прилагательного.
        </Text>
      </TooltipRoot>
    ),
    label: `ima`,
  },
  neodr_nom_m_jd_nepostA: {
    render: () => (
      <TooltipRoot>
        <Text>
          В мужском роде в <Colorized d={[`n`]} t={[`jd`]} /> во многих прилагательных встречается беглое{' '}
          <Bold>"а"</Bold>
          (см. § 6, п. 5): <Examples>добар, добра, добру; јасан, јасна, јасну и т. п</Examples>.
        </Text>
      </TooltipRoot>
    ),
    label: `nepostA`,
  },
  neodr_vok_note: {
    render: () => (
      <TooltipRoot>
        <Text>
          При существительных в форме <Colorized d={[`v`]} /> имена прилагательные неопределенного вида не
          употребляются.
        </Text>
      </TooltipRoot>
    ),
    label: `vok`,
  },
} as const satisfies Record<string, HelpItem>;

export const helpItemsGlagolsCurrentTime = {
  e_l3_mn_note1: {
    render: () => (
      <TooltipRoot>
        <Text>
          Только 8 глаголов: умети — умем, разу мети — разумем, смети — смём, успети — успём, дбспети —
          доспём, прйспети — прйспём, гбвети — говём, угбвети — уговём, имея в{' '}
          <Colorized l={[1]} t={[`jd`]} /> -ём, в <Colorized l={[3]} t={[`mn`]} /> имеют окончание [-еју]: они
          умеју — поскольку во всех лицах, кроме [3l mn], произошло стяжение групп [-еје-]. Ср. русск. ты
          умеешь — они умеют.
        </Text>
      </TooltipRoot>
    ),
    label: `skdfnj`,
  },
  e_palat: {
    render: () => (
      <TooltipRoot>
        <Text>
          В глаголах с инфинитивом на [-ћи] глагольная основа (обратная ПАЛАТИЗАЦИЯ) оканчивается на
          задненебные звуки [г, к или х], которые перед [-е-] суффикса основы настоящего времени чередуются с
          [ж, ч, ш]: пећи — печём, пёчёш, пёчё, пёчёмо, печёте, пеку; стрйпи — стрижём, стрйжёш и т. д., но
          они стригу. Ср. в русск. печь — пеку, печешь...; стричь — стригу, стрижешь...
        </Text>
      </TooltipRoot>
    ),
    label: `skdfnj`,
  },
  l1_jd_note1: {
    render: () => (
      <TooltipRoot>
        <Text>
          Только два глагола: <Bold>хтёти</Bold> и <Bold>моћи</Bold> имеют в <Colorized l={[1]} t={[`jd`]} />{' '}
          окончание [-у]: <Bold>хопу</Bold> и <Bold>могу</Bold>.
        </Text>
      </TooltipRoot>
    ),
    label: `-u`,
  },
  l3_mn_note2: {
    render: () => (
      <TooltipRoot>
        <Text>
          Глагол <Bold>хтёти</Bold> в <Colorized l={[3]} t={[`mn`]} /> имеет окончание [-е] (см. § 38).
        </Text>
      </TooltipRoot>
    ),
    label: `hoće`,
  },
  dvovidni_note: {
    render: () => (
      <TooltipRoot>
        <Text>
          Глагол <Bold>бйти</Bold> (быть) имеет двоякие формы настоящего времени: а) для совершенного вида:
          будем, будёш, будё, будёмо, будете, буду и б) для несовершенного вида: јесам, јеси, јест, јесмо,
          јесте, јесу, которые служат вспомогательными глаголами при образовании ряда форм времени, причем
          обычно употребляются краткие (энклитические) формы: сам, си, је, смо, сте, су.
        </Text>
      </TooltipRoot>
    ),
    label: `?`,
  },
  note_suvrs: {
    render: () => (
      <TooltipRoot>
        <Text>
          Формы настоящего времени глаголов совершенного вида в значении будущего времени употребляются лишь
          ограниченно: в придаточных предложениях временных, условных, уступительных и определительных при
          обязательном условии, что в главном предложении употреблены формы будущего времени или повели-
          тельного наклонения (
          <Examples>Остани овде, док се вратим. Кад прочиташ ту књигу, даћу ти другу</Examples>), в
          вопросительных предложениях, связанных с отрицанием (
          <Examples>Што не седнеш ближе прозору?</Examples>), а также в тех случаях, когда время определяется
          наречием или придаточным предложением (
          <Examples>сутра путујем, чим падне мрак, враћамо се купи</Examples>).
        </Text>
      </TooltipRoot>
    ),
    label: `suvršeni`,
  },
  note_infin: {
    render: () => (
      <TooltipRoot>
        <Text>
          Весьма употребительны в языке формы настоящего времени глаголов (как несовершенного, так и
          совершенного вида) с частицей да, служащие для замены инфинитива: ја волим да радим вм. ја волим
          радити; они умеју да читају вм. они умеју чйтати и т. п.
        </Text>
      </TooltipRoot>
    ),
    label: `da`,
  },
} as const satisfies Record<string, HelpItem>;
