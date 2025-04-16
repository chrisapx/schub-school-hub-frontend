
import React from 'react';

const StudentBehavior: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Behavioral Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h3 className="text-lg font-semibold mb-4">Attendance</h3>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={star <= 4 ? "currentColor" : "none"}
                stroke={star > 4 ? "currentColor" : "none"}
                className={star <= 4 ? "w-6 h-6 text-yellow-500" : "w-6 h-6 text-gray-300"}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ))}
          </div>
        </div>
        
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h3 className="text-lg font-semibold mb-4">Punctuality</h3>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={star <= 5 ? "currentColor" : "none"}
                stroke={star > 5 ? "currentColor" : "none"}
                className={star <= 5 ? "w-6 h-6 text-yellow-500" : "w-6 h-6 text-gray-300"}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ))}
          </div>
        </div>
        
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h3 className="text-lg font-semibold mb-4">Discipline</h3>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={star <= 5 ? "currentColor" : "none"}
                stroke={star > 5 ? "currentColor" : "none"}
                className={star <= 5 ? "w-6 h-6 text-yellow-500" : "w-6 h-6 text-gray-300"}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ))}
          </div>
        </div>
        
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h3 className="text-lg font-semibold mb-4">Leadership</h3>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={star <= 4 ? "currentColor" : "none"}
                stroke={star > 4 ? "currentColor" : "none"}
                className={star <= 4 ? "w-6 h-6 text-yellow-500" : "w-6 h-6 text-gray-300"}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
        <h3 className="text-lg font-semibold mb-4">Teacher Notes</h3>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground text-sm">April 15, 2025 - Mr. Williams</p>
            <p>Consistently participates in class discussions and shows great leadership qualities.</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">March 10, 2025 - Mrs. Johnson</p>
            <p>Has been helping other students with difficult concepts. Very collaborative.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentBehavior;
