
import React from 'react';

const StudentMarks: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Marks & Assessments</h1>
      </div>
      
      <div className="rounded-md border">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Subject</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Term 1</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Term 2</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Final Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-4 py-3 text-sm">Mathematics</td>
              <td className="px-4 py-3 text-sm">85%</td>
              <td className="px-4 py-3 text-sm">88%</td>
              <td className="px-4 py-3 text-sm font-medium">A-</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm">Science</td>
              <td className="px-4 py-3 text-sm">78%</td>
              <td className="px-4 py-3 text-sm">92%</td>
              <td className="px-4 py-3 text-sm font-medium">B+</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm">English</td>
              <td className="px-4 py-3 text-sm">90%</td>
              <td className="px-4 py-3 text-sm">94%</td>
              <td className="px-4 py-3 text-sm font-medium">A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentMarks;
