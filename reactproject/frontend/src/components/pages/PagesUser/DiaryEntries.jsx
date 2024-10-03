import React, { useState, useEffect } from "react";
import UserPageMainLayout from "../../Layouts/LayoutUser/UserPageMainLayout";
import publicIcon from "../../../assets/public.png";
import privateIcon from "../../../assets/private.png";
import { Link, useNavigate } from "react-router-dom";

const DiaryEntries = () => {
  // List of months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the current year and month
  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth(); // This gives us a 0-based index for the current month

  // List of years from 2024 to the current year
  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  );

  // State to hold the selected month and year, with the current month preselected
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]); // Preselect current month
  const [selectedYear, setSelectedYear] = useState(currentYear); // Preselect current year
  const [daysInMonth, setDaysInMonth] = useState([]);

  // Function to calculate the number of days in a month
  const getDaysInMonth = (month, year) => {
    const monthIndex = months.indexOf(month);
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  // Update days when month or year changes
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const days = getDaysInMonth(selectedMonth, selectedYear);
      setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));
    } else {
      setDaysInMonth([]);
    }
  }, [selectedMonth, selectedYear]);

  return (
    <UserPageMainLayout>
      <div>
        {/* Display Days in the Selected Month */}
        <div className="container-fluid container-md mb-2 mt-5">
          {/* Display Selected Month and Year */}
          <div className="dateContainer shadow">
            <div>
              <select
                className="dateSelector"
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map((month, index) => (
                  <option className="dateOption" key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="dateSelector"
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year, index) => (
                  <option className="dateOption" key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="container-fluid container-md">
          {daysInMonth.length > 0 && (
            <div className="row">
              {daysInMonth.map((day) => (
                <div className="col-4 col-md-3 col-lg-2 py-1">
                  <Link to="/DiaryEntry" className="text-decoration-none">
                    <div
                      className="days border rounded bg-light shadow-sm p-2"
                      key={day}
                      style={{ height: "80px" }}
                    >
                      <div className="d-flex align-items-center gap-1">
                        <p className="m-0 text-start text-secondary">{day}</p>{" "}
                        <img
                          className=""
                          src={publicIcon}
                          alt=""
                          style={{ width: "15px", height: "15px" }}
                        />
                        <img
                          className=""
                          src={privateIcon}
                          alt=""
                          style={{ width: "15px", height: "15px" }}
                        />
                      </div>
                      <h5 className="m-0 text-secondary">Journal Title</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </UserPageMainLayout>
  );
};

export default DiaryEntries;
