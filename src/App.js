import './App.css';
import { CompanyName, GetEmployees ,GetNames} from './components/API.js';
import MyComponent from './components/sihuto.js';
import Hyou from './components/syukkin'

function App() {

  return (
    <div className="App">
      <GetNames/>
      <Hyou/>
      
    </div>
  );
}

export default App;
