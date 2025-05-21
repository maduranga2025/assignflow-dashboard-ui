
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileText, 
  Users, 
  MessageSquare, 
  Shield, 
  CheckCircle, 
  ChevronRight
} from 'lucide-react';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // If user is logged in, redirect to appropriate dashboard
  React.useEffect(() => {
    if (user) {
      navigate(`/${user.role}-dashboard`);
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Quality Academic Writing & Assignment Help
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our experienced writers deliver top-quality academic papers on time. Get professional assistance with complex assignments and improve your grades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link to="/register">
                  <Button size="lg" className="gap-2">
                    Get Started
                    <ChevronRight size={16} />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="dashboard-card bg-card/80 backdrop-blur-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-lg font-semibold">
                      <FileText size={18} className="text-primary" />
                      New Assignment Request
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="text-muted-foreground">Research Paper - Economics</div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="status-badge status-badge-progress">In Progress</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Due Date:</span>
                        <span>May 29, 2025</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full mt-4">
                    <div className="bg-primary h-full rounded-full w-3/5"></div>
                  </div>
                </div>
                
                <div className="dashboard-card absolute -right-4 -bottom-4 w-64 z-10">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Assignment Completed</div>
                      <div className="text-xs text-muted-foreground">2 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
            Our streamlined process makes getting assignment help simple and secure
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="dashboard-card flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Submit Your Assignment</h3>
            <p className="text-muted-foreground">
              Upload your assignment requirements including documents, images, and voice notes
            </p>
          </div>
          
          <div className="dashboard-card flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Get Matched with a Writer</h3>
            <p className="text-muted-foreground">
              Our admins will assign a qualified writer who specializes in your subject area
            </p>
          </div>
          
          <div className="dashboard-card flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Communicate & Receive</h3>
            <p className="text-muted-foreground">
              Chat with your writer during the process and receive your completed assignment
            </p>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Why Choose Us</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We deliver quality academic support with security and reliability as our top priorities
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">100% Confidential</h3>
              <p className="text-sm text-muted-foreground">
                Your personal information is secure and never shared
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">Original Content</h3>
              <p className="text-sm text-muted-foreground">
                All assignments are written from scratch and plagiarism-free
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">Expert Writers</h3>
              <p className="text-sm text-muted-foreground">
                Professional writers with academic backgrounds in various fields
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Always available to address your concerns and questions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container">
        <div className="dashboard-card bg-primary text-primary-foreground p-8 md:p-12 rounded-2xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Improve Your Grades?</h2>
            <p className="mb-6 opacity-90">
              Join thousands of students who are already benefiting from our professional academic help services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="text-primary">
                  Create Account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border mt-auto">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-xl text-primary">AssignPro</div>
              <p className="text-sm text-muted-foreground">
                Quality assignment help for students worldwide
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact Us
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} AssignPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
