import { implementRuntimeComponent } from '@sunmao-ui/runtime';
import { Type } from '@sinclair/typebox';
import { useSpring } from 'use-spring';
import { useEffect, useRef, useState } from 'react';
import { CodeSurfer } from '@code-surfer/standalone';
import { nightOwl } from '@code-surfer/themes';
import { css, cx } from '@emotion/css';

export const CodeSurf = implementRuntimeComponent({
  version: 'site/v1',
  metadata: {
    name: 'code_surf',
    displayName: 'Code Surf',
    exampleProperties: {
      height: '100vh',
      steps: [
        {
          code: 'console.log("hello world")',
          lang: 'js',
          title: 'example code',
        },
      ],
    },
    annotations: {
      category: 'Advance',
    },
    isDraggable: false,
    isResizable: false,
    exampleSize: [1, 1],
  },
  spec: {
    properties: Type.Object({
      height: Type.String(),
      steps: Type.Array(
        Type.Object({
          code: Type.String(),
          lang: Type.String(),
          title: Type.Optional(Type.String()),
          focus: Type.Optional(Type.String()),
        })
      ),
    }),
    state: Type.Object({
      progress: Type.Number(),
    }),
    methods: {},
    slots: {
      before: {
        slotProps: Type.Object({}),
      },
      content: {
        slotProps: Type.Object({}),
      },
      after: {
        slotProps: Type.Object({}),
      },
    },
    styleSlots: ['outerWrapper', 'innerWrapper', 'content', 'code'],
    events: [],
  },
})(({ height, customStyle, slotsElements, mergeState, steps = [] }) => {
  const [{ progress, teleport }, setProgress] = useState({
    progress: 0,
    teleport: true,
  });
  useEffect(() => {
    mergeState({
      progress,
    });
  }, [progress, mergeState]);
  const [p] = useSpring(progress, {
    decimals: 3,
    stiffness: 80,
    damping: 48,
    mass: 8,
    teleport,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const max = steps.length - 1;

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    const scrollWrapper = document.getElementById('editor-mask-wrapper') || document;
    const scrollElement =
      document.getElementById('editor-mask-wrapper') || document.documentElement;
    const el = wrapperRef.current;
    const contentEl = el.querySelector('.code-surf-content');
    if (!contentEl) {
      return;
    }
    const contentHeight = contentEl.getBoundingClientRect().height;
    const onScroll = () => {
      let newProgress = Math.min(
        Math.max(0, (scrollElement.scrollTop - el.offsetTop) / contentHeight),
        max
      );
      if (newProgress - Math.floor(newProgress) < 0.2) {
        newProgress = Math.floor(newProgress);
      } else if (Math.ceil(newProgress) - newProgress < 0.2) {
        newProgress = Math.ceil(newProgress);
      }
      setProgress({
        teleport: true,
        progress: newProgress,
      });
    };
    scrollWrapper.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scrollWrapper.removeEventListener('scroll', onScroll);
    };
  }, [max]);

  if (!steps.length) {
    return null;
  }

  return (
    <div
      className={cx(css`
        ${customStyle?.outerWrapper}
      `)}
      ref={wrapperRef}
    >
      <div
        className={cx(css`
          position: sticky;
          top: 0;
          ${customStyle?.innerWrapper}
        `)}
      >
        {slotsElements.before ? slotsElements.before({}) : null}
        <div
          className={cx(
            'code-surf-content',
            css`
              ${customStyle?.content}
            `
          )}
        >
          <div
            className={css`
              height: ${height};
              > div {
                height: 100%;
                width: 100%;
              }
              ${customStyle?.code}
            `}
          >
            <CodeSurfer progress={p} steps={steps} nonblocking={true} theme={nightOwl} />
          </div>
          {slotsElements.content ? slotsElements.content({}) : null}
        </div>
        {slotsElements.after ? slotsElements.after({}) : null}
      </div>
      <div
        className={cx(css`
          height: calc(${max} * ${height});
          visibility: hidden;
        `)}
      />
    </div>
  );
});
