import { isTruthy } from '@grbn/kit';

import rawIrregularVerbs from './irregular-verbs.json';

export const allTenses = [`present`, `past`, `modal`] as const;
export type Tense = (typeof allTenses)[number];

export const allAspects = [`simple`, `continuous`, `perfect`, `perfectContinuous`] as const;
export type Aspect = (typeof allAspects)[number];

export const allModalVerbs = [
  `can`,
  `could`,
  `may`,
  `might`,
  `must`,
  `shall`,
  `should`,
  `will`,
  `would`,
  // specials
  `ought to`,
  `need to`,
  `have to`,
  `used to`,
  `dare to`,
] as const;
export const allModalVerbsSet = new Set<string>(allModalVerbs);
export type ModalVerb = (typeof allModalVerbs)[number];

export const allSentenceTypes = [`affirmative`, `negative`, `interrogative`] as const;
export const allSentenceTypesSet = new Set<string>(allSentenceTypes);
export type SentenceType = (typeof allSentenceTypes)[number];

export type Reflexive = boolean;

export const allPronouns = [`i`, `you`, `he`, `she`, `it`, `we`, `they`] as const;
export const allPronounsSet = new Set<string>(allPronouns);
export type Pronoun = (typeof allPronouns)[number];

export const pronounAliases: Partial<Record<Pronoun, string>> = {
  i: `I`,
} as const;

const doForms = {
  present: {
    thirdSinglePerson: `does`,
    other: `do`,
  },
  past: `did`,
} as const;

const doFormsSet = new Set<string>([doForms.present.other, doForms.present.thirdSinglePerson, doForms.past]);

const reflexivePronouns = {
  i: `myself`,
  you: `yourself`,
  he: `himself`,
  she: `herself`,
  it: `itself`,
  we: `ourselves`,
  they: `themselves`,
} as const satisfies Record<Pronoun, string>;

export const toBeForms = new Set([`am`, `are`, `is`, `was`, `were`, `be`, `been`]);
export const toHaveForms = new Set([`have`, `has`, `had`]);

export type IrregularVerbMap = Record<string, [string, string]>;
export const irregularVerbs = rawIrregularVerbs as unknown as IrregularVerbMap;

export const auxiliaries = {
  present: {
    simple: [], // work / works
    continuous: [`am`, `is`, `are`], // working
    perfect: [`have`, `has`], // worked
    perfectContinuous: [`have been`, `has been`], // working
  },
  past: {
    simple: [], // worked
    continuous: [`was`, `were`], // working
    perfect: [`had`], // worked
    perfectContinuous: [`had been`], // working
  },
  modal: {
    simple: [] /* would */, // work
    continuous: [/* would */ `be`], // working
    perfect: [/* would */ `have`], // worked
    perfectContinuous: [/* would */ `have been`], // working
  },
} as const satisfies Record<Tense, Record<Aspect, string[]>>;

type VerbFormDescr = {
  id: string;
  ending?: { value: string; suffix?: string };
  make: (p: Pick<SentenceParams, `subject`>, d: SampleData) => string;
};

const verbForms = {
  rawBase: {
    id: `rawBase`,
    make: (_p, { verb }) => getVerbForms(verb)[0],
  },
  base: {
    id: `base`,
    ending: { value: `s`, suffix: `?` },
    make: ({ subject }, { verb }) => `${getVerbForms(verb)[0]}${isThirdPersonSingular(subject) ? `s` : ``}`,
  },
  ing: {
    id: `ing`,
    ending: { value: `ing` },
    make: (_p, { verb }) => {
      const base = getVerbForms(verb)[0];
      return `${base.endsWith(`e`) ? base.slice(0, -1) : base}ing`;
    },
  },
  past: {
    id: `past`,
    ending: { value: `ed`, suffix: `2` },
    make: (_p, { verb }) => getVerbForms(verb)[1],
  },
  pastParticiple: {
    id: `pastParticiple`,
    ending: { value: `ed`, suffix: `3` },
    make: (_p, { verb }) => getVerbForms(verb)[2],
  },
} as const satisfies Record<string, VerbFormDescr>;

export type SentenceParams = {
  tense: Tense;
  aspect: Aspect;
  type: SentenceType;
  subject: Pronoun;
  modal?: ModalVerb;
  reflexive?: Reflexive;
};

export type SampleData = {
  verb: string;
  object?: string;
};

const arrayLeastLength = <T, L extends number>(a: T[], l: L): a is T[] & { length: L } => a.length >= l;

const isPlural = (subject: Pronoun) => subject === `we` || subject === `they` || subject === `you`;
const isThirdPersonSingular = (subject: Pronoun) => subject === `he` || subject === `she` || subject === `it`;

export const getVerbForms = (verb: string): [string, string, string] => {
  const forms = irregularVerbs[verb];
  return forms ? [verb, ...forms] : [verb, `${verb}ed`, `${verb}ed`];
};

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const detectVerbForm = (tense: Tense, { aspect }: Pick<SentenceParams, `aspect`>): VerbFormDescr => {
  if (aspect === `continuous` || aspect === `perfectContinuous`) {
    return verbForms.ing;
  }

  if (aspect === `perfect`) {
    return verbForms.pastParticiple;
  }

  if (aspect === `simple`) {
    if (tense === `past`) {
      return verbForms.past;
    }
    if (tense === `present`) {
      return verbForms.base;
    }
  }

  return verbForms.rawBase;
};

const getAuxiliaryBase = (
  tense: Tense,
  { subject, aspect }: Pick<SentenceParams, `subject` | `aspect`>
): string | null => {
  const auxList = auxiliaries[tense][aspect];

  if (arrayLeastLength(auxList, 3) && isPlural(subject)) {
    return auxList[2];
  }
  if (arrayLeastLength(auxList, 2)) {
    if (subject === `i` && tense === `present` && aspect === `continuous`) {
      return auxList[0];
    }
    if (isThirdPersonSingular(subject)) {
      return auxList[1];
    }
  }
  return auxList.length ? auxList[0] : null;
};

const updateAuxForNegation = (
  tense: Tense,
  aux: string | null,
  { subject }: Pick<SentenceParams, `subject`>
): string[] => {
  if (aux) {
    const parts = aux.split(` `);
    return parts.length > 1 ? [parts[0], `not`, ...parts.slice(1)] : [aux, `not`];
  }

  return [
    (tense === `present`
      ? isThirdPersonSingular(subject)
        ? doForms.present.thirdSinglePerson
        : doForms.present.other
      : tense === `past`
        ? doForms.past
        : doForms.present.other) + ` not`,
  ];
};

const updateAuxForQuestions = (
  auxBase: string | null,
  params: Pick<SentenceParams, `tense` | `aspect` | `subject`>
): string[] =>
  (part => [part, auxBase].filter(isTruthy))(
    params.aspect === `simple`
      ? params.tense === `present`
        ? isThirdPersonSingular(params.subject)
          ? doForms.present.thirdSinglePerson
          : doForms.present.other
        : params.tense === `past`
          ? doForms.past
          : null
      : null
  );

const getAuxiliary = (
  params: Pick<SentenceParams, `modal` | `tense` | `subject` | `type` | `aspect`>
): string[] => {
  const auxBase = params.modal
    ? [params.modal, getAuxiliaryBase(`modal`, params)].filter(isTruthy).join(` `)
    : (params.tense && getAuxiliaryBase(params.tense, params)) || null;
  return params.type === `negative`
    ? updateAuxForNegation(params.tense, auxBase, params)
    : params.type === `interrogative`
      ? updateAuxForQuestions(auxBase, params)
      : [auxBase].filter(isTruthy);
};

export const buildAbstractSentenceParts = (
  params: SentenceParams
): { aux: string[]; verb: VerbFormDescr; reflexive: string | null } => {
  const aux = getAuxiliary(params).flatMap(s => s.split(` `));

  const needsBareForm =
    ((params.type === `interrogative` || !!params.modal) && params.aspect === `simple`) ||
    (doFormsSet.has(aux[0]) && aux[1] === `not`);

  return {
    aux,
    verb: needsBareForm ? verbForms.rawBase : detectVerbForm(params.tense, params),
    reflexive: params.reflexive ? reflexivePronouns[params.subject] : null,
  };
};

export const isPronounString = (o: string): o is Pronoun => allPronounsSet.has(o);
export const isSentenceTypeString = (o: string): o is SentenceType => allSentenceTypesSet.has(o);
export const isModalVerbsString = (o: string): o is ModalVerb => allModalVerbsSet.has(o);

// @model(`tables/EnglishTense/BasicSentenceConfig`)
// class BasicSentenceConfig extends Model({
//   pronoun: prop<Pronoun>(),
//   verb: prop<string>(),
//   type: prop<SentenceType>(),
//   reflexive: prop<Reflexive>(),
// }) {}
//
// @model(`tables/EnglishTense/SentenceConfig`)
// class SentenceConfig extends Model({
//   pronoun: prop<Pronoun | null>(null),
//   verb: prop<string | null>(null),
//   type: prop<SentenceType | null>(null),
//   reflexive: prop<Reflexive | null>(null),
// }) {}
//
// @model(`tables/EnglishTense/CellConfig`)
// class CellConfig extends Model({
//   sentences: prop<SentenceConfig[]>(),
// }) {}
//
// @model(`tables/EnglishTense/CellConfig`)
// class ConditionedCellConfig extends Model({
//   condition: prop<{ aspect?: Aspect; tense?: Tense }>(),
//   config: prop<CellConfig>(),
// }) {}
//
// @model(`tables/EnglishTense/TableConfig`)
// class TableConfig extends Model({
//   conditioned: prop<BasicSentenceConfig[]>(),
// }) {}

// @model(`tables/EnglishTense/Preset`)
// class Preset extends Model({
//   conditioned: prop < Partial<Record<Tense, Partial<Record<Aspect, any>>>>(),
// }) {}
