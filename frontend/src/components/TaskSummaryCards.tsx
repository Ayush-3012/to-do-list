import { FiCheckSquare, FiXSquare } from 'react-icons/fi';

interface TaskSummaryCardsProps {
  completedThisWeek: number;
  pendingThisWeek: number;
  completedAll: number;
  pendingAll: number;
}

export function TaskSummaryCards({ completedThisWeek, pendingThisWeek, completedAll, pendingAll }: TaskSummaryCardsProps) {
  return (
    <div className="flex gap-4 my-6">
      <div className="flex-1 bg-indigo-50 rounded-2xl p-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 text-indigo-900">
          <div className="bg-indigo-200 p-1.5 rounded-md">
            <FiCheckSquare className="text-indigo-600 text-lg" />
          </div>
          <span className="text-xs font-semibold">Task Complete</span>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-800">{completedThisWeek.toString().padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-500 font-medium">This Week</span>
          </div>
          <div className="text-[10px] font-semibold text-indigo-700/70 bg-indigo-200/50 px-2 py-1 rounded-md">
            Total: {completedAll}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-rose-50 rounded-2xl p-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 text-rose-900">
          <div className="bg-rose-200 p-1.5 rounded-md">
             <FiXSquare className="text-rose-600 text-lg" />
          </div>
          <span className="text-xs font-semibold">Task Pending</span>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-800">{pendingThisWeek.toString().padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-500 font-medium">This Week</span>
          </div>
          <div className="text-[10px] font-semibold text-rose-700/70 bg-rose-200/50 px-2 py-1 rounded-md">
            Total: {pendingAll}
          </div>
        </div>
      </div>
    </div>
  );
}
