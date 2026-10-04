/**
 * Central Version Registry for Yakthung Utils
 *
 * Immutability Contract:
 * Historical versions must never be modified or silently updated.
 * New releases are registered here with their isolated implementation adapter.
 */

export interface VersionMetadata {
  id: string; // e.g. "v0.0.1"
  versionNumber: string; // e.g. "0.0.1"
  status: 'experimental' | 'stable' | 'deprecated';
  releaseDate: string;
  gitTag: string;
  gitCommit: string;
  gitCommitUrl: string;
  gitTagUrl: string;
  npmPackage: string;
  npmUrl: string;
  testSuitesCount: number;
  totalTestCases: number;
  passedTestCases: number;
  failedTestCases: number;
  isLatest: boolean;
  previousVersion: string | null;
  nextVersion: string | null;
  summary: string;
  implemented: string[];
  added?: string[];
  fixed?: string[];
  changed?: string[];
  knownLimitations: string[];
}

export const VERSIONS_REGISTRY: Record<string, VersionMetadata> = {
  'v0.0.1': {
    id: 'v0.0.1',
    versionNumber: '0.0.1',
    status: 'experimental',
    releaseDate: 'October 2026',
    gitTag: 'v0.0.1',
    gitCommit: '600aeea',
    gitCommitUrl: 'https://github.com/Ningsang-Jabegu/yakthung-utils/commit/600aeea',
    gitTagUrl: 'https://github.com/Ningsang-Jabegu/yakthung-utils/releases/tag/v0.0.1',
    npmPackage: 'yakthung-utils@0.0.1',
    npmUrl: 'https://www.npmjs.com/package/yakthung-utils/v/0.0.1',
    testSuitesCount: 13,
    totalTestCases: 913,
    passedTestCases: 913,
    failedTestCases: 0,
    isLatest: true,
    previousVersion: null,
    nextVersion: null,
    summary: 'Initial frozen experimental npm release implementing foundational Devanagari ↔ Sirijanga conversion rules with strict Unicode-safe handling.',
    implemented: [
      'Devanagari → Sirijanga conversion',
      'Sirijanga → Devanagari conversion',
      'Unicode-aware mapping (U+1900–U+194F)',
      'Arabic & Devanagari numerals to native Limbu digits',
      'Core Consonants with dental/retroflex fallback mappings',
      'Dependent Vowels and length differentiation',
      'Medial Subjoined forms (्स्त, ्य, ्र, ्व)',
      'Small/final letters (U+1930 to U+1938)',
      'Kemphreng (᤺) vowel lengthener handling',
      'Mukphreng (᤹) glottal modifier handling',
      'Nasalization (Anusvara ं and Chandrabindu ँ normalization to ᤱ)',
      'Punctuation & preserved Devanagari danda (।, ॥)',
      'Special Limbu sign Loo (᥀) contextual handling',
      'Devanagari halanta leakage prevention via Sa-i (᤻)',
      'Round-trip validation (Lossless, Normalized, Lossy tiers)',
      'Unicode integrity & code-point stability tests'
    ],
    knownLimitations: [
      'Some transformations are normalized rather than fully reversible (e.g. Chandrabindu and Anusvara both map to Small Nga ᤱ).',
      'Retroflex inputs (ट, ठ, ड, ढ, ण, ष) collapse into dental equivalents (त, थ, द, ध, न, स) and cannot be recovered on reverse conversion.',
      'Some mappings depend heavily on sequence and phonetic context; unsupported consonant conjuncts may fall back to separate characters.',
      'Passing computational tests does not by itself establish linguistic correctness.',
      'Community and native-speaker validation remains essential for orthographic claims beyond software test assertions.',
      'The implementation represents the computational rules of the frozen v0.0.1 release rather than every regional or historical Yakthung orthographic practice.'
    ]
  }
};

export const LATEST_VERSION_ID = 'v0.0.1';

export function getVersion(versionId: string): VersionMetadata | null {
  const normalized = versionId.toLowerCase().trim();
  if (normalized === 'latest') {
    return VERSIONS_REGISTRY[LATEST_VERSION_ID];
  }
  return VERSIONS_REGISTRY[normalized] || null;
}

export function getAllVersions(): VersionMetadata[] {
  return Object.values(VERSIONS_REGISTRY);
}
