import './App.css';
import { CompanyName, GetEmployees, GetNames } from './components/API.js';
import {Rest} from './components/sihuto.js';
import Hyou from './components/syukkin';
import DateTimeDisplay from './components/time';
import ShihutoKanri from './shihutogamen';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {Sakusei ,Hensyu,Kakunin} from './components/tukuru';
import  TimeCard  from './timecard';
import Zansu from './zansu';
import {Kako} from "./components/kako";

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
          <Route path="/timecard"element={<TimeCard/>}/>
          <Route path="/zansu"element={<Zansu/>}/>
          <Route path="/Shihuto/kako"element={<Kako/>}/>
          <Route
            path="/"
            element={
              <>
                <div className='home1'>
                  <div className='home2'>
                    <Link to="/Shihuto" className='home5'>シフト管理へ</Link>
                    <Link to="/timecard" className='home5'>タイムレコーダー</Link>
                    <Link to="/zansu" className='home5'>残数確認</Link>
                  </div>
                  <div className='home3'>
                    <div className='title'>
                    <CompanyName />
                    </div>
                    <DateTimeDisplay />

                    <Hyou />
                    
                  </div>
                </div>
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
