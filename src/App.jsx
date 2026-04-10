import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Venues from './pages/Venues';
import VenueDetail from './pages/VenueDetail';
import Events from './pages/Events';
import Login from './pages/Login';
import Register from './pages/Register';
import ManagerDashboard from './pages/dashboards/ManagerDashboard';
import OrganizerDashboard from './pages/dashboards/OrganizerDashboard';
import ClientDashboard from './pages/dashboards/ClientDashboard';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Homepage />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/venues/:id" element={<VenueDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/manager" element={<ManagerDashboard />} />
            <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
            <Route path="/dashboard/client" element={<ClientDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
