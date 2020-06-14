import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colorize } from '../store/store';
class Grid extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { grid } = this.props;
    return (
      <div id='pixelate'>
        {/* truncated for brevity... */}
        <table>
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((color, cellIndex) => (
                  <td
                    key={cellIndex}
                    onClick={() => this.props.paint(rowIndex, cellIndex)}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    grid: state.grid,
  };
};
const mapDispatch = (dispatch) => {
  return {
    paint: (row, col) => dispatch(colorize()),
  };
};
export default connect(mapState, mapDispatch)(Grid);
