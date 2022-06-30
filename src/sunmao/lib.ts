import { SunmaoLib } from '@sunmao-ui/runtime';
import { SunmaoCalendar } from '../components/Calendar';
import { SunmaoScroll } from '../components/Scroll';

const siteLib: SunmaoLib = {
  components: [SunmaoCalendar, SunmaoScroll],
  traits: [],
  utilMethods: [],
  modules: [],
};

export const libs: SunmaoLib = siteLib;
