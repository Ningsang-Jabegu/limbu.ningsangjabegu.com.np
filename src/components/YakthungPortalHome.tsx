import React from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Code2, 
  ExternalLink, 
  Layers, 
  Terminal, 
  Sparkles, 
  Globe, 
  GitBranch, 
  User, 
  ShieldCheck, 
  FileCode2 
} from 'lucide-react';
import { LATEST_VERSION_ID, VERSIONS_REGISTRY } from '../versions/registry';

interface YakthungPortalHomeProps {
  onNavigate: (path: string) => void;
}

export const YakthungPortalHome: React.FC<YakthungPortalHomeProps> = ({ onNavigate }) => {
  const latestVer = VERSIONS_REGISTRY[LATEST_VERSION_ID];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero Section */}
      <section className="space-y-6 pt-4 pb-2 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs font-medium text-teal-800">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
          <span>Yakthung (Limbu) Language & Computing Portal · limbu.ningsangjabegu.com.np</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Yakthung Language Technologies <br className="hidden sm:inline" />
            <span className="text-teal-700 font-sirijanga font-normal text-3xl sm:text-4xl">
              ᤕᤠᤰᤌᤢᤅ ᤐᤠ᤺ᤴ ᤋᤣ᤺ᤰᤏᤥᤗᤥᤈᤡ
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Centralized research hub and digital workspace curated by <strong>Ningsang Jabegu</strong> (ᤏᤡᤅᤚᤠ᤺ᤅ ᤈᤘᤣ᤺ᤃᤢ).
            Dedicated to open-source computational tools, Sirijanga Unicode standard implementations,
            phonological documentation, and community language infrastructure.
          </p>
        </div>

        {/* Quick Hub Navigation Cards */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium">
          <button
            onClick={() => onNavigate('/yakthung-utils/latest')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Launch Yakthung Utils ({LATEST_VERSION_ID})</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </button>

          <button
            onClick={() => onNavigate('/yakthung-utils/research')}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Research & Transliteration Notes</span>
          </button>

          <a
            href="https://ningsangjabegu.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
          >
            <span>Author Portfolio (ningsangjabegu.com.np)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </section>

      {/* Featured Flagship Project: Yakthung Utils */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase font-mono font-semibold tracking-wider text-teal-700">
              Flagship Research Project
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Yakthung Utils (ᤕᤠᤰᤌᤱ-ᤕᤢᤋᤡ᤺ᤸᤛ)
            </h2>
          </div>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200">
            Frozen Release v0.0.1
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Yakthung Utils</strong> is an open-source TypeScript/JavaScript computational library
                that provides robust, context-aware bidirectional conversion between the Devanagari script
                and the native Sirijanga script (Limbu Unicode block <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">U+1900–U+194F</code>).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <div className="font-semibold text-slate-900 mb-1">Context-Aware Parsing</div>
                  Prevents Devanagari virama leakage, correctly mapping medial subjoints (्य, ्र, ्व) and syllable-final small letters (ᤰ–ᤸ).
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <div className="font-semibold text-slate-900 mb-1">Vowel Length & Kemphreng</div>
                  Distinguishes short and long I/U vowels through Limbu vowel signs and Kemphreng (᤺) length modifiers.
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <div className="font-semibold text-slate-900 mb-1">913 Automated Tests</div>
                  13 test suites with 100% pass rate covering Unicode boundary, numeral localization, and golden regression fixtures.
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <div className="font-semibold text-slate-900 mb-1">Immutable Versioning</div>
                  Permanently preserved research artifacts at versioned endpoints (<span className="font-mono">/v0.0.1</span>).
                </div>
              </div>
            </div>

            {/* Quick Live Interactive Snippet */}
            <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">yakthung-utils@0.0.1</span>
                  <span className="text-emerald-400 font-mono">MIT</span>
                </div>
                <div className="font-mono text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-slate-500">// npm installation</div>
                  <div className="text-teal-400">npm install yakthung-utils</div>
                  <div className="text-slate-500 pt-1">// Node.js / Browser</div>
                  <div className="text-amber-300">import &#123; devanagariToLimbu &#125;</div>
                  <div className="text-slate-300 pl-2">from "yakthung-utils";</div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <button
                  onClick={() => onNavigate('/yakthung-utils/latest')}
                  className="w-full py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open Online Converter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
                  <a
                    href="https://github.com/Ningsang-Jabegu/yakthung-utils"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span>·</span>
                  <a
                    href="https://www.npmjs.com/package/yakthung-utils"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center gap-1"
                  >
                    <span>npm package</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Community Resources & Initiatives */}
      <section className="space-y-6">
        <div>
          <div className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Yakthung Language Infrastructure
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Projects, Resources & Community Contributions
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Ongoing initiatives to advance digital tools, typographic support, and accessible educational kits for the Yakthung community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <FileCode2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 text-base">
              Sirijanga Unicode Standards
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Technical documentation and OpenType feature guidelines for the Limbu Unicode block (U+1900–U+194F),
              explaining combining mark orders, subjoints, and rendering engine behavior in WebKit, Blink, and Gecko.
            </p>
            <div className="pt-1 text-xs font-mono text-teal-700">
              Unicode 4.0+ compliant
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 text-base">
              Typographic Fonts & Input Layouts
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curation and testing of modern high-legibility Sirijanga web fonts including Namdhinggo SIL and Noto Sans Limbu,
              paired with phonetic keyboard layout mappings for cross-platform typing on macOS, Windows, Linux, and Android.
            </p>
            <div className="pt-1 text-xs font-mono text-teal-700">
              Cross-platform font stack
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 text-base">
              Orthographic & Corpus Reference
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Harmonizing computational conversion matrices with standard reference materials published by Kirat Yakthung Chumlung (KYC)
              and contemporary Yakthung lexicographers, facilitating digital accessibility for diaspora learners.
            </p>
            <div className="pt-1 text-xs font-mono text-teal-700">
              Community aligned
            </div>
          </div>

        </div>
      </section>

      {/* About Ningsang Jabegu */}
      <section className="bg-slate-100/80 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
              About the Contributor
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Ningsang Jabegu (ᤏᤡᤅᤚᤠ᤺ᤅ ᤈᤘᤣ᤺ᤃᤢ)
            </h2>
          </div>
          <a
            href="https://ningsangjabegu.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>Personal Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
          Ningsang Jabegu is a software engineer and indigenous technology advocate focused on creating
          reproducible computational infrastructure for the Yakthung (Limbu) language.
          This portal at <code className="font-mono text-xs bg-white px-1.5 py-0.5 rounded border border-slate-200">limbu.ningsangjabegu.com.np</code> serves
          as the central point of contact for open-source Yakthung software packages, research papers,
          and community documentation updates.
        </p>

        <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-600">
          <a
            href="https://github.com/Ningsang-Jabegu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-700 underline flex items-center gap-1"
          >
            <span>GitHub Profile</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <span>·</span>
          <a
            href="https://www.npmjs.com/~ningsangjabegu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-700 underline flex items-center gap-1"
          >
            <span>npm Publisher</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <span>·</span>
          <span>Open Source under MIT</span>
        </div>
      </section>

    </div>
  );
};
