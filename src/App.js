import './App.css';
import { CompanyName, GetEmployees, GetNames } from './components/API.js';
import {Rest} from './components/sihuto.js';
import Hyou from './components/syukkin';
import DateTimeDisplay from './components/time';
import ShihutoKanri from './shihutogamen';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {Sakusei ,Hensyu,Kakunin} from './components/tukuru';
import { TimeCard } from './timecard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Shihuto" element={<ShihutoKanri />} />
          <Route path="/edit" element={<Hensyu/>} /> {/* シフト制作画面 */}
          <Route path="/create" element={<Sakusei/>} />
          <Route path="/confirm" element={<Kakunin/>} />
          <Route path="/rest" element={<Rest/>} />
          <Route path="/timecard"element={TimeCard}/>
          <Route
            path="/"
            element={
              <>
                <CompanyName />
                <DateTimeDisplay />
                <Link to="/Shihuto">シフト管理へ</Link>
                <Link to="/timecard">タイムレコーダー</Link>
                
                <Hyou />
                {/* リンクをクリックすると画面遷移 */}
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
