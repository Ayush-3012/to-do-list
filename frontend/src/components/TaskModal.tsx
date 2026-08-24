import { useState, useEffect } from 'react';
import { FiX, FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { Task, Priority, Status } from '../types/task';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  taskToEdit?: Task | null;
}

export function TaskModal({ isOpen, onClose, onSave, taskToEdit }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<Priority>('medium');
  const [status, setStatus] = useState<Status>('in-progress');

  useEffect(() => {
    if (taskToEdit && isOpen) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setDate(taskToEdit.dateTime ? new Date(taskToEdit.dateTime) : null);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
    } else if (isOpen) {
      // Reset form
      setTitle('');
      setDescription('');
      setDate(null);
      setPriority('medium');
      setStatus('in-progress');
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSave({
      ...(taskToEdit ? { _id: taskToEdit._id } : {}),
      title,
      description,
      dateTime: date ? date.toISOString() : new Date().toISOString(),
      priority,
      status
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div 
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white w-full max-w-md rounded-t-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">
              {taskToEdit ? 'Edit Task' : 'Add New Task'}
            </h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer hover:bg-slate-200 rounded-full">
              <FiX className="text-xl" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Task title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Doing Homework"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Set Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <DatePicker
                    selected={date}
                    onChange={(d: Date | null) => setDate(d)}
                    dateFormat="MMM d, yyyy"
                    placeholderText="Select a date"
                    className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    wrapperClassName="w-full"
                    required
                  />
                  <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Description</label>
                <textarea
                  placeholder="Add Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none h-24"
                ></textarea>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-2">Priority</label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as Priority[]).map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-2 cursor-pointer rounded-lg text-xs font-semibold capitalize transition-colors border ${
                        priority === p 
                          ? (p === 'high' ? 'bg-rose-500 text-white border-rose-500' : p === 'medium' ? 'bg-amber-500 text-white border-amber-500' : 'bg-blue-500 text-white border-blue-500') 
                          : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {taskToEdit && (
                <div>
                   <label className="block text-[11px] font-semibold text-slate-500 mb-2">Status</label>
                   <div className="flex gap-2">
                     <button
                        type="button"
                        onClick={() => setStatus('in-progress')}
                        className={`flex-1 py-2 cursor-pointer rounded-lg text-xs font-semibold capitalize transition-colors border ${status === 'in-progress' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                     >
                       In Progress
                     </button>
                     <button
                        type="button"
                        onClick={() => setStatus('completed')}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-colors border ${status === 'completed' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 cursor-pointer border-slate-200 hover:bg-slate-50'}`}
                     >
                       Completed 
                     </button>
                   </div>
                </div>
              )}
            </form>
          </div>
          
          <div className="p-4 border-t border-slate-100 bg-white">
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl cursor-pointer transition-colors shadow-md text-sm"
            >
              {taskToEdit ? 'Save Changes' : 'Create task'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
