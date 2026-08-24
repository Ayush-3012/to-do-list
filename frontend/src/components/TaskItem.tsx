import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { Task } from '../types/task';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const isCompleted = task.status === 'completed';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 group"
    >
      <div className="flex items-center gap-3 flex-1 overflow-hidden cursor-pointer" onClick={() => onToggle(task._id)}>
        <div 
          className={`shrink-0 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
            isCompleted 
              ? 'bg-indigo-500 border-indigo-500' 
              : 'border-slate-300'
          }`}
        >
          {isCompleted && (
             <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
             </svg>
          )}
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold truncate transition-colors ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
              {task.title}
            </span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0 ${
              task.priority === 'high' ? 'bg-rose-100 text-rose-600' : 
              task.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 
              'bg-blue-100 text-blue-600'
            }`}>
              {task.priority}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4 text-slate-300">
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(task._id); }}
          className="hover:text-rose-500 transition-colors cursor-pointer p-1"
        >
          <FiTrash2 className="text-[1.1rem]" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(task); }}
          className="hover:text-indigo-500 cursor-pointer transition-colors p-1"
        >
          <FiEdit2 className="text-[1.1rem]" />
        </button>
      </div>
    </motion.div>
  );
}
