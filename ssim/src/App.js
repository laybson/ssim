import React from 'react';
import AppNavbar from './components/AppNavbar';
import GradeList from './components/GradeList';
import GradeModal from './components/GradeModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <GradeModal />
          <GradeList />
        </Container>
           
      </div>
    </Provider>
  );
}

export default App;
