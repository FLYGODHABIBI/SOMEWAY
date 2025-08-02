import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import CandidatesPage from './pages/CandidatesPage';
import ResultsPage from './pages/ResultsPage';
import VotePage from './pages/VotePage';

// Protected Route component for authenticated users
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  adminOnly?: boolean 
}> = ({ children, adminOnly = false }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/vote" replace />;
  }

  return <>{children}</>;
};

// Public Route component (redirect if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (user) {
    if (user.role === 'admin') {
      return <Navigate to="/candidates" replace />;
    } else {
      return <Navigate to="/vote" replace />;
    }
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            user ? (
              user.role === 'admin' ? (
                <Navigate to="/candidates" replace />
              ) : (
                <Navigate to="/vote" replace />
              )
            ) : (
              <LandingPage />
            )
          } 
        />
        
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/admin-login" 
          element={
            <PublicRoute>
              <AdminLoginPage />
            </PublicRoute>
          } 
        />

        {/* Protected Student Routes */}
        <Route 
          path="/vote" 
          element={
            <ProtectedRoute>
              <VotePage />
            </ProtectedRoute>
          } 
        />

        {/* Protected Admin Routes */}
        <Route 
          path="/candidates" 
          element={
            <ProtectedRoute adminOnly>
              <CandidatesPage />
            </ProtectedRoute>
          } 
        />

        {/* Results page accessible to both students and admins */}
        <Route 
          path="/results" 
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          } 
        />

        {/* Catch all route - redirect to appropriate dashboard */}
        <Route 
          path="*" 
          element={
            user ? (
              user.role === 'admin' ? (
                <Navigate to="/candidates" replace />
              ) : (
                <Navigate to="/vote" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
