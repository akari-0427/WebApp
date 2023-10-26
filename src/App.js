import './App.css';
import { CompanyName, GetEmployees, GetNames } from './components/API.js';
import MyComponent from './components/sihuto.js';
import Hyou from './components/syukkin';
import DateTimeDisplay from './components/time';
import ShihutoKanri from './shihutogamen';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Sakusei from './components/tukuru';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Shihuto" element={<ShihutoKanri />} />
          <Route path="/edit" element={<ShihutoKanri />} /> {/* シフト制作画面 */}
          <Route path="/create" element={<Sakusei/>} />
          <Route
            path="/"
            element={
              <>
                <CompanyName />
                <DateTimeDisplay />
                <Link to="/Shihuto">シフト管理へ</Link>
                <GetNames />
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
