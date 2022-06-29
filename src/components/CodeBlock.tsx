import { implementRuntimeComponent } from '@sunmao-ui/runtime';
import { Type } from '@sinclair/typebox';
import { css } from '@emotion/css';
import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export const SunmaoCodeBlock = implementRuntimeComponent({
  version: 'site/v1',
  metadata: {
    name: 'codeBlock',
    displayName: 'Code Block',
    exampleProperties: {
      code: `console.log('Hello, world!')`,
    },
    annotations: {
      category: 'Advance',
    },
  },
  spec: {
    properties: Type.Object({
      code: Type.String(),
    }),
    state: Type.Object({}),
    methods: {},
    slots: {},
    styleSlots: ['content'],
    events: [],
  },
})(props => {
  const { code, elementRef, customStyle } = props;
  useEffect(() => {
    hljs.highlightElement(elementRef?.current);
  }, [elementRef, code]);
  return (
    <pre ref={elementRef} className={css(customStyle?.content)}>
      <code>{code}</code>
    </pre>
  );
});
