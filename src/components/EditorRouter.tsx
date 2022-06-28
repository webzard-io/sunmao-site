import { Routes, Route } from 'react-router-dom';
import { ArcoDesignLib } from '@sunmao-ui/arco-lib';
import { libs } from '../sunmao/lib';
import { registerEditor } from './SunmaoEditor';
import '../init';
import i18n from 'i18next';

function EditorRouter() {
  const options = {
    dependencies: { i18n },
    libs: [libs, ArcoDesignLib],
  };
  const SitePageEditor = registerEditor({ name: 'site' }, options);
  const CalendarPageEditor = registerEditor({ name: 'calendar' }, options);
  const TablePageEditor = registerEditor({ name: 'table' }, options);

  return (
    <Routes>
      <Route path="/" element={<SitePageEditor />} />
      <Route path="/calendar" element={<CalendarPageEditor />} />
      <Route path="/table" element={<TablePageEditor />} />
    </Routes>
  );
}

export default EditorRouter;
