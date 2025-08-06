import React from 'react';

// A more user-friendly Date of Birth selector
export default function DobPicker({ value, onChange }) {
  const [day, month, year] = value ? value.split('-') : ['', '', ''];

  const handleDateChange = (part, val) => {
    let newDay = day, newMonth = month, newYear = year;
    if (part === 'day') newDay = val;
    if (part === 'month') newMonth = val;
    if (part === 'year') newYear = val;
    // Pass the formatted date string back to the parent
    onChange({ target: { name: 'dob', value: `${newDay}-${newMonth}-${newYear}` } });
  };
  
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i - 18);

  return (
    <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <div className="mt-1 grid grid-cols-3 gap-3">
            <select name="day" value={day} onChange={(e) => handleDateChange('day', e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6b2184] focus:ring-[#6b2184]">
                <option value="">Day</option>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select name="month" value={month} onChange={(e) => handleDateChange('month', e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6b2184] focus:ring-[#6b2184]">
                <option value="">Month</option>
                {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
            </select>
            <select name="year" value={year} onChange={(e) => handleDateChange('year', e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6b2184] focus:ring-[#6b2184]">
                <option value="">Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
        </div>
    </div>
  );
}
