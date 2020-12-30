import React from 'react';
import './App.css';
import { Home } from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ShowItems } from './components/ShowItems';
import { CreateItem } from './components/Create/CreateItem';
import { EditItem } from './components/Edit/EditItem';


class App extends React.Component {
  render() {
    return (
       //All the components are loaded underneath navBar
      <Router>
        <div className="App"> 
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">WoW Items</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/read">Search Items</Nav.Link>
              <Nav.Link href="/create">Create Items</Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
            <Route path='/' component={Home} exact></Route>
            <Route path='/read' component={ShowItems}></Route>        
            <Route path='/create' component={CreateItem}></Route>
            <Route path='/edit/:id' component={EditItem}></Route>
          </Switch>
        </div>
      </Router>
      //When we go to home its calling the component content
      //When we go to read its calling the component read
      //When we go to create its calling the component create
    );
  }
}

export default App;
