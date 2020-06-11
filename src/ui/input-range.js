import React, { useCallback, useState, useEffect } from 'react';
import { css } from 'emotion';

export const Slider = ({ label, min, max, step, value, onChange }) => {
  return (
    <label
      className={css`
        width: 100%;
        display: block;
        padding: 1em 0;
        position: relative;
        text-align: left;
        line-height: 1.5;
        font-weight: 400;
        background-image: linear-gradient(to bottom, #000000 0%, #000000 100%);
        background-repeat: no-repeat;
        background-position: 0 100%;
        transition: background-size 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        background-size: ${((value - min) / (max - min)) * 100}% 0.09em;
      `}
    >
      <input
        className={css`
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
        `}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        name={name}
        onChange={onChange}
      />
      {label} : {value}
    </label>
  );
};

export default Slider;
