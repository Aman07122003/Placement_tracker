import React from 'react';

export default function StatsCard({ title, value, trend, color, textColor }) {
  return (
    <div className={`${color} p-6 rounded-2xl shadow-sm bg-gradient-to-r relative overflow-hidden`}>
      {/* Content */}
      <div className="relative z-10">
        <h3 className={`${textColor} text-sm font-medium mb-2`}>{title}</h3>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-800">{value}</span>
          <span className={`px-3 py-1 ${textColor} bg-opacity-20 rounded-full text-sm font-medium`}>
            {trend}
          </span>
        </div>
      </div>
      
      {/* Decorative Background Element */}
      <div className={`absolute bottom-0 right-0 opacity-10 ${textColor}`}>
        <svg 
          className="w-24 h-24"
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    </div>
  );
}