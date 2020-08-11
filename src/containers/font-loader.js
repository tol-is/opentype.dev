import React, { useContext, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import fontkit from 'fontkit';
import blobToBuffer from 'blob-to-buffer';
import isEqual from 'lodash/isEqual';
import mapValues from 'lodash/mapValues';

import get from '../utils/get';
import { uuid } from '../utils/uuid';

import ButtonUpload from '../ui/btn-upload';
import { addFont } from '../modules/fonts';

const fontExtensions = ['otf', 'ttf', 'woff', 'woff2'];

const FontLoaderContainer = (props) => {
  const { addFont } = props;

  useEffect(() => {
    if (props.fonts.fonts.length === 0) {
      loadURL('/Inter.otf');
    }
  }, []);

  const useFont = useCallback(({ fontData, font }) => {
    if (!font) return;

    const id = uuid();

    //
    const familyName = font.familyName;
    const subfamilyName = font.subfamilyName;
    const weight = font['OS/2'].usWeightClass;
    const italic = font['OS/2'].fsSelection.italic;

    //
    let defaultVariationSettings = mapValues(font.variationAxes, 'default');

    //
    let defaultVariationName =
      Object.keys(font.namedVariations).find((k) => {
        return isEqual(font.namedVariations[k], defaultVariationSettings);
      }) ||
      subfamilyName ||
      'Custom';

    //
    const isVariable = Object.keys(font.variationAxes).length > 0;

    //
    const openTypeData = {
      postscriptName: font.postscriptName,
      familyName,
      subfamilyName,
      weight,
      italic,
      isVariable,
      availableFeatures: font.availableFeatures,
      defaultVariationSettings,
      defaultVariationName,
      variationAxes: font.variationAxes,
      namedVariations: font.namedVariations,
    };

    console.log(openTypeData);

    addFont({
      id,
      blob: fontData,
      metrics: openTypeData,
    });
  }, []);

  const onChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      for (let index = 0; index < e.target.files.length; index++) {
        const file = e.target.files[index];
        const extension = file.name.split('.').pop();
        if (fontExtensions.includes(extension)) loadBlob(file);
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

  return <ButtonUpload onChange={onChange} />;
};

function mapStateToProps(state) {
  return {
    fonts: state.fonts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFont: (payload) => dispatch(addFont(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FontLoaderContainer);
