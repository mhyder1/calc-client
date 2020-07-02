import React, { Component } from 'react';
import './App.css';
import Button from './Components/Button';
// import { render } from '@testing-library/react';

class App extends Component {
  render() {
    return (
    <div className="app">
      <div className="calc-wrapper">
        <div className="row">
          <Button>7</Button>
          <Button>8</Button>
          <Button>9</Button>
          <Button>/</Button>
        </div>
      </div>
    </div>
  );
 };
}

export default App;
