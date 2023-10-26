import Shihuto from "./components/sihuto";
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
function ShihutoKanri() {

  return (
    <div className="App">
      <Shihuto/>
      <Link to="/">ホームへ</Link>
    </div>
  );
}

export default ShihutoKanri;
