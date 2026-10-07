import React, { useState, useEffect, useMemo, useId } from 'react';
import { 
  ArrowLeftRight, 
  Copy, 
  Check, 
  Trash2, 
  BookOpen, 
  Sparkles, 
  Binary, 
  Info, 
  GitCommit, 
  Tag, 
  ShieldCheck, 
  Terminal,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { VersionMetadata, LATEST_VERSION_ID } from '../versions/registry';
import { v0_0_1_adapter } from '../versions/implementations/v0_0_1/adapter';
import { GOLDEN_CASES } from '../versions/implementations/v0_0_1/testData';
import { ValidationPanel } from './ValidationPanel';

interface ConverterUIProps {
  version: VersionMetadata;
  isLatestAlias: boolean;
  onNavigate: (path: string) => void;
}

type Direction = 'deva-to-limbu' | 'limbu-to-deva';

export const ConverterUI: React.FC<ConverterUIProps> = ({
  version,
  isLatestAlias,
  onNavigate,
}) => {
  const [direction, setDirection] = useState<Direction>('deva-to-limbu');
  const [inputText, setInputText] = useState<string>('खेमा');
  const [outputText, setOutputText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [liveConversion, setLiveConversion] = useState<boolean>(true);
  const [showCodePoints, setShowCodePoints] = useState<boolean>(false);
  const [showValidationModal, setShowValidationModal] = useState<boolean>(false);
  const liveConversionId = useId();

  // Pick converter implementation for this version
  // For v0.0.1, we strictly use v0_0_1_adapter
  const adapter = v0_0_1_adapter;

  // Execute conversion
  const handleConvert = (textToConvert: string = inputText) => {
    if (!textToConvert) {
      setOutputText('');
      return;
    }

    try {
      if (direction === 'deva-to-limbu') {
        const converted = adapter.devanagariToLimbu(textToConvert);
        setOutputText(converted);
      } else {
        const converted = adapter.limbuToDevanagari(textToConvert);
        setOutputText(converted);
      }
    } catch (err) {
      console.error('Conversion error:', err);
      setOutputText('Conversion error: Invalid sequence');
    }
  };

  // Run conversion initially or when dependencies change
  useEffect(() => {
    if (liveConversion) {
      handleConvert(inputText);
    }
  }, [inputText, direction, liveConversion]);

  // Swap direction
  const handleSwapDirection = () => {
    const newDir: Direction = direction === 'deva-to-limbu' ? 'limbu-to-deva' : 'deva-to-limbu';
    setDirection(newDir);
    // Swap text buffers if output exists
    if (outputText) {
      setInputText(outputText);
      setOutputText(inputText);
    }
  };

  // Copy to clipboard with fallback
  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = outputText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  // Inspect Unicode code points of output
  const outputCodePoints = useMemo(() => {
    if (!outputText) return [];
    const points: Array<{ char: string; hex: string; name?: string }> = [];
    for (const char of outputText) {
      const hex = 'U+' + char.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0');
      points.push({ char, hex });
    }
    return points;
  }, [outputText]);

  const sourceScriptLabel = direction === 'deva-to-limbu' ? 'Devanagari (देवनागरी)' : 'Sirijanga (ᤛᤡᤖᤡᤈᤅ)';
  const targetScriptLabel = direction === 'deva-to-limbu' ? 'Sirijanga (ᤛᤡᤖᤡᤈᤅ)' : 'Devanagari (देवनागरी)';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Latest Version Status Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-slate-600">
            {isLatestAlias ? (
              <>
                Resolved via <span className="font-mono font-medium text-slate-800">/yakthung-utils/latest</span> → showing current release <strong className="font-mono">{version.id}</strong>.
              </>
            ) : version.isLatest ? (
              <>
                You are using the latest version (<span className="font-mono font-medium">{version.id}</span>).
              </>
            ) : (
              <>
                You are viewing historical release <span className="font-mono font-semibold">{version.id}</span>.
                Latest version: <span className="font-mono font-semibold">{LATEST_VERSION_ID}</span>.
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!version.isLatest && (
            <button
              onClick={() => onNavigate(`/yakthung-utils/${LATEST_VERSION_ID}`)}
              className="text-teal-700 hover:text-teal-900 font-medium underline cursor-pointer"
            >
              Try {LATEST_VERSION_ID}
            </button>
          )}
          <span className="text-slate-400">·</span>
          <button
            onClick={() => onNavigate('/yakthung-utils/research')}
            className="text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Research Notes
          </button>
          <span className="text-slate-400">·</span>
          <button
            onClick={() => onNavigate('/yakthung-utils/versions')}
            className="text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            All Versions
          </button>
        </div>
      </div>

      {/* Primary Header */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Yakthung Utils <span className="font-mono text-xl sm:text-2xl font-normal text-slate-500">{version.id}</span>
          </h1>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>Computational script transliteration</span>
            <span>·</span>
            <span className="font-mono">{version.passedTestCases}/{version.totalTestCases} tests passed</span>
          </div>
        </div>
        <p className="text-sm text-slate-600 max-w-3xl">
          Deterministic Devanagari ↔ Sirijanga (Limbu) character, sequence, and numeral transliteration engine.
          Automatically transliterates words, Nepali digits (०-९), and English digits (0-9) in any combined sequence
          using the frozen <span className="font-mono font-medium text-slate-800">yakthung-utils@{version.versionNumber}</span> package
          (Git commit <span className="font-mono text-slate-800">{version.gitCommit}</span>).
        </p>
      </div>

      {/* Main Converter Console */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        
        {/* Script Direction Toolbar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Input Script Selector */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-slate-200 text-xs font-medium text-slate-800 shadow-2xs">
              <span className="text-slate-400 font-normal">Source:</span>
              <span className={direction === 'deva-to-limbu' ? 'font-devanagari font-semibold' : 'font-sirijanga font-semibold text-teal-800'}>
                {sourceScriptLabel}
              </span>
            </div>

            {/* Swap Direction Button */}
            <button
              type="button"
              onClick={handleSwapDirection}
              className="p-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              title="Switch conversion direction (Devanagari ↔ Sirijanga)"
              aria-label="Switch conversion direction"
            >
              <ArrowLeftRight className="w-4 h-4 text-teal-700" />
            </button>

            {/* Target Script Selector */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-slate-200 text-xs font-medium text-slate-800 shadow-2xs">
              <span className="text-slate-400 font-normal">Target:</span>
              <span className={direction === 'deva-to-limbu' ? 'font-sirijanga font-semibold text-teal-800' : 'font-devanagari font-semibold'}>
                {targetScriptLabel}
              </span>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-4 text-xs">
            <label htmlFor={liveConversionId} className="flex items-center gap-1.5 text-slate-600 cursor-pointer select-none">
              <input
                id={liveConversionId}
                type="checkbox"
                checked={liveConversion}
                onChange={(e) => setLiveConversion(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
              />
              <span>Live conversion</span>
            </label>

            <button
              type="button"
              onClick={() => setShowCodePoints(!showCodePoints)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border ${
                showCodePoints
                  ? 'bg-teal-50 border-teal-200 text-teal-800 font-medium'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Binary className="w-3.5 h-3.5" />
              <span>Unicode Inspector</span>
            </button>
          </div>
        </div>

        {/* Input & Output Panes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          
          {/* Left: Input Pane */}
          <div className="p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">Input ({sourceScriptLabel.split(' ')[0]})</span>
                <span className="font-mono tabular-nums">{inputText.length} characters</span>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter or paste text to convert..."
                rows={7}
                className={`w-full p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 text-base resize-y leading-relaxed transition-colors ${
                  direction === 'deva-to-limbu' ? 'font-devanagari' : 'font-sirijanga text-lg'
                }`}
              />
            </div>

            {/* Input Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleConvert()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Convert</span>
                </button>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  Nepali & English digits automatically transliterate
                </span>
              </div>

              {inputText && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Clear input"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Output Pane */}
          <div className="p-5 flex flex-col justify-between space-y-4 bg-slate-50/30">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">Output ({targetScriptLabel.split(' ')[0]})</span>
                <span className="font-mono tabular-nums">{outputText.length} characters</span>
              </div>

              <div
                className={`w-full min-h-[168px] p-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-base leading-relaxed break-words select-text ${
                  direction === 'deva-to-limbu' ? 'font-sirijanga text-xl text-slate-950 font-normal' : 'font-devanagari'
                }`}
              >
                {outputText ? (
                  <span className="whitespace-pre-wrap">{outputText}</span>
                ) : (
                  <span className="text-slate-400 italic text-sm font-sans select-none">
                    Converted text will appear here...
                  </span>
                )}
              </div>
            </div>

            {/* Output Action Bar */}
            <div className="flex items-center justify-between gap-2 pt-2">
              <div className="text-xs text-slate-500">
                Engine: <span className="font-mono">yakthung-utils@{version.versionNumber}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!outputText}
                  className="px-3 py-2 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700 border border-slate-200 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Output</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Unicode Inspector Row */}
        {showCodePoints && outputText && (
          <div className="p-4 bg-slate-900 text-slate-100 border-t border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono font-medium text-teal-400 flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5" />
                Unicode Code-Point Inspection
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                {outputCodePoints.length} codepoints
              </span>
            </div>
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto font-mono text-[11px]">
              {outputCodePoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 bg-slate-800 rounded border border-slate-700 flex items-center gap-1.5"
                >
                  <span className="text-base font-sirijanga text-white">{pt.char}</span>
                  <span className="text-teal-300">{pt.hex}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Verification Fixtures / Reference Samples */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Quick Test Fixtures & Golden Cases
          </h2>
          <span className="text-xs text-slate-400">Click any sample to test live</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
          {GOLDEN_CASES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setDirection('deva-to-limbu');
                setInputText(sample.devanagari);
              }}
              className="p-3 bg-white border border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50/30 transition-colors text-left flex flex-col justify-between cursor-pointer group shadow-2xs"
            >
              <div>
                <div className="font-devanagari text-sm font-medium text-slate-900 group-hover:text-teal-900">
                  {sample.devanagari}
                </div>
                <div className="font-sirijanga text-base text-teal-700 mt-1">
                  {sample.limbu}
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-2 truncate pt-1 border-t border-slate-100">
                {sample.notes}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Section: Research Artifact & Validation Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Col 1: Research Artifact Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              Research Artifact Specifications
            </h2>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {version.status}
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">npm Package</span>
              <a
                href={version.npmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-medium text-teal-700 hover:underline flex items-center gap-1"
              >
                <span>{version.npmPackage}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Version</span>
              <span className="font-mono font-medium text-slate-900">{version.versionNumber}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Git Tag</span>
              <a
                href={version.gitTagUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-medium text-teal-700 hover:underline flex items-center gap-1"
              >
                <Tag className="w-3 h-3 text-slate-400" />
                <span>{version.gitTag}</span>
              </a>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Git Commit</span>
              <a
                href={version.gitCommitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-medium text-teal-700 hover:underline flex items-center gap-1"
              >
                <GitCommit className="w-3 h-3 text-slate-400" />
                <span>{version.gitCommit}</span>
              </a>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Validation Status</span>
              <span className="font-mono font-medium text-emerald-700">
                {version.passedTestCases} / {version.totalTestCases} passed (100%)
              </span>
            </div>

            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Author / Researcher</span>
              <a
                href="https://ningsangjabegu.com.np"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-900 hover:text-teal-700"
              >
                Ningsang Jabegu (ᤏᤡᤅᤚᤠ᤺ᤅ ᤈᤘᤣ᤺ᤃᤢ)
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('/yakthung-utils/research')}
              className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md text-xs font-medium text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Read Full Research & Linguistic Documentation</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Col 2: Validation Summary & Test Runner */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-teal-600" />
              Validation & Test Suites ({version.id})
            </h2>
            <button
              onClick={() => setShowValidationModal(true)}
              className="text-xs text-teal-700 hover:text-teal-900 font-medium underline cursor-pointer"
            >
              View all 13 suites
            </button>
          </div>

          {/* Test metrics grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
              <div className="text-xl font-bold font-mono text-slate-900">{version.testSuitesCount}</div>
              <div className="text-[10px] uppercase font-mono text-slate-400 mt-0.5">Test Suites</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
              <div className="text-xl font-bold font-mono text-slate-900">{version.totalTestCases}</div>
              <div className="text-[10px] uppercase font-mono text-slate-400 mt-0.5">Test Cases</div>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
              <div className="text-xl font-bold font-mono text-emerald-800">100%</div>
              <div className="text-[10px] uppercase font-mono text-emerald-600 mt-0.5">Pass Rate</div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            The frozen test suite covers 13 distinct functional domains including Unicode block isolation,
            Sa-i combining marks, Kemphreng vowel lengthening, nasalization normalization, retroflex fallbacks,
            and multi-tier round-trip stability.
          </p>

          <button
            onClick={() => setShowValidationModal(true)}
            className="w-full py-2 px-3 bg-teal-800 hover:bg-teal-900 text-white rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Check className="w-3.5 h-3.5 text-teal-300" />
            <span>Inspect 13 Test Suites & Run Browser Verification</span>
          </button>
        </div>
      </div>

      {/* Version Change Information & Features (Section 9) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Release Information — {version.id}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Released {version.releaseDate} · Commit {version.gitCommit}
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
            Frozen Artifact
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Implemented Subsystems
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {version.implemented.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-600" />
              Known Limitations & Disclaimers
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {version.knownLimitations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal / Detailed Validation Panel */}
      {showValidationModal && (
        <ValidationPanel
          version={version}
          onClose={() => setShowValidationModal(false)}
        />
      )}

    </div>
  );
};
