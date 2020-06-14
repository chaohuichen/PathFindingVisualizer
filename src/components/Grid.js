import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colorize } from '../store/store';
import { bfs } from './BFS';
class Grid extends Component {
  constructor() {
    super();
    this.state = {
      paint: false,
    };

    this.handleMousrover = this.handleMousrover.bind(this);
  }

  handleMousrover(row, col) {
    if (this.state.paint) {
      this.props.paint(row, col);
    }
  }
  render() {
    const { grid } = this.props;
    return (
      <div id='pixelate'>
        {/* truncated for brevity... */}
        <button
          style={{ width: 50, height: 50 }}
          onClick={() => bfs(grid, this.props.paint)}
        >
          Start
        </button>
        <table
          onMouseDown={() => this.setState({ paint: true })}
          onMouseUp={() => this.setState({ paint: false })}
        >
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((color, cellIndex) => (
                  <td
                    key={cellIndex}
                    onMouseOver={() =>
                      this.handleMousrover(rowIndex, cellIndex)
                    }
                    onClick={() => {
                      this.props.paint(rowIndex, cellIndex);
                    }}
                    className={grid[rowIndex][cellIndex]}
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
    paint: (row, col) => dispatch(colorize(row, col)),
  };
};
export default connect(mapState, mapDispatch)(Grid);
