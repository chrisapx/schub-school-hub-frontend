
import React from 'react';

const StudentAssignments: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Assignments</h1>
      </div>
      
      <div className="rounded-md border">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Assignment</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Subject</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Due Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-4 py-3 text-sm">Term Paper</td>
              <td className="px-4 py-3 text-sm">English</td>
              <td className="px-4 py-3 text-sm">May 5, 2025</td>
              <td className="px-4 py-3 text-sm"><span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-yellow-100 text-yellow-800">Pending</span></td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm">Math Problem Set</td>
              <td className="px-4 py-3 text-sm">Mathematics</td>
              <td className="px-4 py-3 text-sm">April 28, 2025</td>
              <td className="px-4 py-3 text-sm"><span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-100 text-green-800">Submitted</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAssignments;
