
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { students } from '@/data/mockData';

const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  // For demo purposes, we'll just use the first student in our mock data
  const studentData = students[0];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">View and manage your personal information</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your basic details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user?.profileImage || studentData.profileImage} alt={user?.name || studentData.name} />
              <AvatarFallback className="text-2xl">
                {(user?.name || studentData.name).charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <h3 className="text-xl font-semibold">{user?.name || studentData.name}</h3>
            <p className="text-muted-foreground mb-4">Student ID: {studentData.id}</p>
            
            <div className="w-full space-y-3 text-left">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{user?.email || studentData.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Class</span>
                <span className="font-medium">{studentData.class}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Roll Number</span>
                <span className="font-medium">{studentData.rollNumber}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Guardian</span>
                <span className="font-medium">{studentData.guardianName}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted-foreground">Guardian Contact</span>
                <span className="font-medium">{studentData.guardianContact}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-8 space-y-6">
          <Tabs defaultValue="academic">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="academic">Academic History</TabsTrigger>
              <TabsTrigger value="attendance">Attendance Record</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="academic" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Academic History</CardTitle>
                  <CardDescription>Your previous academic achievements and records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">2024-2025</h3>
                        <div className="schub-badge-success">Current</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Class 10A</p>
                      <div className="text-sm">
                        <span className="font-medium">Average Score:</span> 88.5%
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">2023-2024</h3>
                        <div className="schub-badge-info">Completed</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Class 9A</p>
                      <div className="text-sm">
                        <span className="font-medium">Average Score:</span> 86.2%
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">2022-2023</h3>
                        <div className="schub-badge-info">Completed</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Class 8A</p>
                      <div className="text-sm">
                        <span className="font-medium">Average Score:</span> 84.7%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="attendance" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Record</CardTitle>
                  <CardDescription>Your attendance history for the current academic year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-medium">Overall Attendance</span>
                      <span className={`${studentData.attendancePercentage >= 90 ? 'text-green-600' : studentData.attendancePercentage >= 80 ? 'text-amber-600' : 'text-red-600'} font-semibold`}>
                        {studentData.attendancePercentage}%
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold">Monthly Breakdown</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-md border p-3">
                          <div className="flex items-center justify-between">
                            <span>April 2025</span>
                            <span className="text-green-600 font-medium">95%</span>
                          </div>
                        </div>
                        
                        <div className="rounded-md border p-3">
                          <div className="flex items-center justify-between">
                            <span>March 2025</span>
                            <span className="text-green-600 font-medium">90%</span>
                          </div>
                        </div>
                        
                        <div className="rounded-md border p-3">
                          <div className="flex items-center justify-between">
                            <span>February 2025</span>
                            <span className="text-amber-600 font-medium">85%</span>
                          </div>
                        </div>
                        
                        <div className="rounded-md border p-3">
                          <div className="flex items-center justify-between">
                            <span>January 2025</span>
                            <span className="text-amber-600 font-medium">88%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold">Absence Records</h3>
                      
                      <div className="space-y-2">
                        <div className="rounded-md border p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">March 15, 2025</span>
                            <div className="schub-badge-error">Unexcused</div>
                          </div>
                          <p className="text-sm text-muted-foreground">Full day absence</p>
                        </div>
                        
                        <div className="rounded-md border p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">February 22, 2025</span>
                            <div className="schub-badge-info">Excused</div>
                          </div>
                          <p className="text-sm text-muted-foreground">Medical appointment (Doctor's note provided)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Important documents and certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Report Card - 2024</h3>
                          <p className="text-sm text-muted-foreground">End of year academic report</p>
                        </div>
                        <button className="text-sm text-primary hover:underline">
                          Download
                        </button>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Transfer Certificate</h3>
                          <p className="text-sm text-muted-foreground">School transfer document</p>
                        </div>
                        <button className="text-sm text-primary hover:underline">
                          Download
                        </button>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Medical Clearance</h3>
                          <p className="text-sm text-muted-foreground">Sports participation clearance</p>
                        </div>
                        <button className="text-sm text-primary hover:underline">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
