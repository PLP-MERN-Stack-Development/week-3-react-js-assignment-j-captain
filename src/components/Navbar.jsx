import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* ... other navbar content ... */}
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-blue-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;