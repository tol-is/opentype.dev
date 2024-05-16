import React, { useCallback } from 'react';
import { css } from 'emotion';

import ButtonToggle from '../ui/btn-toggle';
import FontLoader from '../containers/font-loader';

const TesterHeader = ({ tester, toggleFocusMode }) => {

  const { global = {}} = tester;
  const { focus } = global;
  const onFocusToggleClick = useCallback(() => {
    toggleFocusMode();
  }, [tester, global, focus]);
  //
  return (
    <>
      <div
        className={css`
          position: fixed;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          display: block;
          top: 0;
          left: 1rem;
          z-index: 6000;
        `}
      >
        <FontLoader />
      </div>
      <div
        className={css`
          position: fixed;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          display: block;
          top: 0;
          right: 1rem;
          z-index: 6000;
        `}
      >
        <ButtonToggle
          label="Focus"
          onClick={onFocusToggleClick}
          selected={tester.global.focus}
        />
      </div>
    </>
  );
};

export default TesterHeader;
