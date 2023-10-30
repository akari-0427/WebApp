import {Shihuto} from "./components/sihuto";
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Seni from './components/shihutoseni'
function ShihutoKanri() {
  
  return (
    <div className="App">
      <Shihuto/>
      <Link to="/rest">休み希望</Link>
      <Seni/>
      <Link to="/">ホームへ</Link>
    </div>
  );
}

export default ShihutoKanri;
