import React, { useState, useEffect } from 'react';
import './AttendanceTable.css'; // Import your CSS file

const AttendanceTable = ({ data }) => {
  const defaultStartDate = new Date('2024-02-01'); // Set default start date
  const defaultEndDate = new Date('2024-02-7');   // Set default end date

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Logic to filter data based on selected week
    const filteredData = data.employees.map((employee) => {
      const filteredAttendance = {};
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().split('T')[0];
        filteredAttendance[formattedDate] = employee.attendance[formattedDate] || false;
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return { ...employee, attendance: filteredAttendance };
    });

    setTableData(filteredData);
  }, [startDate, endDate, data]);

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };

  const getDayDateHeaders = () => {
    const headers = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      const date = currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
      headers.push(
        <th key={currentDate.getTime()}>{`${day} ${date}`}</th>
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return headers;
  };

  return (
    <div className="attendance-container">
      <div className="week-selector" >
        <h4>Select Date</h4>
        <label htmlFor="start-date">Start Date:</label>
        <input type="date" id="start-date"  onChange={handleStartDateChange} value={startDate.toISOString().split('T')[0]} />
        <label htmlFor="end-date" >  End Date:</label>
        <input type="date" id="end-date"  onChange={handleEndDateChange} value={endDate.toISOString().split('T')[0]} />
      </div>
      <h2> Weekly Attendance</h2>
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Name</th>
              {/* Render day and date headers */}
              {startDate && endDate && getDayDateHeaders()}
            </tr>
            
          </thead>
          <tbody>
            {/* Render employee rows */}
            {tableData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                {/* Render attendance for each day */}
                {startDate &&
                  endDate &&
                  Object.values(employee.attendance).map((present, index) => (
                    <td key={index} className={present ? 'present' : 'absent'}>
                      {present ? 'Present' : 'Absent'}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
