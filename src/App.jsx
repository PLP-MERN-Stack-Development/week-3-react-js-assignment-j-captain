import { Routes, Route } from 'react-router-dom';
import TasksPage from './pages/TasksPage.jsx';
import { useTheme } from './context/ThemeContext';
import { FiSun, FiMoon, FiGithub } from 'react-icons/fi';
 
function App() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full ${
              theme === 'dark' 
                ? 'bg-blue-900/20' 
                : 'bg-indigo-200/50'
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              animation: `pulse ${Math.random() * 8 + 4}s infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center md:justify-start">
                <span className="mr-3 bg-white/20 p-2 rounded-full">✅</span> 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                  Task Manager Pro
                </span>
              </h1>
              <p className="text-blue-100 mt-2 opacity-90">Organize your work efficiently</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all flex items-center shadow-lg transform hover:scale-105 duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? 
                  <><FiMoon size={18} className="mr-2"/> Dark Mode</> : 
                  <><FiSun size={18} className="mr-2"/> Light Mode</>
                }
              </button>
              
              <div className="flex space-x-3">
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer" 
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all shadow-lg backdrop-blur-sm transform hover:scale-110 duration-300">
                  <img src="/vite.svg" className="h-6" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer" 
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all shadow-lg backdrop-blur-sm transform hover:scale-110 duration-300">
                  <img src="/src/assets/react.svg" className="h-6" alt="React logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full relative z-10 py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="*" element={
              <div className="text-center py-16">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-1 rounded-2xl inline-block mb-6 shadow-xl">
                  <div className="bg-white dark:bg-gray-800/90 backdrop-blur-sm px-8 py-10 rounded-2xl border border-white/30 dark:border-gray-700/50">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">404 - Page Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                      The page you're looking for doesn't exist or has been moved.
                    </p>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-8 relative z-10 ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm border-t ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <div className="flex flex-col items-center">
            <div className="flex space-x-6 mb-4">
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                About
              </a>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                Contact
              </a>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                Privacy
              </a>
            </div>
            
            <p className={`mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Built with Vite, React & Tailwind CSS
            </p>
            
            <a 
              href="https://github.com/your-repo" 
              target="_blank" 
              rel="noreferrer"
              className="mt-3 inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              <FiGithub className="mr-2" /> View on GitHub
            </a>
            
            <p className={`mt-4 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              © {new Date().getFullYear()} Task Manager Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;