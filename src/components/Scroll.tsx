import { implementRuntimeComponent } from '@sunmao-ui/runtime';
import { Type } from '@sinclair/typebox';
import { css, cx } from '@emotion/css';
import { useCallback, useEffect, useState } from 'react';
import { codes } from './code';

const scrollCss = css`
  background: white;
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 0;
  flex: 1 1 0;
`;
const codeCss = css`
  box-sizing: border-box;
  margin: 0;
  height: 100%;
  padding: 12px;
  border-radius: 12px;
  overflow: auto;
`;
const maskCss = css`
  position: absolute;
  border: 3px solid red;
  border-radius: 12px;
`;

const imageCss = css`
  object-fit: contain;
  width: 0;
  flex: 1 1 auto;
`;
export const SunmaoScroll = implementRuntimeComponent({
  version: 'site/v1',
  metadata: {
    name: 'scroll',
    displayName: 'Scroll',
    exampleProperties: {},
    annotations: {
      category: 'Advance',
    },
    isDraggable: false,
    isResizable: false,
    exampleSize: [0, 0],
  },
  spec: {
    properties: Type.Object({}),
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
  const { elementRef, customStyle } = props;
  const [distance, setDistance] = useState(0);
  const [step, setStep] = useState(0);
  useEffect(() => {
    console.log(step);
  }, [step]);
  const cb = useCallback(() => {
    const rect = elementRef?.current.getBoundingClientRect();
    const html = document.getElementsByTagName('html')[0];
    if (!distance && rect.top === 205) {
      setDistance(html.scrollTop);
    }

    if (distance > 0 && html.scrollTop < distance + window.innerHeight) {
      console.log('一阶段');
      setStep(0);
    } else if (distance > 0 && html.scrollTop < distance + window.innerHeight * 2) {
      console.log('二阶段');
      setStep(1);
    } else if (distance > 0 && html.scrollTop < distance + window.innerHeight * 3) {
      console.log('三阶段');
      setStep(2);
    }
  }, [distance, elementRef]);

  useEffect(() => {
    const scrollWrapper = document.getElementById('editor-mask-wrapper') || document;
    scrollWrapper?.addEventListener('scroll', cb);
    return () => {
      scrollWrapper.removeEventListener('scroll', cb);
    };
  }, [cb]);
  return (
    <div ref={elementRef} className={cx([scrollCss, css(customStyle?.content)])}>
      <pre className={codeCss}>
        <code>{codes[step]}</code>
      </pre>
      <img className={imageCss} src={images[step]} />
      <div className={cx([maskCss, css(maskPos[step])])} />
    </div>
  );
});

const images = ['/editor-name.png', '/editor-property.png', '/editor-calendar.png'];

const maskPos = [
  `top: 33px; left: 0; height: 85px; width: 250px;`,
  `top: 160px; left: 0; height: 380px; width: 320px;`,
  `top: 700px; left: 0; height: 170px; width: 560px`,
];
