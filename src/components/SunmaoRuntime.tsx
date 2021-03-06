import React, { useEffect, useState } from 'react';
import { initSunmaoUI, SunmaoUIRuntimeProps } from '@sunmao-ui/runtime';
import { FsManager, FsManagerOptions } from '../FsManager';
import { Application, createModule, RuntimeModule } from '@sunmao-ui/core';
import '../init';
import { dependencies } from '../sunmao/lib';
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
// FIXME: this is used to solve a bug of the react JSON schema form
// rjsf's bundle has some wrong usage of the global variable React
window.React = React;

function registerSunmaoRuntime(
  managerOptions: FsManagerOptions,
  options: SunmaoUIRuntimeProps
) {
  
  if (process.env.NODE_ENV === 'production') {
    const schemaMap: Record<string, any> = {
      site: SiteSchema,
      calendar: CalendarSchema,
      table: TableSchema,
      'only-calendar': OnlyCalendarSchema,
    };
    return function () {
      const schema = schemaMap[managerOptions.name];
      const { App: SunmaoApp } = initSunmaoUI({
        ...options,
        dependencies: dependencies,
        libs: options?.libs?.concat([{ modules: schema.modules }]),
      });
      
      return <SunmaoApp options={schema.application} />;
    };
  }

  const fsManager = new FsManager(managerOptions);
  return function () {
    const [app, setApp] = useState(JSON.parse(JSON.stringify(DEFAULT_APP)));
    const [modules, setModules] = useState<RuntimeModule[]>([]);

    const { App: SunmaoApp } = initSunmaoUI({
      ...options,
      dependencies: dependencies,
      libs: options?.libs?.concat([{ modules }]),
    });

    useEffect(() => {
      fsManager.getApp().then(setApp);
      fsManager.getModules().then(modules => {
        setModules(modules.map(createModule));
      });
    }, []);
    return <SunmaoApp options={app} />;
  };
}

export default registerSunmaoRuntime;
