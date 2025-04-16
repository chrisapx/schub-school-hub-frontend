
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Drawer } from '@/components/ui/drawer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { EyeIcon, MoreHorizontal, PlusCircle, Search, Edit, Trash2, UserPlus } from 'lucide-react';
import { students } from '@/data/mockData';
import EnhancedStudentForm from '@/components/forms/EnhancedStudentForm';

const AdminStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter students based on search term and active tab
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && student.status === 'active';
    if (activeTab === "suspended") return matchesSearch && student.status === 'suspended';
    if (activeTab === "graduated") return matchesSearch && student.status === 'graduated';
    
    return matchesSearch;
  });
  
  const handleOpenDrawer = (student?: Student) => {
    setSelectedStudent(student);
    setDrawerOpen(true);
  };
  
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedStudent(undefined);
  };
  
  // Group students by class for class distribution
  const studentsByClass = filteredStudents.reduce((acc, student) => {
    if (!acc[student.class]) {
      acc[student.class] = [];
    }
    acc[student.class].push(student);
    return acc;
  }, {} as Record<string, Student[]>);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Management</h2>
          <p className="text-muted-foreground">
            Manage all students in the school system
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button className="gap-2" onClick={() => handleOpenDrawer()}>
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
          <TabsTrigger value="graduated">Graduated</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Students List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Behavior Score</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No students found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.profileImage} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>
                          <span className={`${student.attendancePercentage >= 90 ? 'text-green-600' : student.attendancePercentage >= 80 ? 'text-amber-600' : 'text-red-600'} font-medium`}>
                            {student.attendancePercentage}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`${student.behaviorScore >= 4.0 ? 'text-green-600' : student.behaviorScore >= 3.0 ? 'text-blue-600' : 'text-amber-600'} font-medium`}>
                            {student.behaviorScore}/5
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer" onClick={() => handleOpenDrawer(student)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Student
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <EyeIcon className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                Assign Subjects
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Student
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                {/* Same table structure but filtered for active students */}
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No active students found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.profileImage} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDrawer(student)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="suspended" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Suspended Students</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Table for suspended students */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No suspended students found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.profileImage} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>Violation of school rules</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDrawer(student)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="graduated" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Graduated Students</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Table for graduated students */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Graduation Date</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No graduated students found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.profileImage} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>2025-03-15</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Class Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(studentsByClass).slice(0, 3).map(([className, classStudents]) => (
              <div key={className} className="rounded-md border p-4 futuristic-border">
                <h3 className="font-semibold text-lg mb-1">Class {className}</h3>
                <p className="text-muted-foreground mb-2">Total Students: {classStudents.length}</p>
                <div className="flex justify-between text-sm">
                  <span>Average Attendance:</span>
                  <span className="font-medium text-green-600">
                    {(classStudents.reduce((sum, student) => sum + (student.attendancePercentage || 0), 0) / classStudents.length).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Average Behavior Score:</span>
                  <span className="font-medium text-green-600">
                    {(classStudents.reduce((sum, student) => sum + (student.behaviorScore || 0), 0) / classStudents.length).toFixed(1)}/5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Student Form Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        title={selectedStudent ? "Edit Student" : "Add New Student"}
        subtitle={selectedStudent ? `Editing ${selectedStudent.name}` : "Enter student details"}
        size="xl"
      >
        <EnhancedStudentForm 
          student={selectedStudent}
          onSuccess={handleCloseDrawer}
        />
      </Drawer>
    </div>
  );
};

export default AdminStudents;
