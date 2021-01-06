import React from 'react';
import './App.css';
import { Home } from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ShowItems } from './components/ShowItems/ShowItems';
import { CreateItem } from './components/Create/CreateItem';
import { EditItem } from './components/Edit/EditItem';
import AppNavbar from './components/AppNavbar/AppNavbar';
import { loadUser } from './Actions/authActions'
import { Provider } from 'react-redux'
import { Container } from 'reactstrap'
import store from './store';
import ShoppingList from './components/ShoppingList/ShoppingList';
import ItemModel from './components/AddItem/ItemModal'



class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModel />
            <ShoppingList />
          </Container>
        </div>
      </Provider >
    );
  }
}

export default App;
