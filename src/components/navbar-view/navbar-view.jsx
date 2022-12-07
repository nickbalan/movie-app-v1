import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  render() {
    const { user } = this.props;
    const movies = `/`;
    const profile = `/users/${user}`;

    if (!user) return null;

    return (
      <React.Fragment>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Movie App v1
            </Typography>
            <nav className="navbar-div">
              <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                  <Nav className='ml-auto'>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                    <Nav.Link as={Link} to={movies} className='link-text'>
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to={profile} className='link-text'>
                      Profile
                    </Nav.Link>
                    <Nav.Link onClick={this.onLoggedOut}>
                      Log Out
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar >
            </nav>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
  }
}

export default NavBar;