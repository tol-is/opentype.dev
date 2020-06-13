import React, { memo, useCallback, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';
import TextareaAutosize from 'react-textarea-autosize';

import Accordion from './accordion';

const TextSamples = ({ visible, value, onChange, ...rest }) => {
  const onTextAreaChange = useCallback((e) => {
    onChange(e.target.value);
  }, []);

  //
  return (
    <>
      <Accordion visible={visible} {...rest}>
        <div
          className={css`
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            padding-top: 1.5rem;
            // padding-bottom: 1.5rem;
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            grid-gap: 1.5rem;
            width: 100%;
          `}
        >
          <div
            className={css`
              grid-column: 2 / span 2;
              display: grid;
              grid-template-columns: repeat(1, minmax(0, 1fr));
              grid-gap: 1rem;
            `}
          >
            <TextareaAutosize
              value={value}
              min={2}
              max={5}
              onChange={onTextAreaChange}
              className={css`
                width: 100%;
                background-color: transparent;
                resize: none;
                border: 0;
                padding: 1rem 0;
                text-align: left;
                font-weight: 400;
                color: #fff;
                font-size: 0.8125rem;
                line-height: 1.5;
                border-bottom: 1px solid white;
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
