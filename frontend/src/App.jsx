import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NewApplicationForm from './pages/NewApplicationForm';
import CompanyForm from './pages/CompanyForm';
import CalendarEventForm from './pages/CalendarEventForm';
import AdvancedCalendar from './pages/AdvancedCalendar';
import EmailCampaignPage from './pages/EmailCampaignPage';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Dashboard' element={<Dashboard />} />
      <Route path='/NewApplicationForm' element ={<NewApplicationForm />} />
      <Route path='/CompanyForm' element ={<CompanyForm />} />
      <Route path='/CalendarEventForm' element ={<CalendarEventForm />} />
      <Route path='/AdvancedCalendar' element ={<AdvancedCalendar />} />
      <Route path='/EmailCampaignPage' element ={<EmailCampaignPage />} />
      <Route path='/Profile' element ={<Profile />} />

    </Routes>
  )
}

export default App