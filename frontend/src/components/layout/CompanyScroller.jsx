import React from 'react';
import { motion } from 'framer-motion';

const CompanyScroller = () => {
  const companies = [
    { name: 'Meta', color: 'bg-blue-600' },
    { name: 'Apple', color: 'bg-gray-800' },
    { name: 'Amazon', color: 'bg-yellow-500' },
    { name: 'Netflix', color: 'bg-red-600' },
    { name: 'Google', color: 'bg-blue-500' },
  ];

  return (
    <div className="relative w-full overflow-hidden py-12">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white dark:from-gray-900 via-transparent to-white dark:to-gray-900 z-10" />
      
      <motion.div 
        className="flex space-x-8 w-max"
        animate={{ 
          x: ['0%', '-50%'],
          transition: {
            duration: 20,
            ease: 'linear',
            repeat: Infinity
          }
        }}
      >
        {[...companies, ...companies].map((company, index) => (
          <div 
            key={index}
            className="flex items-center justify-center gap-4 px-8 py-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className={`w-12 h-12 ${company.color} rounded-full flex items-center justify-center`}>
              <span className="text-white font-bold text-lg">
                {company.name[0]}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {company.name}
            </h3>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CompanyScroller;