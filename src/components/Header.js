import React from 'react';
import { connect } from 'react-redux';
import { clear, colorize, paintPath } from '../store/store';
import { bfs } from './BFS';
import { sleep } from './ult';
import headerStyle from './header.module.css';
import buttonStyle from './button.module.scss';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      algo: 'Algorithms',
    };
  }
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
      // <div className={headerStyle.header}>
      //   <h3>PathFinding Visualizer</h3>

      //   <select name='cars' id='cars' className={headerStyle.select}>
      //     <option value='volvo'>Volvo</option>
      //     <option value='saab'>Saab</option>
      //     <option value='mercedes'>Mercedes</option>
      //     <option value='audi'>Audi</option>
      //   </select>

      //   <button
      //     className={buttonStyle.startBtn}
      //     onClick={() => this.search(grid, start)}
      //   >
      //     <p style={{ color: 'white', fontWeight: 'bold' }}>Start</p>
      //   </button>

      // </div>
      <Navbar
        className={headerStyle.header}
        expand='lg'
        onSelect={(eventKey) => {
          this.setState({ algo: eventKey });
        }}
      >
        <Navbar.Brand
          className={headerStyle.brand}
          href='https://chaohuichen.github.io/PathFindingVisualizer/'
          style={{ fontWeight: 'bold', color: 'white', fontSize: '30px' }}
        >
          PathFinding Visualizer
        </Navbar.Brand>
        <button
          className={buttonStyle.startBtn}
          onClick={() => this.search(grid, start)}
        >
          <p style={{ color: 'white', fontWeight: 'bold', marginTop: '10px' }}>
            Start
          </p>
        </button>
        <button className={buttonStyle.endBtn} onClick={this.props.clear}>
          <p style={{ color: 'white', fontWeight: 'bold', marginTop: '10px' }}>
            Clear
          </p>
        </button>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#link'>Link</Nav.Link>
            <NavDropdown title={this.state.algo} id='basic-nav-dropdown'>
              <NavDropdown.Item eventKey='BreathFirstSearch'>
                Breadth First Search
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another Algo 1
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>
                Another Algo 2
              </NavDropdown.Item>

              <NavDropdown.Item href='#action/3.4'>
                Another Algo 3
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
