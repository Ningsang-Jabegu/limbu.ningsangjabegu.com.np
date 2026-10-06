import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileQuestion, 
  BookOpen, 
  Layers, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { LATEST_VERSION_ID } from '../versions/registry';

interface NotFoundPageProps {
  requestedPath: string;
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  requestedPath,
  onNavigate,
}) => {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      onNavigate('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Status kicker and typography */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="text-teal-700 font-semibold">HTTP 404</span>
          <span aria-hidden="true">·</span>
          <span>Resource Not Located</span>
          <span aria-hidden="true">·</span>
          <span className="font-sirijanga text-slate-700">ᤐᤠ᤺ᤴ ᤔᤠ᤺ᤴ ᤋᤣ᤺ᤰ</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          This Page Could Not Be Found
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          The requested URL path was not located within the Yakthung Utils directory
          or the Yakthung Language Technologies registry.
        </p>

        {/* Monospace diagnostic panel */}
        <div className="p-3.5 bg-slate-100/90 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 space-y-1 max-w-xl">
          <div className="text-slate-400 text-[10px] uppercase tracking-wider font-sans">
            Diagnostic Request Information
          </div>
          <div className="flex items-baseline gap-2 break-all">
            <span className="text-teal-700">path:</span>
            <span className="text-slate-900 font-semibold">{requestedPath}</span>
          </div>
          <div className="text-[11px] text-slate-500 font-sans">
            Active frozen release: <strong className="font-mono text-slate-700">{LATEST_VERSION_ID}</strong>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-medium pt-2">
        <button
          type="button"
          onClick={handleGoBack}
          className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
          <span>Go Back</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate(`/yakthung-utils/${LATEST_VERSION_ID}`)}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
        >
          <span>Open Yakthung Utils ({LATEST_VERSION_ID})</span>
          <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          Language Technologies Portal
        </button>
      </div>

      {/* Quick Directory Cards */}
      <div className="space-y-3 pt-6 border-t border-slate-200">
        <h2 className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
          Available Project Coordinates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <button
            type="button"
            onClick={() => onNavigate('/yakthung-utils/latest')}
            className="p-4 bg-white border border-slate-200 rounded-xl hover:border-teal-600 hover:bg-teal-50/20 transition-colors text-left space-y-1.5 cursor-pointer shadow-2xs"
          >
            <div className="font-semibold text-slate-900 flex items-center justify-between">
              <span>Latest Converter</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Direct access to the latest Devanagari ↔ Sirijanga conversion interface.
            </p>
            <div className="font-mono text-[10px] text-teal-700">/yakthung-utils/latest</div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/yakthung-utils/research')}
            className="p-4 bg-white border border-slate-200 rounded-xl hover:border-teal-600 hover:bg-teal-50/20 transition-colors text-left space-y-1.5 cursor-pointer shadow-2xs"
          >
            <div className="font-semibold text-slate-900 flex items-center justify-between">
              <span>Research Paper</span>
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Computational character mappings, Unicode ranges, and linguistic methodology.
            </p>
            <div className="font-mono text-[10px] text-teal-700">/yakthung-utils/research</div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/yakthung-utils/versions')}
            className="p-4 bg-white border border-slate-200 rounded-xl hover:border-teal-600 hover:bg-teal-50/20 transition-colors text-left space-y-1.5 cursor-pointer shadow-2xs"
          >
            <div className="font-semibold text-slate-900 flex items-center justify-between">
              <span>Version Matrix</span>
              <Layers className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Inspect frozen release changelogs, test suites, and git tags.
            </p>
            <div className="font-mono text-[10px] text-teal-700">/yakthung-utils/versions</div>
          </button>

        </div>
      </div>

      {/* Helpful research context notice */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          If you followed an external link referencing an upcoming version (such as <span className="font-mono">v0.0.2</span>),
          it has not yet been registered in the production manifest. The currently certified release is <span className="font-mono font-semibold text-slate-900">{LATEST_VERSION_ID}</span>.
        </p>
      </div>

    </div>
  );
};
