import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { 
  CalendarIcon, 
  PlusIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon,
  ChevronDownIcon, 
  UserGroupIcon, 
  BriefcaseIcon,
  ClockIcon, 
  TagIcon
} from '@heroicons/react/24/outline';

const localizer = momentLocalizer(moment);

// Dummy data generation
const generateDummyData = () => {
  const companies = [
    { id: '1', name: 'TechCorp' },
    { id: '2', name: 'DesignHub' },
    { id: '3', name: 'DataSystems' },
    { id: '4', name: 'CloudNine' }
  ];
  
  const eventTypes = ['interview', 'deadline', 'meeting', 'networking'];
  const statuses = ['scheduled', 'completed'];
  
  const events = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + i);
    
    const eventsPerDay = 1 + Math.floor(Math.random() * 3);
    
    for (let j = 0; j < eventsPerDay; j++) {
      const hour = 9 + Math.floor(Math.random() * 8);
      const minute = Math.random() > 0.5 ? 0 : 30;
      const duration = 30 + Math.floor(Math.random() * 3) * 30;
      
      const start = new Date(startDate);
      start.setHours(hour, minute, 0, 0);
      
      const end = new Date(start);
      end.setMinutes(start.getMinutes() + duration);
      
      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const company = companies[Math.floor(Math.random() * companies.length)];
      
      events.push({
        id: `${i}-${j}`,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} with ${company.name}`,
        type,
        company,
        start,
        end,
        location: type === 'interview' ? 'Zoom Meeting' : 'Office',
        description: `This is a sample ${type} event`,
        status,
        notes: `Notes for ${type} with ${company.name}`
      });
    }
  }
  
  return { events, companies };
};

const { events: dummyEvents, companies: dummyCompanies } = generateDummyData();

const AdvancedCalendar = ({ events = dummyEvents, companies = dummyCompanies }) => {
  const [view, setView] = useState('week');
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventFilters, setEventFilters] = useState({
    types: ['interview', 'deadline', 'meeting', 'networking'],
    companies: [],
    statuses: ['scheduled', 'completed']
  });

  const Event = ({ event }) => (
    <div className="p-2 rounded-lg text-sm">
      <div className="flex items-center space-x-2">
        <span className="font-medium truncate">{event.title}</span>
        {event.company && (
          <span className="text-xs bg-white bg-opacity-20 px-1.5 py-0.5 rounded truncate">
            {event.company.name}
          </span>
        )}
      </div>
      {event.start && (
        <div className="flex items-center space-x-2 mt-1">
          <ClockIcon className="h-3 w-3" />
          <span className="text-xs">
            {moment(event.start).format('h:mm A')}
            {event.end && ` - ${moment(event.end).format('h:mm A')}`}
          </span>
        </div>
      )}
    </div>
  );

  const filterEvents = (eventsToFilter, filters) => {
    if (!Array.isArray(eventsToFilter)) return [];
    
    return eventsToFilter.filter(event => {
      const typeMatch = filters.types.includes(event.type);
      const companyMatch = filters.companies.length === 0 || 
        (event.company && filters.companies.includes(event.company.id));
      const statusMatch = filters.statuses.includes(event.status);
      
      return typeMatch && companyMatch && statusMatch;
    });
  };

  const filteredEvents = filterEvents(events, eventFilters);

  const CustomToolbar = ({ label, onNavigate }) => (
    <div className="flex flex-col space-y-4 p-4 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={() => onNavigate('PREV')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">{label}</h2>
          <button onClick={() => onNavigate('NEXT')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowRightIcon className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => onNavigate('TODAY')}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Today
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <ViewSelector view={view} setView={setView} />
          <FilterDropdown 
            filters={eventFilters} 
            setFilters={setEventFilters}
            companies={companies}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Event</span>
          </button>
        </div>
      </div>
      <QuickStats events={filteredEvents} />
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <CalendarIcon className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No events found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters or add new events</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Create First Event</span>
          </button>
        </div>
      ) : (
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          components={{
            event: Event,
            toolbar: CustomToolbar
          }}
          popup
          selectable
          onSelectEvent={event => {
            setSelectedEvent(event);
            setIsModalOpen(true);
          }}
          eventPropGetter={event => ({
            style: {
              backgroundColor: getEventColor(event.type).background,
              borderColor: getEventColor(event.type).border,
              color: getEventColor(event.type).text,
              borderRadius: '4px',
              borderLeft: `4px solid ${getEventColor(event.type).border}`
            }
          })}
        />
      )}

      {isModalOpen && (
        <EventModal
          event={selectedEvent}
          companies={companies}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
          onSave={(newEvent) => {
            console.log('Event saved:', newEvent);
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

const ViewSelector = ({ view, setView }) => (
  <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
    {['month', 'week', 'day', 'agenda'].map(v => (
      <button
        key={v}
        onClick={() => setView(v)}
        className={`px-3 py-1.5 text-sm rounded-md ${
          view === v ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
        }`}
      >
        {v.charAt(0).toUpperCase() + v.slice(1)}
      </button>
    ))}
  </div>
);

const FilterDropdown = ({ filters, setFilters, companies = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <TagIcon className="h-5 w-5 text-gray-600" />
        <span>Filters</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 space-y-4 z-10">
          <div>
            <h4 className="text-sm font-medium mb-2">Event Types</h4>
            {['interview', 'deadline', 'meeting', 'networking'].map(type => (
              <label key={type} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={filters.types.includes(type)}
                  onChange={e => setFilters({
                    ...filters,
                    types: e.target.checked
                      ? [...filters.types, type]
                      : filters.types.filter(t => t !== type)
                  })}
                  className="rounded text-blue-600"
                />
                <span className="text-sm capitalize">{type}</span>
              </label>
            ))}
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Companies</h4>
            {companies.map(company => (
              <label key={company.id} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={filters.companies.includes(company.id)}
                  onChange={e => setFilters({
                    ...filters,
                    companies: e.target.checked
                      ? [...filters.companies, company.id]
                      : filters.companies.filter(c => c !== company.id)
                  })}
                  className="rounded text-blue-600"
                />
                <span className="text-sm truncate">{company.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const QuickStats = ({ events = [] }) => {
  const stats = [
    { 
      label: 'Upcoming Interviews',
      value: events.filter(e => e?.type === 'interview' && e?.status === 'scheduled').length,
      icon: BriefcaseIcon,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Pending Deadlines',
      value: events.filter(e => e?.type === 'deadline' && e?.status !== 'completed').length,
      icon: ClockIcon,
      color: 'bg-red-100 text-red-600'
    },
    {
      label: 'Total Companies',
      value: new Set(events.map(e => e?.company?.id).filter(Boolean)).size,
      icon: UserGroupIcon,
      color: 'bg-green-100 text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-gray-200">
          <div className={`p-2 rounded-lg ${stat.color}`}>
            <stat.icon className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const EventModal = ({ event, companies = [], onClose, onSave }) => {
  const isNew = !event?.id;
  const [formData, setFormData] = useState({
    id: event?.id || Date.now(),
    title: event?.title || '',
    type: event?.type || 'meeting',
    company: event?.company || null,
    start: event?.start || new Date(),
    end: event?.end || new Date(Date.now() + 60 * 60 * 1000),
    location: event?.location || '',
    description: event?.description || '',
    status: event?.status || 'scheduled',
    notes: event?.notes || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {isNew ? 'Create New Event' : 'Edit Event'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                {['interview', 'meeting', 'deadline', 'networking'].map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                value={formData.company?.id || ''}
                onChange={e => setFormData({
                  ...formData,
                  company: companies.find(c => c.id === e.target.value) || null
                })}
              >
                <option value="">Select Company</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
              <input
                type="datetime-local"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                value={moment(formData.start).format('YYYY-MM-DDTHH:mm')}
                onChange={e => setFormData({...formData, start: new Date(e.target.value)})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
              <input
                type="datetime-local"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                value={moment(formData.end).format('YYYY-MM-DDTHH:mm')}
                onChange={e => setFormData({...formData, end: new Date(e.target.value)})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location/Link</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 h-24"
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
            >
              {isNew ? 'Create Event' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const getEventColor = (type) => {
  const colors = {
    interview: { background: '#dbeafe', border: '#93c5fd', text: '#1e40af' },
    deadline: { background: '#fee2e2', border: '#fca5a5', text: '#dc2626' },
    meeting: { background: '#fef3c7', border: '#fcd34d', text: '#d97706' },
    networking: { background: '#dcfce7', border: '#86efac', text: '#16a34a' }
  };
  return colors[type] || { background: '#e5e7eb', border: '#d1d5db', text: '#4b5563' };
};

export default AdvancedCalendar;