import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Plus, 
  MessageCircle, 
  Send, 
  LogOut,
  Clock,
  MapPin,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { user, logout, getUserBookings } = useAuth();
  const userBookings = getUserBookings(user?.id) || [];

  const mockMessages = [
    {
      id: 1,
      sender: 'organizer',
      name: 'Sarah Mitchell',
      message: 'Hi! I\'m your event organizer for the upcoming wedding reception. I wanted to confirm the catering menu with you.',
      time: '10:30 AM',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c5ca?w=40'
    },
    {
      id: 2,
      sender: 'client',
      name: 'You',
      message: 'Hi Sarah! Everything looks great. I\'d like to add a vegetarian option to the menu.',
      time: '10:45 AM',
      avatar: null
    },
    {
      id: 3,
      sender: 'organizer',
      name: 'Sarah Mitchell',
      message: 'Perfect! I\'ll add vegetarian lasagna and a fresh garden salad. Anything else you\'d like to modify?',
      time: '11:00 AM',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c5ca?w=40'
    },
    {
      id: 4,
      sender: 'client',
      name: 'You',
      message: 'That sounds wonderful! Thank you for your help.',
      time: '11:15 AM',
      avatar: null
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredBookings = userBookings.filter(booking =>
    booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.venueName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

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
                Client Dashboard
              </h1>
              <p className="text-charcoal/70">
                Welcome back, {user?.firstName} {user?.lastName}
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

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-charcoal/70 text-sm">Total Bookings</p>
                <p className="font-serif text-2xl font-bold text-charcoal">{userBookings.length}</p>
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
                <p className="text-charcoal/70 text-sm">Pending</p>
                <p className="font-serif text-2xl font-bold text-yellow-600">
                  {userBookings.filter(b => b.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-charcoal/70 text-sm">Approved</p>
                <p className="font-serif text-2xl font-bold text-green-600">
                  {userBookings.filter(b => b.status === 'approved').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-charcoal/70 text-sm">Total Spent</p>
                <p className="font-serif text-2xl font-bold text-charcoal">
                  ${userBookings
                    .filter(b => b.status === 'approved')
                    .reduce((sum, b) => sum + b.price, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-2 mb-8"
        >
          <div className="flex space-x-2">
            {['bookings', 'chat'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gold text-white'
                    : 'text-charcoal/70 hover:text-charcoal hover:bg-cream/50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-charcoal">
                My Bookings
              </h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/50 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                  />
                </div>
                <Link to="/venues" className="btn-primary flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  New Booking
                </Link>
              </div>
            </div>

            {filteredBookings.length > 0 ? (
              <div className="grid gap-6">
                {filteredBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    whileHover={{ y: -5 }}
                    className="glass-card p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-serif text-xl font-bold text-charcoal mb-2">
                          {booking.eventName}
                        </h4>
                        <div className="space-y-2 text-sm text-charcoal/70">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gold" />
                            {booking.venueName}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gold" />
                            {booking.date}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-gold" />
                            {booking.guestCount} guests
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-gold" />
                            ${booking.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1">{booking.status}</span>
                        </span>
                        <p className="text-xs text-charcoal/50 mt-2">
                          {booking.eventType} Event
                        </p>
                      </div>
                    </div>

                    {booking.status === 'rejected' && booking.rejectionReason && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">
                          <strong>Reason:</strong> {booking.rejectionReason}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center">
                      <p className="text-xs text-charcoal/50">
                        Booked on {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex space-x-2">
                        <button className="btn-secondary text-sm">
                          View Details
                        </button>
                        {booking.status === 'pending' && (
                          <button className="btn-secondary text-sm text-red-600 border-red-200 hover:bg-red-50">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
                  No bookings found
                </h3>
                <p className="text-charcoal/70 mb-6">
                  {searchTerm ? 'Try adjusting your search' : 'Start by creating your first booking'}
                </p>
                <Link to="/venues" className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Booking
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-charcoal">
                Chat with Organizer
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Sarah Mitchell is online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {mockMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-md ${
                    msg.sender === 'client' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      {msg.avatar ? (
                        <img src={msg.avatar} alt={msg.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full gold-gradient flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1">
                        {msg.name} • {msg.time}
                      </p>
                      <div className={`px-4 py-2 rounded-2xl ${
                        msg.sender === 'client'
                          ? 'bg-gold text-white'
                          : 'bg-cream/70 text-charcoal'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
              />
              <button
                type="submit"
                className="btn-primary flex items-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 p-3 bg-cream/50 rounded-lg">
              <p className="text-xs text-charcoal/60">
                This is a demo chat interface. Messages are not actually sent in this prototype.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
