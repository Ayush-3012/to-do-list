import { FiAlertTriangle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ isOpen, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
              <FiAlertTriangle className="text-3xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Task?</h3>
            <p className="text-sm text-slate-500">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
          </div>
          
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-white border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-rose-500 text-white font-semibold py-2.5 rounded-xl cursor-pointer hover:bg-rose-600 transition-colors shadow-md shadow-rose-500/20"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
