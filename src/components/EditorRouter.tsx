import { Routes, Route } from 'react-router-dom';
import { ArcoDesignLib } from '@sunmao-ui/arco-lib';
import { libs } from '../sunmao/lib';
import { registerEditor } from './SunmaoEditor';
import '../init';

function EditorRouter() {
  const options = {
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
