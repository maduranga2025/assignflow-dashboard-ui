
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  User, 
  LogOut, 
  Menu, 
  X,
  Bell
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isDashboard = location.pathname.includes('dashboard') || 
                     location.pathname.includes('assignments') || 
                     location.pathname.includes('chat');

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-30">
      <div className={`${isDashboard ? 'px-4' : 'container'} flex items-center justify-between h-16`}>
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <div className="mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">AssignPro</span>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No new notifications
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{user.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm font-semibold">
                    {user.email}
                    <div className="text-xs text-muted-foreground font-normal capitalize">{user.role}</div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User size={16} className="mr-2" />Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut size={16} className="mr-2" />Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!user ? (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-primary">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="px-3 py-2 text-sm font-medium text-gray-700">
                  Signed in as <span className="font-bold">{user.name}</span>
                  <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
                </div>
                <Link to="/notifications" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                  Notifications
                </Link>
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Logout
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
