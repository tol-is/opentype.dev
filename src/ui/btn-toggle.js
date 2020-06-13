import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { css } from 'emotion';

const Button = ({ selected, label, line = 'bottom', onClick }) => {
  const [state, setState] = useState('normal');
  const timeout = useRef();

  useEffect(() => {
    if (selected) {
      setState('selected');
    } else {
      clearInterval(timeout.current);
      setState('out');
      timeout.current = setTimeout(() => {
        setState('normal');
      }, 300);
    }
  }, [selected]);

  const onMouseOver = useCallback(() => {
    clearInterval(timeout.current);
    setState('hover');
  }, [state]);

  const onMouseOut = useCallback(() => {
    if (selected) {
      clearInterval(timeout.current);
      setState('selected');
      return;
    }
    clearInterval(timeout.current);
    setState('out');
    timeout.current = setTimeout(() => {
      setState('normal');
    }, 300);
  }, [state]);

  useEffect(() => () => clearInterval(timeout.current));

  const bgPositionY = useMemo(() => line, []);
  const bgPositionX = useMemo(() => (state === 'out' ? 'right' : 'left'), [
    state,
  ]);

  const bgSize = useMemo(
    () => (state === 'hover' || state === 'selected' ? '100' : '0'),
    [state]
  );

  return (
    <button
      className={css`
        padding: 1em 0;
        text-align: left;
        font-weight: 400;
        line-height: 1.5;
        color: #fff;
        background-image: linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
        background-repeat: no-repeat;
        background-position: ${bgPositionX} ${bgPositionY};
        transition: background-size 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        background-size: ${bgSize}% 0.09em;
        &:focus {
          outline: none;
        }
      `}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
