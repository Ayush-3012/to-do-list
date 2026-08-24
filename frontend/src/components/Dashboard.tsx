import { useState, useMemo } from 'react';
import { FiPlus } from 'react-icons/fi';
import { SearchHeader } from './SearchHeader';
import { WeeklyDateSelector } from './WeeklyDateSelector';
import { TaskSummaryCards } from './TaskSummaryCards';
import { WeeklyProgressBar } from './WeeklyProgressBar';
import { TaskItem } from './TaskItem';
import { TaskModal } from './TaskModal';
import { Loader } from './Loader';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import type { Task } from '../types/task';
import { AnimatePresence } from 'framer-motion';
import { useTasks } from '../hooks/useTasks';

export function Dashboard() {
  const { tasks, isLoading, error, toggleTaskStatus, deleteTask, saveTask } = useTasks();
  const [keyword, setKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDeleteId, setTaskToDeleteId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const completedAll = tasks.filter(t => t.status === 'completed').length;
  const pendingAll = tasks.filter(t => t.status === 'in-progress').length;
  const totalCount = tasks.length;

  // Calculate current week (Sunday to Saturday)
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const tasksThisWeek = tasks.filter(t => {
    const d = new Date(t.dateTime);
    return d >= startOfWeek && d <= endOfWeek;
  });

  const completedThisWeek = tasksThisWeek.filter(t => t.status === 'completed').length;
  const pendingThisWeek = tasksThisWeek.filter(t => t.status === 'in-progress').length;

  const filteredTasks = useMemo(() => {
    if (keyword) {
      return tasks.filter(t => t.title.toLowerCase().includes(keyword.toLowerCase()));
    }
    
    // Filter by selected date
    return tasks.filter(t => {
      const taskDate = new Date(t.dateTime);
      return (
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [tasks, keyword, selectedDate]);

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    await saveTask(taskData);
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      <div className="p-6 pb-24 overflow-y-auto flex-1 no-scrollbar">
        <SearchHeader onSearch={setKeyword} />
        
        {!keyword && (
          <>
            <WeeklyDateSelector 
              selectedDate={selectedDate} 
              onSelectDate={setSelectedDate} 
              tasks={tasks}
            />
            <TaskSummaryCards 
              completedThisWeek={completedThisWeek} 
              pendingThisWeek={pendingThisWeek}
              completedAll={completedAll}
              pendingAll={pendingAll} 
            />
            <WeeklyProgressBar completed={completedAll} total={totalCount} />
          </>
        )}

        <div className="mt-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              {keyword ? 'Search Results' : 'Tasks Today'}
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 py-4 bg-white/50 backdrop-blur-sm rounded-t-3xl shadow-inner relative">
            {isLoading ? (
              <div className="py-10">
                <Loader size={45} color="#4f46e5" stroke={4} />
              </div>
            ) : error ? (
              <div className="text-center py-10 text-rose-500 text-sm">
                {error}
              </div>
            ) : (
              <AnimatePresence>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <TaskItem 
                      key={task._id} 
                      task={task} 
                      onToggle={toggleTaskStatus}
                      onEdit={openEditModal}
                      onDelete={(id) => setTaskToDeleteId(id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400 text-sm">
                    No tasks found.
                  </div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
        <button 
          onClick={openCreateModal}
          className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all pointer-events-auto cursor-pointer shadow-indigo-600/30"
        >
          <FiPlus className="text-2xl" />
        </button>
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      <DeleteConfirmModal 
        isOpen={taskToDeleteId !== null}
        onCancel={() => setTaskToDeleteId(null)}
        onConfirm={() => {
          if (taskToDeleteId) {
            deleteTask(taskToDeleteId);
            setTaskToDeleteId(null);
          }
        }}
      />
    </div>
  );
}
