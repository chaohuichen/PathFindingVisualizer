import React from 'react';
import { connect } from 'react-redux';
import { clear, colorize, paintPath } from '../store/store';
import { bfs } from './BFS';
import { sleep } from './ult';
import headerStyle from './header.module.css';
import selectStyle from './selectMenu.module.css';

class Header extends React.Component {
  search = async (grid, start) => {
    //run the bfs function search
    let ans = await bfs(grid, start, this.props.paint);

    //north,south,west,east
    let direction = {
      North: [-1, 0],
      South: [1, 0],
      West: [0, -1],
      East: [0, 1],
    };

    let startrow = start[0];
    let startcol = start[1];
    //draw the path after we have the direction from bfs function
    for (let i = 0; i < ans.length; ++i) {
      this.props.paintPath(startrow, startcol);
      await sleep(20);
      let dr = direction[ans[i]];
      startrow += dr[0];
      startcol += dr[1];
    }
    //draw the last cell
    this.props.paintPath(startrow, startcol);
    await sleep(20);
  };
  render() {
    const { grid, start } = this.props;
    return (
      <div className={headerStyle.header}>
        <h3>PathFinding Visualizer</h3>
        <div className={headerStyle.button} onClick={this.props.clear}>
          <a href='#'>Clear</a>
        </div>
        <div
          className={headerStyle.button}
          onClick={() => this.search(grid, start)}
        >
          <a href='#'>Start</a>
        </div>
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
    clear: () => dispatch(clear()),
    paint: (row, col) => dispatch(colorize(row, col)),
    paintPath: (row, col) => dispatch(paintPath(row, col)),
  };
};

export default connect(mapState, mapDispatch)(Header);
