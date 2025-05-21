
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  Clock,
  CheckCircle,
  Calendar,
  DollarSign,
  AlertCircle,
  MessageSquare,
  UploadCloud
} from 'lucide-react';

// Sample data for writer dashboard
const assignments = [
  {
    id: 1,
    title: 'Microeconomics Market Analysis',
    subject: 'Economics',
    deadline: 'May 25, 2025',
    client: 'Client #1092',
    status: 'in-progress',
    statusText: 'In Progress',
    progress: 70,
    daysLeft: 4
  },
  {
    id: 2,
    title: 'Psychological Impact of Social Media',
    subject: 'Psychology',
    deadline: 'May 22, 2025',
    client: 'Client #1045',
    status: 'in-progress',
    statusText: 'In Progress',
    progress: 30,
    daysLeft: 1
  },
  {
    id: 3,
    title: 'Comparative Literature Review',
    subject: 'English Literature',
    deadline: 'May 30, 2025',
    client: 'Client #1103',
    status: 'not-started',
    statusText: 'Not Started',
    progress: 0,
    daysLeft: 9
  }
];

const notifications = [
  {
    id: 1,
    message: 'You have been assigned a new Psychology paper',
    time: '3 hours ago',
    read: false,
    type: 'assignment'
  },
  {
    id: 2,
    message: 'Client sent a message regarding Microeconomics Analysis',
    time: '1 day ago',
    read: true,
    type: 'message'
  },
  {
    id: 3,
    message: 'Admin has approved your monthly paysheet',
    time: '2 days ago',
    read: true,
    type: 'payment'
  }
];

const WriterDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'not-started':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'status-badge-progress';
      case 'completed':
        return 'status-badge-completed';
      default:
        return '';
    }
  };

  const getUrgencyClass = (days: number) => {
    if (days <= 1) return 'text-red-600';
    if (days <= 3) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Writer Dashboard</h1>
        <Button variant="outline" className="mt-4 sm:mt-0" asChild>
          <Link to="/writer-assignments">
            <FileText size={16} className="mr-2" />
            View All Assignments
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.filter(a => a.status === 'in-progress').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">In progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Urgent Deadlines</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.filter(a => a.daysLeft <= 3).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Due within 3 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully delivered</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,245</div>
            <p className="text-xs text-muted-foreground mt-1">For May 2025</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Current Assignments */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock size={18} className="mr-2" />
                Current Assignments
              </CardTitle>
              <CardDescription>Tasks requiring your attention</CardDescription>
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
                    
                    <div className="mt-3 flex justify-between text-sm">
                      <div className={`flex items-center ${getUrgencyClass(assignment.daysLeft)}`}>
                        <Calendar size={14} className="mr-1" />
                        Due: {assignment.deadline} 
                        <span className="ml-1 font-medium">
                          ({assignment.daysLeft} day{assignment.daysLeft !== 1 ? 's' : ''} left)
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {assignment.client}
                      </div>
                    </div>
                    
                    {assignment.status === 'in-progress' && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{assignment.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full">
                          <div 
                            className={`h-full rounded-full ${
                              assignment.daysLeft <= 1 ? 'bg-red-500' : 
                              assignment.daysLeft <= 3 ? 'bg-amber-500' : 'bg-primary'
                            }`}
                            style={{ width: `${assignment.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="h-7 text-xs" asChild>
                        <Link to={`/writer-chat/${assignment.id}`}>
                          <MessageSquare size={12} className="mr-1" />
                          Chat
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs" asChild>
                        <Link to={`/assignment-details/${assignment.id}`}>
                          <FileText size={12} className="mr-1" />
                          Details
                        </Link>
                      </Button>
                      {assignment.status === 'in-progress' && (
                        <Button size="sm" className="h-7 text-xs ml-auto" asChild>
                          <Link to={`/upload-completed/${assignment.id}`}>
                            <UploadCloud size={12} className="mr-1" />
                            Submit
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Notifications and Upcoming */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle size={18} className="mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex gap-3 pb-3 border-b last:border-none last:pb-0">
                    <div className={`mt-1 text-${notification.read ? 'muted-foreground' : 'primary'}`}>
                      {notification.type === 'message' ? (
                        <MessageSquare size={18} />
                      ) : notification.type === 'payment' ? (
                        <DollarSign size={18} />
                      ) : (
                        <FileText size={18} />
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
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link to="/writer-notifications">View All Notifications</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar size={18} className="mr-2" />
                Monthly Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm font-medium">Assignments</div>
                  <div className="text-xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm font-medium">On-Time</div>
                  <div className="text-xl font-bold">100%</div>
                  <div className="text-xs text-muted-foreground">Delivery rate</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm font-medium">Earnings</div>
                  <div className="text-xl font-bold">$1,245</div>
                  <div className="text-xs text-muted-foreground">This month</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm font-medium">Rating</div>
                  <div className="text-xl font-bold">4.9/5</div>
                  <div className="text-xs text-muted-foreground">Client rating</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4" asChild>
                <Link to="/paysheet">View Full Paysheet</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WriterDashboard;
