import React, { useState } from 'react';
import { ExternalLink, ChevronDown, Check, Menu, X, ArrowLeftRight } from 'lucide-react';
import { getAllVersions } from '../versions/registry';
import { AppView } from '../router/useAppRouter';

interface HeaderProps {
  currentView: AppView;
  currentVersionId: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  currentVersionId,
  onNavigate,
}) => {
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const versions = getAllVersions();

  const handleVersionSelect = (versionId: string) => {
    setVersionDropdownOpen(false);
    onNavigate(`/yakthung-utils/${versionId}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
              title="Return to Yakthung Language Technologies Portal"
            >
              <span className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                Yakthung Utils
              </span>
              <span className="hidden sm:inline text-xs font-mono text-slate-400 ml-2">
                ᤕᤠᤰᤌᤢᤅ
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Single-line, clean text with subtle active states) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => onNavigate('/')}
              className={`transition-colors cursor-pointer ${
                currentView === 'portal'
                  ? 'text-teal-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Language Hub
            </button>

            <button
              onClick={() => onNavigate(`/yakthung-utils/${currentVersionId}`)}
              className={`transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'converter'
                  ? 'text-teal-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Converter</span>
            </button>

            <button
              onClick={() => onNavigate('/yakthung-utils/research')}
              className={`transition-colors cursor-pointer ${
                currentView === 'research'
                  ? 'text-teal-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Research Paper
            </button>

            <button
              onClick={() => onNavigate('/yakthung-utils/versions')}
              className={`transition-colors cursor-pointer ${
                currentView === 'versions'
                  ? 'text-teal-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Version Matrix
            </button>
          </nav>

          {/* Zone 3: Version Selector & External Links */}
          <div className="flex items-center gap-3">
            {/* Version Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setVersionDropdownOpen(!versionDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-md border border-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
                aria-expanded={versionDropdownOpen}
                aria-haspopup="listbox"
                aria-label="Select package version"
              >
                <span>Version:</span>
                <span className="font-semibold text-slate-900">{currentVersionId}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {versionDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setVersionDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20 text-xs">
                    <div className="px-3 py-1.5 border-b border-slate-100 text-slate-400 font-sans uppercase tracking-wider text-[10px]">
                      Package Releases
                    </div>
                    {versions.map((ver) => (
                      <button
                        key={ver.id}
                        type="button"
                        onClick={() => handleVersionSelect(ver.id)}
                        className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-mono font-medium text-slate-900 flex items-center gap-1.5">
                            {ver.id}
                            {ver.isLatest && (
                              <span className="text-[10px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                Latest
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Commit {ver.gitCommit} · {ver.passedTestCases} tests
                          </span>
                        </div>
                        {currentVersionId === ver.id && (
                          <Check className="w-3.5 h-3.5 text-teal-600" />
                        )}
                      </button>
                    ))}
                    <div className="border-t border-slate-100 mt-1 pt-1 px-3 py-1">
                      <button
                        type="button"
                        onClick={() => {
                          setVersionDropdownOpen(false);
                          onNavigate('/yakthung-utils/latest');
                        }}
                        className="text-left w-full text-slate-600 hover:text-teal-700 font-medium text-[11px] py-1"
                      >
                        → Open /latest alias
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* GitHub Repo */}
            <a
              href="https://github.com/Ningsang-Jabegu/yakthung-utils"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
              title="View on GitHub"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* NPM */}
            <a
              href="https://www.npmjs.com/package/yakthung-utils"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-red-700 bg-red-50 hover:bg-red-100/80 border border-red-200 rounded-md transition-colors"
              title="npm package registry"
            >
              <span>npm</span>
              <span className="text-slate-500">v0.0.1</span>
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 space-y-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/');
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Language Technologies Portal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(`/yakthung-utils/${currentVersionId}`);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Converter ({currentVersionId})
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/yakthung-utils/research');
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Research & Linguistic Explanation
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/yakthung-utils/versions');
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Version History & Comparison
            </button>
            <div className="pt-2 border-t border-slate-100 flex gap-2 px-3">
              <a
                href="https://github.com/Ningsang-Jabegu/yakthung-utils"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-600 underline"
              >
                GitHub Repository
              </a>
              <span className="text-slate-300">·</span>
              <a
                href="https://www.npmjs.com/package/yakthung-utils"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-600 underline"
              >
                npm Package
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
