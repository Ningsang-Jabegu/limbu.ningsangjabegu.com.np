import React from 'react';
import { 
  GitCommit, 
  Tag, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  History
} from 'lucide-react';
import { getAllVersions, VersionMetadata } from '../versions/registry';

interface VersionHistoryProps {
  currentVersionId: string;
  onNavigate: (path: string) => void;
}

export const VersionHistory: React.FC<VersionHistoryProps> = ({
  currentVersionId,
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
          Historical records of frozen releases for the <span className="font-mono font-medium">yakthung-utils</span> package.
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
          In Yakthung Utils, a release is a permanent scientific artifact.
          When future versions (<span className="font-mono">v0.0.2</span>, <span className="font-mono">v0.1.0</span>) are released,
          they will be registered alongside existing versions rather than overwriting historical endpoints.
          Accessing <span className="font-mono text-slate-800">/yakthung-utils/v0.0.1</span> will always execute the <span className="font-mono text-slate-800">v0.0.1</span> rules.
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
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Card for Active Version */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Changelog & Features: v0.0.1 (Initial Release)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Frozen npm release tagged at commit 600aeea.
            </p>
          </div>
          <a
            href="https://github.com/Ningsang-Jabegu/yakthung-utils/releases/tag/v0.0.1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-teal-700 hover:underline flex items-center gap-1"
          >
            <span>GitHub Release Notes</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Implemented Capabilities
            </h3>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
              <li>Bi-directional Devanagari ↔ Sirijanga conversion engine</li>
              <li>Unicode-safe U+1900–U+194F character matrix</li>
              <li>Consonant cluster and subjoint medial parsing (्य, ्र, ्व)</li>
              <li>Native small/final letter mapping (ᤰ, ᤱ, ᤲ, ᤳ, ᤴ, ᤵ, ᤶ, ᤷ, ᤸ)</li>
              <li>Sa-i (᤻) fallbacks preventing Devanagari halanta leakage</li>
              <li>Kemphreng (᤺) long vowel length handling for long I and U</li>
              <li>Punctuation integrity: Devanagari danda preservation (।, ॥)</li>
              <li>Special particle Loo (᥀) contextual parsing</li>
              <li>Arabic & Devanagari numerals to native Limbu digits (᥆-᥏)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Validation Matrix & Testing Architecture
            </h3>
            <ul className="space-y-1.5 text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>13 modular test suites targeting distinct phonological tiers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>913 total automated test cases (913 passed, 0 failed)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Independent golden fixture baseline (golden-cases.js)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Exact code-point verification for combining marks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
