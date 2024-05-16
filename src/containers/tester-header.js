import React from 'react';
import { connect } from 'react-redux';

import TesterHeader from '../ui/tester-header';
import { toggleFocusMode } from '../modules/tester';

function mapStateToProps(state) {
  return {
    tester: state.tester,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFocusMode: () => dispatch(toggleFocusMode()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TesterHeader);
