import logo from './logo.svg';
import './App.css';
import 'bootstrap'
import { useState } from 'react';

function App() {
  const [weigth, setWeight] = useState(0)
  const [dose, setDose] = useState(0)

  return (
    <div className="App">
      <header className="App-header">Thien Hoang
      </header>
      <main>
        <div className='container'>
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Active</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>            
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
