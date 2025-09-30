import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Button from './Button';
import { useState } from 'react';

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container-page max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-bold text-xl">PetsCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-brand-300 transition-colors">HOME</Link>
            <Link to="/about" className="hover:text-brand-300 transition-colors">ABOUT US</Link>
            <Link to="/services" className="hover:text-brand-300 transition-colors">SERVICES</Link>
            <div className="relative group">
              <button className="hover:text-brand-300 transition-colors flex items-center gap-1">
                PAGES
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 transform transition-all duration-200 z-50">
                <div className="py-2">
                  <Link to="/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">All Services</Link>
                  <Link to="/book" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Book Appointment</Link>
                  <Link to="/history" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Booking History</Link>
                  <Link to="/bills" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Bills & Payments</Link>
                </div>
              </div>
            </div>
            <Link to="/contact" className="hover:text-brand-300 transition-colors">CONTACT US</Link>
          </nav>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-4">
            {/* Dark mode toggle */}
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors" aria-label="Toggle dark mode">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            {/* Auth buttons */}
            {token ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">Hi {user?.full_name?.split(' ')[0]}</span>
                <Button onClick={logout} variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-outline border-gray-600 text-white hover:bg-gray-800">
                  Login
                </Link>
                <Link to="/register" className="btn bg-brand-600 hover:bg-brand-700 text-white">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700 py-4 transition-all">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-brand-300 transition-colors py-2">HOME</Link>
              <Link to="/about" className="hover:text-brand-300 transition-colors py-2">ABOUT US</Link>
              <Link to="/services" className="hover:text-brand-300 transition-colors py-2">SERVICES</Link>
              <Link to="/book" className="hover:text-brand-300 transition-colors py-2">BOOK APPOINTMENT</Link>
              <Link to="/history" className="hover:text-brand-300 transition-colors py-2">BOOKING HISTORY</Link>
              <Link to="/bills" className="hover:text-brand-300 transition-colors py-2">BILLS & PAYMENTS</Link>
              <Link to="/contact" className="hover:text-brand-300 transition-colors py-2">CONTACT US</Link>
              
              <div className="pt-4 border-t border-gray-700">
                {token ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-300">Hi {user?.full_name?.split(' ')[0]}</span>
                    <Button onClick={logout} variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/login" className="btn btn-outline border-gray-600 text-white hover:bg-gray-800 text-center">
                      Login
                    </Link>
                    <Link to="/register" className="btn bg-brand-600 hover:bg-brand-700 text-white text-center">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
