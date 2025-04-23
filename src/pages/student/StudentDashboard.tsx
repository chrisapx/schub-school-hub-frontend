
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Bell, BookOpen, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { studentDashboardData } from '@/data/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const data = studentDashboardData;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || 'Student'}!
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <div className="inline-block bg-muted px-3 py-1 rounded-md text-sm">
            Current Term: <span className="font-medium">{data.currentTerm}</span>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="schub-stat-card p-4">
          <div className="flex justify-between">
            <div>
              <p className="schub-stat-label">Attendance</p>
              <p className="schub-stat-value">{data.profile.attendancePercentage}%</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
          <Progress value={data.profile.attendancePercentage} className="mt-3" />
        </Card>
        
        <Card className="schub-stat-card p-4">
          <div className="flex justify-between">
            <div>
              <p className="schub-stat-label">Upcoming Assignments</p>
              <p className="schub-stat-value">{data.upcomingAssignments.length}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
        </Card>
        
        <Card className="schub-stat-card p-4">
          <div className="flex justify-between">
            <div>
              <p className="schub-stat-label">Behavior Points</p>
              <p className="schub-stat-value">+{data.behaviorPoints}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Bell className="h-6 w-6" />
            </div>
          </div>
        </Card>
        
        <Card className="schub-stat-card p-4">
          <div className="flex justify-between">
            <div>
              <p className="schub-stat-label">Class</p>
              <p className="schub-stat-value">{data.profile.class}</p>
              <p className="text-xs text-muted-foreground">Roll #{data.profile.rollNumber}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user?.profileImage}
                  alt={user?.name}
                />
                <AvatarFallback>
                  {user?.name ? user.name.charAt(0) : 'S'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Upcoming Assignments
            </CardTitle>
            <CardDescription>Assignments due soon</CardDescription>
          </CardHeader>
          <CardContent>
            {data.upcomingAssignments.length > 0 ? (
              <div className="space-y-4">
                {data.upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-start space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{assignment.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{assignment.subject}</span>
                        <span className="mx-2">•</span>
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="schub-badge-warning">Due Soon</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No upcoming assignments</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Recent Marks
            </CardTitle>
            <CardDescription>Your latest assessment results</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentMarks.length > 0 ? (
              <div className="space-y-4">
                {data.recentMarks.map((mark) => (
                  <div key={mark.id} className="flex items-start space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{mark.subject}</p>
                      <div className="text-sm text-muted-foreground">
                        <span>{mark.type}</span>
                      </div>
                    </div>
                    <div className={`font-semibold ${mark.score / mark.maxScore >= 0.7 ? 'text-green-600' : mark.score / mark.maxScore >= 0.5 ? 'text-amber-600' : 'text-red-600'}`}>
                      {mark.score}/{mark.maxScore}
                      <span className="text-xs ml-1">
                        ({Math.round((mark.score / mark.maxScore) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent marks</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Announcements
          </CardTitle>
          <CardDescription>Important notifications from the school</CardDescription>
        </CardHeader>
        <CardContent>
          {data.announcements.length > 0 ? (
            <div className="space-y-4">
              {data.announcements.map((announcement) => (
                <div key={announcement.id} className="rounded-md border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(announcement.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{announcement.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No announcements</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
