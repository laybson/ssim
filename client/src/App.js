import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import GradePage from './pages/GradePage';
import GradeListPage from './pages/GradeListPage';
import HistoryPage from './pages/HistoryPage';
import UserPage from './pages/UserPage';

import { Provider } from 'react-redux';
import store from './store'; 
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <AppNavbar />
            <Route path="/" exact component={GradeListPage} />
            <Route path="/grade/:id" exact component={GradePage} />
            <Route path="/history" exact component={HistoryPage} />
            <Route path="/management" exact component={UserPage} />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
