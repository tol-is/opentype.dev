import React from 'react';
import { connect } from 'react-redux';

import TesterHeader from '../ui/tester-header';
import { setTesterProp, setOpenPanel } from '../modules/tester';

function mapStateToProps(state) {
  return {
    tester: state.tester,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setOpenPanel: (value) => dispatch(setOpenPanel(value)),
    setTesterProp: (key, value) => dispatch(setTesterProp(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TesterHeader);
