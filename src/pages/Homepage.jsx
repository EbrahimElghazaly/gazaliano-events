import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, Calendar, Star, ArrowRight, Sparkles } from 'lucide-react';

const Homepage = () => {
  const featuredVenues = [
    {
      id: 1,
      name: "Grand Ballroom Royale",
      location: "Downtown District",
      capacity: 500,
      price: "$5,000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400"
    },
    {
      id: 2,
      name: "Garden Paradise Estate",
      location: "Countryside",
      capacity: 200,
      price: "$3,000",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400"
    },
    {
      id: 3,
      name: "Modern Sky Lounge",
      location: "City Center",
      capacity: 150,
      price: "$2,500",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400"
    }
  ];

  const stats = [
    { icon: Users, label: "Happy Clients", value: "10,000+" },
    { icon: MapPin, label: "Premium Venues", value: "50+" },
    { icon: Calendar, label: "Events Hosted", value: "2,500+" },
    { icon: Star, label: "Satisfaction Rate", value: "98%" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Create Unforgettable
              <span className="block text-gold">Moments</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Discover luxury venues and exceptional event planning services that transform your special occasions into extraordinary memories.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-6 max-w-2xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search venues, events..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                />
              </div>
              <Link to="/venues" className="btn-primary">
                Explore Venues
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="font-serif text-3xl font-bold text-gold mb-2">{stat.value}</div>
                <div className="text-charcoal/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Featured Venues
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Handpicked luxury venues that promise to make your events truly spectacular
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-gold fill-current" />
                      <span className="text-sm font-medium text-charcoal">{venue.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-charcoal mb-2">{venue.name}</h3>
                  <div className="flex items-center text-charcoal/70 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {venue.location}
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-charcoal/70 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {venue.capacity} guests
                    </div>
                    <div className="font-serif text-lg font-bold text-gold">{venue.price}</div>
                  </div>
                  <Link 
                    to={`/venues/${venue.id}`}
                    className="w-full btn-secondary text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/venues" className="btn-primary">
              View All Venues
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gold to-gold-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Create Your Perfect Event?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have trusted Gazaliano to bring their dream events to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/venues" className="bg-white text-gold px-8 py-4 rounded-2xl font-medium hover:shadow-xl transition-all duration-300 hover:scale-105">
                Start Planning
              </Link>
              <Link to="/events" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-medium hover:bg-white hover:text-gold transition-all duration-300">
                Browse Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
