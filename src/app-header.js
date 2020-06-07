import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import ConfigPanel from './ui/global-config-panel';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 100;
`;

const AppHeader = () => {
  return (
    <StyledHeader>
      <ConfigPanel />
    </StyledHeader>
  );
};

export default AppHeader;
