
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  UserPlus,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';

// Sample data for admin dashboard
const stats = [
  {
    title: 'New Submissions',
    value: 8,
    description: 'Waiting for assignment',
    icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    route: '/submissions'
  },
  {
    title: 'Active Assignments',
    value: 24,
    description: 'Currently in progress',
    icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    route: '/admin-assignments'
  },
  {
    title: 'Writers Available',
    value: 14,
    description: 'Ready for new tasks',
    icon: <UserPlus className="h-4 w-4 text-muted-foreground" />,
    route: '/writers'
  },
  {
    title: 'Completed This Month',
    value: 47,
    description: 'Successfully delivered',
    icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
    route: '/admin-assignments'
  },
];

const recentSubmissions = [
  {
    id: 1,
    title: 'Research Paper on Renewable Energy',
    subject: 'Environmental Science',
    deadline: 'May 25, 2025',
    client: 'Emma Johnson',
    status: 'New',
    timeSubmitted: '2 hours ago'
  },
  {
    id: 2,
    title: 'Analysis of Financial Markets',
    subject: 'Economics',
    deadline: 'June 2, 2025',
    client: 'Noah Smith',
    status: 'New',
    timeSubmitted: '5 hours ago'
  },
  {
    id: 3,
    title: 'Machine Learning Algorithms Comparison',
    subject: 'Computer Science',
    deadline: 'May 28, 2025',
    client: 'Olivia Brown',
    status: 'New',
    timeSubmitted: '1 day ago'
  }
];

const deadlines = [
  {
    id: 1,
    title: 'Literary Analysis Essay',
    writer: 'Sophia Williams',
    deadline: 'Tomorrow',
    progress: 80
  },
  {
    id: 2,
    title: 'Psychology Case Study',
    writer: 'James Miller',
    deadline: 'In 2 days',
    progress: 60
  },
  {
    id: 3,
    title: 'Business Marketing Plan',
    writer: 'Liam Davis',
    deadline: 'In 3 days',
    progress: 45
  }
];

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Button variant="outline" asChild>
            <Link to="/writers">
              <Users size={16} className="mr-2" />
              Manage Writers
            </Link>
          </Button>
          <Button asChild>
            <Link to="/submissions">
              <FileText size={16} className="mr-2" />
              New Submissions
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-xs text-primary" asChild>
                <Link to={stat.route}>View Details →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <FileText size={18} className="mr-2" />
              Recent Submissions
            </CardTitle>
            <CardDescription>Assignments that need to be assigned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map(submission => (
                <div key={submission.id} className="dashboard-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{submission.title}</h3>
                      <p className="text-sm text-muted-foreground">{submission.subject}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Users size={12} className="mr-1" />
                        {submission.client}
                      </div>
                    </div>
                    <span className="status-badge bg-blue-100 text-blue-800">
                      {submission.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs mt-3 items-center">
                    <div className="flex items-center text-muted-foreground">
                      <Clock size={12} className="mr-1" />
                      Deadline: {submission.deadline}
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Assign Writer
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/submissions">View All Submissions</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar size={18} className="mr-2" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>Assignments due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deadlines.map(deadline => (
                <div key={deadline.id} className="dashboard-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{deadline.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Users size={12} className="mr-1" />
                        Writer: {deadline.writer}
                      </div>
                    </div>
                    <span className="status-badge bg-amber-100 text-amber-800">
                      {deadline.deadline}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{deadline.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          deadline.progress < 50 ? 'bg-amber-500' : 'bg-primary'
                        }`}
                        style={{ width: `${deadline.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/admin-assignments">View All Assignments</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users size={18} className="mr-2" />
                Writer Performance
              </CardTitle>
              <CardDescription>Monthly statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-sm font-medium">Top Writer</div>
                    <div className="text-lg font-bold">Sophia W.</div>
                    <div className="text-xs text-muted-foreground">15 assignments</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-sm font-medium">Avg. Completion</div>
                    <div className="text-lg font-bold">96%</div>
                    <div className="text-xs text-muted-foreground">On-time delivery</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-sm font-medium">Satisfaction</div>
                    <div className="text-lg font-bold">4.8/5</div>
                    <div className="text-xs text-muted-foreground">Client ratings</div>
                  </div>
                </div>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Performance chart would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertCircle size={18} className="mr-2" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="dashboard-card bg-red-50 border-red-100">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={18} className="text-red-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-900">Late Submission</h3>
                      <p className="text-sm text-red-700">
                        "Ethics Case Study" is 1 day overdue. Writer: James M.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="dashboard-card bg-amber-50 border-amber-100">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={18} className="text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-amber-900">Client Feedback</h3>
                      <p className="text-sm text-amber-700">
                        Revision requested for "History Essay". Client: Noah S.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="dashboard-card bg-blue-50 border-blue-100">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={18} className="text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900">Writer Availability</h3>
                      <p className="text-sm text-blue-700">
                        3 writers have updated their availability for next week
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
