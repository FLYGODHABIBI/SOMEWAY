import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Vote, LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const NavLink: React.FC<{ to: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ 
    to, 
    children, 
    icon 
  }) => (
    <Link
      to={to}
      onClick={() => setIsOpen(false)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive(to)
          ? 'bg-primary-700 text-white'
          : 'text-gray-300 hover:bg-primary-600 hover:text-white'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );

  return (
    <nav className="bg-primary-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Vote className="h-8 w-8 text-primary-300" />
              <span className="text-white text-xl font-bold">UniVote</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login" icon={<User className="h-4 w-4" />}>
                  Student Login
                </NavLink>
                <NavLink to="/admin-login" icon={<Shield className="h-4 w-4" />}>
                  Admin Login
                </NavLink>
              </>
            ) : user.role === 'admin' ? (
              <>
                <NavLink to="/candidates">Manage Candidates</NavLink>
                <NavLink to="/results">Election Results</NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink to="/vote">Vote</NavLink>
                <NavLink to="/results">Results</NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-900">
            {!user ? (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login" icon={<User className="h-4 w-4" />}>
                  Student Login
                </NavLink>
                <NavLink to="/admin-login" icon={<Shield className="h-4 w-4" />}>
                  Admin Login
                </NavLink>
              </>
            ) : user.role === 'admin' ? (
              <>
                <NavLink to="/candidates">Manage Candidates</NavLink>
                <NavLink to="/results">Election Results</NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink to="/vote">Vote</NavLink>
                <NavLink to="/results">Results</NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;