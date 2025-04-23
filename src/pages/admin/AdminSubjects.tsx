
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataCard } from '@/components/ui/data-card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { PageTabs } from '@/components/ui/page-tabs';
import { Input } from '@/components/ui/input';
import { Search, Plus, BookOpen, User, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';

const AdminSubjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  // Define tabs
  const tabs = [
    { id: 'list', label: 'All Subjects' },
    { id: 'classes', label: 'Classes' },
    { id: 'curriculum', label: 'Curriculum' },
  ];
  
  const [activeTab, setActiveTab] = useState('list');

  // Demo subjects data
  const subjects = [
    { id: '1', name: 'Mathematics', code: 'MATH101', teacher: 'Dr. Smith', students: 25 },
    { id: '2', name: 'Science', code: 'SCI101', teacher: 'Mrs. Johnson', students: 28 },
    { id: '3', name: 'English', code: 'ENG101', teacher: 'Mr. Williams', students: 30 },
    { id: '4', name: 'History', code: 'HIST101', teacher: 'Dr. Brown', students: 22 },
    { id: '5', name: 'Geography', code: 'GEO101', teacher: 'Ms. Davis', students: 26 },
  ];

  // Filter subjects based on search term
  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubject = () => {
    searchParams.set('marksFormOpen', '1');
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        actions={
          <Button onClick={handleAddSubject} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Subject
          </Button>
        }
        filters={[
          { label: 'Core Subjects', onClick: () => toast.info('Filter: Core Subjects') },
          { label: 'Electives', onClick: () => toast.info('Filter: Electives') },
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
                placeholder="Search subjects..."
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
                  <TableHead>Subject Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Assigned Teacher</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                      No subjects found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="font-medium">{subject.name}</TableCell>
                      <TableCell>{subject.code}</TableCell>
                      <TableCell>{subject.teacher}</TableCell>
                      <TableCell>{subject.students}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DataCard
            title="Mathematics Classes"
            subtitle="Class distribution"
            icon={<BookOpen className="h-4 w-4" />}
            variant="border"
            className="data-card"
          >
            <div className="space-y-3 p-4">
              <div className="flex justify-between items-center">
                <span>Class 10A</span>
                <span className="text-sm text-muted-foreground">28 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Class 10B</span>
                <span className="text-sm text-muted-foreground">25 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Class 10C</span>
                <span className="text-sm text-muted-foreground">30 students</span>
              </div>
            </div>
          </DataCard>
          
          <DataCard
            title="Science Classes"
            subtitle="Class distribution"
            icon={<BookOpen className="h-4 w-4" />}
            variant="border"
            className="data-card"
          >
            <div className="space-y-3 p-4">
              <div className="flex justify-between items-center">
                <span>Class 10A</span>
                <span className="text-sm text-muted-foreground">28 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Class 10B</span>
                <span className="text-sm text-muted-foreground">25 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Class 10C</span>
                <span className="text-sm text-muted-foreground">30 students</span>
              </div>
            </div>
          </DataCard>
          
          <DataCard
            title="English Classes"
            subtitle="Class distribution"
            icon={<BookOpen className="h-4 w-4" />}
            variant="border"
            className="data-card"
          >
            <div className="space-y-3 p-4">
              <div className="flex justify-between items-center">
                <span>Class 10A</span>
                <span className="text-sm text-muted-foreground">28 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Class 10B</span>
                <span className="text-sm text-muted-foreground">25 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Class 10C</span>
                <span className="text-sm text-muted-foreground">30 students</span>
              </div>
            </div>
          </DataCard>
        </div>
      )}
      
      {activeTab === 'curriculum' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DataCard
            title="Core Subjects"
            subtitle="Standard curriculum"
            icon={<BookOpen className="h-4 w-4" />}
            variant="default"
            className="data-card"
          >
            <div className="space-y-3 p-4">
              <div className="p-3 rounded-md bg-muted/50">
                <div className="font-medium">Mathematics</div>
                <div className="text-sm text-muted-foreground">Algebra, Geometry, Calculus</div>
              </div>
              <div className="p-3 rounded-md bg-muted/50">
                <div className="font-medium">Science</div>
                <div className="text-sm text-muted-foreground">Physics, Chemistry, Biology</div>
              </div>
              <div className="p-3 rounded-md bg-muted/50">
                <div className="font-medium">Languages</div>
                <div className="text-sm text-muted-foreground">English, French, Spanish</div>
              </div>
            </div>
          </DataCard>
          
          <DataCard
            title="Elective Subjects"
            subtitle="Optional curriculum"
            icon={<BookOpen className="h-4 w-4" />}
            variant="default"
            className="data-card"
          >
            <div className="space-y-3 p-4">
              <div className="p-3 rounded-md bg-muted/50">
                <div className="font-medium">Arts</div>
                <div className="text-sm text-muted-foreground">Music, Visual Arts, Drama</div>
              </div>
              <div className="p-3 rounded-md bg-muted/50">
                <div className="font-medium">Computer Science</div>
                <div className="text-sm text-muted-foreground">Programming, Web Development</div>
              </div>
              <div className="p-3 rounded-md bg-muted/50">
                <div className="font-medium">Physical Education</div>
                <div className="text-sm text-muted-foreground">Sports, Fitness, Health</div>
              </div>
            </div>
          </DataCard>
          
          <DataCard
            title="Subject Teachers"
            subtitle="Faculty distribution"
            icon={<User className="h-4 w-4" />}
            variant="border"
            className="md:col-span-2 data-card"
          >
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm uppercase text-muted-foreground">Mathematics</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Dr. Smith (Algebra)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Mrs. Brown (Geometry)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Mr. Johnson (Calculus)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm uppercase text-muted-foreground">Science</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Dr. Williams (Physics)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Mrs. Davis (Chemistry)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Mr. Miller (Biology)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm uppercase text-muted-foreground">Languages</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span>Dr. Wilson (English)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span>Mrs. Moore (French)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span>Mr. Taylor (Spanish)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DataCard>
        </div>
      )}
    </div>
  );
};

export default AdminSubjects;
