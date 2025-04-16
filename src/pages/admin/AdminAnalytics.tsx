
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminAnalytics: React.FC = () => {
  // Sample data for the charts
  const performanceData = [
    { month: 'Jan', mathematics: 75, science: 68, english: 80 },
    { month: 'Feb', mathematics: 78, science: 72, english: 82 },
    { month: 'Mar', mathematics: 80, science: 79, english: 85 },
    { month: 'Apr', mathematics: 82, science: 83, english: 87 },
    { month: 'May', mathematics: 85, science: 85, english: 90 },
  ];
  
  const attendanceData = [
    { month: 'Jan', attendance: 92 },
    { month: 'Feb', attendance: 94 },
    { month: 'Mar', attendance: 91 },
    { month: 'Apr', attendance: 95 },
    { month: 'May', attendance: 93 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h2 className="text-xl font-semibold mb-4">Subject Performance Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mathematics" stroke="#8884d8" />
                <Line type="monotone" dataKey="science" stroke="#82ca9d" />
                <Line type="monotone" dataKey="english" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h2 className="text-xl font-semibold mb-4">Attendance Rate (%)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h3 className="text-lg font-semibold">Top Performing Subject</h3>
          <p className="text-3xl font-bold mt-2">English</p>
          <p className="text-muted-foreground">Avg. Score: 85%</p>
        </div>
        
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h3 className="text-lg font-semibold">Lowest Performing Subject</h3>
          <p className="text-3xl font-bold mt-2">Science</p>
          <p className="text-muted-foreground">Avg. Score: 77%</p>
        </div>
        
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h3 className="text-lg font-semibold">Overall Average</h3>
          <p className="text-3xl font-bold mt-2">81%</p>
          <p className="text-muted-foreground">+3% from last term</p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          Export Data
        </button>
      </div>
    </div>
  );
};

export default AdminAnalytics;
