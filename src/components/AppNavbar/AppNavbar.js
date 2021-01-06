import React, { Fragment } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ShowItems } from '../../components/ShowItems/ShowItems';
import { CreateItem } from '../../components/Create/CreateItem';
import { EditItem } from '../../components/Edit/EditItem';
import { Home } from '../../components/Home/Home';
import Register from '../Auth/Register'
import Logout from '../Auth/Logout'
import Login from '../Auth/Login';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'



class AppNavbar extends React.Component {
  state = {
    isOpen: false
  }
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout></Logout>
        </NavItem>
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <NavItem>
          <Register>Register</Register>
        </NavItem>
        <NavItem>
          <Login>Login</Login>
        </NavItem>
      </Fragment>
    )

    return (

      //All the components are loaded underneath navBar
      <Router>
        <div className="App" >
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">WoW Items</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/items">Search Items</Nav.Link>
              <Nav.Link href="/create">Add Items</Nav.Link>

            </Nav>
            <Nav className='ml-auto'>{isAuthenticated ? authLinks : guestLinks}</Nav>
          </Navbar>
          <Switch>
            <Route path='/' component={Home} exact></Route>
            <Route path='/items' component={ShowItems}></Route>
            <Route path='/create' component={CreateItem}></Route>
            <Route path='/edit/:id' component={EditItem}></Route>
          </Switch>
        </div>
      </Router>

    )

  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);