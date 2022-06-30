import { ArcoDesignLib } from '@sunmao-ui/arco-lib';
import React from 'react';
import '@sunmao-ui/arco-lib/dist/index.css';
import registerSunmaoRuntime from './SunmaoRuntime';
import { Route, Routes } from 'react-router-dom';
import { libs } from '../sunmao/lib';

function App() {
  const options = { libs: [ArcoDesignLib, libs] };
  const SitePageEditor = registerSunmaoRuntime({ name: 'site' }, options);
  const CalendarPageEditor = registerSunmaoRuntime({ name: 'calendar' }, options);
  const TablePageEditor = registerSunmaoRuntime({ name: 'table' }, options);
  return (
    <Routes>
      <Route path="/" element={<SitePageEditor />} />
      <Route path="/calendar" element={<CalendarPageEditor />} />
      <Route path="/table" element={<TablePageEditor />} />
    </Routes>
  );
}

export default App;
