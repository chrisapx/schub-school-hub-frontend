
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTeachers, deleteTeacher } from '@/lib/api';
import TeacherForm from '@/components/forms/TeacherForm';
import { Drawer } from '@/components/ui/drawer';
import { PageTabs } from '@/components/ui/page-tabs';
import { DataCard } from '@/components/ui/data-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  User, 
  Users, 
  Search, 
  UserPlus, 
  Filter, 
  BookOpen 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Define tabs
const tabs = [
  { id: 'list', label: 'Teacher List' },
  { id: 'departments', label: 'Departments' },
  { id: 'performance', label: 'Performance' },
];

const AdminTeachers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | undefined>(undefined);
  
  const queryClient = useQueryClient();
  
  // Fetch teachers
  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: getTeachers
  });
  
  // Delete teacher mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast.success('Teacher deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete teacher: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
  
  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group teachers by department for the departments tab
  const teachersByDepartment = teachers.reduce((acc, teacher) => {
    const department = teacher.department || 'Unassigned';
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(teacher);
    return acc;
  }, {} as Record<string, Teacher[]>);
  
  // Handle opening the form drawer
  const handleOpenForm = (teacher?: Teacher) => {
    setSelectedTeacher(teacher);
    setDrawerOpen(true);
  };
  
  // Handle delete teacher
  const handleDeleteTeacher = (id: string) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      deleteMutation.mutate(id);
    }
  };
  
  // Render status badge
  const renderStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>;
      case 'on-leave':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">On Leave</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <PageTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        actions={
          <Button onClick={() => handleOpenForm()} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Teacher
          </Button>
        }
        filters={[
          { label: 'Active Only', onClick: () => toast.info('Filter: Active Only') },
          { label: 'Recently Added', onClick: () => toast.info('Filter: Recently Added') },
          { label: 'Sort by Name', onClick: () => toast.info('Filter: Sort by Name') },
        ]}
      />
      
      {activeTab === 'list' && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search teachers..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                      {isLoading ? 'Loading teachers...' : 'No teachers found.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={teacher.profileImage} alt={teacher.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {teacher.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{teacher.name}</div>
                            <div className="text-sm text-muted-foreground">{teacher.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.department || 'Not assigned'}</TableCell>
                      <TableCell>{teacher.subjects?.length || 0} subjects</TableCell>
                      <TableCell>{renderStatusBadge(teacher.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenForm(teacher)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteTeacher(teacher.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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
        </div>
      )}
      
      {activeTab === 'departments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(teachersByDepartment).map(([department, departmentTeachers]) => (
            <DataCard
              key={department}
              title={department}
              subtitle={`${departmentTeachers.length} Teachers`}
              icon={<BookOpen className="h-4 w-4" />}
              variant="border"
              className="data-card"
            >
              <div className="space-y-4 data-card-content">
                {departmentTeachers.slice(0, 3).map(teacher => (
                  <div key={teacher.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={teacher.profileImage} alt={teacher.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {teacher.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{teacher.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{teacher.email}</p>
                    </div>
                    {renderStatusBadge(teacher.status)}
                  </div>
                ))}
                
                {departmentTeachers.length > 3 && (
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
                    +{departmentTeachers.length - 3} more
                  </Button>
                )}
              </div>
            </DataCard>
          ))}
        </div>
      )}
      
      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DataCard
            title="Subject Distribution"
            subtitle="Teachers per subject area"
            icon={<BookOpen className="h-4 w-4" />}
            variant="default"
            className="data-card"
          >
            <div className="h-64 flex items-center justify-center data-card-content">
              <p className="text-muted-foreground">Subject distribution chart will be shown here</p>
            </div>
          </DataCard>
          
          <DataCard
            title="Teacher Performance"
            subtitle="Based on student feedback"
            icon={<Users className="h-4 w-4" />}
            variant="gradient"
            className="data-card"
          >
            <div className="h-64 flex items-center justify-center text-white data-card-content">
              <p className="text-white/80">Performance metrics will be shown here</p>
            </div>
          </DataCard>
          
          <DataCard
            title="New Teachers"
            subtitle="Recently onboarded"
            icon={<User className="h-4 w-4" />}
            variant="border"
            className="md:col-span-2 data-card"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 data-card-content">
              {teachers
                .sort((a, b) => new Date(b.joinDate || '').getTime() - new Date(a.joinDate || '').getTime())
                .slice(0, 3)
                .map(teacher => (
                  <div key={teacher.id} className="p-4 rounded-md border bg-card">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={teacher.profileImage} alt={teacher.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {teacher.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-sm text-muted-foreground">{teacher.department}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Subjects</p>
                        <p>{teacher.subjects?.length || 0}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Joined</p>
                        <p>{teacher.joinDate ? new Date(teacher.joinDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </DataCard>
        </div>
      )}
      
      {/* Teacher Form Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedTeacher ? "Edit Teacher" : "Add New Teacher"}
        subtitle={selectedTeacher ? `Editing ${selectedTeacher.name}` : "Enter teacher details"}
        size="lg"
      >
        <TeacherForm 
          teacher={selectedTeacher} 
          onSuccess={() => setDrawerOpen(false)}
        />
      </Drawer>
    </div>
  );
};

export default AdminTeachers;
