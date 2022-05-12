import { Routes, Route, useNavigate } from 'react-router-dom';
import { ArcoDesignLib } from '@sunmao-ui/arco-lib';
import { Suspense, lazy, useMemo } from 'react';
import { libs } from '../sunmao/lib';
import registerSunmaoRuntime from './SunmaoRuntime';
import { getNavigateMethod, openHref } from '../sunmao/methods';
import type { Schema } from '../types';
import '../init';

function RuntimeApp() {
  const navigate = useNavigate();
  const options = useMemo(
    () => ({
      libs: [libs, ArcoDesignLib],
      utilMethods: [getNavigateMethod(navigate), openHref],
    }),
    [navigate]
  );
  const SitePage = useMemo(
    () =>
      lazy(() =>
        import('../sunmao/site.json').then(site => ({
          default: registerSunmaoRuntime(site as Schema, options),
        }))
      ),
    [options]
  );

  return (
    <Suspense fallback={<span>loading</span>}>
      <Routes>
        <Route path="/" element={<SitePage />} />
      </Routes>
    </Suspense>
  );
}

export default RuntimeApp;
