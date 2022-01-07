import React from 'react';
import './App.css';
import { InputWithAutocomplete } from './components/InputWithAutocomplete';

function App() {
  return (
    <div className="container">
      <InputWithAutocomplete name="search pokemon" role="combobox"/>
    </div>
  );
}

export default App;
