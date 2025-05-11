import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiBriefcase, FiUsers, FiMail, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import React from 'react';
const Nav = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const features = [
        {
          name: 'Application Tracking',
          description: 'Manage all your job applications in one centralized dashboard',
          icon: FiBriefcase,
          link: "/NewApplicationForm"
        },
        {
          name: 'Dashboard',
          description: 'Maintain organized records of company contacts and HR details',
          icon: FiUsers,
          link: "/Dashboard"
        },
        {
          name: 'Email Automation',
          description: 'Send personalized emails and track responses effectively',
          icon: FiMail,
          link: "/EmailCampaignPage"
        },
        {
          name: 'Analytics',
          description: 'Detailed insights into your placement journey progress',
          icon: FiActivity,
          link: "#"
        },
      ];
  return (
    <div>
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Placement<span className="text-gray-900 dark:text-white">Tracker</span>
              </h1>
              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  <a
                    href="Dashboard"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </a>
                  <a
                    href="NewApplicationForm"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    New Application
                  </a>
                  <a
                    href="/EmailCampaignPage"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Email Page
                  </a>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(true)}
              >
                <FiMenu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Dialog
          as="div"
          className="md:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50 bg-black/50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white dark:bg-gray-900 shadow-xl">
            <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                PlacementTracker
              </h1>
              <button
                type="button"
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {features.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {item.name}
                </a>
              ))}
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </nav>
    </div>
  )
}

export default Nav