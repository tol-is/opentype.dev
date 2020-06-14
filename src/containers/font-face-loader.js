import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { injectGlobal } from 'emotion';

const FontFaceLoader = ({ fonts }) => {
  useEffect(() => {
    fonts.forEach((font) => {
      injectGlobal`
        @font-face {
          font-family: '${font.metrics.familyName}';
          font-weight: ${font.metrics.weight};
          font-style: ${font.metrics.italic ? 'italic' : 'normal'};
          ${
            font.blob &&
            `src: url('${font.blob}')
              format('opentype');`
          }
        }
        `;
    });
  }, [fonts]);

  return null;
};

function mapStateToProps(state) {
  return {
    fonts: state.fonts.fonts,
  };
}

export default connect(mapStateToProps, null)(FontFaceLoader);
