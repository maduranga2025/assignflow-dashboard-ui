
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Clock, FileText, MessageSquare, AlertCircle } from 'lucide-react';

// Sample data for client dashboard
const assignments = [
  {
    id: 1,
    title: 'Research Paper - Economics',
    subject: 'Economics',
    deadline: 'May 29, 2025',
    status: 'in-progress',
    statusText: 'In Progress',
    progress: 60,
  },
  {
    id: 2,
    title: 'Case Study Analysis',
    subject: 'Business Management',
    deadline: 'June 5, 2025',
    status: 'pending',
    statusText: 'Pending',
    progress: 0,
  },
  {
    id: 3,
    title: 'Literature Review',
    subject: 'English Literature',
    deadline: 'May 20, 2025',
    status: 'completed',
    statusText: 'Completed',
    progress: 100,
  },
];

const notifications = [
  {
    id: 1,
    message: 'Writer has been assigned to your Economics Research Paper',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    message: 'Your Literature Review is ready for download',
    time: '1 day ago',
    read: true,
  },
  {
    id: 3,
    message: 'New message from your writer regarding Case Study Analysis',
    time: '3 days ago',
    read: true,
  },
];

const ClientDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-badge-pending';
      case 'in-progress':
        return 'status-badge-progress';
      case 'completed':
        return 'status-badge-completed';
      default:
        return '';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Welcome, {user.name}</h1>
        <Button className="mt-4 sm:mt-0" asChild>
          <Link to="/upload-assignment">
            <UploadCloud size={18} className="mr-2" />
            New Assignment
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Assignments</CardTitle>
            <CardDescription>Your current projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {assignments.filter(a => a.status !== 'completed').length}
            </div>
            <p className="text-sm text-muted-foreground">
              {assignments.filter(a => a.status === 'in-progress').length} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
            <CardDescription>Due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {assignments.filter(a => a.status !== 'completed').length}
            </div>
            <p className="text-sm text-muted-foreground">Next: {assignments.find(a => a.status !== 'completed')?.deadline}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Notifications</CardTitle>
            <CardDescription>Updates and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {notifications.filter(n => !n.read).length}
            </div>
            <p className="text-sm text-muted-foreground">New notifications</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Assignments</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/assignments">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map(assignment => (
                  <div key={assignment.id} className="dashboard-card">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                      </div>
                      <span className={`status-badge ${getStatusBadgeClass(assignment.status)}`}>
                        {assignment.statusText}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {assignment.deadline}
                      </div>
                      <div>
                        {assignment.status === 'in-progress' && (
                          <div className="text-xs">{assignment.progress}% complete</div>
                        )}
                      </div>
                    </div>
                    {assignment.status === 'in-progress' && (
                      <div className="h-1.5 bg-muted rounded-full mt-2">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${assignment.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Notifications</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/notifications">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex items-start gap-3 pb-4 border-b last:border-none">
                    <div className={`mt-1 text-${notification.read ? 'muted-foreground' : 'primary'}`}>
                      {notification.message.includes('message') ? (
                        <MessageSquare size={18} />
                      ) : notification.message.includes('ready') ? (
                        <FileText size={18} />
                      ) : (
                        <AlertCircle size={18} />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm ${notification.read ? 'text-muted-foreground' : 'font-medium'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
