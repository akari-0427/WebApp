import Shihuto from "./components/sihuto";
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Seni from './components/shihutoseni'
function ShihutoKanri() {

  return (
    <div className="App">
      <Shihuto/>
      <Seni/>
      <Link to="/">ホームへ</Link>
    </div>
  );
}

export default ShihutoKanri;
