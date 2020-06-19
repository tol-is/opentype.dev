import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { css } from 'emotion';

export default ({ label, name, checked, onChange }) => {
  const onToggle = useCallback((e) => {
    onChange(e.target.name, e.target.checked);
  }, []);

  const [state, setState] = useState('normal');
  const timeout = useRef();

  const onMouseOver = useCallback(() => {
    clearInterval(timeout.current);
    setState('hover');
  }, [state]);

  const onMouseOut = useCallback(() => {
    if (checked) {
      clearInterval(timeout.current);
      setState('checked');
      return;
    }
    clearInterval(timeout.current);
    setState('out');
    timeout.current = setTimeout(() => {
      setState('normal');
    }, 300);
  }, [state]);

  useEffect(() => {
    if (checked) {
      setState('checked');
    } else {
      clearInterval(timeout.current);
      setState('out');
      timeout.current = setTimeout(() => {
        setState('normal');
      }, 300);
    }
  }, [checked]);

  useEffect(() => () => clearInterval(timeout.current));

  const bgPositionX = useMemo(() => (state === 'out' ? 'right' : 'left'), [
    state,
  ]);

  const bgSize = useMemo(
    () => (state === 'hover' || state === 'checked' ? '100' : '0'),
    [state]
  );

  return (
    <label
      className={css`
        position: relative;
        padding: 1em 0;
        text-align: left;
        font-weight: 400;
        line-height: 1;
        background-image: linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
        background-repeat: no-repeat;
        background-position: ${bgPositionX} 2.15em;
        transition: background-size 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        background-size: ${bgSize}% 1px;
        color: ${checked ? '#fff' : '#bfbfbf'};
        &:hover,
        &:focus {
          color: #fff;
        }
      `}
    >
      <input
        className={css`
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
        `}
        name={name}
        type="checkbox"
        onFocus={onMouseOver}
        onBlur={onMouseOut}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        checked={checked}
        onChange={onToggle}
      />
      {label}
    </label>
  );
};
