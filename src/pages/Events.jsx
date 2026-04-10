import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Search, Filter, Star, Heart } from 'lucide-react';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const events = [
    {
      id: 1,
      title: "Summer Garden Wedding Expo",
      date: "2024-07-15",
      time: "10:00 AM - 6:00 PM",
      location: "Garden Paradise Estate",
      type: "expo",
      price: "Free Entry",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      description: "Discover the latest wedding trends and meet top vendors",
      attendees: 250,
      rating: 4.8,
      organizer: "Gazaliano Events"
    },
    {
      id: 2,
      title: "Corporate Gala Night 2024",
      date: "2024-08-20",
      time: "7:00 PM - 11:00 PM",
      location: "Grand Ballroom Royale",
      type: "corporate",
      price: "$150 per person",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
      description: "Annual corporate gathering with awards and networking",
      attendees: 400,
      rating: 4.9,
      organizer: "Business Elite Network"
    },
    {
      id: 3,
      title: "Charity Fundraising Dinner",
      date: "2024-09-10",
      time: "6:30 PM - 10:00 PM",
      location: "Historic Manor House",
      type: "charity",
      price: "$200 per person",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400",
      description: "Support local charities while enjoying an elegant evening",
      attendees: 180,
      rating: 4.7,
      organizer: "Community Foundation"
    },
    {
      id: 4,
      title: "Tech Innovation Summit",
      date: "2024-10-05",
      time: "9:00 AM - 5:00 PM",
      location: "Modern Sky Lounge",
      type: "conference",
      price: "$299 per person",
      image: "https://images.unsplash.com/photo-1497366214043-f1eeb0d52858?w=400",
      description: "Explore the latest in technology and innovation",
      attendees: 300,
      rating: 4.6,
      organizer: "TechHub Alliance"
    },
    {
      id: 5,
      title: "New Year's Eve Celebration",
      date: "2024-12-31",
      time: "9:00 PM - 2:00 AM",
      location: "Seaside Pavilion",
      type: "celebration",
      price: "$250 per person",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400",
      description: "Ring in the new year with style and entertainment",
      attendees: 350,
      rating: 4.9,
      organizer: "Gazaliano Events"
    },
    {
      id: 6,
      title: "Art & Wine Tasting Evening",
      date: "2024-11-18",
      time: "5:00 PM - 9:00 PM",
      location: "Urban Loft Space",
      type: "social",
      price: "$75 per person",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: "Fine art meets fine wine in this exclusive evening",
      attendees: 80,
      rating: 4.8,
      organizer: "Artisan Collective"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const getEventTypeColor = (type) => {
    const colors = {
      expo: 'bg-purple-100 text-purple-800',
      corporate: 'bg-blue-100 text-blue-800',
      charity: 'bg-pink-100 text-pink-800',
      conference: 'bg-green-100 text-green-800',
      celebration: 'bg-yellow-100 text-yellow-800',
      social: 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Upcoming Events
          </h1>
          <p className="text-xl text-charcoal/70">
            Join exclusive events hosted at our premium venues
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
              />
            </div>

            {/* Event Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
            >
              <option value="all">All Events</option>
              <option value="expo">Expo</option>
              <option value="corporate">Corporate</option>
              <option value="charity">Charity</option>
              <option value="conference">Conference</option>
              <option value="celebration">Celebration</option>
              <option value="social">Social</option>
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-charcoal/70">
            Showing {filteredEvents.length} of {events.length} events
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-charcoal" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-gold">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm font-semibold">{event.rating}</span>
                    </div>
                    <div className="font-serif text-lg font-bold text-gold">
                      {event.price}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-charcoal mb-2 group-hover:text-gold transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-charcoal/70 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm text-charcoal/70 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gold" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gold" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gold" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gold" />
                      {event.attendees} attending
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-charcoal/50">by {event.organizer}</span>
                      <button className="btn-primary text-sm px-4 py-2">
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="glass-card p-8 max-w-md mx-auto">
              <Calendar className="w-16 h-16 text-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
                No events found
              </h3>
              <p className="text-charcoal/70">
                Try adjusting your search criteria or filters
              </p>
            </div>
          </motion.div>
        )}

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div className="glass-card p-8 text-center">
            <h3 className="font-serif text-2xl font-bold text-charcoal mb-4">
              Stay Updated
            </h3>
            <p className="text-charcoal/70 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss an upcoming event at Gazaliano venues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Events;
