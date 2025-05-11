import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/dashboard/StatsCard';
import RecentApplications from '../components/dashboard/RecentApplications';
import UpcomingInterviews from '../components/dashboard/UpcomingInterviews';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  CalendarDaysIcon, 
  BuildingOfficeIcon, 
  DocumentArrowUpIcon,
  ChartBarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ClockIcon,
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
  HomeIcon,
  BriefcaseIcon,
  UserIcon,
  Cog6ToothIcon,
  CheckIcon,
  ChevronUpDownIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

export default function Dashboard() {
  const dashboardStats = [
    { title: 'Total Applications', value: 24, trend: '+12%', color: 'from-blue-500/10 to-blue-600/20', textColor: 'text-blue-600' },
    { title: 'Interviewing', value: 5, trend: '+2', color: 'from-purple-500/10 to-purple-600/20', textColor: 'text-purple-600' },
    { title: 'Offers Received', value: 2, trend: '▲ 1', color: 'from-green-500/10 to-green-600/20', textColor: 'text-green-600' },
    { title: 'Rejections', value: 4, trend: '▼ 2', color: 'from-red-500/10 to-red-600/20', textColor: 'text-red-600' }
  ];

  const progressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Applications',
      data: [2, 5, 8, 12, 18, 24],
      borderColor: '#3b82f6',
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#3b82f6',
      pointHoverRadius: 6
    }]
  };

  const networkingStats = [
    { label: 'HR Connections', value: 15 },
    { label: 'Employee Referrals', value: 8 },
    { label: 'Follow-ups Needed', value: 5 }
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='min-h-screen'>
      <nav className="fixed w-full top-0 left-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                DashBoard
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <HomeIcon className="h-5 w-5 mr-2" />
                Home
              </Link>
              <Link
                to="/applications"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <BriefcaseIcon className="h-5 w-5 mr-2" />
                Applications
              </Link>
              <Link
                to="/analytics"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Analytics
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <UserIcon className="h-5 w-5 mr-2" />
                Profile
              </Link>
            </div>

            {/* Mobile menu button - Hidden on desktop */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? (
                  <XIcon className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Only shows when isMenuOpen is true */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <HomeIcon className="h-5 w-5 mr-2" />
                Home
              </Link>
              <Link
                to="/applications"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <BriefcaseIcon className="h-5 w-5 mr-2" />
                Applications
              </Link>
              <Link
                to="/analytics"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Analytics
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <UserIcon className="h-5 w-5 mr-2" />
                Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                Settings
              </Link>
            </div>
          </div>
        )}
      </nav>
      <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 mt-20 space-y-8 min-h-screen mx-auto max-w-7xl bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {dashboardStats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </motion.div>

      {/* Progress Chart */}
      <motion.div variants={itemVariants} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-100/20 dark:border-gray-700/30">
        <div className="flex items-center justify-between mb-6">
          <h2 className="md:text-2xl font-bold text-gray-800 dark:text-white">Application Progress</h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 text-[12px] md:text-sm bg-green-100/50 dark:bg-green-900/30 text-green-600 dark:text-green-300 rounded-full backdrop-blur-sm">
              +24% MoM
            </span>
          </div>
        </div>
        <Line 
          data={progressData} 
          options={{ 
            responsive: true,
            plugins: { 
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff'
              }
            },
            scales: { 
              y: { 
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.05)' },
                ticks: { color: '#6b7280' }
              },
              x: {
                grid: { display: false },
                ticks: { color: '#6b7280' }
              }
            }
          }}
          height={100}
        />
      </motion.div>

      {/* Main Content Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="lg:col-span-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-100/20 dark:border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="md:text-2xl text-lg font-bold text-gray-800 dark:text-white">Recent Applications</h2>
          </div>
          <RecentApplications />
        </div>

        <div className="space-y-6">
          <motion.div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-100/20 dark:border-gray-700/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Upcoming</h2>
              <span className="px-3 py-1 bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-sm backdrop-blur-sm">
                2 Events
              </span>
            </div>
            <UpcomingInterviews />
          </motion.div>

          <motion.div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-100/20 dark:border-gray-700/30">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Networking</h2>
            <div className="space-y-4">
              {networkingStats.map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex justify-between items-center p-3 bg-gray-100/30 dark:bg-gray-700/30 rounded-lg backdrop-blur-sm"
                >
                  <span className="text-gray-600 dark:text-gray-300">{stat.label}</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Actions & Goals */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            className="group flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-500/10 to-blue-600/20 dark:from-blue-900/20 dark:to-blue-800/30 rounded-2xl shadow-sm hover:shadow-lg transition-all"
          >
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <PlusIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-medium text-gray-800 dark:text-white group-hover:text-blue-600">
              New Application
            </span>
          </motion.button>
        </div>

        <motion.div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-100/20 dark:border-gray-700/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Placement Goals</h2>
            <AcademicCapIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Target Companies Applied</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">12/20</span>
            </div>
            <div className="relative w-full h-3 bg-gray-200/50 dark:bg-gray-700/30 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 1 }}
                className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: 'Average Response Time', 
            value: '4.2 Days', 
            icon: ClockIcon,
            color: 'text-blue-600 dark:text-blue-400',
            metric: 'Industry avg: 5.8 days'
          },
          { 
            title: 'Resume Strength', 
            value: '88%', 
            icon: DocumentArrowUpIcon,
            color: 'text-green-600 dark:text-green-400',
            metric: 'Last updated 3 days ago'
          },
          { 
            title: 'Network Reach', 
            value: '143', 
            icon: UserGroupIcon,
            color: 'text-purple-600 dark:text-purple-400',
            metric: 'Professionals in network'
          }
        ].map((metric, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-100/20 dark:border-gray-700/30"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">{metric.title}</h3>
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </div>
            <div className="text-3xl font-bold mb-1 dark:text-white">{metric.value}</div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{metric.metric}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
    </div>
    
  );
}