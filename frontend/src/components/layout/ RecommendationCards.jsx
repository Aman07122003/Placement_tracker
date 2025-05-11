import React from 'react';
import { FaLinkedin, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const RecommendationCards = () => {
  const recommendations = [
    {
      name: "Dr. Sarah Mitchell",
      designation: "Head of TCP/IP Research Cell",
      content: `John has demonstrated exceptional skills in network protocol analysis during his time with our TCP/IP cell. His work on packet analysis automation using Python showcased both technical prowess and innovative thinking. He consistently showed dedication in tackling complex networking challenges.`,
      photo: "/path-to-tcpip-head-photo.jpg",
      linkedin: "#",
      email: "sarah.mitchell@example.com"
    },
    {
      name: "Prof. Michael Chen",
      designation: "Computer Science Branch Coordinator",
      content: `As a computer science student, John exhibited outstanding problem-solving abilities and leadership skills. His final year project on AI-based network security set a new benchmark for academic excellence. He consistently showed initiative in collaborative projects.`,
      photo: "/path-to-cs-coordinator-photo.jpg",
      linkedin: "#",
      email: "michael.chen@example.com"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Recommendations
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {recommendations.map((rec, index) => (
          <div 
            key={index}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8"
          >
            <div className="absolute top-4 left-4 text-blue-500 opacity-20">
              <FaQuoteLeft className="w-12 h-12" />
            </div>
            
            <div className="flex items-start gap-6 mb-6">
              <img 
                src={rec.photo}
                alt={rec.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 dark:border-gray-700"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {rec.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {rec.designation}
                </p>
                <div className="flex gap-3 mt-2">
                  <a 
                    href={rec.linkedin} 
                    className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href={`mailto:${rec.email}`}
                    className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label="Email"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {rec.content}
            </p>

            <div className="absolute bottom-4 right-4 text-blue-500 opacity-20">
              <FaQuoteRight className="w-12 h-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCards;