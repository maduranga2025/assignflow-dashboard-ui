
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: string[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  requireAuth = false,
  allowedRoles = [] 
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Handle authentication redirect
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle role-based redirect
  if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    return <Navigate to={`/${user.role}-dashboard`} replace />;
  }

  // Determine if we should show the dashboard layout
  const showDashboardLayout = user && (
    location.pathname.includes('dashboard') || 
    location.pathname.includes('assignments') || 
    location.pathname.includes('chat')
  );

  return (
    <div className="min-h-screen bg-background">
      {showDashboardLayout ? (
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Navbar />
              <main className="flex-1 p-4 md:p-6 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      ) : (
        <>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </>
      )}
    </div>
  );
};

export default MainLayout;
