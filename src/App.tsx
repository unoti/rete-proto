import React from 'react';
import { useRete } from 'rete-react-plugin';
import './common.css'
import './customization/background.css'
import './App.css';
import './rete.css';
import { createEditor } from './rete';
import { FlowEditor } from './components/FlowEditor';

function App() {
  return (
    <div className="App">
      <FlowEditor />
    </div>
    );
}

export default App
