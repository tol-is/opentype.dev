import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { css } from 'emotion';

const Button = ({ label, onClick }) => {
  const [state, setState] = useState('normal');
  const timeout = useRef();

  const onButtonClick = useCallback(() => {
    clearInterval(timeout.current);
    setState('clicked');
    onClick();
    timeout.current = setTimeout(() => {
      setState('normal');
    }, 300);
  }, [state]);

  const onMouseOver = useCallback(() => {
    clearInterval(timeout.current);
    setState('hover');
  }, [state]);

  const onMouseOut = useCallback(() => {
    clearInterval(timeout.current);
    setState('out');
    timeout.current = setTimeout(() => {
      setState('normal');
    }, 300);
  }, [state]);

  useEffect(() => () => clearInterval(timeout.current));

  const bgPosition = useMemo(
    () => (state === 'out' || state === 'clicked' ? 'right' : 'left'),
    [state]
  );

  const bgSize = useMemo(() => (state === 'hover' ? '100' : '0'), [state]);

  return (
    <button
      className={css`
        padding: 1em 0;
        text-align: left;
        font-weight: 400;
        color: #fff;
        background-image: linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
        background-repeat: no-repeat;
        background-position: ${bgPosition} top;
        transition: background-size 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        background-size: ${bgSize}% 0.09em;
        &:focus {
          outline: none;
        }
        &:active:hover {
          background-position: right top;
          background-size: 0% 0.09em;
        }
      `}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onButtonClick}
    >
      {label}
    </button>
  );
};

export default Button;
