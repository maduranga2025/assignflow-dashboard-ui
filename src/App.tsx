
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';

// Landing and Auth Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFound from './pages/NotFound';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import UploadAssignmentPage from './pages/client/UploadAssignmentPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Writer Pages
import WriterDashboard from './pages/writer/WriterDashboard';

const queryClient = new QueryClient();

// Role-based route guard
const RoleRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    return <Navigate to={`/${user.role}-dashboard`} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  // Redirect based on role
  const getRedirectPath = () => {
    if (!user) return '/';
    
    switch (user.role) {
      case 'client':
        return '/client-dashboard';
      case 'admin':
        return '/admin-dashboard';
      case 'writer':
        return '/writer-dashboard';
      default:
        return '/';
    }
  };
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <MainLayout>
          <LandingPage />
        </MainLayout>
      } />
      
      <Route path="/login" element={
        <MainLayout>
          <LoginPage />
        </MainLayout>
      } />
      
      <Route path="/register" element={
        <MainLayout>
          <RegisterPage />
        </MainLayout>
      } />
      
      {/* Client Routes */}
      <Route path="/client-dashboard" element={
        <MainLayout requireAuth allowedRoles={['client']}>
          <RoleRoute allowedRoles={['client']}>
            <ClientDashboard />
          </RoleRoute>
        </MainLayout>
      } />
      
      <Route path="/upload-assignment" element={
        <MainLayout requireAuth allowedRoles={['client']}>
          <RoleRoute allowedRoles={['client']}>
            <UploadAssignmentPage />
          </RoleRoute>
        </MainLayout>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={
        <MainLayout requireAuth allowedRoles={['admin']}>
          <RoleRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleRoute>
        </MainLayout>
      } />
      
      {/* Writer Routes */}
      <Route path="/writer-dashboard" element={
        <MainLayout requireAuth allowedRoles={['writer']}>
          <RoleRoute allowedRoles={['writer']}>
            <WriterDashboard />
          </RoleRoute>
        </MainLayout>
      } />
      
      {/* Redirect from '/' based on role */}
      <Route path="/dashboard" element={<Navigate to={getRedirectPath()} replace />} />
      
      {/* Catch-all route */}
      <Route path="*" element={
        <MainLayout>
          <NotFound />
        </MainLayout>
      } />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
