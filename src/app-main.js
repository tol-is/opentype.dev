import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';

const AppMain = styled.main`
  min-height: 100vh;
  padding-top: 100px;
`;

export default () => {
  return (
    <AppMain>
      <div>Main</div>
    </AppMain>
  );
};
