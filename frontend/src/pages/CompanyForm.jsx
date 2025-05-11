import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    industry: '',
    companySize: '',
    headquarters: '',
    foundedYear: '',
    description: '',
    contactEmail: '',
    phoneNumber: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      facebook: ''
    },
    hiringStatus: 'active',
    techStack: []
  });

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Retail',
    'Education',
    'Manufacturing',
    'Other'
  ];

  const techOptions = [
    'React',
    'Node.js',
    'Python',
    'Java',
    'AWS',
    'Docker',
    'Kubernetes',
    'Machine Learning'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend API
    console.log('Company Data:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      website: '',
      industry: '',
      companySize: '',
      headquarters: '',
      foundedYear: '',
      description: '',
      contactEmail: '',
      phoneNumber: '',
      socialMedia: {
        linkedin: '',
        twitter: '',
        facebook: ''
      },
      hiringStatus: 'active',
      techStack: []
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTechStack = (tech) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Add New Company</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <Combobox 
                value={formData.industry} 
                onChange={(value) => setFormData(prev => ({...prev, industry: value}))}
              >
                <div className="relative">
                  <Combobox.Input
                    className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Select industry..."
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                  </Combobox.Button>

                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5">
                    {industries.map((industry) => (
                      <Combobox.Option
                        key={industry}
                        value={industry}
                        className={({ active }) =>
                          `relative cursor-default select-none py-3 px-4 ${
                            active ? 'bg-blue-50' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {industry}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://example.com"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <select
                name="companySize"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                value={formData.companySize}
                onChange={handleChange}
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location & Contact Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Location & Contact
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Headquarters
              </label>
              <input
                type="text"
                name="headquarters"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="City, Country"
                value={formData.headquarters}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Founded Year
              </label>
              <input
                type="number"
                name="foundedYear"
                min="1900"
                max={new Date().getFullYear()}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                value={formData.foundedYear}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                value={formData.contactEmail}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Social Media
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                name="socialMedia.linkedin"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://linkedin.com/company/..."
                value={formData.socialMedia.linkedin}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter
              </label>
              <input
                type="url"
                name="socialMedia.twitter"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://twitter.com/..."
                value={formData.socialMedia.twitter}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="url"
                name="socialMedia.facebook"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://facebook.com/..."
                value={formData.socialMedia.facebook}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Additional Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Description
            </label>
            <textarea
              name="description"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 h-32"
              placeholder="Brief description of the company..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tech Stack
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {techOptions.map((tech) => (
                <label 
                  key={tech}
                  className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={formData.techStack.includes(tech)}
                    onChange={() => handleTechStack(tech)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{tech}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hiring Status
            </label>
            <div className="flex space-x-4">
              {['active', 'freeze', 'closed'].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="radio"
                    name="hiringStatus"
                    value={status}
                    checked={formData.hiringStatus === status}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            className="px-6 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 border border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Company
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;