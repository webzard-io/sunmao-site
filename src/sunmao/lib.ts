import { SunmaoLib } from '@sunmao-ui/runtime';
import { SunmaoCalendar } from './components/Calendar';
import { SunmaoParallelScroll } from './components/ParallelScroll';
import { SunmaoLink } from './components/Link';

const siteLib: SunmaoLib = {
  components: [SunmaoCalendar, SunmaoParallelScroll, SunmaoLink],
  traits: [],
  utilMethods: [],
  modules: [],
};

export const libs: SunmaoLib = siteLib;
