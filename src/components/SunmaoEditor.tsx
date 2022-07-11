import { initSunmaoUIEditor } from '@sunmao-ui/editor';
import { useState, useEffect, useMemo } from 'react';
import { SunmaoUIRuntimeProps } from '@sunmao-ui/runtime';
import type { Application, Module } from '@sunmao-ui/core';
import '@sunmao-ui/editor/dist/index.css';
import { FsManager, FsManagerOptions } from '../FsManager';

import SiteSchema from '../sunmao/site.json';
import CalendarSchema from '../sunmao/calendar.json';
import TableSchema from '../sunmao/table.json';
import OnlyCalendarSchema from '../sunmao/only-calendar.json';

const DEFAULT_APP: Application = {
  version: 'sunmao/v1',
  kind: 'Application',
  metadata: {
    name: 'some App',
  },
  spec: {
    components: [],
  },
};

export function registerEditor(
  managerOptions: FsManagerOptions,
  runtimeProps: SunmaoUIRuntimeProps
) {
  if (process.env.NODE_ENV === 'production') {
    return function App() {
      const schemaMap: Record<string, any> = {
        site: SiteSchema,
        calendar: CalendarSchema,
        table: TableSchema,
        'only-calendar': OnlyCalendarSchema,
      };
      const schema = schemaMap[managerOptions.name];

      const { Editor } = initSunmaoUIEditor({
        runtimeProps,
        defaultApplication: schema.application,
        defaultModules: schema.modules,
      });

      return <Editor />;
    };
  }

  const fsManager = new FsManager(managerOptions);
  return function App() {
    const [app, setApp] = useState(JSON.parse(JSON.stringify(DEFAULT_APP)));
    const [modules, setModules] = useState<Module[]>([]);

    const { Editor: SunmaoEditor } = useMemo(() => {
      const { Editor } = initSunmaoUIEditor({
        runtimeProps,
        defaultApplication: app,
        defaultModules: modules,
        storageHandler: {
          onSaveApp: fsManager.saveApp,
          onSaveModules: fsManager.saveModules,
        },
      });

      return { Editor };
    }, [app, modules]);

    useEffect(() => {
      fsManager.getApp().then(setApp);
      fsManager.getModules().then(setModules);
    }, []);

    return <SunmaoEditor />;
  };
}
