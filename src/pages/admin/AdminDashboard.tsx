
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { GraduationCap, Users, BookOpen, CalendarDays } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { adminDashboardStats, performanceData, students, subjects } from '@/data/mockData';

// Colors for charts
const COLORS = ['#8B5CF6', '#F97316', '#10B981', '#0EA5E9', '#EF4444'];

// Generate some data for attendance chart
const generateAttendanceData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    name: month,
    attendance: 85 + Math.floor(Math.random() * 10),
  }));
};

// Generate grade distribution data
const generateGradeDistribution = () => {
  return [
    { name: 'A', value: 35 },
    { name: 'B', value: 40 },
    { name: 'C', value: 15 },
    { name: 'D', value: 7 },
    { name: 'F', value: 3 },
  ];
};

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const stats = adminDashboardStats;
  const attendanceData = generateAttendanceData();
  const gradeDistribution = generateGradeDistribution();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || 'Admin'}!
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <div className="inline-block bg-muted px-3 py-1 rounded-md text-sm">
            Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="schub-stat-card p-4">
          <div className="flex justify-between">
            <div>
              <p className="schub-stat-label">Total Students</p>
              <p className="schub-stat-value">{stats.totalStudents}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </Card>
        
        <Card className="schub-stat-card p-4">
          <div className="flex justify-between">
            <div>
              <p className="schub-stat-label">Total Teachers</p>
              <p className="schub-stat-value">{stats.totalTeachers}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
          </div>
        </Card>
        
        <Card className="schub-stat-card p-4">
          <div className="flex justify-between">
            <div>
              <p className="schub-stat-label">Total Subjects</p>
              <p className="schub-stat-value">{stats.totalSubjects}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
        </Card>
        
        <Card className="schub-stat-card p-4">
          <div className="flex justify-between">
            <div>
              <p className="schub-stat-label">Average Attendance</p>
              <p className="schub-stat-value">{stats.averageAttendance}%</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <CalendarDays className="h-6 w-6" />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Monthly student attendance percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[75, 100]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="attendance"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Overall student grade distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Average scores by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="average" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Student Activity</CardTitle>
            <CardDescription>Latest student enrollments and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.slice(0, 4).map((student) => (
                <div key={student.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={student.profileImage} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Class: {student.class} | Attendance: {student.attendancePercentage}%
                    </p>
                  </div>
                  <div className={`text-sm ${student.behaviorScore >= 4.0 ? 'schub-badge-success' : student.behaviorScore >= 3.0 ? 'schub-badge-info' : 'schub-badge-warning'}`}>
                    Score: {student.behaviorScore}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Schedule of important school events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-4 rounded-md border p-4">
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{event.title}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{event.type}</span>
                    <span className="mx-2">•</span>
                    <span>Date: {new Date(event.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="schub-badge-info">{event.type}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
