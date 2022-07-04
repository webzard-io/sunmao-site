import { Routes, Route } from 'react-router-dom';
import { ArcoDesignLib } from '@sunmao-ui/arco-lib';
import { libs, dependencies } from '../sunmao/lib';
import { registerEditor } from './SunmaoEditor';
import '../init';

function EditorRouter() {
  const options = {
    dependencies,
    libs: [libs, ArcoDesignLib],
  };
  const SitePageEditor = registerEditor({ name: 'site' }, options);
  const CalendarPageEditor = registerEditor({ name: 'calendar' }, options);
  const TablePageEditor = registerEditor({ name: 'table' }, options);
  const OnlyCalendarPageEditor = registerEditor({ name: 'only-calendar' }, options);

  return (
    <Routes>
      <Route path="/" element={<SitePageEditor />} />
      <Route path="/calendar" element={<CalendarPageEditor />} />
      <Route path="/table" element={<TablePageEditor />} />
      <Route path="/only-calendar" element={<OnlyCalendarPageEditor />} />
    </Routes>
  );
}

export default EditorRouter;
