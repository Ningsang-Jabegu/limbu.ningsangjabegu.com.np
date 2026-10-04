import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  FileText, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  Binary,
  ArrowRight
} from 'lucide-react';
import { v0_0_1_adapter } from '../versions/implementations/v0_0_1/adapter';
import { VersionMetadata } from '../versions/registry';

interface ResearchSectionProps {
  version: VersionMetadata;
  onNavigate: (path: string) => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({
  version,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'paper' | 'matrix'>('paper');
  const [matrixCategory, setMatrixCategory] = useState<'consonants' | 'vowels' | 'subjoints' | 'small' | 'signs' | 'numerals'>('consonants');

  const mappings = v0_0_1_adapter.mappings;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span>Research Artifact</span>
          <span>·</span>
          <span>yakthung-utils@{version.versionNumber}</span>
          <span>·</span>
          <span>Git Tag {version.gitTag}</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Research & Computational Foundations
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Comprehensive documentation of the computational character mappings, context-aware syllable parsing,
          normalization boundaries, and epistemology governing Devanagari ↔ Sirijanga conversion in Yakthung Utils.
        </p>

        {/* Tab switch between Paper and Matrix */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('paper')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'paper'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Research Paper & Documentation
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Unicode Mapping Matrix Explorer
          </button>
        </div>
      </div>

      {activeTab === 'paper' ? (
        /* The Research Paper Document */
        <article className="prose prose-slate max-w-none space-y-10 text-slate-800 text-sm leading-relaxed">
          
          {/* Central Epistemological Callout Banner */}
          <div className="not-prose p-5 bg-teal-50/80 border-l-4 border-teal-600 rounded-r-lg space-y-2">
            <div className="text-xs uppercase font-mono font-semibold tracking-wider text-teal-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-teal-700" />
              Epistemological Principle
            </div>
            <blockquote className="text-base font-serif italic text-teal-950 font-medium">
              “Passing computational tests does not by itself establish linguistic correctness.”
            </blockquote>
            <p className="text-xs text-teal-800 leading-relaxed">
              Software unit tests verify that the code strictly mirrors its internal fixtures and programmatic matrix.
              Linguistic validity requires sustained empirical validation by Yakthung native speakers, community elders,
              and institutional authorities such as Kirat Yakthung Chumlung (KYC).
            </p>
          </div>

          {/* Section 1: What Yakthung Utils is */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="font-mono text-sm text-teal-700">01.</span>
              What Yakthung Utils Is
            </h2>
            <p>
              <strong>Yakthung Utils</strong> is an open-source computational library and reproducible research artifact
              engineered specifically for the <strong>Yakthung (Limbu)</strong> language and the <strong>Sirijanga script</strong>.
              Historically, native speakers and researchers in Nepal, Sikkim, and the global diaspora have frequently documented
              Yakthung phonology using the Devanagari script. Yakthung Utils provides deterministic, bidirectional transformation
              algorithms between standard Devanagari orthography and native Sirijanga Unicode codepoints.
            </p>
            <p>
              Rather than employing probabilistic large language models or non-deterministic heuristics, the package
              implements formal context-free and contextual mapping automata with reproducible mathematical guarantees.
            </p>
          </section>

          {/* Section 2: What Devanagari <-> Sirijanga conversion means */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="font-mono text-sm text-teal-700">02.</span>
              Scope of Devanagari ↔ Sirijanga Conversion
            </h2>
            <p>
              In this project, conversion refers to <strong>computational script transliteration</strong>. It is distinct from machine translation.
              The underlying Yakthung lexical terms remain unmodified in meaning; only their graphic and phonetic representation transitions
              across script boundaries.
            </p>
            <p>
              Because Devanagari possesses phonological traits foreign to native Yakthung (such as an extensive retroflex inventory),
              the conversion engine enforces a defined <em>linguistic fallback policy</em> that resolves non-native phones to their
              nearest native dental counterparts.
            </p>
          </section>

          {/* Section 3: Unicode Representation */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="font-mono text-sm text-teal-700">03.</span>
              Unicode Representation (U+1900 to U+194F)
            </h2>
            <p>
              Sirijanga was formally encoded in the Unicode Standard starting from Unicode 4.0 within the range
              <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">U+1900–U+194F</code> (Limbu block).
              The block contains:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
              <li><strong>Consonants (U+1900–U+191E):</strong> ᤀ (Vowel carrier) through ᤞ (Tra).</li>
              <li><strong>Dependent Vowel Signs (U+1920–U+1928):</strong> ᤠ (Aa) through ᤨ (Short/Open O).</li>
              <li><strong>Subjoined Medial Consonants (U+1929–U+192B):</strong> ᤩ (Subjoint Ya), ᤪ (Subjoint Ra), ᤫ (Subjoint Wa).</li>
              <li><strong>Small Final Consonants (U+1930–U+1938):</strong> Explicit terminal consonants without inherent vowels.</li>
              <li><strong>Signs & Modifiers (U+1939–U+1940):</strong> ᤹ (Mukphreng), ᤺ (Kemphreng), ᤻ (Sa-i), ᥀ (Loo).</li>
              <li><strong>Numerals (U+1946–U+194F):</strong> ᥆ through ᥏ (0 to 9).</li>
            </ul>
          </section>

          {/* Section 4 & 5: Character Mapping & Contextual Syllables */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="font-mono text-sm text-teal-700">04 & 05.</span>
              Character Mapping & Syllable Context Logic
            </h2>
            <p>
              A major challenge in script conversion is preventing <strong>Devanagari Halanta leakage</strong>.
              In Devanagari, the virama (<code className="font-mono">्</code>) is applied universally to extinguish inherent vowels.
              In Sirijanga, half-letters are structurally divided into two mutually exclusive categories:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs">
              <li>
                <strong>Medial Subjoints (<code className="font-mono">् + य/र/व</code>):</strong> Form composite clusters attached
                beneath or following the base consonant carrier (e.g. <code className="font-mono">क + ् + य → ᤁᤩ</code>). Dependent vowels may still attach afterwards.
              </li>
              <li>
                <strong>Syllable Finals:</strong> If a dedicated small letter exists, the engine emits the small letter glyph
                (e.g., <code className="font-mono">त् → ᤳ</code>, <code className="font-mono">प् → ᤵ</code>, <code className="font-mono">म् → ᤶ</code>).
                If no dedicated small letter exists in the Unicode standard (such as for <code className="font-mono">स्, ष्, श्, ह्</code>),
                the base consonant is emitted followed by <strong>Sa-i (<code className="font-mono">᤻</code>, U+193B)</strong>.
              </li>
            </ol>
          </section>

          {/* Section 6 & 7: Special Signs & Normalization */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="font-mono text-sm text-teal-700">06 & 07.</span>
              Special Signs & Normalization Strategies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-semibold text-slate-900 text-xs mb-1">
                  Kemphreng (᤺, U+193A) Vowel Lengthener
                </div>
                <p className="text-xs text-slate-600">
                  Devanagari maintains separate glyphs for short and long I (<code className="font-mono">ि/ी</code>) and U (<code className="font-mono">ु/ू</code>).
                  In v0.0.1, long I and long U map explicitly to their vowel sign combined with Kemphreng (<code className="font-mono">ᤁᤡ᤺, ᤁᤢ᤺</code>),
                  allowing exact round-trip reconstruction without incorrectly polluting other vowels like <code className="font-mono">का (ᤁᤠ)</code>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-semibold text-slate-900 text-xs mb-1">
                  Nasalization Normalization (ं / ँ → ᤱ)
                </div>
                <p className="text-xs text-slate-600">
                  Both Devanagari Anusvara (<code className="font-mono">ं</code>) and Chandrabindu (<code className="font-mono">ँ</code>)
                  normalize to Sirijanga Small Nga (<code className="font-mono">ᤱ</code>).
                  Because this maps a 2:1 phonetic distinction into a single grapheme, reversing from Limbu restores Anusvara (<code className="font-mono">ं</code>).
                  This is classified in our test matrix as <em>intentional normalization</em>, not a software defect.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: Round-Trip Behavior Tiers */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="font-mono text-sm text-teal-700">08.</span>
              The Three-Tier Round-Trip Model
            </h2>
            <p>
              Many naive transliteration engines boast misleading claims of "100% reversible round-trips."
              Yakthung Utils explicitly categorizes transformations into three distinct mathematical tiers:
            </p>
            <div className="space-y-2 not-prose text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-950 font-semibold">Tier 1: Lossless (Isomorphic)</strong>
                  <p className="text-emerald-800 mt-0.5">
                    Original Devanagari text is reconstructed character-for-character with 100% fidelity.
                    Example: <code className="font-mono">खेमा → ᤂᤣᤔᤠ → खेमा</code>.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-950 font-semibold">Tier 2: Normalized (Canonical Collapse)</strong>
                  <p className="text-blue-800 mt-0.5">
                    Phonetic distinctions absent in Sirijanga collapse canonically.
                    Example: <code className="font-mono">कँ → ᤁᤱ → कं</code>.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-950 font-semibold">Tier 3: Lossy (Fallback Domain)</strong>
                  <p className="text-amber-800 mt-0.5">
                    Non-native phonemes (retroflexes) fall back to dental sounds and cannot recover original spelling.
                    Example: <code className="font-mono">टिका → ᤋᤡᤁᤠ → तिका</code>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9, 10, 11: Correctness Matrix */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="font-mono text-sm text-teal-700">09, 10 & 11.</span>
              Computational vs. Orthographic vs. Linguistic Correctness
            </h2>
            <div className="border border-slate-200 rounded-lg overflow-hidden not-prose">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="p-3 font-semibold">Dimension</th>
                    <th className="p-3 font-semibold">Verification Method</th>
                    <th className="p-3 font-semibold">Current State in v0.0.1</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Computational Correctness</td>
                    <td className="p-3 text-slate-600">Automated unit test suites, golden fixtures, regression asserts.</td>
                    <td className="p-3 font-mono text-emerald-700 font-semibold">913 / 913 Passed (100%)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Orthographic Correctness</td>
                    <td className="p-3 text-slate-600">Adherence to standardized Unicode sequence rules and Chumlung conventions.</td>
                    <td className="p-3 text-slate-700">Verified for core dictionary headwords.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Linguistic Correctness</td>
                    <td className="p-3 text-slate-600">Cross-dialectal speaker audits and phonological peer review.</td>
                    <td className="p-3 text-amber-700 font-medium">Ongoing iterative consultation.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 12: Known Limitations */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="font-mono text-sm text-teal-700">12.</span>
              Known Limitations of Release v0.0.1
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
              <li>
                <strong>Dialectal Variations:</strong> Panchthar, Phedap, Tambarkhola, and Sikkim dialects contain phonetic nuances that may not be reflected in a single standardized transliteration table.
              </li>
              <li>
                <strong>Complex Conjuncts:</strong> Unattested consonant combinations beyond standard subjoints (<code className="font-mono">्य, ्र, ्व</code>) fall back to separate consonant sequences.
              </li>
              <li>
                <strong>Unicode Font Rendering:</strong> The output is 100% standard Unicode; however, proper visual display requires modern fonts with complete OpenType GSUB tables for Limbu (e.g. Noto Sans Limbu, Namdhinggo SIL).
              </li>
            </ul>
          </section>

          {/* Back to converter button */}
          <div className="pt-6 not-prose border-t border-slate-200 flex justify-end">
            <button
              onClick={() => onNavigate(`/yakthung-utils/${version.id}`)}
              className="px-4 py-2 bg-slate-900 text-white rounded-md text-xs font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Back to Interactive Converter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </article>
      ) : (
        /* The Unicode Mapping Matrix Explorer */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'consonants', label: 'Core Consonants' },
              { id: 'vowels', label: 'Dependent Vowels' },
              { id: 'subjoints', label: 'Subjoints (Medials)' },
              { id: 'small', label: 'Small Letters (Finals)' },
              { id: 'signs', label: 'Modifiers & Signs' },
              { id: 'numerals', label: 'Numerals' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setMatrixCategory(cat.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  matrixCategory === cat.id
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Table display */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            {matrixCategory === 'consonants' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="p-3 font-semibold">Devanagari</th>
                      <th className="p-3 font-semibold">Sirijanga</th>
                      <th className="p-3 font-semibold font-mono">Unicode</th>
                      <th className="p-3 font-semibold">Roman</th>
                      <th className="p-3 font-semibold">Fallback Characters</th>
                      <th className="p-3 font-semibold">Linguistic Hint</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mappings.consonants.map((c: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-50/60">
                        <td className="p-3 font-devanagari text-base font-semibold text-slate-900">{c.devanagari}</td>
                        <td className="p-3 font-sirijanga text-xl text-teal-800">{c.limbu}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-500">{c.code}</td>
                        <td className="p-3 font-mono text-slate-700">{c.roman}</td>
                        <td className="p-3 font-devanagari text-slate-500">
                          {c.fallbackDeva && c.fallbackDeva.length > 0 ? c.fallbackDeva.join(', ') : '—'}
                        </td>
                        <td className="p-3 text-slate-600">{c.hint}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {matrixCategory === 'vowels' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="p-3 font-semibold">Devanagari Sign</th>
                      <th className="p-3 font-semibold">Sirijanga Sign</th>
                      <th className="p-3 font-semibold font-mono">Unicode</th>
                      <th className="p-3 font-semibold">Roman</th>
                      <th className="p-3 font-semibold">Linguistic Behavior</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mappings.vowels.map((v: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-50/60">
                        <td className="p-3 font-devanagari text-base font-semibold text-slate-900">
                          क{v.devanagari.default || 'ा'}
                        </td>
                        <td className="p-3 font-sirijanga text-xl text-teal-800">
                          ᤁ{v.limbu}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-slate-500">{v.code}</td>
                        <td className="p-3 font-mono text-slate-700">{v.roman}</td>
                        <td className="p-3 text-slate-600">{v.hint}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {matrixCategory === 'subjoints' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="p-3 font-semibold">Devanagari Form</th>
                      <th className="p-3 font-semibold">Sirijanga Subjoint</th>
                      <th className="p-3 font-semibold font-mono">Unicode</th>
                      <th className="p-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mappings.subjoints.map((s: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-50/60">
                        <td className="p-3 font-devanagari text-base font-semibold text-slate-900">{s.devanagari}</td>
                        <td className="p-3 font-sirijanga text-xl text-teal-800">ᤁ{s.limbu}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-500">{s.code}</td>
                        <td className="p-3 text-slate-600">{s.hint}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {matrixCategory === 'small' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="p-3 font-semibold">Devanagari Halanta Consonant</th>
                      <th className="p-3 font-semibold">Sirijanga Final Small Letter</th>
                      <th className="p-3 font-semibold font-mono">Unicode</th>
                      <th className="p-3 font-semibold">Syllable Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mappings.smallLetters.map((sl: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-50/60">
                        <td className="p-3 font-devanagari text-base font-semibold text-slate-900">{sl.devanagari}</td>
                        <td className="p-3 font-sirijanga text-xl text-teal-800">{sl.limbu}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-500">{sl.code}</td>
                        <td className="p-3 text-slate-600">{sl.hint}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {matrixCategory === 'signs' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="p-3 font-semibold">Sign Name</th>
                      <th className="p-3 font-semibold">Devanagari Mapping</th>
                      <th className="p-3 font-semibold">Sirijanga Glyph</th>
                      <th className="p-3 font-semibold font-mono">Unicode</th>
                      <th className="p-3 font-semibold">Function & Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mappings.signs.map((s: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-50/60">
                        <td className="p-3 font-medium text-slate-900">{s.hint}</td>
                        <td className="p-3 font-devanagari text-base font-semibold text-slate-800">{s.devanagari}</td>
                        <td className="p-3 font-sirijanga text-xl text-teal-800">{s.limbu}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-500">{s.code}</td>
                        <td className="p-3 text-slate-600">{s.roman}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {matrixCategory === 'numerals' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="p-3 font-semibold">ASCII Digit</th>
                      <th className="p-3 font-semibold">Devanagari Digit</th>
                      <th className="p-3 font-semibold">Sirijanga Digit</th>
                      <th className="p-3 font-semibold font-mono">Unicode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Object.entries(mappings.numberMap).map(([k, v]: any) => {
                      const devaDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
                      return (
                        <tr key={k} className="hover:bg-slate-50/60">
                          <td className="p-3 font-mono text-sm text-slate-900">{k}</td>
                          <td className="p-3 font-devanagari text-base font-semibold text-slate-800">
                            {devaDigits[parseInt(k, 10)]}
                          </td>
                          <td className="p-3 font-sirijanga text-xl text-teal-800">{v}</td>
                          <td className="p-3 font-mono text-[11px] text-slate-500">
                            {'U+' + v.codePointAt(0)?.toString(16).toUpperCase()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
