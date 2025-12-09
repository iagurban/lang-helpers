import { isTruthy } from '@grbn/kit';
import {
  Box,
  Flex,
  Input,
  Select,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { CSSProperties, Fragment, PropsWithChildren, ReactNode, useMemo, useState } from 'react';

import { emptyChar } from '../../const/unicode.tsx';
import { dancingScriptVariableFontFace } from '../../fonts/variable/dancing-script.ts';
import {
  allAspects,
  allModalVerbs,
  allPronouns,
  allSentenceTypes,
  Aspect,
  auxiliaries,
  buildAbstractSentenceParts,
  capitalize,
  detectVerbForm,
  isModalVerbsString,
  isPronounString,
  isSentenceTypeString,
  ModalVerb,
  Pronoun,
  pronounAliases,
  SampleData,
  SentenceParams,
  SentenceType,
  Tense,
  toBeForms,
  toHaveForms,
} from './saint-tence.tsx';

const ColoredText = observer<{
  s: readonly string[];
  renderSeparator: (i: number, a: readonly string[]) => ReactNode;
  renderPart: (s: string) => ReactNode;
}>(function ColoredText({ s, renderSeparator, renderPart }) {
  return (
    <>
      {s.map((s, i, a) => (
        <Fragment key={i}>
          {renderPart(s)}
          {i < a.length - 1 ? renderSeparator(i, a) : null}
        </Fragment>
      ))}
    </>
  );
});

const toBeTextStyle = { color: `#5e5c1a` } as const satisfies CSSProperties;
const toHaveTextStyle = { color: `#104a60` } as const satisfies CSSProperties;
const futureTextStyle = {
  // textDecorationLine: `underline`,
  // textDecorationStyle: `dashed`,
  // textDecorationThickness: 1,
  // textDecorationColor: `#3a0432`,
  // textUnderlineOffset: 2,
  fontStyle: `italic`,
  color: `#677480`,
} as const satisfies CSSProperties;
const subjunctiveTextStyle = {
  // textDecorationLine: `underline`,
  // textDecorationStyle: `dashed`,
  // textDecorationThickness: 1,
  // textDecorationColor: `#043a05`,
  // textUnderlineOffset: 2,
  fontStyle: `italic`,
  color: `#866e85`,
} as const satisfies CSSProperties;
const negativeTextStyle = { color: `#7c131c` } as const satisfies CSSProperties;
const modalVerbTextStyle = { color: `#0c985e` } as const satisfies CSSProperties;

const Space = observer<{ children?: ReactNode }>(function Space({ children }) {
  return <Flex display="inline">{children ?? ` `}</Flex>;
});

const getColoredTextStyle = (s: string, modal?: string) =>
  toBeForms.has(s)
    ? toBeTextStyle
    : toHaveForms.has(s)
      ? toHaveTextStyle
      : `not` === s
        ? negativeTextStyle
        : `will` === s
          ? futureTextStyle
          : `would` === s
            ? subjunctiveTextStyle
            : modal && modal === s
              ? modalVerbTextStyle
              : undefined;

const buildColoredSentence = (params: SentenceParams, sampleData: SampleData, modalVerb?: string) => {
  const parts = buildAbstractSentenceParts(params);

  const subjectName = pronounAliases[params.subject] || params.subject;

  const firstItems =
    params.type === `interrogative` && parts.aux.length
      ? [
          <Flex
            key={`aux-0`}
            display="inline-block"
            style={getColoredTextStyle(parts.aux[0].toLowerCase(), modalVerb)}
          >
            {capitalize(parts.aux[0])}
          </Flex>,
          <Fragment key="subject">{subjectName}</Fragment>,
          ...parts.aux.slice(1).map((s, i) => (
            <Flex
              key={`aux-${i + 1}`}
              display="inline-block"
              style={getColoredTextStyle(s.toLowerCase(), modalVerb)}
            >
              {s}
            </Flex>
          )),
        ].filter(isTruthy)
      : [
          <Fragment key="subject">{capitalize(subjectName)}</Fragment>,
          ...parts.aux.map((s, i) => (
            <Flex
              key={`aux-${i}`}
              display="inline-block"
              style={getColoredTextStyle(s.toLowerCase(), modalVerb)}
            >
              {s}
            </Flex>
          )),
        ];

  return [
    ...firstItems,
    <Flex
      key="verb"
      display="inline-block"
      style={
        parts.verb.id === `ing`
          ? toBeTextStyle
          : parts.verb.id.startsWith(`past`)
            ? toHaveTextStyle
            : undefined
      }
    >
      {parts.verb.make(params, sampleData)}
    </Flex>,
    parts.reflexive && <Fragment key="reflexive">{parts.reflexive}</Fragment>,
    sampleData.object && <Fragment key="reflexive">{sampleData.object}</Fragment>,
    <Fragment key="punct">{params.type === `interrogative` ? `?` : `.`}</Fragment>,
  ]
    .filter(isTruthy)
    .reduce(
      (a, o, i, arr) => [...a, o, ...(i < arr.length - 2 ? [<Space key={`space-${i}`} />] : [])],
      [] as ReactNode[]
    );
};

const Sentences = observer<{
  tense: Tense;
  aspect: Aspect;
  modal?: ModalVerb;
  prefs: ReturnType<typeof makePrefs>;
}>(function Sentences({ tense, aspect, modal, prefs }) {
  return (
    <Flex direction="column" justify="space-around">
      {allSentenceTypes.map(st => (
        <Flex key={st} display="inline-block">
          {buildColoredSentence(
            {
              tense,
              aspect,
              type: st,
              subject: prefs.pronoun,
              modal,
            },
            { verb: prefs.verb },
            modal
          )}
        </Flex>
      ))}
    </Flex>
  );
});

const EnglishTableHeader = observer<{
  aspect: Aspect;
}>(function EnglishTableHeader({ aspect }) {
  return (
    <TableTh>
      {aspect === `continuous` ? (
        <Flex justify="space-between">
          <Flex display="inline" style={toBeTextStyle}>
            Continuous
          </Flex>
          <Flex display="inline" style={{ ...toBeTextStyle, fontWeight: `lighter`, fontStyle: `italic` }}>
            being
          </Flex>
        </Flex>
      ) : aspect === `perfect` ? (
        <Flex justify="space-between">
          <Flex display="inline" style={toHaveTextStyle}>
            Perfect
          </Flex>
          <Flex display="inline" style={{ ...toHaveTextStyle, fontWeight: `lighter`, fontStyle: `italic` }}>
            having
          </Flex>
        </Flex>
      ) : aspect === `perfectContinuous` ? (
        <Flex justify="space-between">
          <Flex display="inline-block">
            <Flex display="inline" style={toHaveTextStyle}>
              Perfect
            </Flex>
            {` `}
            <Flex display="inline" style={toBeTextStyle}>
              continuous
            </Flex>
          </Flex>
          <Flex display="inline-block" style={{ fontWeight: `lighter`, fontStyle: `italic` }}>
            <Flex display="inline" style={toHaveTextStyle}>
              having
            </Flex>
            {` `}
            <Flex display="inline" style={{ color: `#777` }}>
              after
            </Flex>
            {` `}
            <Flex display="inline" style={toBeTextStyle}>
              being
            </Flex>
          </Flex>
        </Flex>
      ) : aspect === `simple` ? (
        <Flex justify="space-between">
          <Flex display="inline">Simple</Flex>
          <Flex display="inline" style={{ fontWeight: `lighter`, fontStyle: `italic` }}>
            doing
          </Flex>
        </Flex>
      ) : (
        aspect
      )}
    </TableTh>
  );
});

const EnglishTableRowHeader = observer<
  PropsWithChildren<{
    tense: Tense;
  }>
>(function EnglishTableRowHeader({ tense, children }) {
  return (
    <TableTh h="inherit">
      <Flex align="center" justify="space-between" h="100%">
        <Flex style={tense === `modal` ? modalVerbTextStyle : undefined}>{tense}</Flex>
        {children}
      </Flex>
    </TableTh>
  );
});

const EnglishTableFormula = observer<{
  aspect: Aspect;
  tense: Tense | `modal`;
  modal?: string;
}>(function EnglishTableFormula({ aspect, tense, modal }) {
  const auxes = auxiliaries[tense][aspect];

  const verb = detectVerbForm(tense, { aspect });

  return (
    <Flex
      direction="column"
      align="flex-end"
      bd="1px dashed #000"
      p="sm"
      style={{ alignSelf: `start`, borderRadius: 8 }}
    >
      {tense === `present` && aspect === `perfectContinuous` ? (
        <Flex direction="row">
          <Flex direction="column" align="center" justify="center" mah="1rem">
            <Box style={{ borderBottom: `1px solid #000`, lineHeight: `1` }}>
              <Box style={toHaveTextStyle}>have</Box>
            </Box>
            <Box style={{ lineHeight: `1` }}>
              <Box style={toHaveTextStyle}>has</Box>
            </Box>
          </Flex>
          <Space />
          <Box display="inline" style={{ whiteSpace: `pre-wrap` }}>
            <Box style={toBeTextStyle}>{` been`}</Box>
          </Box>
        </Flex>
      ) : (
        <Flex display="inline-block">
          <ColoredText
            s={
              auxes.length
                ? modal
                  ? [`${modal} ${auxes[0]}`, ...auxes.slice(1)]
                  : auxes
                : [modal ?? emptyChar]
            }
            renderSeparator={() => <Space>{` / `}</Space>}
            renderPart={s => (
              <ColoredText
                s={s.split(` `)}
                renderSeparator={() => <Space />}
                renderPart={s => <span style={getColoredTextStyle(s.toLowerCase(), modal)}>{s}</span>}
              />
            )}
          />
        </Flex>
      )}
      <Flex display="inline-block">
        <Box display="inline" ff={dancingScriptVariableFontFace} fz="1.1rem">
          V
        </Box>
        {verb.ending ? (
          <>
            <Box display="inline">
              {` + `}
              <Box display="inline" style={verb.ending.value === `ing` ? toBeTextStyle : toHaveTextStyle}>
                {verb.ending.value}
                {verb.ending.suffix ? (
                  <Box display="inline-block" fz="0.75rem" style={{ transform: `translateY(-10%)` }}>
                    {verb.ending.suffix}
                  </Box>
                ) : null}
              </Box>
            </Box>
          </>
        ) : null}
      </Flex>
    </Flex>
  );
});

const EnglishTableCell = observer<{
  aspect: Aspect;
  tense: Tense;
  modal?: ModalVerb;
  prefs: ReturnType<typeof makePrefs>;
}>(function EnglishTableCell({ tense, aspect, modal, prefs }) {
  return (
    <TableTd>
      <Flex direction="row" justify="space-between">
        <Sentences tense={tense} aspect={aspect} modal={modal} prefs={prefs} />
        <EnglishTableFormula aspect={aspect} tense={tense} modal={modal} />
      </Flex>
    </TableTd>
  );
});

const makePrefs = (pronoun: Pronoun, verb: string, type: SentenceType) =>
  makeAutoObservable({
    pronoun,
    setPronoun(pronoun: Pronoun) {
      this.pronoun = pronoun;
    },
    verb,
    setVerb(verb: string) {
      this.verb = verb;
    },
    type,
    setType(type: SentenceType) {
      this.type = type;
    },
  });

const GenerationDataEditControls = observer<{
  data: ReturnType<typeof makePrefs>;
}>(function GenerationDataEditControls({ data }) {
  return (
    <Flex direction="column">
      <Input.Wrapper label="Pronoun">
        <Select
          data={allPronouns.map(s => ({ label: pronounAliases[s] || s, value: s }))}
          value={data.pronoun}
          onChange={v => v && isPronounString(v) && data.setPronoun(v)}
        />
      </Input.Wrapper>
      <Input.Wrapper label="Verb">
        <Input value={data.verb} onChange={node => data.setVerb(node.target.value)} />
      </Input.Wrapper>
      <Input.Wrapper label="Type">
        <Select
          data={allSentenceTypes.map(s => ({ label: s, value: s }))}
          value={data.type}
          onChange={v => v && isSentenceTypeString(v) && data.setType(v)}
        />
      </Input.Wrapper>
    </Flex>
  );
});

const HeaderVerbsHelperContent = observer<{
  toDo: string;
  toBe: string;
  toHave: string;
}>(function HeaderVerbsHelperContent({ toDo, toBe, toHave }) {
  return (
    <>
      <Box>{toDo}</Box>
      <Flex direction="column" align="end" style={toBeTextStyle}>
        <Box>{toBe}</Box>
        <Box opacity={0.5} mt="-0.5rem">
          been
        </Box>
      </Flex>
      <Box style={toHaveTextStyle}>{toHave}</Box>
    </>
  );
});

export const EnglishTensesMainTable = observer(function EnglishTensesMainTable() {
  const globalPrefs = useMemo(() => makePrefs(`i`, `work`, `interrogative`), []);

  const [selectedModal, setSelectedModal] = useState<ModalVerb>(allModalVerbs[0]);
  const [switchedSubjunctive, setSwitchedSubjunctive] = useState(false);

  return (
    <Flex direction="column">
      <GenerationDataEditControls data={globalPrefs} />
      <Table withRowBorders withColumnBorders summary="English tenses">
        <TableThead>
          <TableTr>
            <TableTh />
            {allAspects.map(aspect => (
              <EnglishTableHeader key={aspect} aspect={aspect} />
            ))}
          </TableTr>
        </TableThead>
        <TableTbody>
          {([`present`, `past`] as const).map(tense => (
            <TableTr key={tense} pos="relative" h="1px">
              <EnglishTableRowHeader tense={tense}>
                <Flex
                  direction="column"
                  align="end"
                  justify="space-around"
                  fw="lighter"
                  fs="italic"
                  style={{ alignSelf: `stretch` }}
                  gap={4}
                >
                  {tense === `present` ? (
                    <HeaderVerbsHelperContent toDo="do" toBe="am / is / are" toHave="have / has" />
                  ) : (
                    <HeaderVerbsHelperContent toDo="did" toBe="were / was" toHave="had" />
                  )}
                </Flex>
              </EnglishTableRowHeader>
              {allAspects.map(aspect => (
                <EnglishTableCell key={aspect} aspect={aspect} tense={tense} prefs={globalPrefs} />
              ))}
            </TableTr>
          ))}
          <TableTr>
            <TableTh>
              <Box display="inline">
                <Box display="inline" style={switchedSubjunctive ? subjunctiveTextStyle : futureTextStyle}>
                  {switchedSubjunctive ? `subjunctive` : `future`}
                </Box>
                {` `}
                <Box
                  display="inline"
                  style={{
                    ...(switchedSubjunctive ? futureTextStyle : subjunctiveTextStyle),
                    textDecorationLine: 'underline',
                    opacity: 0.2,
                    cursor: `pointer`,
                  }}
                  onClick={() => setSwitchedSubjunctive(v => !v)}
                >
                  {`or `}
                  {switchedSubjunctive ? `future` : `subjunctive`}
                </Box>
              </Box>
            </TableTh>
            {allAspects.map(aspect => (
              <EnglishTableCell
                key={aspect}
                aspect={aspect}
                tense={`modal`}
                modal={switchedSubjunctive ? `would` : `will`}
                prefs={globalPrefs}
              />
            ))}
          </TableTr>
          <TableTr>
            <TableTh>
              <Input.Wrapper label="modal">
                <Select
                  data={allModalVerbs.map(v => ({ label: v, value: v }))}
                  value={selectedModal}
                  onChange={v => v && isModalVerbsString(v) && setSelectedModal(v)}
                  style={{ width: `min-content`, minWidth: `100%` }}
                />
              </Input.Wrapper>
            </TableTh>
            {allAspects.map(aspect => (
              <EnglishTableCell
                key={aspect}
                tense="modal"
                aspect={aspect}
                prefs={globalPrefs}
                modal={selectedModal}
              />
            ))}
          </TableTr>
        </TableTbody>
      </Table>
    </Flex>
  );
});
