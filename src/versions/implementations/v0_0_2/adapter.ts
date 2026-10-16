/**
 * Adapter for yakthung-utils@0.0.2
 * Git tag: v0.0.2
 * Commit: f456d13
 *
 * Direct delegation to the authentic published yakthung-utils@0.0.2 release.
 * Implements targeted fixes for independent vowels (आ through अः),
 * selective Kemphreng vowel lengthening, special conjuncts (ज्ञ, त्र),
 * and native reverse numeral conversion.
 */

import {
  devanagariToLimbu as pkgDevanagariToLimbu,
  limbuToDevanagari as pkgLimbuToDevanagari,
  convertToLimbuDigits as pkgConvertToLimbuDigits,
  isLimbuScript as pkgIsLimbuScript,
} from 'yakthung-utils-v002';

import {
  CONSONANTS,
  VOWELS,
  INDEPENDENT_VOWELS,
  NUMBER_MAP,
  LIMBU_TO_DEVANAGARI_NUMBER_MAP,
  DEVANAGARI_NUMBER_MAP,
  SMALL_LETTERS,
  SUBJOINTS,
  SIGNS,
  HINTS_AND_DOCS,
} from 'yakthung-utils-v002/src/mappings.js';

import { ConverterFunctions } from '../v0_0_1/adapter';

export const v0_0_2_adapter: ConverterFunctions = {
  devanagariToLimbu: (text: string): string => {
    if (!text) return '';
    // 1. Transliterate Devanagari text (including Devanagari numerals ०-९ which are handled by v0.0.2)
    const scriptConverted = pkgDevanagariToLimbu(text);
    // 2. Transliterate any remaining ASCII English digits (0-9) to Limbu digits
    return pkgConvertToLimbuDigits(scriptConverted);
  },
  limbuToDevanagari: (text: string): string => {
    if (!text) return '';
    // v0.0.2 natively supports bidirectional conversion of both Sirijanga text
    // and Sirijanga digits (᥆-᥏) back to Devanagari digits (०-९)
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
    independentVowels: INDEPENDENT_VOWELS,
    numberMap: NUMBER_MAP,
    limbuToDevanagariNumberMap: LIMBU_TO_DEVANAGARI_NUMBER_MAP,
    devanagariNumberMap: DEVANAGARI_NUMBER_MAP,
    smallLetters: SMALL_LETTERS,
    subjoints: SUBJOINTS,
    signs: SIGNS,
    hints: HINTS_AND_DOCS,
  },
};
