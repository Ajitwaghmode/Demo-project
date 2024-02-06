
import './App.css';

import AttendanceTable from '../src/Components/week/AttendanceTable';
import attendanceData from './Components/attendanceData.json';
import Header from './Components/Home/Header';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <Header /> */}
      <AttendanceTable data={attendanceData} />
        
      {/* </header> */}
    </div>
  );
}

export default App;
