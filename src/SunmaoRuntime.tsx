import React from 'react';
import { initSunmaoUI, SunmaoUIRuntimeProps, UtilMethod } from '@sunmao-ui/runtime';
import type { Schema } from './types';

// FIXME: this is used to solve a bug of the react JSON schema form
// rjsf's bundle has some wrong usage of the global variable React
window.React = React;

function registerSunmaoRuntime(
  schema: Schema,
  options: SunmaoUIRuntimeProps & { utilMethods?: UtilMethod<any>[] } = {}
) {
  const { App: SunmaoApp } = initSunmaoUI(options);

  function App() {
    return (
      <SunmaoApp debugEvent={false} debugStore={false} options={schema.application} />
    );
  }

  return App;
}

export default registerSunmaoRuntime;
