/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useAppRouter } from './router/useAppRouter';
import { getVersion, LATEST_VERSION_ID } from './versions/registry';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ConverterUI } from './components/ConverterUI';
import { ResearchSection } from './components/ResearchSection';
import { VersionHistory } from './components/VersionHistory';
import { YakthungPortalHome } from './components/YakthungPortalHome';
import { NotFoundPage } from './components/NotFoundPage';

export default function App() {
  const { route, navigate } = useAppRouter();
  const currentVersion = getVersion(route.versionId) || getVersion(LATEST_VERSION_ID)!;

  // Sync document title and canonical metadata with active route
  useEffect(() => {
    let title = 'Yakthung Utils — Devanagari ↔ Sirijanga Computational Conversion';
    let description = 'Computational Devanagari ↔ Sirijanga (Limbu) transliteration interface and research artifact.';

    if (route.view === 'portal') {
      title = 'Yakthung (Limbu) Language & Computing Portal — Ningsang Jabegu';
      description = 'Centralized research hub and digital workspace for Yakthung (Limbu) language computing, Sirijanga Unicode tools, and community resources.';
    } else if (route.view === 'converter') {
      title = `Yakthung Utils ${currentVersion.id} — Devanagari ↔ Sirijanga Computational Conversion`;
      description = `Execute frozen yakthung-utils@${currentVersion.versionNumber} (commit ${currentVersion.gitCommit}) for Devanagari ↔ Sirijanga script transliteration.`;
    } else if (route.view === 'research') {
      title = `Research & Computational Foundations — Yakthung Utils ${currentVersion.id}`;
      description = 'Exhaustive linguistic and computational analysis of Devanagari ↔ Sirijanga mapping, Unicode boundaries, and normalization.';
    } else if (route.view === 'versions') {
      title = 'Version Matrix & Release History — Yakthung Utils';
      description = 'Immutable release register for yakthung-utils with test coverage statistics and git artifact provenance.';
    } else if (route.view === 'not-found') {
      title = '404 · Page Not Found — Yakthung Utils';
      description = 'The requested resource or version was not located in the Yakthung Utils registry.';
    }

    document.title = title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [route, currentVersion]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Navigation */}
      <Header
        currentView={route.view}
        currentVersionId={currentVersion.id}
        onNavigate={navigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {route.view === 'portal' && (
          <YakthungPortalHome onNavigate={navigate} />
        )}

        {route.view === 'converter' && (
          <ConverterUI
            version={currentVersion}
            isLatestAlias={route.isLatestAlias}
            onNavigate={navigate}
          />
        )}

        {route.view === 'research' && (
          <ResearchSection
            version={currentVersion}
            onNavigate={navigate}
          />
        )}

        {route.view === 'versions' && (
          <VersionHistory
            currentVersionId={currentVersion.id}
            onNavigate={navigate}
          />
        )}

        {route.view === 'not-found' && (
          <NotFoundPage
            requestedPath={route.rawPath}
            onNavigate={navigate}
          />
        )}
      </main>

      {/* Global Academic & Reproducibility Footer */}
      <Footer
        version={currentVersion}
        onNavigate={navigate}
      />
    </div>
  );
}
