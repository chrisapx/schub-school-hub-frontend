
import React, { useState } from 'react';
import { 
  BookOpen, 
  User, 
  SquareCode, 
  Info, 
  ExternalLink 
} from 'lucide-react';
import { getSubjects, getTeacherById } from '@/utils/localStorage';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const StudentSubjects: React.FC = () => {
  const subjects = getSubjects();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Get subject details for the side panel
  const subject = subjects.find(s => s.id === selectedSubject);
  const teacher = subject ? getTeacherById(subject.teacherId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-blue bg-clip-text text-transparent animate-pulse-soft">My Subjects</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => {
          const subjectTeacher = getTeacherById(subject.teacherId);
          
          return (
            <Card 
              key={subject.id} 
              className="futuristic-card group"
              onClick={() => setSelectedSubject(subject.id)}
            >
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="mb-4 flex justify-between items-start">
                    <div className="w-12 h-12 rounded-lg bg-gradient-blue flex items-center justify-center text-white shadow-lg">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {subject.code}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {subject.name}
                  </h3>
                  
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    <span>Teacher: {subjectTeacher?.name || 'Not Assigned'}</span>
                  </div>
                  
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                    {subject.description}
                  </p>
                </div>
                
                <div className="bg-muted/30 px-6 py-3 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:text-primary/80"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSubject(subject.id);
                    }}
                  >
                    View Details <ExternalLink className="ml-1 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Subject details side panel */}
      <Sheet open={!!selectedSubject} onOpenChange={(open) => !open && setSelectedSubject(null)}>
        <SheetContent className="sm:max-w-lg">
          {subject && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl flex items-center gap-2 text-primary">
                  <BookOpen className="w-6 h-6" />
                  {subject.name}
                </SheetTitle>
                <SheetDescription>
                  Subject details and information
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3 mb-2">
                    <SquareCode className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Subject Code</h3>
                  </div>
                  <p>{subject.code}</p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Teacher</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{teacher?.name || 'Not Assigned'}</p>
                      {teacher && (
                        <p className="text-sm text-muted-foreground">{teacher.email}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Info className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Description</h3>
                  </div>
                  <p className="text-muted-foreground">{subject.description}</p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default StudentSubjects;
