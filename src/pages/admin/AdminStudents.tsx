import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Student } from '@/types';
// Import necessary modules and components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Pencil, 
  Trash2,
  Download,
  Filter,
  UserPlus
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
// Import student type and form
import { useSearchParams } from 'react-router-dom';

const AdminStudents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const { data: profile } = await supabase.from('profiles')
          .select('school_id, role')
          .eq('id', (await supabase.auth.getUser()).data.user?.id)
          .single();

        if (!profile?.school_id && profile?.role !== 'super_admin') {
          toast.error('No school associated with this account');
          return;
        }

        const { data, error } = await supabase
          .from('students')
          .select(`
            *,
            profile:profiles(
              first_name,
              last_name,
              email,
              profile_image
            ),
            class:classes(
              name,
              grade_level
            )
          `)
          .eq(profile.role === 'super_admin' ? 'id' : 'school_id', 
              profile.role === 'super_admin' ? 'id' : profile.school_id);

        if (error) throw error;
        setStudents(data || []);
      } catch (error) {
        console.error('Error fetching students:', error);
        toast({
          title: 'Error',
          description: 'Failed to load students data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudents();
  }, []);

  // Filter students based on search term and active tab
  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.profile?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.profile?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.profile?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class?.grade_level?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && student.enrollmentStatus === 'active';
    if (activeTab === 'inactive') return matchesSearch && student.enrollmentStatus === 'inactive';
    
    return matchesSearch;
  });
  
  // Handler for adding a new student
  const handleAddStudent = () => {
    searchParams.set('studentFormOpen', '1');
    setSearchParams(searchParams);
  };
  
  // Handler for editing a student
  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentForm(true);
  };
  
  // Handler for viewing student details
  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };
  
  // Handler for deleting a student
  const handleDeleteStudent = (studentId: string) => {
    const updatedStudents = students.filter((s) => s.id !== studentId);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    toast({
      title: 'Student Deleted',
      description: 'Student has been successfully removed',
    });
  };
  
  // Handler for form submission (create/update student)
  const handleStudentFormSubmit = (formData: Student) => {
    let updatedStudents: Student[];
    
    if (selectedStudent) {
      // Update existing student
      updatedStudents = students.map((s) =>
        s.id === formData.id ? formData : s
      );
      toast({
        title: 'Student Updated',
        description: 'Student information has been updated successfully',
      });
    } else {
      // Add new student
      const newStudent = {
        ...formData,
        id: `STU-${Date.now()}`,
        enrollmentDate: new Date().toISOString(),
        enrollmentStatus: 'active',
      };
      updatedStudents = [...students, newStudent];
      toast({
        title: 'Student Added',
        description: 'New student has been added successfully',
      });
    }
    
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setShowStudentForm(false);
  };
  
  // Get status badge style based on enrollment status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline">Inactive</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage all students and their information</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Download className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
          <Button onClick={handleAddStudent}>
            <UserPlus className="mr-2 h-5 w-5" />
            Add Student
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-1 md:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
              <CardTitle>Student Records</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Students</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>ID Number</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Enrollment Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            Loading students...
                          </TableCell>
                        </TableRow>
                      ) : filteredStudents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            No students found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={student.profile?.profile_image} />
                                  <AvatarFallback>{student.profile?.first_name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{student.profile?.first_name} {student.profile?.last_name}</div>
                                  <div className="text-sm text-muted-foreground">{student.profile?.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{student.id}</TableCell>
                            <TableCell>{student.class?.grade_level || 'N/A'}</TableCell>
                            <TableCell>{getStatusBadge(student.enrollmentStatus)}</TableCell>
                            <TableCell>
                              {student.created_at
                                ? new Date(student.created_at).toLocaleDateString()
                                : 'N/A'}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-5 w-5" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                                    <Eye className="mr-2 h-4 w-4" />View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                                    <Pencil className="mr-2 h-4 w-4" />Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteStudent(student.id)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Student forms/details will be handled by drawer components that will be imported */}
    </div>
  );
};

export default AdminStudents;
