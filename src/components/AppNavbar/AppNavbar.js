import React, { Fragment, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'react-bootstrap';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ShowItems } from '../../components/ShowItems/ShowItems';
import { CreateItem } from '../../components/Create/CreateItem';
import { EditItem } from '../../components/Edit/EditItem';
import { Home } from '../../components/Home/Home';
import Register from '../Auth/Register'
import Logout from '../Auth/Logout'



class AppNavbar extends React.Component {
  render() {
    return (

      //All the components are loaded underneath navBar
      <Router>
        <div className="App">
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">WoW Items</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/items">Search Items</Nav.Link>
              <Nav.Link href="/create">Create Items</Nav.Link>
              <Register></Register>

              <NavItem>
                <Logout></Logout>
              </NavItem>
            </Nav>
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


export default AppNavbar;