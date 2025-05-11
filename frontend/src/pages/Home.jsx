import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiBriefcase, FiUsers, FiMail, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import React from 'react';
import Footer from '../components/layout/Footer';
import CompanyScroller from '../components/layout/CompanyScroller';
import RecommendationCards from '../components/layout/ RecommendationCards';
import Nav from '../components/layout/Nav';
import NewApplicationForm from './NewApplicationForm';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState([
    { id: 1, name: 'Applications Tracked', value: '1.2k+' },
    { id: 2, name: 'Companies Monitored', value: '500+' },
    { id: 3, name: 'Successful Placements', value: '200+' },
  ]);

  const features = [
    {
      name: 'Application Tracking',
      description: 'Manage all your job applications in one centralized dashboard',
      icon: FiBriefcase,
    },
    {
      name: 'Company Directory',
      description: 'Maintain organized records of company contacts and HR details',
      icon: FiUsers,
    },
    {
      name: 'Email Automation',
      description: 'Send personalized emails and track responses effectively',
      icon: FiMail,
    },
    {
      name: 'Analytics',
      description: 'Detailed insights into your placement journey progress',
      icon: FiActivity,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Navigation */}
      <Nav />
      {/* Hero Section */}
      <div className="relative isolate pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
            >
              Take Control of Your 
              <span className="text-blue-600"> Placement Journey</span>
            </motion.h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Streamline your job search process with intelligent tracking, automated outreach,
              and data-driven insights.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
                Start Tracking Now
              </button>
              <a
                href="NewApplicationForm"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Powerful tools for your job search
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <feature.icon className="h-8 w-8 text-blue-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="my-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm"
              >
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">
                  {stat.name}
                </dt>
                <dd className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <section className="my-16">
        <CompanyScroller />
      </section>
      <section className='my-24'>
        <RecommendationCards />
      </section>
      <Footer />
    </div>
  );
}