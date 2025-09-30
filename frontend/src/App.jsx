import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Homepage from './pages/Homepage.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Book from './pages/Book.jsx';
import History from './pages/History.jsx';
import Bills from './pages/Bills.jsx';
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';
import useNotifications from './hooks/useNotifications';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

function Protected({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function Layout({ children }) {
  useNotifications();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout><Homepage /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/book" element={<Layout><Protected><Book /></Protected></Layout>} />
        <Route path="/history" element={<Layout><Protected><History /></Protected></Layout>} />
        <Route path="/bills" element={<Layout><Protected><Bills /></Protected></Layout>} />
      </Routes>
    </AuthProvider>
  );
}


