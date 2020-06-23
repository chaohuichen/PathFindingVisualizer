import React from 'react';
import { connect } from 'react-redux';
import { clear, colorize, paintPath, clearPath } from '../store/store';
import { bfsAnimation } from './BFS';
import { DijstraAnimation } from './Dijstra';

import headerStyle from './header.module.css';
import buttonStyle from './button.module.scss';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

import { store } from 'react-notifications-component';
class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      algo: 'Algorithms',
      startVisualize: false,
    };
  }
  warning = () => {
    store.addNotification({
      title: 'No Algo selected',
      message: 'Please Select an algorithm to run the visualizer',
      type: 'danger',
      container: 'top-left',
      insert: 'top',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 2000,
      },
      width: 400,
    });
  };
  startAnimation = async (grid, start, end) => {
    switch (this.state.algo) {
      case 'BreathFirstSearch':
        this.setState({ startVisualize: true });
        await bfsAnimation(grid, start, this.props.paint, this.props.paintPath);
        break;
      case "Dijkstra's Algorithm":
        this.setState({ startVisualize: true });
        await DijstraAnimation(
          grid,
          start,
          end,
          this.props.paint,
          this.props.paintPath
        );
        break;
      default:
        this.warning();
        break;
    }
    this.setState({ startVisualize: false });
  };

  render() {
    const { grid, start, end } = this.props;

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

        <a
          href='#start'
          role='button'
          className={buttonStyle.startBtn}
          onClick={() => {
            if (!this.state.startVisualize) {
              this.startAnimation(grid, start, end);
            }
          }}
          style={{ textDecoration: 'none' }}
        >
          <p className={buttonStyle.buttonText}>Start</p>
        </a>
        <a
          href='#clear'
          role='button'
          className={buttonStyle.endBtn}
          onClick={() => {
            if (!this.state.startVisualize) {
              this.props.clear();
            }
          }}
          style={{ textDecoration: 'none' }}
        >
          <p className={buttonStyle.buttonText} style={{ marginLeft: '12px' }}>
            Clear
          </p>
        </a>
        <a
          href='#start'
          role='button'
          className={buttonStyle.push}
          onClick={() => {
            if (!this.state.startVisualize) {
              this.props.clearPath();
            }
            return false;
          }}
          style={{ textDecoration: 'none' }}
        >
          <p
            className={buttonStyle.buttonText}
            style={{ marginLeft: '13px', marginTop: '8px' }}
          >
            Clear Path
          </p>
        </a>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            {/* <Nav.Link href='#link'>Link</Nav.Link> */}
            {/* <div className={headerStyle.text}>{this.state.algo}</div> */}
            <NavDropdown
              title={
                <span className={headerStyle.headertitle}>
                  {this.state.algo}
                </span>
              }
              id='basic-nav-dropdown'
            >
              <NavDropdown.Item
                className={headerStyle.navitem}
                eventKey='BreathFirstSearch'
              >
                Breadth First Search
              </NavDropdown.Item>
              <NavDropdown.Item
                className={headerStyle.navitem}
                eventKey='DepthFirstSearch'
              >
                Depth First Search
              </NavDropdown.Item>
              <NavDropdown.Item
                className={headerStyle.navitem}
                eventKey='A * Algorithm'
              >
                A * Algorithm
              </NavDropdown.Item>

              <NavDropdown.Item
                className={headerStyle.navitem}
                eventKey="Dijkstra's Algorithm"
              >
                Dijkstra's Algorithm
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
    clearPath: () => dispatch(clearPath()),
  };
};

export default connect(mapState, mapDispatch)(Header);
