import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar/AppNavbar';
import { loadUser } from './Actions/authActions'
import { Provider } from 'react-redux'
import { Container } from 'reactstrap'
import store from './store';
import background from "./img/background.jpg";



class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App" style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
        }}>
          <AppNavbar />
          <Container>
          </Container>
        </div>
      </Provider >
    );
  }
}

export default App;
