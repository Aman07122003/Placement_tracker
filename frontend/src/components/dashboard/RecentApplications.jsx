import React from 'react';
export default function RecentApplications() {
    const applications = [
      { 
        company: 'Google', 
        role: 'SWE Intern', 
        status: 'Interview', 
        date: '2024-03-15',
        logo: '/logos/google.png'
      },
      // ... more mock data
    ];
  
    return (
      <div className="space-y-4">
        {applications.map((app, idx) => (
          <div key={idx} className="flex items-center p-4 hover:bg-gray-50 rounded-lg">
            <img src={app.logo} className="w-10 h-10 mr-4 rounded-full" alt={app.company} />
            <div className="flex-1">
              <h3 className="font-medium">{app.company}</h3>
              <p className="text-sm text-gray-500">{app.role}</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {app.status}
            </span>
          </div>
        ))}
      </div>
    );
  }