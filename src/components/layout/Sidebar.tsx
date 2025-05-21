
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarTrigger
} from '@/components/ui/sidebar';
import {
  ClipboardList,
  UploadCloud,
  Users,
  MessageSquare,
  Bell,
  Home,
  FileText,
  Settings,
  Calendar,
  User,
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getLinks = () => {
    switch (user.role) {
      case 'client':
        return [
          { to: '/client-dashboard', label: 'Dashboard', icon: <Home size={20} /> },
          { to: '/upload-assignment', label: 'Upload Assignment', icon: <UploadCloud size={20} /> },
          { to: '/assignments', label: 'My Assignments', icon: <ClipboardList size={20} /> },
          { to: '/chat', label: 'Chat with Writer', icon: <MessageSquare size={20} /> },
          { to: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
        ];
      case 'admin':
        return [
          { to: '/admin-dashboard', label: 'Dashboard', icon: <Home size={20} /> },
          { to: '/submissions', label: 'New Submissions', icon: <FileText size={20} /> },
          { to: '/admin-assignments', label: 'Assignments', icon: <ClipboardList size={20} /> },
          { to: '/writers', label: 'Writers', icon: <Users size={20} /> },
          { to: '/chats', label: 'Chat Monitor', icon: <MessageSquare size={20} /> },
          { to: '/paysheets', label: 'Paysheets', icon: <Calendar size={20} /> },
        ];
      case 'writer':
        return [
          { to: '/writer-dashboard', label: 'Dashboard', icon: <Home size={20} /> },
          { to: '/writer-assignments', label: 'My Assignments', icon: <ClipboardList size={20} /> },
          { to: '/writer-chat', label: 'Chat with Client', icon: <MessageSquare size={20} /> },
          { to: '/writer-notifications', label: 'Notifications', icon: <Bell size={20} /> },
          { to: '/paysheet', label: 'My Paysheet', icon: <Calendar size={20} /> },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <SidebarComponent className="border-r border-border">
      <div className="p-4 flex items-center justify-between">
        <div className="font-bold text-xl text-sidebar-foreground">AssignPro</div>
        <SidebarTrigger />
      </div>

      <SidebarContent>
        <div className="px-3 py-2">
          <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
            Menu
          </p>
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto px-3 py-4">
          <NavLink
            to="/profile"
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <User size={20} />
            <span>Profile</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
