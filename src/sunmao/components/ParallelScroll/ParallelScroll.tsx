import { implementRuntimeComponent } from '@sunmao-ui/runtime';
import { Type } from '@sinclair/typebox';
import { css, cx } from '@emotion/css';
import { useCallback, useEffect, useState } from 'react';
import Highlight from 'react-highlight';
import { codes } from './code';
import 'highlight.js/styles/github.css';

const scrollCss = css`
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 0;
  flex: 1 1 0;
`;
const codeCss = css`
  background: white;
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
export const SunmaoParallelScroll = implementRuntimeComponent({
  version: 'site/v1',
  metadata: {
    name: 'parallelScroll',
    displayName: 'ParallelScroll',
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
    slots: {},
    styleSlots: ['content'],
    events: [],
  },
})(props => {
  const { elementRef, customStyle } = props;
  const [distance, setDistance] = useState(-1);
  const [step, setStep] = useState(0);
  const [isInEditor, setIsInEditor] = useState(false);

  useEffect(() => {
    if (document.getElementById('editor-mask-wrapper')) {
      setIsInEditor(true);
    }
  }, []);

  const onScroll = useCallback(() => {
    const rect = elementRef?.current.parentElement.getBoundingClientRect();
    const scrollElement =
      document.getElementById('editor-mask-wrapper') ||
      document.getElementsByTagName('html')[0];
    if (distance < 0 && rect.top === (isInEditor ? 78 : 0)) {
      setDistance(scrollElement.scrollTop);
    }

    if (distance > 0 && scrollElement.scrollTop < distance + window.innerHeight) {
      setStep(0);
    } else if (
      distance > 0 &&
      scrollElement.scrollTop < distance + window.innerHeight * 2
    ) {
      setStep(1);
    } else if (
      distance > 0 &&
      scrollElement.scrollTop < distance + window.innerHeight * 3
    ) {
      setStep(2);
    }
  }, [distance, elementRef, isInEditor]);

  useEffect(() => {
    const scrollWrapper = document.getElementById('editor-mask-wrapper') || document;
    scrollWrapper?.addEventListener('scroll', onScroll);
    return () => {
      scrollWrapper.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div ref={elementRef} className={cx([scrollCss, css(customStyle?.content)])}>
      <Highlight className={cx(['typescript', codeCss])}>{codes[step]}</Highlight>
      <img className={imageCss} src={images[step]} />
      <div className={cx([maskCss, css(masks[step])])} />
    </div>
  );
});

const images = ['/editor-name.png', '/editor-property.png', '/editor-calendar.png'];

const masks = [
  `top: 30px; left: 0; height: 85px; width: 250px;`,
  `top: 160px; left: 0; height: 380px; width: 320px;`,
  `top: 745px; left: 0; height: 170px; width: 560px`,
];
