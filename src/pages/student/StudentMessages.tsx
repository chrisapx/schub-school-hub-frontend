
import React from 'react';

const StudentMessages: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
      </div>
      
      <div className="rounded-md border">
        <div className="p-4">
          <p className="text-muted-foreground text-sm">Inbox (Read-only)</p>
        </div>
        
        <div className="divide-y divide-border">
          <div className="p-4 hover:bg-muted/50 cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">Assignment Feedback</p>
                <p className="text-muted-foreground text-sm">From: Mr. Williams</p>
              </div>
              <p className="text-xs text-muted-foreground">Apr 16, 2025</p>
            </div>
            <p className="mt-2 text-sm line-clamp-1">Your recent essay showed great improvement in structure and argumentation...</p>
          </div>
          
          <div className="p-4 hover:bg-muted/50 cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">Math Quiz Reminder</p>
                <p className="text-muted-foreground text-sm">From: Dr. Smith</p>
              </div>
              <p className="text-xs text-muted-foreground">Apr 14, 2025</p>
            </div>
            <p className="mt-2 text-sm line-clamp-1">Don't forget we have a quiz on quadratic equations next Monday...</p>
          </div>
          
          <div className="p-4 hover:bg-muted/50 cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">Science Fair Information</p>
                <p className="text-muted-foreground text-sm">From: Administration</p>
              </div>
              <p className="text-xs text-muted-foreground">Apr 10, 2025</p>
            </div>
            <p className="mt-2 text-sm line-clamp-1">The annual science fair will be held on May 20. Please register your project by...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMessages;
