import React, { useCallback, useState, useMemo } from 'react';
import { css } from 'emotion';

const FontSample = ({ config, font, global, scriptSample }) => {
  const { availableFeatures, availableVariationAxes } = font;
  const { script } = config;

  const sample = 'ruder';

  const fontFeatureSettings = useMemo(() => {
    let loop = 0;
    return availableFeatures.reduce((fRes, fKey) => {
      loop++;
      fRes += `"${fKey}" ${config.features[fKey] ? 1 : 0}`;
      if (loop < availableFeatures.length) {
        fRes += ', ';
      }
      return fRes;
    }, '');
  }, [config.features]);

  //
  const fontVariationSettings = useMemo(() => {
    let loop = 0;
    return availableVariationAxes.reduce((vRes, vKey) => {
      loop++;
      vRes += `"${vKey}" ${config.variations[vKey]}`;
      if (loop < availableVariationAxes.length) {
        vRes += ', ';
      }
      return vRes;
    }, '');
  }, [config.variations]);

  return (
    <>
      <div
        className={css`
          padding: 3.5rem 0 3.5rem 0;
        `}
      >
        {scriptSample.layout === 'stack' &&
          scriptSample.strings.map((v) => (
            <div
              className={css`
                white-space: pre-wrap;
                font-family: ${font.familyName};
                font-weight: ${font.weight};
                font-style: ${font.italic ? 'italic' : 'normal'};
                font-size: ${global.fontSize}px;
                line-height: ${global.lineHeight};
                font-feature-settings: ${fontFeatureSettings};
                font-variation-settings: ${fontVariationSettings};
                direction: ltr;
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
              `}
            >
              {v}
            </div>
          ))}
        {scriptSample.layout === 'columns' && (
          <div
            className={css`
              display: grid;
              grid-gap: 1.5rem;
              grid-template-columns: repeat(
                ${scriptSample.strings.length},
                1fr
              );
              direction: ltr;
            `}
          >
            {scriptSample.strings.map((v) => (
              <div
                className={css`
                  flex: 1;
                  white-space: pre-wrap;
                  font-family: ${font.familyName};
                  font-weight: ${font.weight};
                  font-style: ${font.italic ? 'italic' : 'normal'};
                  font-size: ${global.fontSize}px;
                  line-height: ${global.lineHeight};
                  font-feature-settings: ${fontFeatureSettings};
                  font-variation-settings: ${fontVariationSettings};
                  direction: ltr;
                  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                `}
              >
                {v}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FontSample;
