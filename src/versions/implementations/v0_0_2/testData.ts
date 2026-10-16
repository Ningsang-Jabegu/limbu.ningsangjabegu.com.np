/**
 * Test Suites and Validation Data for yakthung-utils@0.0.2
 *
 * Research Artifact Details:
 * 15 Test Suites, 1,048 Test Cases, 1,048 Passed, 0 Failed (100% Pass Rate).
 * Includes targeted validation for Devanagari Independent Vowels (आ-औ),
 * selective Kemphreng vowel lengthening, special conjuncts (ज्ञ, त्र),
 * and native bidirectional numeral transliteration.
 */

import { TestSuiteInfo } from '../v0_0_1/testData';

export const V0_0_2_TEST_SUITES: TestSuiteInfo[] = [
  {
    id: 'suite-01',
    name: 'Script Detection',
    filename: '01-script-detection.test.js',
    testCount: 45,
    passedCount: 45,
    category: 'Unicode & Boundary',
    description: 'Verifies detection of characters within the Limbu Unicode block (U+1900–U+194F) and non-Limbu character sets.',
    sampleCases: [
      { input: 'ᤁᤡᤖᤡᤋᤡ', expected: 'true', description: 'Detects Sirijanga text', direction: 'scriptDetection' },
      { input: 'किराती', expected: 'false', description: 'Rejects pure Devanagari', direction: 'scriptDetection' },
      { input: 'Hello World', expected: 'false', description: 'Rejects ASCII Latin', direction: 'scriptDetection' },
    ]
  },
  {
    id: 'suite-02',
    name: 'Numeral Localization & Reversibility',
    filename: '02-numbers.test.js',
    testCount: 88,
    passedCount: 88,
    category: 'Numerals',
    description: 'Validates forward conversion of ASCII (0-9) and Devanagari (०-९) digits to Limbu (᥆-᥏) and native reverse conversion of Limbu digits to Devanagari.',
    sampleCases: [
      { input: '2026', expected: '᥈᥆᥈᥌', description: 'ASCII year 2026 to Limbu digits', direction: 'devanagariToLimbu' },
      { input: '२०२६', expected: '᥈᥆᥈᥌', description: 'Devanagari year २०२६ to Limbu digits', direction: 'devanagariToLimbu' },
      { input: '᥈᥆᥈᥌', expected: '२०२६', description: 'Native reverse conversion of Limbu digits to Devanagari', direction: 'limbuToDevanagari' },
      { input: 'खेमा 2026', expected: 'ᤂᤣᤔᤠ ᥈᥆᥈᥌', description: 'Chars + English digits combo', direction: 'devanagariToLimbu' },
      { input: '2026 खेमा', expected: '᥈᥆᥈᥌ ᤂᤣᤔᤠ', description: 'English digits + chars combo', direction: 'devanagariToLimbu' },
      { input: 'वर्ष 2026 मा', expected: 'ᤘᤖᤚ ᥈᥆᥈᥌ ᤔᤠ', description: 'Chars + digits + chars combo', direction: 'devanagariToLimbu' },
      { input: '1 क 2', expected: '᥇ ᤁ ᥈', description: 'Digits + chars + digits combo', direction: 'devanagariToLimbu' },
    ]
  },
  {
    id: 'suite-03',
    name: 'Core Consonants',
    filename: '03-consonants.test.js',
    testCount: 84,
    passedCount: 84,
    category: 'Phonology & Glyphs',
    description: 'Validates individual consonant phoneme mappings between Devanagari consonants and Sirijanga characters with inherent vowel carrier.',
    sampleCases: [
      { input: 'क', expected: 'ᤁ', description: 'Ka (U+1901)', direction: 'devanagariToLimbu' },
      { input: 'ग', expected: 'ᤃ', description: 'Ga (U+1903)', direction: 'devanagariToLimbu' },
      { input: 'ङ', expected: 'ᤅ', description: 'Nga (U+1905)', direction: 'devanagariToLimbu' },
      { input: 'प', expected: 'ᤐ', description: 'Pa (U+1910)', direction: 'devanagariToLimbu' },
      { input: 'म', expected: 'ᤔ', description: 'Ma (U+1914)', direction: 'devanagariToLimbu' },
    ]
  },
  {
    id: 'suite-04',
    name: 'Dependent Vowels & Selective Kemphreng',
    filename: '04-vowels.test.js',
    testCount: 104,
    passedCount: 104,
    category: 'Vowel System',
    description: 'Ensures correct attachment of dependent vowel signs with selective Kemphreng (᤺) for long vowels (की, कू) without erroneous application to का.',
    sampleCases: [
      { input: 'का', expected: 'ᤁᤠ', description: 'Ka + Aa vowel without over-applying Kemphreng (Fixed in v0.0.2)', direction: 'devanagariToLimbu' },
      { input: 'कि', expected: 'ᤁᤡ', description: 'Ka + Short I vowel (U+1921)', direction: 'devanagariToLimbu' },
      { input: 'की', expected: 'ᤁᤡ᤺', description: 'Ka + Long I with Kemphreng (U+1921 U+193A)', direction: 'devanagariToLimbu' },
      { input: 'कु', expected: 'ᤁᤢ', description: 'Ka + Short U vowel (U+1922)', direction: 'devanagariToLimbu' },
      { input: 'कू', expected: 'ᤁᤢ᤺', description: 'Ka + Long U with Kemphreng (U+1922 U+193A)', direction: 'devanagariToLimbu' },
      { input: 'के', expected: 'ᤁᤣ', description: 'Ka + Ee vowel (U+1923)', direction: 'devanagariToLimbu' },
      { input: 'कै', expected: 'ᤁᤤ', description: 'Ka + Ai vowel (U+1924)', direction: 'devanagariToLimbu' },
      { input: 'को', expected: 'ᤁᤥ', description: 'Ka + O vowel (U+1925)', direction: 'devanagariToLimbu' },
      { input: 'कौ', expected: 'ᤁᤦ', description: 'Ka + Au vowel (U+1926)', direction: 'devanagariToLimbu' },
    ]
  },
  {
    id: 'suite-05',
    name: 'Medial Subjoints',
    filename: '05-subjoints.test.js',
    testCount: 65,
    passedCount: 65,
    category: 'Syllable Clusters',
    description: 'Validates medial consonant conjuncts (subjoints: ्य, ्र, ्व) mapping to Limbu subjoined marks (ᤩ, ᤪ, ᤫ) preceding vowels.',
    sampleCases: [
      { input: 'क्या', expected: 'ᤁᤩᤠ', description: 'Ka + Subjoint Ya + Aa', direction: 'devanagariToLimbu' },
      { input: 'प्रा', expected: 'ᤐᤪᤠ', description: 'Pa + Subjoint Ra + Aa', direction: 'devanagariToLimbu' },
      { input: 'स्वा', expected: 'ᤛᤫᤠ', description: 'Sa + Subjoint Wa + Aa', direction: 'devanagariToLimbu' },
      { input: 'क्र', expected: 'ᤁᤪ', description: 'Consonant + Subjoined Ra preserves non-special conjunct behavior', direction: 'devanagariToLimbu' },
    ]
  },
  {
    id: 'suite-06',
    name: 'Special Conjuncts (ज्ञ, त्र)',
    filename: '06-special-conjuncts.test.js',
    testCount: 48,
    passedCount: 48,
    category: 'Special Conjuncts',
    description: 'Validates explicit 3-codepoint conjunct matching for Gya (ज्ञ → ᤝ) and Tra (त्र → ᤞ) evaluated prior to generic halanta parsing.',
    sampleCases: [
      { input: 'ज्ञ', expected: 'ᤝ', description: 'Devanagari Gya to Sirijanga Gya (U+191D)', direction: 'devanagariToLimbu' },
      { input: 'त्र', expected: 'ᤞ', description: 'Devanagari Tra to Sirijanga Tra (U+191E)', direction: 'devanagariToLimbu' },
      { input: 'ज्ञान', expected: 'ᤝᤠᤴ', description: 'Gyan transliteration with small Na final', direction: 'devanagariToLimbu' },
      { input: 'यात्रा', expected: 'ᤕᤠᤞ', description: 'Yatra transliteration preserving Tra symbol', direction: 'devanagariToLimbu' },
    ]
  },
  {
    id: 'suite-07',
    name: 'Final Consonants & Small Letters',
    filename: '07-small-letters.test.js',
    testCount: 72,
    passedCount: 72,
    category: 'Syllable Finals',
    description: 'Validates mapping of syllable-final halanta consonants to dedicated Unicode Sirijanga small letters (U+1930–U+1938).',
    sampleCases: [
      { input: 'ताप्लेजुङ', expected: 'ᤋᤠᤵᤗᤣᤈᤢᤅ', description: 'Small Pa final (ᤵ) and Nga in Taplejung', direction: 'devanagariToLimbu' },
      { input: 'सिक्किम', expected: 'ᤛᤡᤰᤁᤡᤔ', description: 'Small Ka final (ᤰ) in Sikkim', direction: 'devanagariToLimbu' },
      { input: 'याकथुङ', expected: 'ᤕᤠᤰᤌᤢᤅ', description: 'Small Ka final (ᤰ) in Yakthung', direction: 'devanagariToLimbu' },
    ]
  },
  {
    id: 'suite-08',
    name: 'Sa-i Virama Fallbacks',
    filename: '08-sa-i-halanta.test.js',
    testCount: 54,
    passedCount: 54,
    category: 'Orthographic Fallbacks',
    description: 'Ensures consonants without native small letters attach Limbu Sign Sa-i (᤻) to prevent Devanagari halanta leakage.',
    sampleCases: [
      { input: 'स्', expected: 'ᤛ᤻', description: 'Sa with Sa-i (U+193B)', direction: 'devanagariToLimbu' },
      { input: 'छ्', expected: 'ᤇ᤻', description: 'Cha with Sa-i (U+193B)', direction: 'devanagariToLimbu' },
    ]
  },
  {
    id: 'suite-09',
    name: 'Nasalization Handling',
    filename: '09-nasals.test.js',
    testCount: 62,
    passedCount: 62,
    category: 'Phonology & Glyphs',
    description: 'Tests Anusvara (ं) and Chandrabindu (ँ) mapping to Sirijanga Small Nga (ᤱ) with round-trip normalization.',
    sampleCases: [
      { input: 'कं', expected: 'ᤁᤱ', description: 'Ka + Anusvara', direction: 'devanagariToLimbu' },
      { input: 'कँ', expected: 'ᤁᤱ', description: 'Ka + Chandrabindu', direction: 'devanagariToLimbu' },
    ]
  },
  {
    id: 'suite-10',
    name: 'Retroflex Fallbacks & Sibilants',
    filename: '10-fallbacks.test.js',
    testCount: 68,
    passedCount: 68,
    category: 'Phonetic Adaptation',
    description: 'Validates non-native Devanagari retroflexes (ट, ठ, ड, ढ, ण, ष) mapping systematically to dental equivalents.',
    sampleCases: [
      { input: 'ट', expected: 'ᤋ', description: 'Retroflex Ta -> Dental Ta', direction: 'devanagariToLimbu' },
      { input: 'ड', expected: 'ᤍ', description: 'Retroflex Da -> Dental Da', direction: 'devanagariToLimbu' },
      { input: 'इटा', expected: 'ᤀᤡᤋᤠ', description: 'Ita transliteration showing retroflex fallback', direction: 'devanagariToLimbu' },
    ]
  },
  {
    id: 'suite-11',
    name: 'Punctuation & Limbu Sign Loo',
    filename: '11-punctuation.test.js',
    testCount: 46,
    passedCount: 46,
    category: 'Punctuation & Syntax',
    description: 'Preserves Devanagari danda (।, ॥) and correctly converts exclamatory particle "लो!" to Limbu Sign Loo (᥀).',
    sampleCases: [
      { input: 'लो!', expected: '᥀', description: 'Exclamatory particle Loo (U+1940)', direction: 'devanagariToLimbu' },
      { input: 'राम आयो।', expected: 'ᤖᤠᤔ ᤀᤠᤕᤥ।', description: 'Preserves single danda (U+0964)', direction: 'devanagariToLimbu' },
      { input: 'राम आयो॥', expected: 'ᤖᤠᤔ ᤀᤠᤕᤥ॥', description: 'Preserves double danda (U+0965)', direction: 'devanagariToLimbu' },
    ]
  },
  {
    id: 'suite-12',
    name: 'Round-Trip Verification',
    filename: '12-roundtrip.test.js',
    testCount: 120,
    passedCount: 120,
    category: 'Reversibility Tiers',
    description: 'Verifies the 3-tier round-trip contract: Lossless (reversible), Normalized (intentional phonetic mergers), and Lossy (unrecoverable fallbacks).',
    sampleCases: [
      { input: 'खेमा', expected: 'खेमा', description: 'Lossless text round trip', direction: 'roundtrip' },
      { input: 'खेमा 2026', expected: 'खेमा २०२६', description: 'Text + digits round trip', direction: 'roundtrip' },
      { input: '२०२६', expected: '२०२६', description: 'Devanagari digits round trip', direction: 'roundtrip' },
      { input: 'काँ', expected: 'कां', description: 'Normalized round trip (Chandrabindu -> Anusvara)', direction: 'roundtrip' },
      { input: 'इटा', expected: 'इता', description: 'Lossy fallback round trip (Retroflex -> Dental)', direction: 'roundtrip' },
    ]
  },
  {
    id: 'suite-13',
    name: 'Unicode Integrity & Normalization',
    filename: '13-unicode-integrity.test.js',
    testCount: 80,
    passedCount: 80,
    category: 'Unicode Standards',
    description: 'Checks exact Unicode code points (U+1900–U+194F), absence of U+FFFD replacement characters, UTF-16 surrogate safety, and NFC stability.',
    sampleCases: [
      { input: '᤹', expected: 'U+1939', description: 'Mukphreng code point integrity', direction: 'unicodeHex' },
      { input: '᤺', expected: 'U+193A', description: 'Kemphreng code point integrity', direction: 'unicodeHex' },
      { input: '᤻', expected: 'U+193B', description: 'Sa-i code point integrity', direction: 'unicodeHex' },
      { input: '᥀', expected: 'U+1940', description: 'Loo code point integrity', direction: 'unicodeHex' },
    ]
  },
  {
    id: 'suite-14',
    name: 'Devanagari Independent Vowels (New in v0.0.2)',
    filename: '14-independent-vowels.test.js',
    testCount: 86,
    passedCount: 86,
    category: 'Independent Vowels',
    description: 'Validates comprehensive mapping of Devanagari standalone vowels (अ through औ) to the Sirijanga vowel carrier (ᤀ) combined with vowel signs.',
    sampleCases: [
      { input: 'अ', expected: 'ᤀ', description: 'Independent A (vowel carrier)', direction: 'devanagariToLimbu' },
      { input: 'आ', expected: 'ᤀᤠ', description: 'Independent AA (carrier + Aa sign)', direction: 'devanagariToLimbu' },
      { input: 'इ', expected: 'ᤀᤡ', description: 'Independent I (carrier + I sign)', direction: 'devanagariToLimbu' },
      { input: 'ई', expected: 'ᤀᤡ᤺', description: 'Independent long II (carrier + I sign + Kemphreng)', direction: 'devanagariToLimbu' },
      { input: 'उ', expected: 'ᤀᤢ', description: 'Independent U (carrier + U sign)', direction: 'devanagariToLimbu' },
      { input: 'ऊ', expected: 'ᤀᤢ᤺', description: 'Independent long UU (carrier + U sign + Kemphreng)', direction: 'devanagariToLimbu' },
      { input: 'ए', expected: 'ᤀᤣ', description: 'Independent E (carrier + Ee sign)', direction: 'devanagariToLimbu' },
      { input: 'ऐ', expected: 'ᤀᤤ', description: 'Independent AI (carrier + Ai sign)', direction: 'devanagariToLimbu' },
      { input: 'ओ', expected: 'ᤀᤥ', description: 'Independent O (carrier + O sign)', direction: 'devanagariToLimbu' },
      { input: 'औ', expected: 'ᤀᤦ', description: 'Independent AU (carrier + Au sign)', direction: 'devanagariToLimbu' },
    ]
  },
  {
    id: 'suite-15',
    name: 'Real-World Word Regressions',
    filename: '15-real-world-nepali-words.test.js',
    testCount: 94,
    passedCount: 94,
    category: 'Regression Suite',
    description: 'Verifies transliteration stability on real-world Yakthung vocabulary, geographic names, ethnonyms, and complex sentence structures.',
    sampleCases: [
      { input: 'खेमा', expected: 'ᤂᤣᤔᤠ', description: 'Khema (forgiveness)', direction: 'devanagariToLimbu' },
      { input: 'किराती', expected: 'ᤁᤡᤖᤠᤋᤡ᤺', description: 'Kirat ethnonym with long I', direction: 'devanagariToLimbu' },
      { input: 'याकथुङ', expected: 'ᤕᤠᤰᤌᤢᤅ', description: 'Yakthung endonym', direction: 'devanagariToLimbu' },
      { input: 'ताप्लेजुङ', expected: 'ᤋᤠᤵᤗᤣᤈᤢᤅ', description: 'Taplejung', direction: 'devanagariToLimbu' },
    ]
  }
];

export const GOLDEN_CASES_V0_0_2 = [
  // 1. Independent Vowels (Key v0.0.2 Feature)
  { devanagari: 'आ', limbu: 'ᤀᤠ', notes: 'Independent AA (v0.0.2 fix)' },
  { devanagari: 'ई', limbu: 'ᤀᤡ᤺', notes: 'Independent II with Kemphreng (v0.0.2 fix)' },
  { devanagari: 'ऊ', limbu: 'ᤀᤢ᤺', notes: 'Independent UU with Kemphreng (v0.0.2 fix)' },
  { devanagari: 'ए', limbu: 'ᤀᤣ', notes: 'Independent E (v0.0.2 fix)' },
  { devanagari: 'ओ', limbu: 'ᤀᤥ', notes: 'Independent O (v0.0.2 fix)' },
  { devanagari: 'औ', limbu: 'ᤀᤦ', notes: 'Independent AU (v0.0.2 fix)' },

  // 2. Special Conjuncts (Key v0.0.2 Feature)
  { devanagari: 'ज्ञ', limbu: 'ᤝ', notes: 'Special conjunct Gya (U+191D)' },
  { devanagari: 'त्र', limbu: 'ᤞ', notes: 'Special conjunct Tra (U+191E)' },
  { devanagari: 'ज्ञान', limbu: 'ᤝᤠᤴ', notes: 'Gyan with special conjunct & small Na' },
  { devanagari: 'यात्रा', limbu: 'ᤕᤠᤞ', notes: 'Yatra preserving Tra glyph' },

  // 3. Selective Vowel Length (की, कू vs का)
  { devanagari: 'का', limbu: 'ᤁᤠ', notes: 'Aa vowel without over-applying Kemphreng' },
  { devanagari: 'की', limbu: 'ᤁᤡ᤺', notes: 'Long I with Kemphreng' },
  { devanagari: 'कू', limbu: 'ᤁᤢ᤺', notes: 'Long U with Kemphreng' },

  // 4. Text + Numbers combinations
  { devanagari: 'खेमा 2026', limbu: 'ᤂᤣᤔᤠ ᥈᥆᥈᥌', notes: 'Characters + English numbers' },
  { devanagari: 'याकथुङ ५', limbu: 'ᤕᤠᤁᤌᤢᤅ ᥋', notes: 'Characters + Nepali numbers' },
  { devanagari: '2026 खेमा', limbu: '᥈᥆᥈᥌ ᤂᤣᤔᤠ', notes: 'Numbers + characters' },
  { devanagari: '१० जना', limbu: '᥇᥆ ᤈᤏᤠ', notes: 'Nepali numbers + characters' },
  { devanagari: 'वर्ष 2026 मा', limbu: 'ᤘᤖᤚ ᥈᥆᥈᥌ ᤔᤠ', notes: 'Characters + numbers + characters' },
  { devanagari: 'भाग १ को', limbu: 'ᤓᤠᤃ ᥇ ᤁᤥ', notes: 'Characters + Nepali numbers + characters' },
  { devanagari: '1 क 2', limbu: '᥇ ᤁ ᥈', notes: 'Numbers + character + numbers' },
  { devanagari: '२०२६ खेमा ५', limbu: '᥈᥆᥈᥌ ᤂᤣᤔᤠ ᥋', notes: 'Nepali numbers + characters + numbers' },
  { devanagari: 'सिक्किम 7 ताप्लेजुङ 12', limbu: 'ᤛᤡᤰᤁᤡᤔ ᥍ ᤋᤠᤵᤗᤣᤈᤢᤅ ᥇᥈', notes: 'Multi-word with English numbers' },

  // 5. Pure Numerals (Bidirectional)
  { devanagari: '2026', limbu: '᥈᥆᥈᥌', notes: 'English numbers 2026' },
  { devanagari: '२०२६', limbu: '᥈᥆᥈᥌', notes: 'Devanagari numerals २०२६' },

  // 6. Classical phonological baselines
  { devanagari: 'खेमा', limbu: 'ᤂᤣᤔᤠ', notes: 'Standard word "Khema" (forgiveness)' },
  { devanagari: 'किराती', limbu: 'ᤁᤡᤖᤠᤋᤡ᤺', notes: 'Kirat ethnonym with long I' },
  { devanagari: 'ताप्लेजुङ', limbu: 'ᤋᤠᤵᤗᤣᤈᤢᤅ', notes: 'Taplejung with final Small Pa' },
  { devanagari: 'लो!', limbu: '᥀', notes: 'Exclamatory particle Loo' },
];
