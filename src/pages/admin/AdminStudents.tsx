
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EyeIcon, MoreHorizontal, PlusCircle, SearchIcon } from 'lucide-react';
import { students } from '@/data/mockData';

const AdminStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter the details of the new student to add to the system.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Name
                  </label>
                  <Input className="col-span-3" placeholder="Enter student name" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                  </label>
                  <Input className="col-span-3" placeholder="Enter email address" type="email" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Class
                  </label>
                  <Input className="col-span-3" placeholder="Enter class (e.g., 10A)" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Roll Number
                  </label>
                  <Input className="col-span-3" placeholder="Enter roll number" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Guardian Name
                  </label>
                  <Input className="col-span-3" placeholder="Enter guardian name" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Guardian Contact
                  </label>
                  <Input className="col-span-3" placeholder="Enter guardian contact" type="tel" />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Student</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
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
                          <DropdownMenuItem className="cursor-pointer">
                            <EyeIcon className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Edit Student
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Assign Subjects
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-destructive">
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
      
      <Card>
        <CardHeader>
          <CardTitle>Class Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-md border p-4">
              <h3 className="font-semibold text-lg mb-1">Class 10A</h3>
              <p className="text-muted-foreground mb-2">Total Students: 25</p>
              <div className="flex justify-between text-sm">
                <span>Average Attendance:</span>
                <span className="font-medium text-green-600">92%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average Behavior Score:</span>
                <span className="font-medium text-green-600">4.2/5</span>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-semibold text-lg mb-1">Class 10B</h3>
              <p className="text-muted-foreground mb-2">Total Students: 23</p>
              <div className="flex justify-between text-sm">
                <span>Average Attendance:</span>
                <span className="font-medium text-green-600">89%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average Behavior Score:</span>
                <span className="font-medium text-blue-600">3.8/5</span>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-semibold text-lg mb-1">Class 10C</h3>
              <p className="text-muted-foreground mb-2">Total Students: 22</p>
              <div className="flex justify-between text-sm">
                <span>Average Attendance:</span>
                <span className="font-medium text-amber-600">85%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average Behavior Score:</span>
                <span className="font-medium text-blue-600">3.5/5</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStudents;
