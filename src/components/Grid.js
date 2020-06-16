import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colorize, paintPath, drawWall, setStart } from '../store/store';

class Grid extends Component {
  constructor() {
    super();
    this.state = {
      paint: false,
      moveStart: false,
    };

    this.handleMousrover = this.handleMousrover.bind(this);
  }

  async handleMousrover(row, col) {
    if (this.state.moveStart) {
      console.log('hello');
      await this.props.setStart(row, col);
    } else if (this.state.paint) {
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
                    onMouseUp={() => {
                      if (grid[rowIndex][cellIndex].state === 'start') {
                        this.setState({ moveStart: false });
                      }
                    }}
                    onMouseDown={() => {
                      if (grid[rowIndex][cellIndex].state === 'start') {
                        this.setState({ moveStart: true });
                      }
                    }}
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
    setStart: (row, col) => dispatch(setStart(row, col)),
  };
};
export default connect(mapState, mapDispatch)(Grid);
