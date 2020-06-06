import React, { useContext, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import fontkit from 'fontkit';
import blobToBuffer from 'blob-to-buffer';
import isEqual from 'lodash/isEqual';
import mapValues from 'lodash/mapValues';

import ButtonUpload from './ui/btn-upload';
import { addFont } from './modules/fonts';
import get from './get';

const FontLoaderContainer = (props) => {
  const { addFont } = props;

  useEffect(() => {
    // console.log(props.fonts, props.addFont);
  }, []);

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

    const openTypeData = {
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
      blob: fontData,
      metrics: openTypeData,
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
