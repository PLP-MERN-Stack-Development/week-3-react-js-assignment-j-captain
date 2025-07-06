import { useState } from 'react';
import Button from '../components/Button';
import useLocalStorage from '../hooks/useLocalStorage';
import { FiTrash2, FiCheck, FiPlus, FiFilter, FiAward, FiCalendar } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const TasksPage = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const { theme } = useTheme();

  // Add new task function
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask.trim(),
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]);
      setNewTask('');
    }
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Calculate task counts
  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Calculate productivity score
  const productivityScore = tasks.length > 0 
    ? Math.round((taskCounts.completed / tasks.length) * 100) 
    : 0;

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Hero Section */}
      <div className="mb-10 text-center">
        <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-full mb-6 shadow-lg">
          <div className={`${theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm rounded-full px-8 py-4 border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'}`}>
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              Your Productivity Hub
            </h2>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-indigo-100/70'} backdrop-blur-sm border ${theme === 'dark' ? 'border-gray-700/30' : 'border-indigo-200'} shadow-md`}>
            <div className="flex items-center gap-2">
              <FiAward className="text-blue-500 text-xl" />
              <span className="font-medium text-gray-700 dark:text-gray-200">Productivity</span>
            </div>
            <div className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
              {productivityScore}%
            </div>
          </div>
          
          <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-indigo-100/70'} backdrop-blur-sm border ${theme === 'dark' ? 'border-gray-700/30' : 'border-indigo-200'} shadow-md`}>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-indigo-500 text-xl" />
              <span className="font-medium text-gray-700 dark:text-gray-200">Active Tasks</span>
            </div>
            <div className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {taskCounts.active}
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          {tasks.length === 0 
            ? "Get started by adding your first task below" 
            : `You have ${taskCounts.active} active task${taskCounts.active !== 1 ? 's' : ''} out of ${tasks.length}`}
        </p>
      </div>

      {/* Task Input Card */}
      <div className={`rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-sm ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/30' : 'bg-white/80 border-indigo-100'} border transition-all duration-300 hover:shadow-2xl`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done today?"
              className="w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/50 dark:border-gray-600/50 dark:text-white dark:placeholder-gray-400 text-lg pl-12"
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
              <FiPlus size={24} />
            </div>
          </div>
          <Button 
            onClick={addTask}
            className="flex items-center justify-center gap-2 whitespace-nowrap text-lg px-6 py-4 group"
          >
            <span className="group-hover:scale-110 transition-transform">Add Task</span>
          </Button>
        </div>
      </div>
      
      {/* Filter Controls Card */}
      <div className={`rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-sm ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/30' : 'bg-white/80 border-indigo-100'} border transition-all duration-300 hover:shadow-2xl`}>
        <div className="flex items-center gap-3 mb-5">
          <FiFilter className="text-blue-500 text-xl" />
          <span className="font-medium text-gray-700 dark:text-gray-200 text-lg">Filter Tasks</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {['all', 'active', 'completed'].map((f) => (
            <Button 
              key={f}
              variant={filter === f ? 'primary' : 'secondary'} 
              onClick={() => setFilter(f)}
              className="capitalize px-6 py-3 text-base flex-1 min-w-[140px] justify-center transform hover:-translate-y-0.5 transition-transform"
            >
              {f} <span className="ml-2 font-bold bg-white/20 dark:bg-black/20 px-2 rounded-full">({taskCounts[f]})</span>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Task List */}
      <div className="space-y-6">
        {filteredTasks.length === 0 ? (
          <div className={`text-center py-12 rounded-2xl shadow-xl backdrop-blur-sm ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/30' : 'bg-white/80 border-indigo-100'} border transition-all duration-300`}>
            <div className="text-gray-400 mb-6">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 mb-3">
              {filter === 'all' 
                ? 'Your task list is empty' 
                : `No ${filter} tasks found`}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              {filter === 'all' 
                ? 'Start by adding your first task above' 
                : 'Try changing your filters or adding new tasks'}
            </p>
            <Button 
              variant="primary"
              onClick={() => setFilter('all')}
              className="px-8 py-4 text-lg mx-auto group"
            >
              <span className="group-hover:scale-105 transition-transform">Show All Tasks</span>
            </Button>
          </div>
        ) : (
          <div className={`rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/30' : 'bg-white/80 border-indigo-100'} border transition-all duration-300 hover:shadow-2xl`}>
            <div className="p-4 bg-gradient-to-r from-blue-600/10 to-indigo-700/10 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700/50">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FiFilter className="text-blue-500" />
                Showing {filteredTasks.length} of {tasks.length} tasks
              </h3>
            </div>
            
            {filteredTasks.map((task, index) => (
              <div 
                key={task.id} 
                className={`p-5 flex items-center justify-between border-b border-gray-200 dark:border-gray-700/30 last:border-0 transition-all duration-200 ${
                  theme === 'dark' ? 'hover:bg-gray-750/50' : 'hover:bg-indigo-50/50'
                } ${index === 0 ? 'rounded-tl-2xl rounded-tr-2xl' : ''}`}
              >
                <div className="flex items-center flex-grow">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`h-9 w-9 rounded-full mr-4 flex items-center justify-center transition-all shadow-inner ${
                      task.completed 
                        ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' 
                        : 'border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 bg-white dark:bg-gray-700'
                    }`}
                  >
                    {task.completed && <FiCheck size={20} />}
                  </button>
                  <span className={`text-lg ${task.completed 
                    ? 'line-through text-gray-500 dark:text-gray-400' 
                    : 'text-gray-800 dark:text-gray-200 font-medium'}`}>
                    {task.text}
                  </span>
                </div>
                <Button 
                  variant="danger" 
                  onClick={() => deleteTask(task.id)}
                  className="p-3 rounded-xl group transform hover:rotate-6 transition-transform"
                  aria-label={`Delete task: ${task.text}`}
                >
                  <FiTrash2 size={20} className="group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Productivity Quote */}
      <div className="mt-12 text-center italic text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700/30 pt-8 max-w-2xl mx-auto">
        "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort."
      </div>
    </div>
  );
};

export default TasksPage;