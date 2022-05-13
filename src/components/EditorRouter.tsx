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

  return (
    <Routes>
      <Route path="/" element={<SitePageEditor />} />
    </Routes>
  );
}

export default EditorRouter;
