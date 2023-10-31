import {Shihuto} from "./components/sihuto";
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Seni from './components/shihutoseni'
function ShihutoKanri() {
  
  return (
    <div className="App">
      <Shihuto/>
      <Link to="/rest" className="lin">休み希望</Link>
      <Seni/>
      <Link to="kako" className="lin">過去のシフト</Link>

      <Link to="/" className="lin">ホームへ</Link>
    </div>
  );
}

export default ShihutoKanri;
