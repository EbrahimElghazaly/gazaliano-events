import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Default data
const defaultUsers = [
  {
    id: 1,
    firstName: 'System',
    lastName: 'Manager',
    email: 'manager@gazaliano.com',
    password: 'Admin@2026',
    role: 'manager',
    phone: '+20 100 000 0001',
    joinDate: new Date().toISOString()
  }
];

const defaultVenues = [
  {
    id: 1,
    name: 'Grand Crystal Hall',
    location: 'New Cairo',
    capacity: 500,
    price: 15000,
    description: 'Elegant crystal hall perfect for grand celebrations and corporate events.',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
    services: ['Catering', 'Decoration', 'Audio/Visual', 'Photography'],
    status: 'active'
  },
  {
    id: 2,
    name: 'Royal Garden Palace',
    location: 'Zamalek',
    capacity: 300,
    price: 12000,
    description: 'Beautiful garden venue with royal ambiance for intimate gatherings.',
    imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800',
    services: ['Catering', 'Garden Setup', 'Lighting', 'Security'],
    status: 'active'
  },
  {
    id: 3,
    name: 'Skyline Rooftop',
    location: 'Sheikh Zayed',
    capacity: 200,
    price: 10000,
    description: 'Modern rooftop venue with stunning city views and contemporary design.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    services: ['Bar Service', 'Lounge Setup', 'City View', 'Valet Parking'],
    status: 'active'
  },
  {
    id: 4,
    name: 'The Vintage Ballroom',
    location: 'Maadi',
    capacity: 400,
    price: 18000,
    description: 'Classic vintage ballroom with timeless elegance and sophisticated charm.',
    imageUrl: 'https://images.unsplash.com/photo-1520159899225-7df9d713cf86?w=800',
    services: ['Vintage Decor', 'Live Music', 'Dance Floor', 'Classic Catering'],
    status: 'active'
  },
  {
    id: 5,
    name: 'Seaside Pavilion',
    location: 'North Coast',
    capacity: 350,
    price: 25000,
    description: 'Luxurious seaside venue with ocean views and beach access.',
    imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800',
    services: ['Beach Access', 'Seafood Catering', 'Water Sports', 'Sunset Views'],
    status: 'active'
  },
  {
    id: 6,
    name: 'Urban Loft',
    location: 'Downtown',
    capacity: 150,
    price: 8000,
    description: 'Trendy urban loft space for modern events and creative gatherings.',
    imageUrl: 'https://images.unsplash.com/photo-1497366214043-f1eeb0d52858?w=800',
    services: ['Industrial Decor', 'Art Gallery', 'Tech Setup', 'Flexible Layout'],
    status: 'active'
  }
];

const defaultBookings = [
  {
    id: 1,
    userId: 2,
    venueId: 1,
    venueName: 'Grand Crystal Hall',
    eventName: 'Johnson Wedding Reception',
    date: '2024-12-15',
    guestCount: 250,
    eventType: 'Private',
    status: 'pending',
    price: 15000,
    createdAt: '2024-06-01T10:00:00Z',
    organizerId: null
  },
  {
    id: 2,
    userId: 3,
    venueId: 3,
    venueName: 'Skyline Rooftop',
    eventName: 'TechCorp Annual Gala',
    date: '2024-11-20',
    guestCount: 180,
    eventType: 'Corporate',
    status: 'approved',
    price: 10000,
    createdAt: '2024-05-15T14:30:00Z',
    organizerId: 1,
    approvalDate: '2024-05-16T09:00:00Z'
  }
];

const defaultTasks = [
  {
    id: 1,
    bookingId: 2,
    organizerId: 1,
    title: 'Setup audio and visual equipment',
    description: 'Ensure all microphones, speakers, and projectors are working',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-11-19',
    createdAt: '2024-05-16T09:30:00Z'
  },
  {
    id: 2,
    bookingId: 2,
    organizerId: 1,
    title: 'Coordinate catering arrangements',
    description: 'Finalize menu and dietary restrictions with catering team',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-11-18',
    createdAt: '2024-05-16T09:30:00Z',
    completedAt: '2024-11-17T16:00:00Z'
  }
];

// localStorage helper functions
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(`gazaliano_${key}`, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
  }
};

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(`gazaliano_${key}`);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Failed to load ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage or use defaults
  const [users, setUsers] = useState(() => loadFromLocalStorage('users', defaultUsers));
  const [venues, setVenues] = useState(() => loadFromLocalStorage('venues', defaultVenues));
  const [bookings, setBookings] = useState(() => loadFromLocalStorage('bookings', defaultBookings));
  const [tasks, setTasks] = useState(() => loadFromLocalStorage('tasks', defaultTasks));

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('users', users);
  }, [users]);

  useEffect(() => {
    saveToLocalStorage('venues', venues);
  }, [venues]);

  useEffect(() => {
    saveToLocalStorage('bookings', bookings);
  }, [bookings]);

  useEffect(() => {
    saveToLocalStorage('tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    // Check for saved session on mount
    const savedUser = localStorage.getItem('gazaliano_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('gazaliano_user');
      }
    }
    setLoading(false);
  }, []);

  // AUTHENTICATION FUNCTIONS
  const login = async (email, password) => {
    try {
      // Check for manager account
      if (email === 'manager@gazaliano.com' && password === 'Admin@2026') {
        const managerUser = users.find(u => u.email === email);
        setUser(managerUser);
        setIsAuthenticated(true);
        localStorage.setItem('gazaliano_user', JSON.stringify(managerUser));
        return { success: true, user: managerUser };
      }

      // Check for existing users
      const existingUser = users.find(u => u.email === email && u.password === password);
      if (existingUser) {
        setUser(existingUser);
        setIsAuthenticated(true);
        localStorage.setItem('gazaliano_user', JSON.stringify(existingUser));
        return { success: true, user: existingUser };
      }

      return { success: false, message: 'Invalid email or password' };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      // Check if user already exists
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        return { success: false, message: 'User already exists with this email' };
      }

      // Create new user (always client role for public registration)
      const newUser = {
        id: Date.now(),
        ...userData,
        role: 'client',
        joinDate: new Date().toISOString()
      };

      setUsers(prev => [...prev, newUser]);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('gazaliano_user');
  };

  // USER MANAGEMENT FUNCTIONS
  const createOrganizer = async (email, password, fullName, phone) => {
    try {
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return { success: false, message: 'User already exists with this email' };
      }

      const [firstName, lastName] = fullName.split(' ');
      const newOrganizer = {
        id: Date.now(),
        firstName,
        lastName: lastName || '',
        email,
        password,
        role: 'organizer',
        phone,
        joinDate: new Date().toISOString()
      };

      setUsers(prev => [...prev, newOrganizer]);
      return { success: true, organizer: newOrganizer };
    } catch (error) {
      return { success: false, message: 'Failed to create organizer' };
    }
  };

  const deleteUser = async (userId) => {
    try {
      const userToDelete = users.find(u => u.id === userId);
      if (!userToDelete) {
        return { success: false, message: 'User not found' };
      }

      if (userToDelete.role === 'manager') {
        return { success: false, message: 'Cannot delete manager account' };
      }

      // Check if user has bookings
      const userBookings = bookings.filter(b => b.userId === userId);
      if (userBookings.length > 0) {
        return { success: false, message: 'Cannot delete user with existing bookings' };
      }

      setUsers(prev => prev.filter(u => u.id !== userId));
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to delete user' };
    }
  };

  const getOrganizers = () => {
    return users.filter(u => u.role === 'organizer');
  };

  const getClients = () => {
    return users.filter(u => u.role === 'client');
  };

  // VENUE MANAGEMENT FUNCTIONS
  const addVenue = async (venueData) => {
    try {
      const newVenue = {
        id: Date.now(),
        ...venueData,
        status: 'active'
      };

      setVenues(prev => [...prev, newVenue]);
      return { success: true, venue: newVenue };
    } catch (error) {
      return { success: false, message: 'Failed to add venue' };
    }
  };

  const updateVenue = async (venueId, venueData) => {
    try {
      setVenues(prev => prev.map(venue => 
        venue.id === venueId ? { ...venue, ...venueData } : venue
      ));
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to update venue' };
    }
  };

  const deleteVenue = async (venueId) => {
    try {
      // Check if venue has bookings
      const venueBookings = bookings.filter(b => b.venueId === venueId);
      if (venueBookings.length > 0) {
        return { success: false, message: 'Cannot delete venue with existing bookings' };
      }

      setVenues(prev => prev.filter(v => v.id !== venueId));
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to delete venue' };
    }
  };

  const toggleVenueStatus = async (venueId) => {
    try {
      setVenues(prev => prev.map(venue => 
        venue.id === venueId 
          ? { ...venue, status: venue.status === 'active' ? 'inactive' : 'active' }
          : venue
      ));
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to toggle venue status' };
    }
  };

  // BOOKING MANAGEMENT FUNCTIONS
  const createBooking = async (bookingData) => {
    try {
      const newBooking = {
        id: Date.now(),
        ...bookingData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        organizerId: null
      };

      setBookings(prev => [...prev, newBooking]);
      return { success: true, booking: newBooking };
    } catch (error) {
      return { success: false, message: 'Failed to create booking' };
    }
  };

  const approveBooking = async (bookingId, organizerId) => {
    try {
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId 
          ? { 
              ...booking, 
              status: 'approved', 
              organizerId,
              approvalDate: new Date().toISOString()
            }
          : booking
      );
      setBookings(updatedBookings);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to approve booking' };
    }
  };

  const rejectBooking = async (bookingId, reason) => {
    try {
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId 
          ? { 
              ...booking, 
              status: 'rejected', 
              rejectionReason: reason,
              rejectionDate: new Date().toISOString()
            }
          : booking
      );
      setBookings(updatedBookings);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to reject booking' };
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      // Delete related tasks
      setTasks(prev => prev.filter(task => task.bookingId !== bookingId));
      // Delete booking
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to delete booking' };
    }
  };

  // TASK MANAGEMENT FUNCTIONS
  const assignTask = async (taskData) => {
    try {
      const newTask = {
        id: Date.now(),
        ...taskData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      setTasks(prev => [...prev, newTask]);
      return { success: true, task: newTask };
    } catch (error) {
      return { success: false, message: 'Failed to assign task' };
    }
  };

  const toggleTaskStatus = async (taskId) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: task.status === 'pending' ? 'completed' : 'pending',
              ...(task.status === 'pending' && { completedAt: new Date().toISOString() })
            }
          : task
      );
      setTasks(updatedTasks);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to toggle task status' };
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setTasks(prev => prev.filter(t => t.id !== taskId));
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to delete task' };
    }
  };

  // STATISTICS FUNCTIONS
  const getManagerStats = () => {
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const approvedBookings = bookings.filter(b => b.status === 'approved').length;
    const totalRevenue = bookings
      .filter(b => b.status === 'approved')
      .reduce((sum, b) => sum + b.price, 0);
    const totalUsers = users.length;
    const totalVenues = venues.length;
    const activeVenues = venues.filter(v => v.status === 'active').length;

    return {
      totalBookings,
      pendingBookings,
      approvedBookings,
      totalRevenue,
      totalUsers,
      totalVenues,
      activeVenues
    };
  };

  // HELPER FUNCTIONS
  const getUserBookings = (userId) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  const getPendingBookings = () => {
    return bookings.filter(booking => booking.status === 'pending');
  };

  const getBookingStats = () => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const approved = bookings.filter(b => b.status === 'approved').length;
    const rejected = bookings.filter(b => b.status === 'rejected').length;
    const revenue = bookings
      .filter(b => b.status === 'approved')
      .reduce((sum, b) => sum + b.price, 0);

    return { total, pending, approved, rejected, revenue };
  };

  const getTasksByOrganizer = (organizerId) => {
    return tasks.filter(task => task.organizerId === organizerId);
  };

  const getTasksByBooking = (bookingId) => {
    return tasks.filter(task => task.bookingId === bookingId);
  };

  const value = {
    // State
    user,
    isAuthenticated,
    loading,
    users,
    venues,
    bookings,
    tasks,

    // Authentication
    login,
    register,
    logout,

    // User Management
    createOrganizer,
    deleteUser,
    getOrganizers,
    getClients,

    // Venue Management
    addVenue,
    updateVenue,
    deleteVenue,
    toggleVenueStatus,

    // Booking Management
    createBooking,
    approveBooking,
    rejectBooking,
    deleteBooking,

    // Task Management
    assignTask,
    toggleTaskStatus,
    deleteTask,

    // Statistics
    getManagerStats,
    getBookingStats,

    // Helpers
    getUserBookings,
    getPendingBookings,
    getTasksByOrganizer,
    getTasksByBooking
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
