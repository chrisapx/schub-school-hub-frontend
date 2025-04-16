
import React from 'react';

const StudentSubjects: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Subjects</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* This is a placeholder component that will be enhanced later */}
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h3 className="text-lg font-semibold">Mathematics</h3>
          <p className="text-muted-foreground mt-2">Code: MATH101</p>
          <p className="text-muted-foreground">Teacher: Dr. Smith</p>
        </div>
        
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h3 className="text-lg font-semibold">Science</h3>
          <p className="text-muted-foreground mt-2">Code: SCI101</p>
          <p className="text-muted-foreground">Teacher: Mrs. Johnson</p>
        </div>
        
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h3 className="text-lg font-semibold">English</h3>
          <p className="text-muted-foreground mt-2">Code: ENG101</p>
          <p className="text-muted-foreground">Teacher: Mr. Williams</p>
        </div>
      </div>
    </div>
  );
};

export default StudentSubjects;
