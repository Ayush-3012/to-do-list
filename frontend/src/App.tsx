import { Dashboard } from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen flex justify-center bg-slate-300 sm:py-4 font-sans text-slate-800">
      <div className="w-full max-w-2xl bg-white min-h-screen sm:min-h-200 sm:max-h-[90vh] sm:rounded-2xl sm:shadow-2xl sm:overflow-hidden relative flex flex-col sm:border-4 sm:border-slate-800">
        <Dashboard />
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  )
}

export default App
