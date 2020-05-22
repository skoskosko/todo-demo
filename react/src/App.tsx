import React from 'react';
// @ts-ignore
import logo from './logo.svg';
import HeaderBar from './components/HeaderBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeaderBar></HeaderBar>
      <header className="App-header">
        Notes will be rendered
      </header>
    </div>
  );
}

export default App;
