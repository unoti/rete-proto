import React from 'react';
import { useRete } from 'rete-react-plugin';
import './common.css'
import './customization/background.css'
import './App.css';
import './rete.css';
import { createEditor } from './rete';

function App() {
  const [ref] = useRete(createEditor)

  return (
    <div className="App">
      <header className="App-header">
        <h2>Flow POC</h2>
        <div ref={ref} className="rete"></div>
      </header>
    </div>
  );
}

export default App
