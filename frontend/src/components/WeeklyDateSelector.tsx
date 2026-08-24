import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Task } from '../types/task';

interface WeeklyDateSelectorProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  tasks: Task[];
}

export function WeeklyDateSelector({ selectedDate, onSelectDate, tasks }: WeeklyDateSelectorProps) {
  const [weekStart, setWeekStart] = useState<Date>(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day; // Adjust when day is Sunday
    return new Date(today.setDate(diff));
  });

  // Ensure selectedDate updates weekStart if it's out of bounds
  // useEffect(() => {
  //   // Check if selectedDate is within the current weekStart view
  //   // const selectedTime = selectedDate.getTime();
  //   // const weekStartTime = weekStart.getTime();
  //   // const weekEndTime = weekStartTime + 7 * 24 * 60 * 60 * 1000;
    
  //   // If not, we could update it, but for simplicity we let user manually change weeks
  // }, [selectedDate, weekStart]);

  const changeWeek = (offset: number) => {
    const newWeekStart = new Date(weekStart);
    newWeekStart.setDate(weekStart.getDate() + offset * 7);
    setWeekStart(newWeekStart);
  };

  const getWeekDays = () => {
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      
      const isSameDate = 
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();

      const taskCount = tasks.filter(t => {
        const taskDate = new Date(t.dateTime);
        return (
          taskDate.getDate() === date.getDate() &&
          taskDate.getMonth() === date.getMonth() &&
          taskDate.getFullYear() === date.getFullYear()
        );
      }).length;

      days.push({
        dateObj: date,
        dayStr: dayNames[i],
        dateNum: date.getDate().toString().padStart(2, '0'),
        isActive: isSameDate,
        taskCount,
      });
    }
    return days;
  };

  const weekDays = getWeekDays();

  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between items-center mb-2 px-1">
        <button 
          onClick={() => changeWeek(-1)}
          className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <span className="text-sm font-semibold text-slate-700">
          {weekStart.toLocaleString('default', { month: 'short' })} {weekStart.getFullYear()}
        </span>
        <button 
          onClick={() => changeWeek(1)}
          className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <FiChevronRight className="text-xl" />
        </button>
      </div>

      <div className="flex justify-between items-center py-2">
        {weekDays.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelectDate(item.dateObj)}
            className={`relative flex flex-col items-center justify-center w-12 h-16 rounded-xl transition-colors cursor-pointer ${
              item.isActive
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-100'
            }`}
          >
            {item.taskCount > 0 && (
              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
                item.isActive ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-600'
              }`}>
                {item.taskCount}
              </div>
            )}
            <span className="text-xs font-medium mb-1">{item.dayStr}</span>
            <span
              className={`text-sm font-semibold ${
                item.isActive ? 'text-white' : 'text-slate-700'
              }`}
            >
              {item.dateNum}
            </span>
            {item.isActive && <div className="w-1 h-1 bg-white rounded-full mt-1"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
