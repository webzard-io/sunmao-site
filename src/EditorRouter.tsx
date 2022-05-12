import { Routes, Route, useNavigate } from 'react-router-dom';
import { ArcoDesignLib } from '@sunmao-ui/arco-lib';
import { useEffect } from 'react';
import { libs } from './sunmao/lib';
import { registerEditor } from './SunmaoEditor';
import './init';
import '@sunmao-ui/editor/dist/index.css';

function EditorRouter() {
  const navigate = useNavigate();
  const options = {
    libs: [libs, ArcoDesignLib],
  };
  const SitePageEditor = registerEditor({ name: 'site' }, options);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/site');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/site" element={<SitePageEditor />} />
    </Routes>
  );
}

export default EditorRouter;
