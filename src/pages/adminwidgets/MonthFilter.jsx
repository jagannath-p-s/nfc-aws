// src/pages/adminwidgets/MonthFilter.jsx
import React, { useState } from "react";

const MonthFilter = ({ onMonthChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(""); // State to track the selected month

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth); // Update the state
    onMonthChange(newMonth); // Call the parent function to propagate the selected month
  };

  const months = [
    { value: "", label: "All Months" },
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  return (
    <div className="mb-4">
      <label htmlFor="month-filter" className="text-lg font-semibold">
        Filter by Month Joined:
      </label>
      <select
        id="month-filter"
        value={selectedMonth}
        onChange={handleMonthChange}
        className="block w-full border border-gray-300 rounded py-2 px-3 mt-1"
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthFilter;
