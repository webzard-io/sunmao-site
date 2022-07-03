import { SunmaoLib, SunmaoUIRuntimeProps } from '@sunmao-ui/runtime';
import i18n from 'i18next';
import { SunmaoCalendar } from './components/Calendar';
import { SunmaoParallelScroll } from './components/ParallelScroll';
import { SunmaoLink } from './components/Link';
import { CodeSurf } from './components/CodeSurf';

import code01 from '../../codes/01.jsx?raw';
import code02 from '../../codes/02.jsx?raw';
import code03 from '../../codes/03.jsx?raw';
import code04 from '../../codes/04.jsx?raw';
import code05 from '../../codes/05.jsx?raw';

const siteLib: SunmaoLib = {
  components: [SunmaoCalendar, SunmaoParallelScroll, SunmaoLink, CodeSurf],
  traits: [],
  utilMethods: [],
  modules: [],
};

export const libs: SunmaoLib = siteLib;

export const dependencies: SunmaoUIRuntimeProps['dependencies'] = {
  i18n,
  codes: {
    code01,
    code02,
    code03,
    code04,
    code05,
  },
};
