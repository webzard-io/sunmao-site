import { SunmaoLib } from '@sunmao-ui/runtime';
import { SunmaoCalendar } from '../components/Calendar';
import { SunmaoCodeBlock } from '../components/CodeBlock';

const siteLib: SunmaoLib = {
  components: [SunmaoCalendar, SunmaoCodeBlock],
  traits: [],
  utilMethods: [],
  modules: [],
};

export const libs: SunmaoLib = siteLib;
