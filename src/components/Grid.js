import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colorize, paintPath } from '../store/store';
import { bfs } from './BFS';
import { sleep } from './ult';

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
  search = async (grid, start) => {
    let ans = await bfs(grid, start, this.props.paint);
    //north,south west    east
    let direction = {
      North: [-1, 0],
      South: [1, 0],
      West: [0, -1],
      East: [0, 1],
    };

    let startrow = start[0];
    let startcol = start[1];
    for (let i = 0; i < ans.length; ++i) {
      let dr = direction[ans[i]];
      startrow += dr[0];
      startcol += dr[1];
      this.props.paintPath(startrow, startcol);
      await sleep(100);
    }
    // console.log(this.props.grid);
  };
  render() {
    const { grid, start, end } = this.props;

    return (
      <div id='pixelate'>
        {/* truncated for brevity... */}
        {/* bfs(grid, start, end, this.props.paint) */}
        <button
          style={{ width: 50, height: 50 }}
          onClick={() => this.search(grid, start)}
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
  };
};
export default connect(mapState, mapDispatch)(Grid);
