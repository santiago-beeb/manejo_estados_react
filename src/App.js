import { UseState } from './UseState.jsx'
import { ClassState } from './ClassState.jsx'
import { UseReducer } from './UseReducer.jsx'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Codigos de seguirdad</h1>
        <UseState name={'Use State'} /> {/* para los hooks las propiedades se mandam por argumentos */}
        <UseReducer name={'Use Reducer'} /> {/*  */}
        <ClassState name={'Class State'} /> {/* para las clases las propiedades son con this.props.(propiedad) */}
      </header>
    </div>
  );
}

export default App;
