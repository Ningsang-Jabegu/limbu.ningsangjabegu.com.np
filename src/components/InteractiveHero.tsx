import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  Terminal, 
  Code2, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  ChevronRight, 
  Layers,
  BookOpen,
  ArrowDown
} from 'lucide-react';
import { v0_0_2_adapter } from '../versions/implementations/v0_0_2/adapter';
import { LATEST_VERSION_ID } from '../versions/registry';

interface InteractiveHeroProps {
  onNavigate: (path: string) => void;
}

interface Preset {
  label: string;
  text: string;
  category: string;
  note: string;
}

const PRESETS: Preset[] = [
  { label: 'नेपाल', text: 'नेपाल', category: 'General', note: 'Standard syllabic mapping (ने + पा + ल)' },
  { label: 'याकथुङ', text: 'याकथुङ', category: 'Script Name', note: 'Yakthung with anusvara (ं) & ligature' },
  { label: '२०२६', text: '२०२६', category: 'Numerals', note: 'Devanagari to Sirijanga digits (᥈᥆᥈᥌)' },
  { label: 'वर्ष 2026 मा', text: 'वर्ष 2026 मा', category: 'Mixed', note: 'Letters + ASCII digits + postposition' },
  { label: 'आलु', text: 'आलु', category: 'Vowels', note: 'Independent vowel Aa (आ → ᤀᤠ)' },
  { label: 'ज्ञान', text: 'ज्ञान', category: 'Conjunct', note: 'Three-codepoint conjunct Gy (ज्ञ → ᤝ)' },
  { label: 'किरात', text: 'किरात', category: 'Short I', note: 'Short vowel Ki (कि → ᤁᤡ) without Kemphreng' }
];

export const InteractiveHero: React.FC<InteractiveHeroProps> = ({ onNavigate }) => {
  // Input state
  const [inputText, setInputText] = useState<string>('नेपाल');
  const [copiedStage, setCopiedStage] = useState<string | null>(null);
  
  // Pipeline animation / step state (0: Input, 1: Analysis, 2: Package Engine, 3: Mapping, 4: Output)
  const [activeStep, setActiveStep] = useState<number>(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [selectedSnippetTab, setSelectedSnippetTab] = useState<'esm' | 'ts' | 'cjs'>('esm');
  
  // Interactive mini-challenge state
  const [quizSelection, setQuizSelection] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 2400);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Real package conversion using yakthung-utils@0.0.2 adapter
  const outputLimbu = useMemo(() => {
    return v0_0_2_adapter.devanagariToLimbu(inputText);
  }, [inputText]);

  // Code points breakdown for Input analysis
  const inputCodePoints = useMemo(() => {
    return Array.from(inputText).map((char) => ({
      char,
      codePoint: 'U+' + char.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0'),
      name: getDevanagariCharName(char)
    }));
  }, [inputText]);

  // Detailed syllable / character mapping breakdown
  const mappingBreakdown = useMemo(() => {
    return generateMappingBreakdown(inputText);
  }, [inputText]);

  const copyToClipboard = (text: string, stageId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStage(stageId);
    setTimeout(() => setCopiedStage(null), 2000);
  };

  const scrollToQuickStart = () => {
    const el = document.getElementById('hero-quick-start');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-10 pt-2 pb-6 border-b border-slate-200">
      
      {/* 1. Introductory Area */}
      <div className="space-y-6">
        
        {/* Status Pill */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs font-semibold text-teal-900">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
            <span>npm package · v0.0.2 · Open source</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-full text-xs font-mono text-slate-600 border border-slate-200">
            <span>Unicode 14.0+</span>
            <span>·</span>
            <span>1,048 Tests Passing</span>
          </div>
        </div>

        {/* Headline and Description */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Bring Devanagari text into the world of Sirijanga.
          </h1>
          <div className="font-sirijanga text-2xl sm:text-3xl text-teal-700 font-normal">
            ᤕᤠᤰᤌᤢᤅ ᤐᤠ᤺ᤴ ᤋᤣ᤺ᤰᤏᤥᤗᤥᤈᤡ ᤛᤡᤖᤡᤈᤅ ᤗᤡᤐᤡ
          </div>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            <code className="font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-sm font-semibold">yakthung-utils</code> is 
            a computational JavaScript package for deterministic Devanagari–Sirijanga conversion.
            Explore the live conversion pipeline below, test real-world cases, and learn how to integrate it into your own applications.
          </p>
        </div>

        {/* 3 Clear Primary Actions */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
          <button
            onClick={() => onNavigate('/yakthung-utils/latest')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-all flex items-center gap-2 shadow-xs cursor-pointer text-sm"
          >
            <span>Try the Converter</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </button>

          <button
            onClick={scrollToQuickStart}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-all flex items-center gap-2 shadow-xs cursor-pointer text-sm"
          >
            <Code2 className="w-4 h-4" />
            <span>Use It in Your Project</span>
            <ArrowDown className="w-3.5 h-3.5 opacity-80" />
          </button>

          <a
            href="https://www.npmjs.com/package/yakthung-utils"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer text-sm"
          >
            <span>View on npm</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>
      </div>

      {/* 2. Main Interactive Pipeline Visual */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-7 text-white shadow-xl space-y-6">
        
        {/* Pipeline Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Interactive Transliteration Pipeline
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live visualization of data flow from raw Devanagari text to Sirijanga Unicode standard output.
            </p>
          </div>

          {/* Stepper / Play Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              title={isAutoPlaying ? 'Pause pipeline flow' : 'Play automated flow'}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-teal-400" />
                  <span>Auto Flow</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveStep(4);
              }}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer border border-slate-700"
              title="Show all stages"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Presets Pills */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Quick Test Cases & Edge Conditions:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {PRESETS.map((p) => {
              const isSelected = inputText === p.text;
              return (
                <button
                  key={p.label}
                  onClick={() => {
                    setInputText(p.text);
                    setActiveStep(4);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-teal-600 text-white ring-2 ring-teal-400/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <span className="font-semibold">{p.label}</span>
                  <span className="text-[10px] opacity-70">({p.category})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Tabs Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 0, num: '1', title: 'Input Text' },
            { id: 1, num: '2', title: 'Unicode Analysis' },
            { id: 2, num: '3', title: 'yakthung-utils Node' },
            { id: 3, num: '4', title: 'Character Mapping' },
            { id: 4, num: '5', title: 'Sirijanga Output' }
          ].map((st) => {
            const isActive = activeStep === st.id;
            return (
              <button
                key={st.id}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveStep(st.id);
                }}
                className={`py-2 px-2.5 rounded-lg text-left text-xs transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-teal-950/80 border-teal-500 text-teal-200 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-teal-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {st.num}
                  </span>
                  <span className="font-medium truncate">{st.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Visual Pipeline Grid (5 Stages) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Stage 1: Input Text */}
          <div className={`lg:col-span-3 bg-slate-950/80 rounded-xl p-4 border transition-all flex flex-col justify-between ${
            activeStep === 0 || activeStep === 4 ? 'border-teal-500/80 ring-1 ring-teal-500/30' : 'border-slate-800 opacity-80'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono uppercase font-semibold tracking-wider text-teal-400">Stage 1 · Input</span>
                <span className="text-[11px] text-slate-500">Devanagari</span>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-medium">Type or edit Devanagari text:</label>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="e.g. नेपाल, २०२६"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium text-lg focus:outline-hidden focus:border-teal-400 transition-colors"
                />
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                Accepts Devanagari words, vowels, ligatures, and mixed Latin/Devanagari digits.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Length: {inputText.length} chars</span>
              <span className="text-teal-400">UTF-8 String</span>
            </div>
          </div>

          {/* Stage 2: Input Analysis (Unicode Code Points) */}
          <div className={`lg:col-span-3 bg-slate-950/80 rounded-xl p-4 border transition-all flex flex-col justify-between ${
            activeStep === 1 || activeStep === 4 ? 'border-teal-500/80 ring-1 ring-teal-500/30' : 'border-slate-800 opacity-80'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono uppercase font-semibold tracking-wider text-teal-400">Stage 2 · Analysis</span>
                <span className="text-[11px] text-slate-500">Code Points</span>
              </div>

              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {inputCodePoints.length === 0 ? (
                  <div className="text-xs text-slate-500 italic">No input entered</div>
                ) : (
                  inputCodePoints.map((cp, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono bg-slate-900/90 px-2.5 py-1.5 rounded border border-slate-800">
                      <span className="text-amber-300 font-bold text-sm">{cp.char}</span>
                      <span className="text-slate-400 text-[11px]">{cp.codePoint}</span>
                    </div>
                  ))
                )}
              </div>

              <p className="text-[11px] text-slate-400 leading-snug">
                JavaScript receives raw Unicode codepoints without requiring external NLP servers or heavy models.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
              Deterministic sequence parsing
            </div>
          </div>

          {/* Stage 3: Package Engine Node */}
          <div className={`lg:col-span-3 bg-slate-950/80 rounded-xl p-4 border transition-all flex flex-col justify-between ${
            activeStep === 2 || activeStep === 4 ? 'border-teal-500/80 ring-1 ring-teal-500/30' : 'border-slate-800 opacity-80'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono uppercase font-semibold tracking-wider text-teal-400">Stage 3 · Engine</span>
                <span className="text-[10px] bg-teal-950 border border-teal-800 text-teal-300 px-1.5 py-0.5 rounded font-mono">
                  {LATEST_VERSION_ID}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center space-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-teal-500/5 pointer-events-none"></div>
                <div className="w-7 h-7 mx-auto rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="font-mono font-bold text-sm text-teal-300">
                  yakthung-utils@0.0.2
                </div>
                <div className="font-mono text-[11px] text-slate-400">
                  devanagariToLimbu()
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed space-y-1">
                <div>• Zero runtime dependencies</div>
                <div>• Pure synchronous function execution</div>
                <div>• Bidirectional numeral normalization</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Direct npm runtime export</span>
            </div>
          </div>

          {/* Stage 4 & 5: Output Generation */}
          <div className={`lg:col-span-3 bg-slate-950/80 rounded-xl p-4 border transition-all flex flex-col justify-between ${
            activeStep === 3 || activeStep === 4 ? 'border-teal-500/80 ring-1 ring-teal-500/30' : 'border-slate-800 opacity-80'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono uppercase font-semibold tracking-wider text-teal-400">Stage 4 & 5 · Output</span>
                <span className="text-[11px] text-slate-500">Sirijanga</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                <div className="text-[10px] uppercase font-mono text-slate-400">Result:</div>
                <div className="text-2xl sm:text-3xl font-sirijanga text-teal-300 min-h-[36px] tracking-wide break-words">
                  {outputLimbu || <span className="text-slate-600 text-sm">ᤕᤠᤰᤌᤢᤅ</span>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(outputLimbu, 'output')}
                  className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  {copiedStage === 'output' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Result</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onNavigate('/yakthung-utils/latest')}
                  className="py-1.5 px-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs rounded font-medium transition-colors cursor-pointer"
                  title="Open full interactive converter"
                >
                  Full App →
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-teal-400 truncate">
              {outputLimbu ? `U+1900 Block (${outputLimbu.length} graphemes)` : 'Limbu Unicode'}
            </div>
          </div>

        </div>

        {/* Detailed Character / Syllable Mapping Inspector */}
        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-mono text-slate-300">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">Grapheme Sequence Mapping Matrix</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              Devanagari → Sirijanga (Limbu U+1900–U+194F)
            </span>
          </div>

          {mappingBreakdown.length === 0 ? (
            <div className="text-xs text-slate-500 italic py-2">
              Type in the input box above to see the granular grapheme transformation in real time.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-1">
              {mappingBreakdown.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg flex items-center justify-between text-xs font-mono">
                  <div className="space-y-0.5">
                    <div className="text-amber-300 font-bold text-sm">{item.from}</div>
                    <div className="text-[10px] text-slate-400">{item.fromType}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <div className="text-right space-y-0.5">
                    <div className="text-teal-300 font-sirijanga text-lg font-normal">{item.to}</div>
                    <div className="text-[10px] text-slate-400">{item.toCodePoint}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 3. Interactive Mini-Challenge: Test Your Intuition */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-mono font-bold tracking-wider text-teal-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Discovery · Sirijanga Vowel Orthography</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              How does Sirijanga represent short vs. long vowels?
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200">
            Yakthung Phonology Note
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              In Devanagari, short vowel <em>i</em> (कि) and long vowel <em>ee</em> (की) use distinct vowel signs (<span className="font-mono">ि</span> vs <span className="font-mono">ी</span>).
              In Sirijanga orthography, vowel signs are attached to consonants, and the <strong>Kemphreng (᤺, U+193A)</strong> sign is used selectively for vowel lengthening.
            </p>
            
            {/* Quick interactive quiz */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-semibold text-slate-900">
                Quick Test: What does <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-teal-800">yakthung-utils@0.0.2</code> produce for <strong>की</strong> (long ee)?
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {[
                  { id: 0, text: 'ᤁᤡ (Ki - short)', isCorrect: false },
                  { id: 1, text: 'ᤁᤡ᤺ (Kee - lengthened with Kemphreng)', isCorrect: true },
                  { id: 2, text: 'ᤁᤠ (Ka - long vowel Aa)', isCorrect: false }
                ].map((opt) => {
                  const isSelected = quizSelection === opt.id;
                  let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                  if (quizAnswered) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-50 border-rose-300 text-rose-800';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-teal-50 border-teal-500 text-teal-900';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setQuizSelection(opt.id);
                        setQuizAnswered(true);
                      }}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${btnStyle}`}
                    >
                      <div className="font-sirijanga text-base">{opt.text}</div>
                    </button>
                  );
                })}
              </div>

              {quizAnswered && (
                <div className="text-xs text-slate-600 bg-teal-50/80 p-2.5 rounded-lg border border-teal-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Accurate!</strong> In v0.0.2, <span className="font-mono">की</span> maps to <span className="font-sirijanga font-bold">ᤁᤡ᤺</span> using Kemphreng (<span className="font-mono">U+193A</span>) for selective lengthening, while <span className="font-mono">कि</span> remains <span className="font-sirijanga font-bold">ᤁᤡ</span>.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-teal-700" />
              <span>Version 0.0.2 Advancement</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Unlike 0.0.1, version 0.0.2 added full independent vowel support (<span className="font-mono">आ through अः</span> via carrier <span className="font-sirijanga">ᤀ</span>), conjuncts <span className="font-mono">ज्ञ, त्र</span>, and native reverse numeral conversion.
            </p>
            <button
              onClick={() => onNavigate('/yakthung-utils/research')}
              className="text-teal-700 hover:text-teal-800 font-semibold underline inline-flex items-center gap-1 pt-1 cursor-pointer"
            >
              <span>Read complete research analysis</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Practical Code Example & Integration ("Use It in Your Project") */}
      <div id="hero-quick-start" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-8 text-white space-y-6 scroll-mt-20">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-teal-400 uppercase">
              <Terminal className="w-3.5 h-3.5" />
              <span>Developer Quick Start & Integration</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Integrate yakthung-utils in 60 seconds
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Lightweight, zero-dependency utility that works out of the box in Node.js, Next.js, Vite, React, Vue, Bun, and browser script tags.
            </p>
          </div>

          <a
            href="https://github.com/Ningsang-Jabegu/yakthung-utils"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* 1-Click Install Command */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm">
            <span className="text-teal-500 font-bold">$</span>
            <span className="text-slate-200">npm install yakthung-utils</span>
          </div>

          <button
            onClick={() => copyToClipboard('npm install yakthung-utils', 'install-cmd')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer border border-slate-700"
          >
            {copiedStage === 'install-cmd' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Command</span>
              </>
            )}
          </button>
        </div>

        {/* Code Snippet Tabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              {[
                { id: 'esm' as const, label: 'ES Modules (ESM)' },
                { id: 'ts' as const, label: 'TypeScript' },
                { id: 'cjs' as const, label: 'CommonJS (CJS)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSnippetTab(tab.id)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                    selectedSnippetTab === tab.id
                      ? 'bg-teal-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => copyToClipboard(SNIPPETS[selectedSnippetTab], 'code-tab')}
              className="text-xs text-slate-400 hover:text-teal-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copiedStage === 'code-tab' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Snippet Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
            <code>{SNIPPETS[selectedSnippetTab]}</code>
          </pre>
        </div>

        {/* Live Runtime Verification Footer */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Verified on Node 18+, Bun, Deno & Evergreen Browsers</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>License: MIT</span>
            <span>·</span>
            <span>Author: Ningsang Jabegu</span>
          </div>
        </div>

      </div>

    </div>
  );
};

// Helper code snippets
const SNIPPETS: Record<'esm' | 'ts' | 'cjs', string> = {
  esm: `// ES Module import (React, Vite, Next.js, Node 18+)
import { 
  devanagariToLimbu, 
  limbuToDevanagari, 
  convertToLimbuDigits 
} from 'yakthung-utils';

// 1. Convert Devanagari text to Sirijanga
const limbu = devanagariToLimbu("नेपाल २०२६");
console.log(limbu); // "ᤏᤣᤐᤠᤗ ᥈᥆᥈᥌"

// 2. Reverse conversion back to Devanagari
const devanagari = limbuToDevanagari(limbu);
console.log(devanagari); // "नेपाल २०२६"`,

  ts: `// TypeScript typed implementation
import { 
  devanagariToLimbu, 
  limbuToDevanagari, 
  isLimbuScript 
} from 'yakthung-utils';

function formatYakthungGreeting(nameInDevanagari: string): string {
  const sirijangaName: string = devanagariToLimbu(nameInDevanagari);
  const isValid: boolean = isLimbuScript(sirijangaName);
  
  return isValid ? \`ᤛᤣᤘᤠᤖᤥ, \${sirijangaName}!\` : sirijangaName;
}

console.log(formatYakthungGreeting("निसाम")); // "ᤛᤣᤘᤠᤖᤥ, ᤏᤡᤛᤠᤔ!"`,

  cjs: `// CommonJS (Legacy Node.js applications)
const { 
  devanagariToLimbu, 
  limbuToDevanagari 
} = require('yakthung-utils');

const output = devanagariToLimbu("याकथुङ ५");
console.log(output); // "ᤕᤠᤰᤌᤢᤅ ᥋"`
};

// Simple Unicode char names lookup
function getDevanagariCharName(char: string): string {
  const code = char.codePointAt(0);
  if (!code) return 'Character';
  if (code >= 0x0966 && code <= 0x096F) return 'Devanagari Digit';
  if (code >= 0x0905 && code <= 0x0914) return 'Independent Vowel';
  if (code >= 0x093E && code <= 0x094C) return 'Dependent Vowel Sign';
  if (code === 0x094D) return 'Virama (Halant)';
  if (code >= 0x0915 && code <= 0x0939) return 'Devanagari Consonant';
  if (code >= 0x0030 && code <= 0x0039) return 'ASCII Digit';
  return 'Unicode Symbol';
}

// Decomposition analysis for interactive matrix
function generateMappingBreakdown(input: string) {
  if (!input) return [];

  const items: Array<{ from: string; fromType: string; to: string; toCodePoint: string }> = [];
  
  // Use v0.0.2 conversion on individual syllables / components
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    // Check if next char is a vowel sign or halant
    let cluster = char;
    if (i + 1 < input.length) {
      const nextCode = input.charCodeAt(i + 1);
      if ((nextCode >= 0x093E && nextCode <= 0x094F) || nextCode === 0x0902) {
        cluster = char + input[i + 1];
        i++; // skip next char
      }
    }

    const converted = v0_0_2_adapter.devanagariToLimbu(cluster);
    const toCodePoint = Array.from(converted)
      .map((c) => 'U+' + c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0'))
      .join(' ');

    items.push({
      from: cluster,
      fromType: getDevanagariCharName(cluster[0]),
      to: converted,
      toCodePoint: toCodePoint || '—'
    });
  }

  return items;
}
