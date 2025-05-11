import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
  HomeIcon,
  BriefcaseIcon,
  ChartBarIcon,
  UserIcon,
  Cog6ToothIcon,
  CheckIcon,
  ChevronUpDownIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';


const dummyCompanies = [
  {
    id: 1,
    name: 'TechCorp',
    employees: [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@techcorp.com', position: 'CTO' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@techcorp.com', position: 'Engineering Manager' },
      { id: 3, firstName: 'Carlos', lastName: 'Martinez', email: 'carlos@techcorp.com', position: 'Frontend Developer' },
      { id: 4, firstName: 'Emma', lastName: 'Brown', email: 'emma@techcorp.com', position: 'Backend Developer' },
    ]
  },
  {
    id: 2,
    name: 'DesignHub',
    employees: [
      { id: 5, firstName: 'Alice', lastName: 'Johnson', email: 'alice@designhub.com', position: 'Lead Designer' },
      { id: 6, firstName: 'Bob', lastName: 'Williams', email: 'bob@designhub.com', position: 'UI/UX Designer' },
      { id: 7, firstName: 'Sophia', lastName: 'Lee', email: 'sophia@designhub.com', position: 'Graphic Designer' },
    ]
  },
  {
    id: 3,
    name: 'MarketGenius',
    employees: [
      { id: 8, firstName: 'Daniel', lastName: 'Kim', email: 'daniel@marketgenius.com', position: 'CMO' },
      { id: 9, firstName: 'Lily', lastName: 'Nguyen', email: 'lily@marketgenius.com', position: 'Marketing Specialist' },
      { id: 10, firstName: 'Jason', lastName: 'White', email: 'jason@marketgenius.com', position: 'Content Strategist' },
    ]
  },
  {
    id: 4,
    name: 'FinVerse',
    employees: [
      { id: 11, firstName: 'Rachel', lastName: 'Green', email: 'rachel@finverse.com', position: 'CFO' },
      { id: 12, firstName: 'Monica', lastName: 'Geller', email: 'monica@finverse.com', position: 'Financial Analyst' },
      { id: 13, firstName: 'Ross', lastName: 'Geller', email: 'ross@finverse.com', position: 'Investment Manager' },
    ]
  }
];


const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const EmailCampaignPage = () => {
  const [step, setStep] = useState(1);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [emailContent, setEmailContent] = useState({
    subject: '',
    body: '',
    attachments: []
  });
  const [companyQuery, setCompanyQuery] = useState('');
  const [employeeQuery, setEmployeeQuery] = useState('');

  const mergeTags = [
    { tag: '{firstName}', label: 'First Name' },
    { tag: '{lastName}', label: 'Last Name' },
    { tag: '{email}', label: 'Email' },
    { tag: '{position}', label: 'Position' },
    { tag: '{company}', label: 'Company Name' }
  ];

  // Filtering functions
  const filteredCompanies = dummyCompanies.filter(company =>
    company.name.toLowerCase().includes(companyQuery.toLowerCase())
  );

  const availableEmployees = selectedCompanies.flatMap(company => 
    company.employees.map(employee => ({
      ...employee,
      companyName: company.name
    }))
  );

  const filteredEmployees = availableEmployees.filter(employee =>
    `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(employeeQuery.toLowerCase())
  );

  // Selection handlers
  const toggleCompany = (company) => {
    setSelectedCompanies(prev => 
      prev.some(c => c.id === company.id)
        ? prev.filter(c => c.id !== company.id)
        : [...prev, company]
    );
  };

  const toggleEmployee = (employee) => {
    setSelectedEmployees(prev =>
      prev.some(e => e.id === employee.id)
        ? prev.filter(e => e.id !== employee.id)
        : [...prev, employee]
    );
  };

  const handleSendEmails = async () => {
    try {
      const emailsToSend = selectedEmployees.map(employee => ({
        to: employee.email,
        subject: emailContent.subject.replace(/{.*?}/g, match => {
          switch(match) {
            case '{firstName}': return employee.firstName;
            case '{lastName}': return employee.lastName;
            case '{email}': return employee.email;
            case '{position}': return employee.position;
            case '{company}': return employee.companyName;
            default: return match;
          }
        }),
        body: emailContent.body.replace(/{.*?}/g, match => {
          switch(match) {
            case '{firstName}': return employee.firstName;
            case '{lastName}': return employee.lastName;
            case '{email}': return employee.email;
            case '{position}': return employee.position;
            case '{company}': return employee.companyName;
            default: return match;
          }
        }),
        attachments: emailContent.attachments
      }));

      console.log('Sending emails:', emailsToSend);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Emails sent successfully!');
      setStep(1);
      setSelectedCompanies([]);
      setSelectedEmployees([]);
      setEmailContent({ subject: '', body: '', attachments: [] });
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Error sending emails. Please try again.');
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/50 p-4 sm:p-8">
      <nav className="fixed w-full top-0 left-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="md:text-2xl text-xl font-bold text-blue-600">
                Email Automation
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
                to="/NewApplicationForm"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <BriefcaseIcon className="h-5 w-5 mr-2" />
                Applications
              </Link>
              <Link
                to="/DashBoard"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/Profile"
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
                to="/NewApplicationForm"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <BriefcaseIcon className="h-5 w-5 mr-2" />
                Applications
              </Link>
              <Link
                to="/Dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/Profile"
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
      <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 mt-20 sm:p-8">
        <LayoutGroup>
          <motion.div className="flex justify-center mb-8 sm:mb-12 space-x-4 sm:space-x-8">
            {[1, 2, 3].map((num) => (
              <motion.div
                key={num}
                layout
                className="flex flex-col items-center"
              >
                <motion.div
                  layout
                  className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center 
                    transition-all duration-300 ${step >= num ? 
                    'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md sm:shadow-lg' : 
                    'bg-gray-100 text-gray-400'}`}
                  animate={{ scale: step === num ? 1.1 : 1 }}
                >
                  <span className="text-sm sm:text-base font-bold">{num}</span>
                </motion.div>
                <motion.div
                  className={`mt-1 sm:mt-2 text-xs sm:text-sm font-medium ${step >= num ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  {num === 1 && 'Companies'}
                  {num === 2 && 'Employees'}
                  {num === 3 && 'Compose'}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>

        <AnimatePresence mode='wait'>
          {/* Step 1 - Companies Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={stepVariants}
              className="space-y-6 sm:space-y-8"
            >
              <div className="space-y-4">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl sm:text-3xl font-bold text-gray-800"
                >
                  Select Companies
                </motion.h2>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="🔍 Search companies..."
                    className="w-full p-3 sm:p-4 text-base sm:text-lg border-2 border-gray-200 rounded-lg sm:rounded-xl 
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                      transition-all duration-300"
                    value={companyQuery}
                    onChange={(e) => setCompanyQuery(e.target.value)}
                  />
                </motion.div>
              </div>

              <motion.div
                layout
                className="grid gap-3 sm:gap-4 max-h-96 overflow-y-auto p-1 sm:p-2"
              >
                <AnimatePresence>
                  {filteredCompanies.map(company => (
                    <motion.div
                      key={company.id}
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 cursor-pointer 
                        ${selectedCompanies.some(c => c.id === company.id) ?
                        'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                      onClick={() => toggleCompany(company)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <motion.div
                          animate={{
                            backgroundColor: selectedCompanies.some(c => c.id === company.id) 
                              ? '#3b82f6' 
                              : '#fff',
                            borderColor: selectedCompanies.some(c => c.id === company.id) 
                              ? '#3b82f6' 
                              : '#e5e7eb'
                          }}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 mr-3 sm:mr-4 flex items-center justify-center"
                        >
                          {selectedCompanies.some(c => c.id === company.id) && (
                            <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          )}
                        </motion.div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                            {company.name}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600">
                            {company.employees.length} team members
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              <motion.button
                onClick={() => setStep(2)}
                disabled={selectedCompanies.length === 0}
                className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 
                  text-white rounded-lg sm:rounded-xl font-semibold sm:font-bold text-base sm:text-lg 
                  hover:opacity-90 disabled:opacity-50 transition-all duration-300 shadow-md sm:shadow-lg 
                  flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue with {selectedCompanies.length} Companies
                <motion.span
                  animate={{ x: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          )}

          {/* Step 2 - Employees Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={stepVariants}
              className="space-y-6 sm:space-y-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl sm:text-3xl font-bold text-gray-800"
                >
                  Select Employees
                </motion.h2>
                <motion.button
                  onClick={() => setStep(1)}
                  className="flex items-center text-blue-600 hover:text-blue-700 
                    font-medium transition-colors text-sm sm:text-base"
                  whileHover={{ x: -3 }}
                >
                  <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                  Back to Companies
                </motion.button>
              </div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="🔍 Search employees..."
                  className="w-full p-3 sm:p-4 text-base sm:text-lg border-2 border-gray-200 rounded-lg sm:rounded-xl 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                    transition-all duration-300"
                  value={employeeQuery}
                  onChange={(e) => setEmployeeQuery(e.target.value)}
                />
              </motion.div>

              <motion.div
                layout
                className="grid gap-3 sm:gap-4 max-h-96 overflow-y-auto p-1 sm:p-2"
              >
                <AnimatePresence>
                  {filteredEmployees.map(employee => (
                    <motion.div
                      key={employee.id}
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 cursor-pointer 
                        ${selectedEmployees.some(e => e.id === employee.id) ?
                        'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                      onClick={() => toggleEmployee(employee)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <motion.div
                          animate={{
                            backgroundColor: selectedEmployees.some(e => e.id === employee.id) 
                              ? '#3b82f6' 
                              : '#fff',
                            borderColor: selectedEmployees.some(e => e.id === employee.id) 
                              ? '#3b82f6' 
                              : '#e5e7eb'
                          }}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 mr-3 sm:mr-4 flex items-center justify-center"
                        >
                          {selectedEmployees.some(e => e.id === employee.id) && (
                            <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          )}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                            {employee.firstName} {employee.lastName}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600">{employee.position}</p>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            {employee.companyName}
                          </p>
                        </div>
                        <motion.div 
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center"
                          whileHover={{ rotate: 15 }}
                        >
                          <span className="text-blue-600 text-xs sm:text-sm">
                            {employee.email[0].toUpperCase()}
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <motion.button
                  onClick={() => setStep(1)}
                  className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 sm:px-6 bg-gray-100 text-gray-600 rounded-lg sm:rounded-xl
                    font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base"
                  whileHover={{ x: -3 }}
                >
                  ← Back
                </motion.button>
                <motion.button
                  onClick={() => setStep(3)}
                  disabled={selectedEmployees.length === 0}
                  className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-indigo-600 
                    text-white rounded-lg sm:rounded-xl font-medium hover:opacity-90 disabled:opacity-50
                    transition-all duration-300 shadow-md sm:shadow-lg flex items-center justify-center gap-2 
                    text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue with {selectedEmployees.length} Employees
                  <motion.span
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3 - Email Composition */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={stepVariants}
              className="space-y-6 sm:space-y-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl sm:text-3xl font-bold text-gray-800"
                >
                  Compose Email
                </motion.h2>
                <motion.button
                  onClick={() => setStep(2)}
                  className="flex items-center text-blue-600 hover:text-blue-700 
                    font-medium transition-colors text-sm sm:text-base"
                  whileHover={{ x: -3 }}
                >
                  <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                  Back to Employees
                </motion.button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <motion.input
                    type="text"
                    value={emailContent.subject}
                    onChange={(e) => setEmailContent(prev => ({...prev, subject: e.target.value}))}
                    className="w-full p-3 sm:p-4 text-base sm:text-lg border-2 border-gray-200 rounded-lg sm:rounded-xl
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                      transition-all duration-300"
                    placeholder="Your email subject..."
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                    Body
                  </label>
                  <motion.div
                    className="rounded-lg sm:rounded-xl border-2 border-gray-200 overflow-hidden"
                    whileHover={{ scale: 1.005 }}
                  >
                    <div className="flex flex-wrap gap-2 p-3 sm:p-4 bg-gray-50 border-b-2">
                      {mergeTags.map(tag => (
                        <motion.button
                          key={tag.tag}
                          onClick={() => setEmailContent(prev => ({
                            ...prev,
                            body: prev.body + tag.tag
                          }))}
                          className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white border-2 border-blue-100 rounded-md sm:rounded-lg
                            text-blue-600 hover:bg-blue-50 transition-colors flex items-center text-sm sm:text-base"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="mr-1.5 sm:mr-2">🏷️</span>
                          {tag.label}
                        </motion.button>
                      ))}
                    </div>
                    <motion.textarea
                      value={emailContent.body}
                      onChange={(e) => setEmailContent(prev => ({...prev, body: e.target.value}))}
                      className="w-full h-64 sm:h-96 p-4 sm:p-6 text-base sm:text-lg focus:outline-none bg-white
                        placeholder-gray-400 resize-none"
                      placeholder="Write your email content here..."
                      whileFocus={{ scale: 1.005 }}
                    />
                  </motion.div>
                </motion.div>

                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <motion.button
                    onClick={() => setStep(2)}
                    className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 sm:px-6 bg-gray-100 text-gray-600 rounded-lg sm:rounded-xl
                      font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base"
                    whileHover={{ x: -3 }}
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    onClick={handleSendEmails}
                    disabled={!emailContent.subject || !emailContent.body}
                    className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-green-600 to-blue-600 
                      text-white rounded-lg sm:rounded-xl font-medium hover:opacity-90 disabled:opacity-50
                      transition-all duration-300 shadow-md sm:shadow-lg flex items-center justify-center gap-2 
                      text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ✨ Send to {selectedEmployees.length} Employees
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      ✉️
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmailCampaignPage;