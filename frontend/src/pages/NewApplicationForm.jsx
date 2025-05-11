import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
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

const NewApplicationForm = () => {
  // State for companies and employees
  const [companies] = useState([
    { id: 1, name: 'Google', employees: [] },
    { id: 2, name: 'Microsoft', employees: [] },
    { id: 3, name: 'Amazon', employees: [] },
  ]);

  const [employees] = useState([
    { id: 1, name: 'John Doe', position: 'Senior HR Manager', companyId: 1 },
    { id: 2, name: 'Jane Smith', position: 'Tech Lead', companyId: 1 },
    { id: 3, name: 'Mike Johnson', position: 'Recruiter', companyId: 2 },
  ]);

  // Navigation state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    company: null,
    hasReferral: false,
    referralEmployee: null,
    jobRole: '',
    applicationDate: '',
    status: 'applied',
    jobType: 'full-time',
    jobSource: '',
    applicationMethod: 'online',
    salaryRange: '',
    jobDescription: '',
    applicationDeadline: '',
    nextFollowUpDate: '',
    jobLocation: '',
    workMode: 'remote',
    resumeVersion: '',
    coverLetter: '',
    requiredSkills: [],
    companyWebsite: '',
    recruiterName: '',
    recruiterEmail: '',
    interviewDates: [],
    notes: '',
    jobPostingLink: '',
    tags: [],
    confidenceLevel: 3,
  });

  const [query, setQuery] = useState('');

  const filteredCompanies = query === '' 
    ? companies 
    : companies.filter(company =>
        company.name.toLowerCase().includes(query.toLowerCase())
      );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application Data:', formData);
    // Add your submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar - Fixed at the top */}
      <nav className="fixed w-full top-0 left-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="md:text-2xl text-xl font-bold text-blue-600">
                JobTrack
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

      {/* Main Content - Pushed down by fixed nav */}
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">New Job Application</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Select Company</label>
              <Combobox 
                value={formData.company} 
                onChange={(value) => setFormData({...formData, company: value})}
              >
                <div className="relative">
                  <Combobox.Input
                    className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    displayValue={(company) => company?.name}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search companies..."
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                  </Combobox.Button>

                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5">
                    {filteredCompanies.map((company) => (
                      <Combobox.Option
                        key={company.id}
                        value={company}
                        className={({ active }) =>
                          `relative cursor-default select-none py-3 px-4 ${
                            active ? 'bg-blue-50' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {company.name}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                                <CheckIcon className="h-5 w-5" />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>

            {/* Job Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Role</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.jobRole}
                  onChange={(e) => setFormData({...formData, jobRole: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Date</label>
                <input
                  type="date"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.applicationDate}
                  onChange={(e) => setFormData({...formData, applicationDate: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.jobType}
                  onChange={(e) => setFormData({...formData, jobType: e.target.value})}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Mode</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.workMode}
                  onChange={(e) => setFormData({...formData, workMode: e.target.value})}
                >
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Location</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="City, Country"
                  value={formData.jobLocation}
                  onChange={(e) => setFormData({...formData, jobLocation: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="$70k - $90k"
                  value={formData.salaryRange}
                  onChange={(e) => setFormData({...formData, salaryRange: e.target.value})}
                />
              </div>
            </div>

            {/* Application Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Source</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.jobSource}
                  onChange={(e) => setFormData({...formData, jobSource: e.target.value})}
                >
                  <option value="">Select Source</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="company-website">Company Website</option>
                  <option value="indeed">Indeed</option>
                  <option value="referral">Referral</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Method</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.applicationMethod}
                  onChange={(e) => setFormData({...formData, applicationMethod: e.target.value})}
                >
                  <option value="online">Online Portal</option>
                  <option value="email">Direct Email</option>
                  <option value="recruiter">Through Recruiter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.applicationDeadline}
                  onChange={(e) => setFormData({...formData, applicationDeadline: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Next Follow-up Date</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.nextFollowUpDate}
                  onChange={(e) => setFormData({...formData, nextFollowUpDate: e.target.value})}
                />
              </div>
            </div>

            {/* Referral Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Have any employee referral?</span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, hasReferral: true})}
                    className={`px-4 py-2 rounded-lg ${
                      formData.hasReferral 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, hasReferral: false, referralEmployee: null})}
                    className={`px-4 py-2 rounded-lg ${
                      !formData.hasReferral 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {formData.hasReferral && (
                <div className="space-y-4">
                  <Combobox 
                    value={formData.referralEmployee} 
                    onChange={(value) => setFormData({...formData, referralEmployee: value})}
                  >
                    <div className="relative">
                      <Combobox.Input
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        displayValue={(employee) => employee?.name}
                        placeholder="Search employees..."
                      />
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                      </Combobox.Button>

                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5">
                        {employees.map((employee) => (
                          <Combobox.Option
                            key={employee.id}
                            value={employee}
                            className={({ active }) =>
                              `relative cursor-default select-none py-3 px-4 ${
                                active ? 'bg-blue-50' : 'text-gray-900'
                              }`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <div className="flex flex-col">
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    {employee.name}
                                  </span>
                                  <span className="text-sm text-gray-500">{employee.position}</span>
                                </div>
                                {selected && (
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                                    <CheckIcon className="h-5 w-5" />
                                  </span>
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    </div>
                  </Combobox>
                  
                  <button
                    type="button"
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <UserPlusIcon className="w-5 h-5 mr-2" />
                    Add New Employee
                  </button>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume Version</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Resume v2.3"
                  value={formData.resumeVersion}
                  onChange={(e) => setFormData({...formData, resumeVersion: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Posting Link</label>
                <input
                  type="url"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://company.com/job-id"
                  value={formData.jobPostingLink}
                  onChange={(e) => setFormData({...formData, jobPostingLink: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="React, Node.js, AWS (comma separated)"
                  value={formData.requiredSkills.join(', ')}
                  onChange={(e) => setFormData({...formData, requiredSkills: e.target.value.split(', ')})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confidence Level</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({...formData, confidenceLevel: level})}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formData.confidenceLevel >= level
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 h-32"
                placeholder="Add any important notes or reminders..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 mt-8">
              <Link
                to="/"
                className="px-6 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 border border-gray-300"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewApplicationForm;