import React, { useCallback } from 'react';
import { css } from 'emotion';

export default ({ label, name, checked, onChange }) => {
  const onToggle = useCallback((e) => {
    onChange(e.target.name, e.target.checked);
  }, []);

  return (
    <label
      className={css`
        position: relative;
        text-align: left;
        font-weight: ${checked ? 700 : 400};
      `}
    >
      <input
        className={css`
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
        `}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onToggle}
      />
      {label}
    </label>
  );
};
