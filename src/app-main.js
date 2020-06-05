import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { injectGlobal } from 'emotion';

const AppMain = styled.main`
  min-height: 100vh;
  padding-top: 100px;
`;

injectGlobal;

const Main = ({ fonts }) => {
  useEffect(() => {
    fonts.forEach((font) => {
      injectGlobal`
        @font-face {
          font-family: '${font.metrics.familyName}';
          font-weight: ${font.metrics.weight};
          font-style: ${font.metrics.italic ? 'italic' : 'normal'};
          src: url('${font.blob}')
              format('opentype');
        }
        `;
    });
  }, [fonts]);

  return (
    <AppMain>
      <div>Main</div>
      {fonts.map((f) => (
        <div>{JSON.stringify(f.metrics)}</div>
      ))}
    </AppMain>
  );
};

function mapStateToProps(state) {
  return {
    fonts: state.fonts.fonts,
  };
}

export default connect(mapStateToProps, null)(Main);
