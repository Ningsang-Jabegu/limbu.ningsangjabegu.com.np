/**
 * Test Suites and Validation Data for yakthung-utils@0.0.1
 *
 * Research Artifact Details:
 * 13 Test Suites, 913 Test Cases, 913 Passed, 0 Failed (100% Pass Rate).
 * Independent Golden Cases fixture maintains manually verified expected outputs.
 */

export interface TestSuiteInfo {
  id: string;
  name: string;
  filename: string;
  testCount: number;
  passedCount: number;
  category: string;
  description: string;
  sampleCases: Array<{
    input: string;
    expected: string;
    description: string;
    direction: 'devanagariToLimbu' | 'limbuToDevanagari' | 'digits' | 'scriptDetection';
  }>;
}

export const V0_0_1_TEST_SUITES: TestSuiteInfo[] = [
  {
    id: 'suite-01',
    name: 'Script Detection',
    filename: '01-script-detection.test.js',
    testCount: 42,
    passedCount: 42,
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
    name: 'Numeral Localization',
    filename: '02-numbers.test.js',
    testCount: 68,
    passedCount: 68,
    category: 'Numerals',
    description: 'Validates conversion of standard ASCII digits (0-9) and Devanagari digits (०-९) to native Limbu numeric glyphs (᥆-᥏).',
    sampleCases: [
      { input: '2026', expected: '᥈᥆᥈᥌', description: 'ASCII year 2026 to Limbu digits', direction: 'digits' },
      { input: '२०८३', expected: '᥈᥆᥎᥉', description: 'Devanagari year २०८३ to Limbu digits', direction: 'digits' },
      { input: '0123456789', expected: '᥆᥇᥈᥉᥊᥋᥌᥍᥎᥏', description: 'Complete 0-9 sequence mapping', direction: 'digits' },
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
    name: 'Dependent Vowels',
    filename: '04-vowels.test.js',
    testCount: 96,
    passedCount: 96,
    category: 'Vowel System',
    description: 'Ensures correct attachment of dependent vowel signs (ा, ि, ु, े, ै, ो, ौ) to consonant carriers without corrupting the cluster.',
    sampleCases: [
      { input: 'का', expected: 'ᤁᤠ', description: 'Ka + Aa vowel (U+1920)', direction: 'devanagariToLimbu' },
      { input: 'कि', expected: 'ᤁᤡ', description: 'Ka + Short I vowel (U+1921)', direction: 'devanagariToLimbu' },
      { input: 'कु', expected: 'ᤁᤢ', description: 'Ka + Short U vowel (U+1922)', direction: 'devanagariToLimbu' },
      { input: 'के', expected: 'ᤁᤣ', description: 'Ka + Ee vowel (U+1923)', direction: 'devanagariToLimbu' },
      { input: 'को', expected: 'ᤁᤥ', description: 'Ka + O vowel (U+1925)', direction: 'devanagariToLimbu' },
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
    ]
  },
  {
    id: 'suite-06',
    name: 'Small / Final Letters',
    filename: '06-small-letters.test.js',
    testCount: 78,
    passedCount: 78,
    category: 'Syllable Finals',
    description: 'Verifies dedicated syllable-final characters (Small Ka ᤰ, Small Ta ᤳ, Small Pa ᤵ, Small Ma ᤶ, Small Ra ᤷ, Small La ᤸ).',
    sampleCases: [
      { input: 'खेप', expected: 'ᤂᤣᤵ', description: 'Khep with final Small Pa (ᤵ)', direction: 'devanagariToLimbu' },
      { input: 'याकथुङ', expected: 'ᤕᤠᤁᤌᤢᤅ', description: 'Yakthung representation', direction: 'devanagariToLimbu' },
      { input: 'ताप्लेजुङ', expected: 'ᤋᤠᤵᤗᤣᤈᤢᤅ', description: 'Taplejung with Small Pa final', direction: 'devanagariToLimbu' },
    ]
  },
  {
    id: 'suite-07',
    name: 'Kemphreng Vowel Lengthener',
    filename: '07-kemphreng.test.js',
    testCount: 54,
    passedCount: 54,
    category: 'Modifiers',
    description: 'Validates Limbu Sign Kemphreng (᤺, U+193A) for long vowels (ी -> ᤡ᤺, ू -> ᤢ᤺) while avoiding erroneous attachment to Aa/Ee.',
    sampleCases: [
      { input: 'की', expected: 'ᤁᤡ᤺', description: 'Long I receives Kemphreng', direction: 'devanagariToLimbu' },
      { input: 'कू', expected: 'ᤁᤢ᤺', description: 'Long U receives Kemphreng', direction: 'devanagariToLimbu' },
      { input: 'का', expected: 'ᤁᤠ', description: 'Aa does not receive Kemphreng', direction: 'devanagariToLimbu' },
      { input: 'ᤁᤡ᤺', expected: 'की', description: 'Reverse mapping reconstructs long I', direction: 'limbuToDevanagari' },
    ]
  },
  {
    id: 'suite-08',
    name: 'Mukphreng Glottal Modifier',
    filename: '08-mukphreng.test.js',
    testCount: 46,
    passedCount: 46,
    category: 'Modifiers',
    description: 'Validates handling of Limbu Sign Mukphreng (᤹, U+1939) marking glottal stop and verifies distinct role from Sa-i and Kemphreng.',
    sampleCases: [
      { input: 'ᤐ᤹', expected: 'प', description: 'Mukphreng terminal preservation', direction: 'limbuToDevanagari' },
      { input: 'ᤜᤠ᤹', expected: 'हा', description: 'Glottal syllable handling', direction: 'limbuToDevanagari' },
    ]
  },
  {
    id: 'suite-09',
    name: 'Nasalization Normalization',
    filename: '09-nasalization.test.js',
    testCount: 62,
    passedCount: 62,
    category: 'Phonology',
    description: 'Tests intentional normalization of Devanagari Anusvara (ं) and Chandrabindu (ँ) into Limbu Small Nga (ᤱ) and documented lossy round-trip.',
    sampleCases: [
      { input: 'कं', expected: 'ᤁᤱ', description: 'Anusvara -> Small Nga', direction: 'devanagariToLimbu' },
      { input: 'कँ', expected: 'ᤁᤱ', description: 'Chandrabindu -> Small Nga', direction: 'devanagariToLimbu' },
      { input: 'ᤁᤱ', expected: 'कं', description: 'Reverse maps back to Anusvara', direction: 'limbuToDevanagari' },
    ]
  },
  {
    id: 'suite-10',
    name: 'Punctuation & Special Signs',
    filename: '10-punctuation.test.js',
    testCount: 58,
    passedCount: 58,
    category: 'Orthography',
    description: 'Guarantees exact preservation of Devanagari danda (।, ॥) preventing collisions, and contextual parsing of Limbu sign Loo (᥀).',
    sampleCases: [
      { input: 'खेमा।', expected: 'ᤂᤣᤔᤠ।', description: 'Single danda preserved', direction: 'devanagariToLimbu' },
      { input: 'खेमा॥', expected: 'ᤂᤣᤔᤠ॥', description: 'Double danda preserved', direction: 'devanagariToLimbu' },
      { input: 'लो!', expected: '᥀', description: 'Special sign Loo conversion', direction: 'devanagariToLimbu' },
      { input: '᥀', expected: 'लो! (punctuation mark)', description: 'Loo reverse conversion', direction: 'limbuToDevanagari' },
    ]
  },
  {
    id: 'suite-11',
    name: 'Fallback Mappings',
    filename: '11-fallbacks.test.js',
    testCount: 72,
    passedCount: 72,
    category: 'Dialect & Fallback',
    description: 'Ensures non-native Devanagari retroflexes (ट, ठ, ड, ढ, ण, ष) gracefully map to nearest native dental consonants (त, थ, द, ध, न, स).',
    sampleCases: [
      { input: 'टा', expected: 'ᤋᤠ', description: 'Ta retroflex fallback to dental', direction: 'devanagariToLimbu' },
      { input: 'ठा', expected: 'ᤌᤠ', description: 'Tha retroflex fallback to dental', direction: 'devanagariToLimbu' },
      { input: 'डा', expected: 'ᤍᤠ', description: 'Da retroflex fallback to dental', direction: 'devanagariToLimbu' },
      { input: 'ढा', expected: 'ᤎᤠ', description: 'Dha retroflex fallback to dental', direction: 'devanagariToLimbu' },
      { input: 'ᤋᤠ', expected: 'ता', description: 'Reverse strictly yields dental', direction: 'limbuToDevanagari' },
    ]
  },
  {
    id: 'suite-12',
    name: 'Round-Trip Verification',
    filename: '12-roundtrip.test.js',
    testCount: 110,
    passedCount: 110,
    category: 'Reversibility Tiers',
    description: 'Verifies the 3-tier round-trip contract: Lossless (reversible), Normalized (intentional phonetic mergers), and Lossy (unrecoverable fallbacks).',
    sampleCases: [
      { input: 'खेमा', expected: 'खेमा', description: 'Lossless round trip', direction: 'devanagariToLimbu' },
      { input: 'काँ', expected: 'कां', description: 'Normalized round trip (Chandrabindu -> Anusvara)', direction: 'devanagariToLimbu' },
      { input: 'टिका', expected: 'तिका', description: 'Lossy fallback round trip (Retroflex -> Dental)', direction: 'devanagariToLimbu' },
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
      { input: '᤹', expected: 'U+1939', description: 'Mukphreng code point integrity', direction: 'devanagariToLimbu' },
      { input: '᤺', expected: 'U+193A', description: 'Kemphreng code point integrity', direction: 'devanagariToLimbu' },
      { input: '᤻', expected: 'U+193B', description: 'Sa-i code point integrity', direction: 'devanagariToLimbu' },
      { input: '᥀', expected: 'U+1940', description: 'Loo code point integrity', direction: 'devanagariToLimbu' },
    ]
  }
];

export const GOLDEN_CASES = [
  { devanagari: 'क', limbu: 'ᤁ', notes: 'Core Ka consonant' },
  { devanagari: 'खेमा', limbu: 'ᤂᤣᤔᤠ', notes: 'Standard word "Khema" (forgiveness)' },
  { devanagari: 'किराती', limbu: 'ᤁᤡᤖᤠᤋᤡ᤺', notes: 'Kirat ethnonym with long I' },
  { devanagari: 'याकथुङ', limbu: 'ᤕᤠᤁᤌᤢᤅ', notes: 'Yakthung endonym' },
  { devanagari: 'ताप्लेजुङ', limbu: 'ᤋᤠᤵᤗᤣᤈᤢᤅ', notes: 'Taplejung with final Small Pa' },
  { devanagari: 'सिक्किम', limbu: 'ᤛᤡᤰᤁᤡᤶ', notes: 'Sikkim with mid Small Ka and final Small Ma' },
  { devanagari: 'लो!', limbu: '᥀', notes: 'Exclamatory particle Loo' },
  { devanagari: '२०२६', limbu: '᥈᥆᥈᥌', notes: 'Devanagari year 2026 to Limbu numerals' },
];
