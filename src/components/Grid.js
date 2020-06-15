import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colorize, paintPath, drawWall } from '../store/store';

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
      this.props.drawWall(row, col);
    }
  }

  render() {
    const { grid } = this.props;

    return (
      <div id='pixelate'>
        {/* truncated for brevity... */}

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
                      this.props.drawWall(rowIndex, cellIndex);
                    }}
                    className={grid[rowIndex][cellIndex].color}
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
    start: state.start,
    end: state.end,
  };
};
const mapDispatch = (dispatch) => {
  return {
    paint: (row, col) => dispatch(colorize(row, col)),
    paintPath: (row, col) => dispatch(paintPath(row, col)),
    drawWall: (row, col) => dispatch(drawWall(row, col)),
  };
};
export default connect(mapState, mapDispatch)(Grid);
