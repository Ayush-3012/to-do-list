interface WeeklyProgressBarProps {
  completed: number;
  total: number;
}

export function WeeklyProgressBar({ completed, total }: WeeklyProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-slate-800">Weekly Progress</h2>
      </div>
      <div className="w-full bg-indigo-100 h-3 rounded-full overflow-hidden flex">
        <div 
          className="bg-indigo-700 h-full transition-all duration-500 ease-out rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
