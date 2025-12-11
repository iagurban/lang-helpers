import { isTruthy } from '@grbn/kit';
import { jsonValueSchema } from '@grbn/kit/zod';
import {
  Box,
  Combobox,
  Flex,
  FlexProps,
  Input,
  ScrollArea,
  Select,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  TextInput,
  useCombobox,
} from '@mantine/core';
import { omitBy } from 'lodash-es';
import { makeAutoObservable, reaction, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { CSSProperties, Fragment, PropsWithChildren, ReactNode, useEffect, useMemo, useState } from 'react';

import { emptyChar } from '../../const/unicode.tsx';
import rawIrregularVerbs from './irregular-verbs.json';
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
  ModalVerb,
  Pronoun,
  pronounAliases,
  SampleData,
  SentenceParams,
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

const InlineFlexSpan = observer<FlexProps>(function InlineFlexSpan({ children, ...props }) {
  return (
    <Flex display="inline" component="span" {...props}>
      {children}
    </Flex>
  );
});

const Space = observer<{ children?: ReactNode }>(function Space({ children }) {
  return <InlineFlexSpan>{children ?? ` `}</InlineFlexSpan>;
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

  // console.log(parts, parts.verb.make(params, sampleData));

  const subjectName = pronounAliases[params.subject] || params.subject;

  const firstItems =
    params.type === `interrogative` && parts.aux.length
      ? [
          <InlineFlexSpan key={`aux-0`} style={getColoredTextStyle(parts.aux[0].toLowerCase(), modalVerb)}>
            {capitalize(parts.aux[0])}
          </InlineFlexSpan>,
          <Fragment key="subject">{subjectName}</Fragment>,
          ...parts.aux.slice(1).map((s, i) => (
            <InlineFlexSpan key={`aux-${i + 1}`} style={getColoredTextStyle(s.toLowerCase(), modalVerb)}>
              {s}
            </InlineFlexSpan>
          )),
        ]
      : [
          <Fragment key="subject">{capitalize(subjectName)}</Fragment>,
          ...parts.aux.map((s, i) => (
            <InlineFlexSpan key={`aux-${i}`} style={getColoredTextStyle(s.toLowerCase(), modalVerb)}>
              {s}
            </InlineFlexSpan>
          )),
        ];

  const allItems = [
    ...firstItems,
    <InlineFlexSpan
      key="verb"
      style={
        parts.verb.id === `ing`
          ? toBeTextStyle
          : parts.verb.id.startsWith(`past`)
            ? toHaveTextStyle
            : undefined
      }
    >
      {' '}
      {parts.verb.make(params, sampleData)}
    </InlineFlexSpan>,
    parts.reflexive && <Fragment key="reflexive"> {parts.reflexive}</Fragment>,
    sampleData.object && <Fragment key="sampleData"> {sampleData.object}</Fragment>,
  ].filter(isTruthy);

  const [lastItem] = allItems.splice(allItems.length - 1, 1);

  allItems.push(
    <InlineFlexSpan key="last-block" style={{ whiteSpace: `nowrap` }}>
      {lastItem}
      <InlineFlexSpan key="punct">{params.type === `interrogative` ? `?` : `.`}</InlineFlexSpan>
    </InlineFlexSpan>
  );

  return allItems.reduce(
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
        <InlineFlexSpan key={st}>
          {buildColoredSentence(
            {
              tense,
              aspect,
              type: st,
              subject: prefs.pronoun,
              modal,
            },
            { verb: prefs.verb || verbSymbol },
            modal
          )}
        </InlineFlexSpan>
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

const verbSymbol =
  /*`ꪚ`*/
  /*`𐖃`*/
  /*`𜳫`*/
  /*`𝑉`*/
  `𝕍`;
// `𝓥`

const EnglishTableFormula = observer<{
  aspect: Aspect;
  tense: Tense | `modal`;
  modal?: string;
}>(function EnglishTableFormula({ aspect, tense, modal }) {
  const auxes = auxiliaries[tense][aspect];

  const verb = detectVerbForm(tense, { aspect });

  return (
    <Flex direction="column" align="flex-end" bd="1px dashed #000" p="sm" style={{ borderRadius: 8 }}>
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
        {/*<Box display="inline" ff={dancingScriptVariableFontFace} fz="1.1rem">*/}
        {/*  V*/}
        {/*</Box>*/}
        <Box display="inline" fz="1.2rem">
          {verbSymbol}
        </Box>
        {verb.ending ? (
          <>
            <Box display="inline" style={{ whiteSpace: `nowrap` }}>
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
    <TableTd miw={aspect === `perfectContinuous` ? '17rem' : '12rem'}>
      <Flex direction="row" justify="space-between" align="center" gap="0.5rem">
        <Sentences tense={tense} aspect={aspect} modal={modal} prefs={prefs} />
        <EnglishTableFormula aspect={aspect} tense={tense} modal={modal} />
      </Flex>
    </TableTd>
  );
});

const makePrefs = (pronoun: Pronoun, verb: string) =>
  makeAutoObservable({
    pronoun,
    setPronoun(pronoun: Pronoun) {
      this.pronoun = pronoun;
    },
    verb,
    setVerb(verb: string) {
      this.verb = verb;
    },
  });

const VerbSelector = observer<{
  value: string;
  onChange: (value: string) => void;
}>(function VerbSelector({ value, onChange }) {
  const combobox = useCombobox();
  const filteredOptions = Object.entries(rawIrregularVerbs).filter(([base]) =>
    base.includes(value.toLowerCase().trim())
  );

  const options = filteredOptions.map(([item, [simple, participle]]) => (
    <Combobox.Option value={item} key={item}>
      <Flex justify="space-between">
        <Box w="6rem">{item}</Box>
        <Box w="10rem">{simple}</Box>
        <Box w="10rem">{participle}</Box>
      </Flex>
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={optionValue => {
        onChange(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          placeholder="Pick value or type anything"
          value={value}
          onChange={event => {
            onChange(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown maw="40rem">
        <Combobox.Options>
          {options.length === 0 ? (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          ) : (
            <ScrollArea.Autosize type="scroll" mah="80vh">
              {options}
            </ScrollArea.Autosize>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
});

const GenerationDataEditControls = observer<{
  data: ReturnType<typeof makePrefs>;
}>(function GenerationDataEditControls({ data }) {
  return (
    <Flex direction="row" w="100%" gap="1rem">
      <Input.Wrapper label="Pronoun" flex="1">
        <Select
          data={allPronouns.map(s => ({ label: pronounAliases[s] || s, value: s }))}
          value={data.pronoun}
          onChange={v => v && isPronounString(v) && data.setPronoun(v)}
        />
      </Input.Wrapper>
      <Input.Wrapper label="Verb" flex="1">
        <VerbSelector value={data.verb} onChange={node => data.setVerb(node)} />
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

const localStorageEnglishKey = `english-tenses-prefs`;

export const EnglishTensesMainTable = observer(function EnglishTensesMainTable() {
  const globalPrefs = useMemo(() => {
    const data = JSON.parse(localStorage.getItem(localStorageEnglishKey) || `{}`);
    return makePrefs(data.pronoun ?? `i`, data.verb ?? `work`);
  }, []);

  useEffect(
    () =>
      reaction(
        () => toJS(globalPrefs),
        g => {
          localStorage.setItem(
            localStorageEnglishKey,
            JSON.stringify(omitBy(g, v => !jsonValueSchema.safeParse(v).success))
          );
        }
      ),
    [globalPrefs]
  );

  const [selectedModal, setSelectedModal] = useState<ModalVerb>(allModalVerbs[0]);
  const [switchedSubjunctive, setSwitchedSubjunctive] = useState(false);

  return (
    <Flex direction="column" gap="1rem" flex="100%">
      <GenerationDataEditControls data={globalPrefs} />
      <ScrollArea h="100%">
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
                    miw="5rem"
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
      </ScrollArea>
    </Flex>
  );
});

export default EnglishTensesMainTable;
