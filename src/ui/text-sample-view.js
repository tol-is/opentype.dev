import React, { memo, useCallback } from 'react';
import { css } from 'emotion';
import TextareaAutosize from 'react-textarea-autosize';

import Accordion from './accordion';

const TextSample = ({ visible, value, onChange }) => {
  const onTextAreaChange = useCallback((e) => {
    onChange(e.target.value);
  }, []);

  //
  return (
    <>
      <Accordion visible={visible}>
        <TextareaAutosize
          value={value}
          min={2}
          max={5}
          onChange={onTextAreaChange}
        />
      </Accordion>
    </>
  );
};

export default memo(TextSample);
