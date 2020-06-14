import React, { memo, useCallback, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';
import TextareaAutosize from 'react-textarea-autosize';

import Checkbox from './input-checkbox';
import Accordion from './accordion';

const TextSamples = ({
  visible,
  tester,
  onTextChange,
  onRtlChange,
  ...rest
}) => {
  const onTextAreaChange = useCallback(
    (e) => {
      onTextChange(e.target.value);
    },
    [tester.text]
  );

  const onRightToLeftChange = useCallback(
    (key, value) => {
      onRtlChange(value);
    },
    [tester.rtl]
  );

  //
  return (
    <>
      <Accordion visible={visible} {...rest}>
        <div
          className={css`
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            padding-top: 1.5rem;
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            grid-gap: 1.5rem;
            width: 100%;
          `}
        >
          <div
            className={css`
              padding-top: 1rem;
            `}
          >
            <Checkbox
              name="rtl"
              label={'Right to Left'}
              checked={tester.rtl}
              onChange={onRightToLeftChange}
            />
          </div>
          <div
            className={css`
              grid-column: 2 / span 3;
              position: relative;
            `}
          >
            <TextareaAutosize
              min={2}
              max={5}
              value={tester.text}
              onChange={onTextAreaChange}
              className={css`
                width: 100%;
                white-space: pre-wrap;
                background-color: transparent;
                resize: none;
                border: 0;
                padding: 1rem 0;
                font-weight: 400;
                color: #fff;
                font-size: 1.15rem;
                line-height: 1.625;
                direction: ${tester.rtl ? 'rtl' : 'ltr'};
                outline: none;
                &:focus: {
                  outline: none;
                }
              `}
            />
          </div>
        </div>
      </Accordion>
    </>
  );
};

export default memo(TextSamples);
