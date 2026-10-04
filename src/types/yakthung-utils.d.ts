declare module 'yakthung-utils' {
  export function isLimbuScript(text: string): boolean;
  export function convertToLimbuDigits(input: string | number): string;
  export function devanagariToLimbu(text: string): string;
  export function limbuToDevanagari(limbuText: string): string;
}

declare module 'yakthung-utils/src/mappings.js' {
  export interface ConsonantMapping {
    roman: string;
    devanagari: string;
    fallbackDeva: string[];
    limbu: string;
    code: string;
    hint: string;
  }

  export interface VowelMapping {
    roman: string;
    devanagari: { default: string; long: string };
    limbu: string;
    code: string;
    hint: string;
  }

  export interface SubjointMapping {
    roman: string;
    devanagari: string;
    limbu: string;
    code: string;
    hint: string;
  }

  export interface SmallLetterMapping {
    devanagari: string;
    limbu: string;
    code: string;
    hint: string;
  }

  export interface SignMapping {
    roman: string;
    devanagari: string;
    limbu: string;
    code: string;
    hint: string;
  }

  export const NUMBER_MAP: Record<string | number, string>;
  export const CONSONANTS: ConsonantMapping[];
  export const VOWELS: VowelMapping[];
  export const SUBJOINTS: SubjointMapping[];
  export const SMALL_LETTERS: SmallLetterMapping[];
  export const SIGNS: SignMapping[];
  export const HINTS_AND_DOCS: Record<string, { en: string; ne: string }>;
}
