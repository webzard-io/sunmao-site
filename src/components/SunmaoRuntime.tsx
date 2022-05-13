import React from 'react';
import { initSunmaoUI, SunmaoUIRuntimeProps, UtilMethod } from '@sunmao-ui/runtime';
import type { Schema } from '../types';
import i18n from 'i18next';

// FIXME: this is used to solve a bug of the react JSON schema form
// rjsf's bundle has some wrong usage of the global variable React
window.React = React;

function registerSunmaoRuntime(
  schema: Schema,
  options: SunmaoUIRuntimeProps & { utilMethods?: UtilMethod<any>[] } = {}
) {
  const { App: SunmaoApp } = initSunmaoUI({
    ...options,
    dependencies: {i18n: i18n},
    libs: options?.libs?.concat([{ modules: schema.modules }]),
  });

  function App() {
    return (
      <SunmaoApp debugEvent={false} debugStore={false} options={schema.application} />
    );
  }

  return App;
}

export default registerSunmaoRuntime;
