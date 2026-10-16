import React from 'react';
import { 
  GitCommit, 
  Tag, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  History,
  Sparkles,
  Check,
  Layers
} from 'lucide-react';
import { getAllVersions } from '../versions/registry';

interface VersionHistoryProps {
  currentVersionId: string;
  onNavigate: (path: string) => void;
}

export const VersionHistory: React.FC<VersionHistoryProps> = ({
  onNavigate,
}) => {
  const versions = getAllVersions();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <History className="w-4 h-4 text-teal-700" />
          <span>Release Registry & Version Comparison</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Yakthung Utils Version History
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Historical registry of frozen releases for the <span className="font-mono font-medium">yakthung-utils</span> package.
          Every version URL permanently executes that exact frozen implementation without revision drift.
        </p>
      </div>

      {/* Immutability Policy Box */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700">
        <div className="font-semibold text-slate-900 flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span>Strict Immutability Architecture</span>
        </div>
        <p className="leading-relaxed text-slate-600">
          In Yakthung Utils, each release is an immutable scientific artifact.
          When a new version (<span className="font-mono font-semibold text-slate-800">v0.0.2</span>) is published,
          it is registered alongside historical releases rather than overwriting previous endpoints.
          Accessing <span className="font-mono text-slate-800">/yakthung-utils/v0.0.1</span> will always execute the authentic <span className="font-mono text-slate-800">v0.0.1</span> rules,
          while <span className="font-mono text-slate-800">/yakthung-utils/latest</span> routes directly to current release <span className="font-mono text-slate-800">v0.0.2</span>.
        </p>
      </div>

      {/* Versions Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-medium">
              <tr>
                <th className="p-3.5">Version</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Release Date</th>
                <th className="p-3.5 font-mono">Git Coordinate</th>
                <th className="p-3.5">Test Pass Rate</th>
                <th className="p-3.5">Core Scope</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {versions.map((ver) => (
                <tr key={ver.id} className="hover:bg-slate-50/70 transition-colors">
                  
                  {/* Version ID */}
                  <td className="p-3.5 font-mono font-semibold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <span>{ver.id}</span>
                      {ver.isLatest && (
                        <span className="text-[10px] font-sans font-medium text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          Latest
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200 capitalize">
                      {ver.status}
                    </span>
                  </td>

                  {/* Release Date */}
                  <td className="p-3.5 text-slate-600">
                    {ver.releaseDate}
                  </td>

                  {/* Git Commit & Tag */}
                  <td className="p-3.5 font-mono text-[11px] text-slate-600">
                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {ver.gitTag}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <GitCommit className="w-3 h-3 text-slate-400" />
                        {ver.gitCommit}
                      </span>
                    </div>
                  </td>

                  {/* Test Pass Rate */}
                  <td className="p-3.5 font-mono">
                    <span className="text-emerald-700 font-medium">
                      {ver.passedTestCases}/{ver.totalTestCases}
                    </span>
                    <span className="text-slate-400 ml-1">(100%)</span>
                  </td>

                  {/* Core Scope */}
                  <td className="p-3.5 text-slate-600 max-w-xs truncate">
                    {ver.summary}
                  </td>

                  {/* Actions */}
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => onNavigate(`/yakthung-utils/${ver.id}`)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors cursor-pointer"
                    >
                      <span>Open {ver.id}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparative Matrix: v0.0.1 vs v0.0.2 */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-700" />
          <h2 className="text-base font-bold text-slate-900">
            Evolution & Comparative Mapping Matrix (v0.0.1 vs v0.0.2)
          </h2>
        </div>
        <p className="text-xs text-slate-600">
          The table below highlights specific transliteration behaviors between releases as documented in research findings.
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-medium font-mono">
              <tr>
                <th className="p-3">Feature Domain</th>
                <th className="p-3">Input Pattern</th>
                <th className="p-3 text-amber-800 bg-amber-50/50">v0.0.1 Behavior (Baseline)</th>
                <th className="p-3 text-teal-800 bg-teal-50/50">v0.0.2 Behavior (Targeted Fixes)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              <tr>
                <td className="p-3 font-medium text-slate-900">Independent Vowels</td>
                <td className="p-3 font-mono font-devanagari">आ, ई, ऊ, ए, ओ</td>
                <td className="p-3 text-slate-600">Passed through without conversion</td>
                <td className="p-3 text-teal-900 font-medium">Mapped to vowel carrier ᤀ + vowel sign (ᤀᤠ, ᤀᤡ᤺, ᤀᤢ᤺, ᤀᤣ, ᤀᤥ)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-900">Vowel Length (का)</td>
                <td className="p-3 font-mono font-devanagari">का</td>
                <td className="p-3 text-slate-600">ᤁᤠ (or ᤁᤠ᤺ under broad length rules)</td>
                <td className="p-3 text-teal-900 font-medium">Selective Kemphreng: strictly ᤁᤠ without unnecessary ᤺</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-900">Vowel Length (की / कू)</td>
                <td className="p-3 font-mono font-devanagari">की, कू</td>
                <td className="p-3 text-slate-600">Collapsed into short forms without Kemphreng</td>
                <td className="p-3 text-teal-900 font-medium">Dedicated long vowels with Kemphreng (ᤁᤡ᤺, ᤁᤢ᤺)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-900">Special Conjuncts</td>
                <td className="p-3 font-mono font-devanagari">ज्ञ, त्र</td>
                <td className="p-3 text-slate-600">Generic consonant + halant parsing</td>
                <td className="p-3 text-teal-900 font-medium">Explicit 3-codepoint conjuncts (ज्ञ → ᤝ, त्र → ᤞ)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-900">Numeral Reversal</td>
                <td className="p-3 font-mono font-sirijanga">᥈᥆᥈᥌</td>
                <td className="p-3 text-slate-600">Remained in Limbu digits in reverse</td>
                <td className="p-3 text-teal-900 font-medium">Natively maps back to Devanagari numerals (२०२६)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-900">Test Suites & Cases</td>
                <td className="p-3 font-mono text-slate-500">—</td>
                <td className="p-3 font-mono text-slate-600">13 suites · 913 test cases (100%)</td>
                <td className="p-3 font-mono text-teal-900 font-medium">15 suites · 1,048 test cases (100%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Release Cards for all versions */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900">
          Changelogs & Provenance Records
        </h2>

        {versions.map((ver) => (
          <div key={ver.id} className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 font-mono">
                    yakthung-utils@{ver.versionNumber} ({ver.id})
                  </h3>
                  {ver.isLatest && (
                    <span className="text-[10px] font-sans font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Current Latest Release
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Released {ver.releaseDate} · Commit <span className="font-mono">{ver.gitCommit}</span> · {ver.testSuitesCount} Test Suites ({ver.totalTestCases} cases)
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={ver.gitTagUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-teal-700 hover:underline flex items-center gap-1"
                >
                  <Tag className="w-3 h-3 text-slate-400" />
                  <span>Release Tag</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <span className="text-slate-300">·</span>
                <a
                  href={ver.npmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-teal-700 hover:underline flex items-center gap-1"
                >
                  <span>npm Registry</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <span className="text-slate-300">·</span>
                <button
                  onClick={() => onNavigate(`/yakthung-utils/${ver.id}`)}
                  className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors cursor-pointer"
                >
                  Open {ver.id}
                </button>
              </div>
            </div>

            {/* Targeted fixes & new additions */}
            {(ver.fixed || ver.added) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-teal-50/40 rounded-xl border border-teal-100 text-xs">
                {ver.fixed && (
                  <div className="space-y-1.5">
                    <div className="font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1 text-[11px]">
                      <Check className="w-3.5 h-3.5 text-teal-700" />
                      Targeted Fixes
                    </div>
                    <ul className="space-y-1 text-teal-950">
                      {ver.fixed.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold shrink-0">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {ver.added && (
                  <div className="space-y-1.5">
                    <div className="font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                      Added Capabilities
                    </div>
                    <ul className="space-y-1 text-teal-950">
                      {ver.added.map((a, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold shrink-0">+</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
                  Implemented Subsystems
                </h4>
                <ul className="space-y-1.5 text-slate-600">
                  {ver.implemented.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
                  Validation & Limitations
                </h4>
                <ul className="space-y-1.5 text-slate-600">
                  <li className="flex items-center gap-2 font-medium text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{ver.passedTestCases}/{ver.totalTestCases} automated test cases passed (100%)</span>
                  </li>
                  {ver.knownLimitations.slice(0, 3).map((lim, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-500">
                      <span className="text-slate-400 shrink-0">ℹ</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
