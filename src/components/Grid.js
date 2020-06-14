import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colorize, BFS } from '../store/store';

const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};
class Grid extends Component {
  constructor() {
    super();
    this.state = {
      paint: false,
    };

    this.handleMousrover = this.handleMousrover.bind(this);

    this.search = this.search.bind(this);
  }
  async search(grid) {
    let queue = [[0, 0]];
    // for (let i = 0; i < grid.length; ++i) {
    //   for (let j = 0; j < grid[i].length; ++j) {
    //     if (this.checkNeibor(grid, i, j)) {
    //       queue.push([i, j]);
    //     }
    //   }
    // }

    let h = grid.length,
      l = grid[0].length;

    while (queue.length > 0) {
      const [row, col] = queue.shift();
      // this.props.paint(curr[0], curr[1]);
      // await sleep(100);

      if (row < 0 || col < 0 || row >= h || col >= l || grid[col][row] !== 0) {
        continue;
      }
      // this.props.paint(row, col);
      // await sleep(0);
      console.log(row, col);

      queue.push([row, col - 1]);
      queue.push([row, col + 1]);
      queue.push([row + 1, col]);
      queue.push([row - 1, col]);
    }
  }
  checkNeibor(grid, row, col) {
    return true;
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
          onClick={() => this.search(this.props.grid)}
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
