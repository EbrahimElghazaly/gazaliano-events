import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Check, 
  X, 
  Plus, 
  BarChart3,
  Clock,
  Mail,
  Phone,
  UserPlus,
  LogOut,
  Menu,
  MapPin,
  Building,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showOrganizerForm, setShowOrganizerForm] = useState(false);
  const [showVenueForm, setShowVenueForm] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedOrganizer, setSelectedOrganizer] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [organizerForm, setOrganizerForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });

  const [venueForm, setVenueForm] = useState({
    name: '',
    location: '',
    capacity: '',
    price: '',
    description: '',
    imageUrl: '',
    services: ''
  });

  const { 
    user, 
    logout, 
    getPendingBookings, 
    approveBooking,
    rejectBooking, 
    deleteBooking,
    getManagerStats, 
    createOrganizer,
    deleteUser,
    getOrganizers,
    getClients,
    addVenue,
    updateVenue,
    deleteVenue,
    toggleVenueStatus,
    assignTask,
    venues,
    bookings,
    users
  } = useAuth();

  const pendingBookings = getPendingBookings();
  const stats = getManagerStats();
  const organizers = getOrganizers();
  const clients = getClients();

  const monthlyRevenueData = [
    { month: 'Jan', revenue: 15000 },
    { month: 'Feb', revenue: 22000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 25000 },
    { month: 'May', revenue: 30000 },
    { month: 'Jun', revenue: 28000 }
  ];

  const bookingStatusData = [
    { name: 'Pending', value: stats.pendingBookings, color: '#F59E0B' },
    { name: 'Approved', value: stats.approvedBookings, color: '#10B981' },
    { name: 'Rejected', value: stats.totalBookings - stats.pendingBookings - stats.approvedBookings, color: '#EF4444' }
  ];

  const handleApprove = async (booking) => {
    setSelectedBooking(booking);
    setShowApproveModal(true);
  };

  const handleConfirmApprove = async () => {
    if (selectedBooking && selectedOrganizer) {
      const result = await approveBooking(selectedBooking.id, parseInt(selectedOrganizer));
      if (result.success) {
        // Create first task for the organizer
        await assignTask({
          bookingId: selectedBooking.id,
          organizerId: parseInt(selectedOrganizer),
          title: 'Initial event planning meeting',
          description: 'Schedule meeting with client to discuss event details',
          priority: 'high',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
        console.log('Booking approved and task assigned!');
        setShowApproveModal(false);
        setSelectedBooking(null);
        setSelectedOrganizer('');
      } else {
        console.error('Failed to approve booking');
      }
    }
  };

  const handleReject = async () => {
    if (selectedBooking && rejectionReason) {
      const result = await rejectBooking(selectedBooking.id, rejectionReason);
      if (result.success) {
        console.log('Booking rejected');
        setShowRejectModal(false);
        setSelectedBooking(null);
        setRejectionReason('');
      } else {
        console.error('Failed to reject booking');
      }
    }
  };

  const handleCreateOrganizer = async (e) => {
    e.preventDefault();
    const result = await createOrganizer(
      organizerForm.email,
      organizerForm.password,
      organizerForm.fullName,
      organizerForm.phone
    );
    if (result.success) {
      console.log('Organizer created successfully!');
      setShowOrganizerForm(false);
      setOrganizerForm({
        fullName: '',
        email: '',
        password: '',
        phone: ''
      });
    } else {
      console.error(result.message || 'Failed to create organizer');
    }
  };

  const handleVenueSubmit = async (e) => {
    e.preventDefault();
    const venueData = {
      ...venueForm,
      capacity: parseInt(venueForm.capacity),
      price: parseInt(venueForm.price),
      services: venueForm.services.split(',').map(s => s.trim()).filter(s => s)
    };

    let result;
    if (editingVenue) {
      result = await updateVenue(editingVenue.id, venueData);
      if (result.success) {
        console.log('Venue updated successfully!');
      }
    } else {
      result = await addVenue(venueData);
      if (result.success) {
        console.log('Venue added successfully!');
      }
    }

    if (result.success) {
      setShowVenueForm(false);
      setEditingVenue(null);
      setVenueForm({
        name: '',
        location: '',
        capacity: '',
        price: '',
        description: '',
        imageUrl: '',
        services: ''
      });
    } else {
      console.error(result.message || 'Failed to save venue');
    }
  };

  const handleEditVenue = (venue) => {
    setEditingVenue(venue);
    setVenueForm({
      name: venue.name,
      location: venue.location,
      capacity: venue.capacity.toString(),
      price: venue.price.toString(),
      description: venue.description,
      imageUrl: venue.imageUrl,
      services: venue.services.join(', ')
    });
    setShowVenueForm(true);
  };

  const handleDeleteVenue = async (venueId) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      const result = await deleteVenue(venueId);
      if (result.success) {
        console.log('Venue deleted successfully!');
      } else {
        console.error(result.message || 'Failed to delete venue');
      }
    }
  };

  const handleToggleVenueStatus = async (venueId) => {
    const result = await toggleVenueStatus(venueId);
    if (result.success) {
      console.log('Venue status updated!');
    } else {
      console.error('Failed to update venue status');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const result = await deleteUser(userId);
      if (result.success) {
        console.log('User deleted successfully!');
      } else {
        console.error(result.message || 'Failed to delete user');
      }
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const result = await deleteBooking(bookingId);
      if (result.success) {
        console.log('Booking deleted successfully!');
      } else {
        console.error('Failed to delete booking');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesFilter = userFilter === 'all' || u.role === userFilter;
    const matchesSearch = u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-serif text-3xl font-bold text-charcoal mb-2">
                Manager Dashboard
              </h1>
              <p className="text-charcoal/70">
                Welcome back, {user?.firstName}
              </p>
            </div>
            <button
              onClick={logout}
              className="btn-secondary flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-2 mb-8"
        >
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'pending', label: 'Pending Requests' },
              { id: 'venues', label: 'Venues Management' },
              { id: 'users', label: 'Users Management' },
              { id: 'organizers', label: 'Organizers' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold text-white'
                    : 'text-charcoal/70 hover:text-charcoal hover:bg-cream/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-charcoal/70 text-sm">Total Bookings</p>
                    <p className="font-serif text-2xl font-bold text-charcoal">{stats.totalBookings}</p>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </div>
                  <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-charcoal/70 text-sm">Total Revenue</p>
                    <p className="font-serif text-2xl font-bold text-charcoal">
                      ${stats.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 mt-1">+8% from last month</p>
                  </div>
                  <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-charcoal/70 text-sm">Active Venues</p>
                    <p className="font-serif text-2xl font-bold text-charcoal">{stats.activeVenues}</p>
                    <p className="text-xs text-charcoal/50 mt-1">of {stats.totalVenues} total</p>
                  </div>
                  <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-charcoal/70 text-sm">Total Users</p>
                    <p className="font-serif text-2xl font-bold text-charcoal">{stats.totalUsers}</p>
                    <p className="text-xs text-green-600 mt-1">+15% from last month</p>
                  </div>
                  <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="glass-card p-6">
                <h3 className="font-serif text-xl font-bold text-charcoal mb-4">
                  Monthly Revenue
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="revenue" fill="#B8860B" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-serif text-xl font-bold text-charcoal mb-4">
                  Booking Status Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bookingStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {bookingStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pending Requests Tab */}
        {activeTab === 'pending' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-charcoal">
                Pending Bookings ({pendingBookings.length})
              </h3>
            </div>

            {pendingBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-charcoal font-medium">Event</th>
                      <th className="text-left py-3 px-4 text-charcoal font-medium">Client</th>
                      <th className="text-left py-3 px-4 text-charcoal font-medium">Venue</th>
                      <th className="text-left py-3 px-4 text-charcoal font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-charcoal font-medium">Guests</th>
                      <th className="text-left py-3 px-4 text-charcoal font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-charcoal font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingBookings.map((booking) => {
                      const client = users.find(u => u.id === booking.userId);
                      return (
                        <tr key={booking.id} className="border-b border-white/10 hover:bg-cream/30 transition-colors">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-charcoal">{booking.eventName}</p>
                              <p className="text-sm text-charcoal/50">${booking.price.toLocaleString()}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-charcoal">
                                {client ? `${client.firstName} ${client.lastName}` : 'Unknown'}
                              </p>
                              <p className="text-sm text-charcoal/50">{client?.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-charcoal">{booking.venueName}</td>
                          <td className="py-4 px-4 text-charcoal">{booking.date}</td>
                          <td className="py-4 px-4 text-charcoal">{booking.guestCount}</td>
                          <td className="py-4 px-4">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                              {booking.eventType}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApprove(booking)}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setShowRejectModal(true);
                                }}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                title="Reject"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
                  No Pending Bookings
                </h3>
                <p className="text-charcoal/70">
                  All bookings have been processed
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Venues Management Tab */}
        {activeTab === 'venues' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-charcoal">
                Venues Management
              </h3>
              <button
                onClick={() => {
                  setEditingVenue(null);
                  setVenueForm({
                    name: '',
                    location: '',
                    capacity: '',
                    price: '',
                    description: '',
                    imageUrl: '',
                    services: ''
                  });
                  setShowVenueForm(true);
                }}
                className="btn-primary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Venue
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <motion.div
                  key={venue.id}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6"
                >
                  <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                    <img 
                      src={venue.imageUrl} 
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${
                      venue.status === 'active' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {venue.status}
                    </span>
                  </div>
                  
                  <h4 className="font-serif text-lg font-bold text-charcoal mb-2">
                    {venue.name}
                  </h4>
                  
                  <div className="space-y-2 text-sm text-charcoal/70 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gold" />
                      {venue.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gold" />
                      {venue.capacity} guests
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-gold" />
                      ${venue.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditVenue(venue)}
                      className="flex-1 btn-secondary text-sm"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleVenueStatus(venue.id)}
                      className="flex-1 btn-secondary text-sm"
                    >
                      {venue.status === 'active' ? (
                        <ToggleRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 mr-1" />
                      )}
                      Toggle
                    </button>
                    <button
                      onClick={() => handleDeleteVenue(venue.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Users Management Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-charcoal">
                Users Management
              </h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/50 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                  />
                </div>
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                >
                  <option value="all">All Users</option>
                  <option value="client">Clients</option>
                  <option value="organizer">Organizers</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-charcoal font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-charcoal font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-charcoal font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-charcoal font-medium">Phone</th>
                    <th className="text-left py-3 px-4 text-charcoal font-medium">Join Date</th>
                    <th className="text-left py-3 px-4 text-charcoal font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/10 hover:bg-cream/30 transition-colors">
                      <td className="py-4 px-4 font-medium text-charcoal">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="py-4 px-4 text-charcoal">{user.email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'manager' ? 'bg-purple-100 text-purple-600' :
                          user.role === 'organizer' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-charcoal">{user.phone}</td>
                      <td className="py-4 px-4 text-charcoal">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={user.role === 'manager'}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Organizers Tab */}
        {activeTab === 'organizers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-charcoal">
                Organizers
              </h3>
              <button
                onClick={() => setShowOrganizerForm(true)}
                className="btn-primary flex items-center"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Create New Organizer
              </button>
            </div>

            <div className="grid gap-6">
              {organizers.length > 0 ? organizers.map((organizer) => (
                <motion.div
                  key={organizer.id}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-charcoal mb-2">
                        {organizer.firstName} {organizer.lastName}
                      </h4>
                      <div className="space-y-2 text-sm text-charcoal/70">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gold" />
                          {organizer.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gold" />
                          {organizer.phone}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gold" />
                          Joined {new Date(organizer.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                        Organizer
                      </span>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
                    No Organizers Yet
                  </h3>
                  <p className="text-charcoal/70 mb-6">
                    Create your first organizer to start managing events
                  </p>
                  <button
                    onClick={() => setShowOrganizerForm(true)}
                    className="btn-primary"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create New Organizer
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

      {/* Approve Modal */}
      {showApproveModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 max-w-md w-full"
          >
            <h3 className="font-serif text-xl font-bold text-charcoal mb-4">
              Approve Booking
            </h3>
            <p className="text-charcoal/70 mb-4">
              Assign an organizer for "{selectedBooking.eventName}"
            </p>
            <select
              value={selectedOrganizer}
              onChange={(e) => setSelectedOrganizer(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal mb-4"
            >
              <option value="">Select an organizer</option>
              {organizers.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.firstName} {org.lastName}
                </option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setSelectedBooking(null);
                  setSelectedOrganizer('');
                }}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApprove}
                disabled={!selectedOrganizer}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Approve & Assign
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 max-w-md w-full"
          >
            <h3 className="font-serif text-xl font-bold text-charcoal mb-4">
              Reject Booking
            </h3>
            <p className="text-charcoal/70 mb-4">
              Please provide a reason for rejecting this booking:
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal resize-none"
              rows={4}
              placeholder="Enter rejection reason..."
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedBooking(null);
                  setRejectionReason('');
                }}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectionReason}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject Booking
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Organizer Form Modal */}
      {showOrganizerForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 max-w-md w-full"
          >
            <h3 className="font-serif text-xl font-bold text-charcoal mb-4">
              Create New Organizer
            </h3>
            <form onSubmit={handleCreateOrganizer} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={organizerForm.fullName}
                onChange={(e) => setOrganizerForm({...organizerForm, fullName: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={organizerForm.email}
                onChange={(e) => setOrganizerForm({...organizerForm, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={organizerForm.password}
                onChange={(e) => setOrganizerForm({...organizerForm, password: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={organizerForm.phone}
                onChange={(e) => setOrganizerForm({...organizerForm, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                required
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowOrganizerForm(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Create Organizer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Venue Form Modal */}
      {showVenueForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="font-serif text-xl font-bold text-charcoal mb-4">
              {editingVenue ? 'Edit Venue' : 'Add New Venue'}
            </h3>
            <form onSubmit={handleVenueSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Venue Name"
                  value={venueForm.name}
                  onChange={(e) => setVenueForm({...venueForm, name: e.target.value})}
                  className="px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={venueForm.location}
                  onChange={(e) => setVenueForm({...venueForm, location: e.target.value})}
                  className="px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Capacity"
                  value={venueForm.capacity}
                  onChange={(e) => setVenueForm({...venueForm, capacity: e.target.value})}
                  className="px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={venueForm.price}
                  onChange={(e) => setVenueForm({...venueForm, price: e.target.value})}
                  className="px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                  required
                />
              </div>
              <textarea
                placeholder="Description"
                value={venueForm.description}
                onChange={(e) => setVenueForm({...venueForm, description: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal resize-none"
                rows={3}
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                value={venueForm.imageUrl}
                onChange={(e) => setVenueForm({...venueForm, imageUrl: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                required
              />
              <input
                type="text"
                placeholder="Services (comma-separated)"
                value={venueForm.services}
                onChange={(e) => setVenueForm({...venueForm, services: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                required
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowVenueForm(false);
                    setEditingVenue(null);
                  }}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {editingVenue ? 'Update Venue' : 'Add Venue'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
