import React from 'react';
import styled from '@emotion/styled';

import FontLoader from './font-loader';

const AppHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 100;
`;

export default () => {
  return (
    <AppHeader>
      <FontLoader />
    </AppHeader>
  );
};
