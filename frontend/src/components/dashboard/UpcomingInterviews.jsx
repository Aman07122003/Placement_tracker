// src/components/dashboard/UpcomingInterviews.jsx
import React from 'react';
import { ClockIcon, CalendarIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

const UpcomingInterviews = () => {
  // Mock data - replace with API data
  const interviews = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer',
      type: 'Technical Round',
      date: '2024-03-20',
      time: '14:30',
      mode: 'Online'
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Frontend Developer',
      type: 'HR Interview',
      date: '2024-03-22',
      time: '11:00',
      mode: 'In-person'
    }
  ];

  return (
    <div className="space-y-4">
      {interviews.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No upcoming interviews scheduled
        </div>
      ) : (
        interviews.map((interview) => (
          <div 
            key={interview.id}
            className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <VideoCameraIcon className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            
            <div className="ml-4 flex-1">
              <h3 className="font-medium text-gray-900">{interview.company}</h3>
              <p className="text-sm text-gray-500">{interview.position}</p>
              
              <div className="mt-2 flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1 text-gray-400" />
                  <span>{interview.date}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1 text-gray-400" />
                  <span>{interview.time}</span>
                </div>
              </div>
              
              <div className="mt-2 flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {interview.mode}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {interview.type}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UpcomingInterviews;