import React, { useState } from "react";

const ScheduleInterview: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = {
    "Monday, July 24": ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
    "Sunday, July 30": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
  };

  const handleSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleCustomRequest = () => {
    alert("Custom time request submitted!");
  };

  return (
    <div className="bg-white p-6 mt-4 rounded-xl shadow space-y-6">
      {Object.entries(timeSlots).map(([date, slots]) => (
        <div key={date}>
          <h4 className="font-semibold text-gray-800 mb-3">{date}</h4>
          <div className="flex justify-between flex-wrap gap-2">
            {slots.map((time) => (
              <button
                key={time}
                onClick={() => handleSelect(time)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium flex-1 min-w-[22%]
                  ${selectedTime === time
                    ? "bg-primary-600 text-white border-primary-600"
                    : "border-gray-300 text-gray-700 hover:bg-primary-50"
                  }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="flex">
        <button
          onClick={handleCustomRequest}
          className="px-6 py-2 mt-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Request Custom Time
        </button>
      </div>
    </div>
  );
};

export default ScheduleInterview;
