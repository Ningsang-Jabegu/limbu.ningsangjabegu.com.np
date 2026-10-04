import React from 'react';
import { ExternalLink, GitCommit, Tag, BookOpen, ShieldCheck } from 'lucide-react';
import { VersionMetadata } from '../versions/registry';

interface FooterProps {
  version: VersionMetadata;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ version, onNavigate }) => {
  return (
    <footer className="border-t border-slate-200 bg-white mt-16 py-12 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Academic Citation & Reproducibility Notice */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-700">
          <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Research & Reproducibility Notice</span>
          </div>
          <p>
            This website serves as an immutable research interface for the computational transliteration rules
            implemented in <span className="font-mono font-medium">yakthung-utils@{version.versionNumber}</span>.
            Passing computational unit tests does not by itself establish absolute linguistic correctness.
            Orthographic conventions for the Yakthung (Limbu) language continue to be refined by native speakers,
            linguists, and organizations such as Kirat Yakthung Chumlung.
          </p>
        </div>

        {/* 3-column footer links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          
          {/* Col 1: Project Identity */}
          <div className="space-y-2 md:col-span-1">
            <div className="font-semibold text-slate-900 text-sm">Yakthung Utils</div>
            <p className="text-slate-500">
              Devanagari ↔ Sirijanga computational conversion research artifact.
            </p>
            <div className="pt-2 text-slate-500">
              Maintained by{' '}
              <a
                href="https://ningsangjabegu.com.np"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 hover:underline font-medium"
              >
                Ningsang Jabegu
              </a>
            </div>
          </div>

          {/* Col 2: Research Artifact Coordinates */}
          <div className="space-y-2">
            <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Artifact Coordinates
            </div>
            <ul className="space-y-1.5 font-mono text-[11px] text-slate-600">
              <li className="flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-slate-400" />
                <span>Tag: {version.gitTag}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <GitCommit className="w-3 h-3 text-slate-400" />
                <span>Commit: {version.gitCommit}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-slate-400" />
                <span>Validation: {version.passedTestCases}/{version.totalTestCases} passed</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-2">
            <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Navigation
            </div>
            <ul className="space-y-1 text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-slate-900 cursor-pointer text-left"
                >
                  Yakthung Language Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate(`/yakthung-utils/${version.id}`)}
                  className="hover:text-slate-900 cursor-pointer text-left"
                >
                  Script Converter ({version.id})
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/yakthung-utils/research')}
                  className="hover:text-slate-900 cursor-pointer text-left"
                >
                  Research Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/yakthung-utils/versions')}
                  className="hover:text-slate-900 cursor-pointer text-left"
                >
                  Version Comparison Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: External Repositories */}
          <div className="space-y-2">
            <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              External Sources
            </div>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://github.com/Ningsang-Jabegu/yakthung-utils"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/yakthung-utils"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
                >
                  <span>npm Package</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Ningsang-Jabegu/yakthung-utils/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
                >
                  <span>MIT License</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            © {new Date().getFullYear()} Ningsang Jabegu. Dedicated to Yakthung language preservation and digital script accessibility.
          </div>
          <div className="font-mono text-[11px]">
            Sirijanga Unicode Range: U+1900–U+194F
          </div>
        </div>

      </div>
    </footer>
  );
};
