import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { clear } from '../store/store';
import headerStyle from './header.module.css';
class Header extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={headerStyle.header}>
        <h3>PathFinding Visualizer</h3>
        <button onClick={this.props.clear}>Clear</button>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    clear: () => dispatch(clear()),
  };
};

export default connect(null, mapDispatch)(Header);
