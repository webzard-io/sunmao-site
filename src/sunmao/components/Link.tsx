import { implementRuntimeComponent } from '@sunmao-ui/runtime';
import { Type } from '@sinclair/typebox';
import { css } from '@emotion/css';

export const SunmaoLink = implementRuntimeComponent({
  version: 'site/v1',
  metadata: {
    name: 'link',
    displayName: 'Link',
    exampleProperties: {
      href: '/',
    },
    isDraggable: false,
    isResizable: false,
    exampleSize: [1, 1],
  },
  spec: {
    properties: Type.Object({
      href: Type.String(),
    }),
    state: Type.Object({}),
    methods: {},
    slots: {
      content: {
        slotProps: Type.Object({}),
      },
    },
    styleSlots: ['content'],
    events: [],
  },
})(props => {
  const { href, slotsElements, elementRef, customStyle } = props;

  return (
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
      ref={elementRef}
      className={css(customStyle?.content)}
    >
      {slotsElements?.content?.({})}
    </a>
  );
});
