import { useState, useEffect, useCallback } from 'react';
import { LATEST_VERSION_ID, VERSIONS_REGISTRY } from '../versions/registry';

export type AppView = 'portal' | 'converter' | 'research' | 'versions';

export interface RouteState {
  view: AppView;
  versionId: string;
  isLatestAlias: boolean;
  rawPath: string;
}

export function parsePath(pathname: string): RouteState {
  // Normalize path removing trailing slashes (except root)
  const clean = pathname.replace(/\/+$/, '') || '/';

  // 1. Root / Portal home for limbu.ningsangjabegu.com.np
  if (clean === '' || clean === '/' || clean === '/portal') {
    return {
      view: 'portal',
      versionId: LATEST_VERSION_ID,
      isLatestAlias: false,
      rawPath: clean,
    };
  }

  // 2. /yakthung-utils/research
  if (clean === '/yakthung-utils/research' || clean === '/research') {
    return {
      view: 'research',
      versionId: LATEST_VERSION_ID,
      isLatestAlias: false,
      rawPath: clean,
    };
  }

  // 3. /yakthung-utils/versions
  if (clean === '/yakthung-utils/versions' || clean === '/versions') {
    return {
      view: 'versions',
      versionId: LATEST_VERSION_ID,
      isLatestAlias: false,
      rawPath: clean,
    };
  }

  // 4. /yakthung-utils/latest
  if (clean === '/yakthung-utils/latest') {
    return {
      view: 'converter',
      versionId: LATEST_VERSION_ID,
      isLatestAlias: true,
      rawPath: clean,
    };
  }

  // 5. Version-specific route: /yakthung-utils/vX.Y.Z
  const versionMatch = clean.match(/^\/yakthung-utils\/(v[0-9]+\.[0-9]+\.[0-9]+)/i);
  if (versionMatch) {
    const requestedVersion = versionMatch[1].toLowerCase();
    const resolvedVersion = VERSIONS_REGISTRY[requestedVersion] ? requestedVersion : LATEST_VERSION_ID;
    return {
      view: 'converter',
      versionId: resolvedVersion,
      isLatestAlias: false,
      rawPath: clean,
    };
  }

  // 6. Base /yakthung-utils or /yakthung-utils/
  if (clean === '/yakthung-utils') {
    return {
      view: 'converter',
      versionId: LATEST_VERSION_ID,
      isLatestAlias: false,
      rawPath: clean,
    };
  }

  // Fallback to converter with latest version
  return {
    view: 'converter',
    versionId: LATEST_VERSION_ID,
    isLatestAlias: false,
    rawPath: clean,
  };
}

export function useAppRouter() {
  const [route, setRoute] = useState<RouteState>(() => parsePath(window.location.pathname));

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(parsePath(window.location.pathname));
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setRoute(parsePath(path));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return { route, navigate };
}
