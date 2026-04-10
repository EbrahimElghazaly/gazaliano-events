import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, DollarSign, Filter, Star, Grid, List } from 'lucide-react';

const Venues = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const venues = [
    {
      id: 1,
      name: "Grand Ballroom Royale",
      location: "Downtown District",
      capacity: 500,
      price: 5000,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
      description: "Elegant ballroom perfect for grand celebrations",
      amenities: ["Parking", "Catering", "AV Equipment", "Decor"]
    },
    {
      id: 2,
      name: "Garden Paradise Estate",
      location: "Countryside",
      capacity: 200,
      price: 3000,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400",
      description: "Beautiful outdoor garden venue",
      amenities: ["Garden", "Parking", "Catering", "Photography Spots"]
    },
    {
      id: 3,
      name: "Modern Sky Lounge",
      location: "City Center",
      capacity: 150,
      price: 2500,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
      description: "Contemporary rooftop venue with city views",
      amenities: ["Rooftop", "Bar", "AV Equipment", "City Views"]
    },
    {
      id: 4,
      name: "Historic Manor House",
      location: "Old Town",
      capacity: 300,
      price: 4000,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1520159899225-7df9d713cf86?w=400",
      description: "Victorian-era mansion with classic charm",
      amenities: ["Historic", "Garden", "Parking", "Vintage Decor"]
    },
    {
      id: 5,
      name: "Seaside Pavilion",
      location: "Coastal Area",
      capacity: 250,
      price: 3500,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400",
      description: "Beachfront venue with ocean views",
      amenities: ["Beach Access", "Ocean View", "Parking", "Outdoor Ceremony"]
    },
    {
      id: 6,
      name: "Urban Loft Space",
      location: "Arts District",
      capacity: 100,
      price: 2000,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1497366214043-f1eeb0d52858?w=400",
      description: "Industrial chic loft for modern events",
      amenities: ["Industrial", "Exposed Brick", "AV Equipment", "Flexible Layout"]
    }
  ];

  const filteredVenues = useMemo(() => {
    return venues.filter(venue => {
      const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           venue.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCapacity = capacityFilter === 'all' || 
        (capacityFilter === 'small' && venue.capacity <= 150) ||
        (capacityFilter === 'medium' && venue.capacity > 150 && venue.capacity <= 300) ||
        (capacityFilter === 'large' && venue.capacity > 300);
      
      const matchesPrice = priceFilter === 'all' ||
        (priceFilter === 'budget' && venue.price <= 2500) ||
        (priceFilter === 'mid' && venue.price > 2500 && venue.price <= 4000) ||
        (priceFilter === 'luxury' && venue.price > 4000);
      
      return matchesSearch && matchesCapacity && matchesPrice;
    });
  }, [searchTerm, capacityFilter, priceFilter]);

  const VenueCard = ({ venue, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
        <p className="text-charcoal/70 text-sm mb-3">{venue.description}</p>
        <div className="flex items-center text-charcoal/70 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {venue.location}
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-charcoal/70 text-sm">
            <Users className="w-4 h-4 mr-1" />
            {venue.capacity} guests
          </div>
          <div className="font-serif text-lg font-bold text-gold">${venue.price.toLocaleString()}</div>
        </div>
        <Link 
          to={`/venues/${venue.id}`}
          className="w-full btn-secondary text-center block"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );

  const VenueListItem = ({ venue, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card overflow-hidden group cursor-pointer"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
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
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-2xl font-bold text-charcoal">{venue.name}</h3>
            <div className="font-serif text-xl font-bold text-gold">${venue.price.toLocaleString()}</div>
          </div>
          <p className="text-charcoal/70 mb-3">{venue.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-charcoal/70 mb-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {venue.location}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {venue.capacity} guests
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {venue.amenities.slice(0, 3).map((amenity, i) => (
              <span key={i} className="px-3 py-1 bg-cream/50 rounded-full text-xs text-charcoal">
                {amenity}
              </span>
            ))}
          </div>
          <Link 
            to={`/venues/${venue.id}`}
            className="btn-secondary inline-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );

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
            Our Venues
          </h1>
          <p className="text-xl text-charcoal/70">
            Discover the perfect setting for your special occasion
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
                placeholder="Search venues by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
              />
            </div>

            {/* Capacity Filter */}
            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
            >
              <option value="all">All Capacities</option>
              <option value="small">Small (&le;150)</option>
              <option value="medium">Medium (151-300)</option>
              <option value="large">Large (&gt;300)</option>
            </select>

            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
            >
              <option value="all">All Prices</option>
              <option value="budget">Budget (&le;$2,500)</option>
              <option value="mid">Mid-Range ($2,501-$4,000)</option>
              <option value="luxury">Luxury (&gt;$4,000)</option>
            </select>

            {/* View Toggle */}
            <div className="flex bg-white/80 rounded-xl border border-white/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-l-xl transition-colors ${
                  viewMode === 'grid' ? 'bg-gold text-white' : 'text-charcoal'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-r-xl transition-colors ${
                  viewMode === 'list' ? 'bg-gold text-white' : 'text-charcoal'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-charcoal/70">
            Showing {filteredVenues.length} of {venues.length} venues
          </p>
        </div>

        {/* Venues Grid/List */}
        {filteredVenues.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }>
            {filteredVenues.map((venue, index) => 
              viewMode === 'grid' ? (
                <VenueCard key={venue.id} venue={venue} index={index} />
              ) : (
                <VenueListItem key={venue.id} venue={venue} index={index} />
              )
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="glass-card p-8 max-w-md mx-auto">
              <Filter className="w-16 h-16 text-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
                No venues found
              </h3>
              <p className="text-charcoal/70">
                Try adjusting your search criteria or filters
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Venues;
