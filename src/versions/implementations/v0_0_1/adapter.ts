/**
 * Adapter for yakthung-utils@0.0.1
 * Git tag: v0.0.1
 * Commit: 600aeea
 *
 * DO NOT alter, normalize, or reinterpret conversion rules.
 * This file delegates directly to the frozen package functions.
 */

import {
  devanagariToLimbu as pkgDevanagariToLimbu,
  limbuToDevanagari as pkgLimbuToDevanagari,
  convertToLimbuDigits as pkgConvertToLimbuDigits,
  isLimbuScript as pkgIsLimbuScript,
} from 'yakthung-utils';

import {
  CONSONANTS,
  VOWELS,
  NUMBER_MAP,
  SMALL_LETTERS,
  SUBJOINTS,
  SIGNS,
  HINTS_AND_DOCS,
} from 'yakthung-utils/src/mappings.js';

export interface ConverterFunctions {
  devanagariToLimbu: (text: string) => string;
  limbuToDevanagari: (text: string) => string;
  convertToLimbuDigits: (input: string | number) => string;
  isLimbuScript: (text: string) => boolean;
  mappings: {
    consonants: typeof CONSONANTS;
    vowels: typeof VOWELS;
    numberMap: typeof NUMBER_MAP;
    smallLetters: typeof SMALL_LETTERS;
    subjoints: typeof SUBJOINTS;
    signs: typeof SIGNS;
    hints: typeof HINTS_AND_DOCS;
  };
}

export const v0_0_1_adapter: ConverterFunctions = {
  devanagariToLimbu: (text: string): string => {
    return pkgDevanagariToLimbu(text);
  },
  limbuToDevanagari: (text: string): string => {
    return pkgLimbuToDevanagari(text);
  },
  convertToLimbuDigits: (input: string | number): string => {
    return pkgConvertToLimbuDigits(input);
  },
  isLimbuScript: (text: string): boolean => {
    return pkgIsLimbuScript(text);
  },
  mappings: {
    consonants: CONSONANTS,
    vowels: VOWELS,
    numberMap: NUMBER_MAP,
    smallLetters: SMALL_LETTERS,
    subjoints: SUBJOINTS,
    signs: SIGNS,
    hints: HINTS_AND_DOCS,
  },
};
