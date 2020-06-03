import React, { useContext, useCallback, useEffect, useState } from 'react';
import { css } from 'emotion';
import fontkit from 'fontkit';
import blobToBuffer from 'blob-to-buffer';
import isEqual from 'lodash/isEqual';
import mapValues from 'lodash/mapValues';

import get from './get';
import { isConstructorDeclaration } from 'typescript';

import AppContext from './app-context';

export default () => {
  const { addFont } = useContext(AppContext);

  const useFont = useCallback(({ fontData, font }) => {
    if (!font) return;

    //
    const familyName = get(
      font,
      'name.records.preferredFamily.en',
      font.familyName
    );
    const subfamilyName = font.subfamilyName;
    const weight = font['OS/2'].usWeightClass;
    const italic = font['OS/2'].fsSelection.italic;

    //
    // let scripts = get(font, 'GSUB.scriptList', []).concat(
    //   get(font, 'GPOS.scriptList', [])
    // );
    // let scriptTags = Array.from(new Set(scripts.map((s) => s.tag)));

    //
    let defaultSettings = mapValues(font.variationAxes, 'default');

    let defaultVariationName =
      Object.keys(font.namedVariations).find((k) => {
        return isEqual(font.namedVariations[k], defaultSettings);
      }) ||
      subfamilyName ||
      'Custom';

    const fontKitData = {
      familyName,
      subfamilyName,
      weight,
      italic,
      availableFeatures: font.availableFeatures,
      defaultSettings,
      defaultVariationName,
      variationAxes: font.variationAxes,
      namedVariations: font.namedVariations,
    };

    addFont({
      fontData,
      font: fontKitData,
      global: `
        @font-face {
          font-family: '${font.familyName}';
          font-weight: ${weight};
          font-style: ${italic ? 'italic' : 'normal'};
          src: url('${fontData}')
              format('opentype');
        }
      `,
    });
  }, []);

  const onChange = (e) => {
    let file = e.target.files && e.target.files[0];
    if (e.target.files && e.target.files.length > 0) {
      for (let index = 0; index < e.target.files.length; index++) {
        const file = e.target.files[index];
        // const extension = file.name.split('.').pop();
        loadBlob(file);
      }
    }
  };

  const loadURL = (url) => {
    fetch(url)
      .then((res) => res.blob())
      .then(loadBlob, console.error);
  };

  const loadBlob = (blob) => {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        throw err;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        const font = fontkit.create(buffer);

        useFont({ fontData: reader.result, font });
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="upload_button" tabIndex={-1} aria-hidden={true}>
      Upload Font File
      <input
        multiple
        type="file"
        onChange={onChange}
        className={css`
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          top: 0;
          left: 0;
        `}
      />
    </div>
  );
};
