import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  colorize,
  paintPath,
  drawWall,
  setStart,
  setEnd,
} from '../store/store';
import 'font-awesome/css/font-awesome.min.css';

class Grid extends Component {
  constructor() {
    super();
    this.state = {
      paint: false,
      moveStart: false,
      moveEnd: false,
    };

    this.handleMousrover = this.handleMousrover.bind(this);
  }

  async handleMousrover(row, col) {
    if (this.state.moveStart) {
      await this.props.setStart(row, col);
    } else if (this.state.moveEnd) {
      await this.props.setEnd(row, col);
    } else if (this.state.paint) {
      this.props.drawWall(row, col);
    }
  }
  stopMoveCell = (grid, row, col) => {
    if (grid[row][col].state === 'start') {
      this.setState({ moveStart: false });
    } else if (grid[row][col].state === 'Goal') {
      this.setState({ moveEnd: false });
    } else {
      this.setState({ paint: false });
    }
  };

  startMoveCell = (grid, row, col) => {
    if (grid[row][col].state === 'start') {
      this.setState({ moveStart: true });
    } else if (grid[row][col].state === 'Goal') {
      this.setState({ moveEnd: true });
    } else {
      this.setState({ paint: true });
    }
  };
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
                    onMouseOver={() =>
                      this.handleMousrover(rowIndex, cellIndex)
                    }
                    onMouseUp={() => {
                      this.stopMoveCell(grid, rowIndex, cellIndex);
                    }}
                    onMouseDown={() => {
                      this.startMoveCell(grid, rowIndex, cellIndex);
                    }}
                    onClick={() => {
                      this.props.drawWall(rowIndex, cellIndex);
                    }}
                    className={grid[rowIndex][cellIndex].color}
                  >
                    <i
                      className={`${grid[rowIndex][cellIndex].icon} ${grid[rowIndex][cellIndex].iconstyle}`}
                      style={{ color: 'blue', marginLeft: '3.5px' }}
                    ></i>
                  </td>
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
    start: state.start,
    end: state.end,
  };
};
const mapDispatch = (dispatch) => {
  return {
    paint: (row, col) => dispatch(colorize(row, col)),
    paintPath: (row, col) => dispatch(paintPath(row, col)),
    drawWall: (row, col) => dispatch(drawWall(row, col)),
    setStart: (row, col) => dispatch(setStart(row, col)),
    setEnd: (row, col) => dispatch(setEnd(row, col)),
  };
};
export default connect(mapState, mapDispatch)(Grid);
