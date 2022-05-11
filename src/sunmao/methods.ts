import store from '../store';
import { Type, Static } from '@sinclair/typebox';

const NavigateParameterSpec = Type.Object({
  to: Type.String(),
});

export function getNavigateMethod(navigate: (to: string) => void) {
  return {
    name: 'navigate',
    method(parameters: Static<typeof NavigateParameterSpec>) {
      if (parameters) {
        navigate(parameters.to);
      }
    },
    parameters: NavigateParameterSpec,
  };
}

const SetStoreParameterSpec = Type.Object({
  key: Type.String(),
  value: Type.Any(),
});

export const setStoreMethod = {
  name: 'setStore',
  method(parameters: Static<typeof SetStoreParameterSpec>) {
    store[parameters.key] = parameters.value;
  },
  parameters: SetStoreParameterSpec,
};

const OpenParameterSpec = Type.Object({
  url: Type.String(),
  target: Type.String(),
});

export const openHref = {
  name: 'openHref',
  method(parameters: Static<typeof OpenParameterSpec>) {
    const { url, target } = parameters;
    
    window.open(url, target);
  },
  parameters: OpenParameterSpec,
};
