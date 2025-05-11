import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

const CalendarEventForm = ({ companies = [] }) => {  // Default empty array in parameter
  const [eventType, setEventType] = useState('interview');
  const [query, setQuery] = useState('');

  const [formData, setFormData] = useState({
    company: null,
    eventType: 'interview',
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    eventLink: '',
    reminder: '',
    status: 'scheduled',
    notes: '',
    relatedApplication: null,
    participants: [],
    preparationChecklist: []
  });

  const eventTypes = [
    { value: 'interview', label: 'Interview' },
    { value: 'application-deadline', label: 'Application Deadline' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'offer-response', label: 'Offer Response Deadline' },
    { value: 'networking-event', label: 'Networking Event' },
    { value: 'career-fair', label: 'Career Fair' }
  ];

  const preparationItems = [
    'Research company',
    'Review job description',
    'Practice questions',
    'Prepare questions to ask',
    'Test tech setup',
    'Update resume'
  ];

  // Safely handle undefined companies
  const filteredCompanies = query === ''
    ? companies
    : companies.filter(company => 
        company?.name?.toLowerCase().includes(query.toLowerCase())
      );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Calendar Event:', formData);
    // Add submission logic here
  };

  const handleChecklistChange = (item) => {
    setFormData(prev => ({
      ...prev,
      preparationChecklist: prev.preparationChecklist.includes(item)
        ? prev.preparationChecklist.filter(i => i !== item)
        : [...prev.preparationChecklist, item]
    }));
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <CalendarIcon className="h-6 w-6 mr-2 text-blue-600" />
        Add Calendar Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Related Company *
          </label>
          <Combobox 
            value={formData.company} 
            onChange={(value) => setFormData({...formData, company: value})}
          >
            <div className="relative">
              <Combobox.Input
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      `relative cursor-default select-none py-2.5 px-4 ${
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

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Type *
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
              value={formData.eventType}
              onChange={(e) => setFormData({...formData, eventType: e.target.value})}
            >
              {eventTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Technical Interview Round 2"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
              <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-3.5" />
            </div>
          </div>

          {formData.eventType !== 'application-deadline' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time *
                </label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  />
                  <ClockIcon className="h-5 w-5 text-gray-400 absolute right-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  />
                  <ClockIcon className="h-5 w-5 text-gray-400 absolute right-3 top-3.5" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Location & Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.eventType === 'interview' ? 'Interview Location/Link *' : 'Location'}
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
              placeholder={
                formData.eventType === 'interview' 
                  ? 'Enter physical address or video conference link'
                  : 'Enter event location'
              }
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Related Job Posting
            </label>
            <input
              type="url"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Paste job posting URL"
              value={formData.eventLink}
              onChange={(e) => setFormData({...formData, eventLink: e.target.value})}
            />
          </div>
        </div>

        {/* Preparation Checklist */}
        {formData.eventType === 'interview' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">
              Interview Preparation Checklist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {preparationItems.map((item) => (
                <label 
                  key={item}
                  className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={formData.preparationChecklist.includes(item)}
                    onChange={() => handleChecklistChange(item)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes/Agenda
          </label>
          <textarea
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500 h-32"
            placeholder="Add any important notes, agenda items, or talking points..."
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />
        </div>

        {/* Reminder & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Set Reminder
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
              value={formData.reminder}
              onChange={(e) => setFormData({...formData, reminder: e.target.value})}
            >
              <option value="">No reminder</option>
              <option value="15-min">15 minutes before</option>
              <option value="30-min">30 minutes before</option>
              <option value="1-hour">1 hour before</option>
              <option value="1-day">1 day before</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Status
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
              <option value="postponed">Postponed</option>
            </select>
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
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalendarEventForm;