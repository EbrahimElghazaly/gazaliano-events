import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckSquare, 
  Calendar, 
  QrCode, 
  Clock, 
  MapPin, 
  Users,
  LogOut,
  Bell,
  Settings,
  CheckCircle,
  Circle,
  AlertCircle,
  Camera,
  X,
  Check
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const OrganizerDashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Setup audio equipment for wedding', completed: false, priority: 'high' },
    { id: 2, title: 'Coordinate with catering team', completed: true, priority: 'medium' },
    { id: 3, title: 'Finalize seating arrangement', completed: false, priority: 'high' },
    { id: 4, title: 'Check lighting system', completed: false, priority: 'low' },
    { id: 5, title: 'Review event timeline', completed: true, priority: 'medium' },
    { id: 6, title: 'Prepare welcome packets', completed: false, priority: 'low' }
  ]);

  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const { user, logout } = useAuth();

  const todayEvents = [
    {
      id: 1,
      name: 'Johnson Wedding Reception',
      venue: 'Grand Ballroom Royale',
      time: '6:00 PM - 11:00 PM',
      guests: 200,
      status: 'upcoming',
      location: 'Downtown District'
    },
    {
      id: 2,
      name: 'Corporate Annual Meeting',
      venue: 'Modern Sky Lounge',
      time: '2:00 PM - 5:00 PM',
      guests: 75,
      status: 'in-progress',
      location: 'City Center'
    },
    {
      id: 3,
      name: 'Charity Fundraiser',
      venue: 'Garden Paradise Estate',
      time: '7:00 PM - 10:00 PM',
      guests: 150,
      status: 'upcoming',
      location: 'Countryside'
    }
  ];

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const simulateQRScan = () => {
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate scanning process
    setTimeout(() => {
      const isValid = Math.random() > 0.3; // 70% chance of valid ticket
      
      if (isValid) {
        setScanResult({
          success: true,
          ticketId: 'TCK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          eventName: 'Johnson Wedding Reception',
          guestName: 'Sarah Mitchell',
          tableNumber: 'Table 12'
        });
      } else {
        setScanResult({
          success: false,
          error: 'Invalid or expired ticket'
        });
      }
      
      setIsScanning(false);
    }, 2000);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

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
                Organizer Dashboard
              </h1>
              <p className="text-charcoal/70">
                Welcome back, {user?.firstName}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-white/80 hover:bg-gold hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full bg-white/80 hover:bg-gold hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={logout}
                className="btn-secondary flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-charcoal/70 text-sm">Task Progress</p>
                <p className="font-serif text-2xl font-bold text-charcoal">
                  {completedTasks}/{totalTasks}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="gold-gradient h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-charcoal/70 text-sm">Today's Events</p>
                <p className="font-serif text-2xl font-bold text-charcoal">{todayEvents.length}</p>
                <p className="text-sm text-green-600 mt-1">1 in progress</p>
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
                <p className="text-charcoal/70 text-sm">QR Scanner</p>
                <p className="font-serif text-2xl font-bold text-charcoal">Ready</p>
                <p className="text-sm text-charcoal/50 mt-1">Click to scan</p>
              </div>
              <button
                onClick={() => setShowQRScanner(true)}
                className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <QrCode className="w-6 h-6 text-white" />
              </button>
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
            {['tasks', 'events', 'scanner'].map((tab) => (
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

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-charcoal">
                My Tasks
              </h3>
              <span className="text-sm text-charcoal/70">
                {completedTasks} of {totalTasks} completed
              </span>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-4 bg-cream/50 rounded-xl hover:bg-cream/70 transition-colors cursor-pointer"
                  onClick={() => toggleTask(task.id)}
                >
                  <div className="flex items-center space-x-3">
                    <button className="flex-shrink-0">
                      {task.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-charcoal/40" />
                      )}
                    </button>
                    <span className={`font-medium ${task.completed ? 'text-charcoal/50 line-through' : 'text-charcoal'}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-xl font-bold text-charcoal">
              Today's Events
            </h3>

            <div className="grid gap-6">
              {todayEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-charcoal mb-2">
                        {event.name}
                      </h4>
                      <div className="space-y-2 text-sm text-charcoal/70">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gold" />
                          {event.venue} - {event.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gold" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-gold" />
                          {event.guests} guests expected
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'in-progress' 
                        ? 'text-green-600 bg-green-100'
                        : 'text-blue-600 bg-blue-100'
                    }`}>
                      {event.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                    </span>
                  </div>

                  {event.status === 'in-progress' && (
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-charcoal/70">Event is currently running</span>
                        <div className="flex space-x-2">
                          <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                            <Check className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Scanner Tab */}
        {activeTab === 'scanner' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 text-center"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-charcoal mb-4">
                QR Ticket Scanner
              </h3>
              
              <p className="text-charcoal/70 mb-8">
                Scan event tickets to validate guest entry and manage attendance
              </p>

              <button
                onClick={simulateQRScan}
                disabled={isScanning}
                className="btn-primary mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanning ? 'Scanning...' : 'Simulate QR Scan'}
                <Camera className="w-5 h-5 ml-2" />
              </button>

              {/* Scan Result */}
              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-xl ${
                    scanResult.success 
                      ? 'bg-green-100 border border-green-200' 
                      : 'bg-red-100 border border-red-200'
                  }`}
                >
                  {scanResult.success ? (
                    <div>
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h4 className="font-semibold text-green-800 mb-2">Valid Ticket</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p><strong>Ticket ID:</strong> {scanResult.ticketId}</p>
                        <p><strong>Event:</strong> {scanResult.eventName}</p>
                        <p><strong>Guest:</strong> {scanResult.guestName}</p>
                        <p><strong>Table:</strong> {scanResult.tableNumber}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <X className="w-12 h-12 text-red-600 mx-auto mb-4" />
                      <h4 className="font-semibold text-red-800 mb-2">Invalid Ticket</h4>
                      <p className="text-sm text-red-700">{scanResult.error}</p>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="mt-8 p-4 bg-cream/50 rounded-xl">
                <p className="text-xs text-charcoal/60">
                  This is a simulation of the QR scanner functionality. In production, this would use the device camera to scan actual QR codes.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal mb-4">
                QR Scanner
              </h3>
              <p className="text-charcoal/70 mb-6">
                Position the QR code within the scanner area
              </p>
              
              <div className="w-64 h-64 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-charcoal/40 mx-auto mb-2" />
                  <p className="text-charcoal/50">Camera View</p>
                </div>
              </div>

              <button
                onClick={() => setShowQRScanner(false)}
                className="btn-secondary w-full"
              >
                Close Scanner
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;
