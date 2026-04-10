import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    return `/dashboard/${user.role}`;
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/venues', label: 'Venues' },
    { path: '/events', label: 'Events' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="glass-card sticky top-0 z-50 mx-4 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-xl font-bold">G</span>
              </div>
              <span className="font-serif text-2xl font-bold text-gold">Gazaliano</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-gold'
                      : 'text-charcoal hover:text-gold'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Auth Dropdown */}
              <div className="relative">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="btn-secondary text-sm"
                    >
                      <User className="w-4 h-4 mr-2" />
                      {user?.firstName}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 glass-card shadow-xl">
                        <div className="py-2">
                          <Link
                            to={getDashboardPath()}
                            className="block px-4 py-2 text-sm text-charcoal hover:text-gold hover:bg-cream/50 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-charcoal hover:text-gold hover:bg-cream/50 transition-colors flex items-center"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="btn-secondary text-sm"
                    >
                      Account
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 glass-card shadow-xl">
                        <div className="py-2">
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-sm text-charcoal hover:text-gold hover:bg-cream/50 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Login
                          </Link>
                          <Link
                            to="/register"
                            className="block px-4 py-2 text-sm text-charcoal hover:text-gold hover:bg-cream/50 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Register
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-charcoal hover:text-gold transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-gold bg-cream/50'
                      : 'text-charcoal hover:text-gold hover:bg-cream/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardPath()}
                    className="block px-3 py-2 rounded-lg font-medium text-charcoal hover:text-gold hover:bg-cream/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg font-medium text-charcoal hover:text-gold hover:bg-cream/50 transition-colors flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-lg font-medium text-charcoal hover:text-gold hover:bg-cream/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-lg font-medium text-charcoal hover:text-gold hover:bg-cream/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-cream py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-sm font-bold">G</span>
              </div>
              <span className="font-serif text-xl font-bold text-gold">Gazaliano</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm">gazaliano web © 2026 - 2027</p>
              <p className="text-xs mt-1 text-cream/70">Luxury Event & Venue Management</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-cream/20 text-center">
            <p className="text-xs text-cream/70">
              Creating unforgettable moments with elegance and precision
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
