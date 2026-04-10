import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users, DollarSign, Calendar, Clock, Star, ChevronLeft, ChevronRight, Heart, Share2, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const VenueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    eventName: '',
    date: '',
    guestCount: '',
    eventType: 'Private'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { user, isAuthenticated, createBooking } = useAuth();

  const venue = {
    id: parseInt(id),
    name: "Grand Ballroom Royale",
    location: "Downtown District",
    capacity: 500,
    price: 5000,
    rating: 4.9,
    description: "Experience unparalleled elegance in our Grand Ballroom Royale. This magnificent venue features soaring ceilings, crystal chandeliers, and exquisite marble floors that create a truly regal atmosphere for your special event.",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      "https://images.unsplash.com/photo-1520159899225-7df9d713cf86?w=800"
    ],
    amenities: [
      "Luxury Seating for 500 Guests",
      "State-of-the-Art Sound System",
      "Professional Lighting Equipment",
      "Catering Kitchen Facilities",
      "VIP Lounge Area",
      "Climate Control System",
      "Ample Parking Space",
      "Wheelchair Accessible",
      "Dance Floor",
      "Bar Service Available"
    ],
    services: [
      { name: "Full Catering Service", price: "$150 per person" },
      { name: "Event Planning", price: "$2,000" },
      { name: "Photography & Videography", price: "$3,000" },
      { name: "Live Entertainment", price: "$1,500" },
      { name: "Floral Arrangements", price: "$800" },
      { name: "Transportation", price: "$500" }
    ],
    availability: {
      monday: "Available",
      tuesday: "Available",
      wednesday: "Booked",
      thursday: "Available",
      friday: "Available",
      saturday: "Booked",
      sunday: "Available"
    }
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % venue.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + venue.images.length) % venue.images.length);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createBooking({
        userId: user.id,
        venueId: venue.id,
        venueName: venue.name,
        eventName: bookingData.eventName,
        date: bookingData.date,
        guestCount: parseInt(bookingData.guestCount),
        eventType: bookingData.eventType,
        price: venue.price
      });

      if (result.success) {
        setBookingSuccess(true);
        setTimeout(() => {
          setShowBookingModal(false);
          setBookingSuccess(false);
          setBookingData({
            eventName: '',
            date: '',
            guestCount: '',
            eventType: 'Private'
          });
          navigate('/dashboard/client');
        }, 2000);
      }
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/venues"
            className="inline-flex items-center text-charcoal/70 hover:text-gold transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Venues
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <img
                  src={venue.images[currentImage]}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-charcoal" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-charcoal" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-charcoal">
                    {currentImage + 1} / {venue.images.length}
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 mt-4">
                {venue.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`flex-1 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImage === index ? 'border-gold' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${venue.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Venue Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              <div className="flex justify-between items-start mb-4">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
                  {venue.name}
                </h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-full bg-white/80 hover:bg-gold hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-white/80 hover:bg-gold hover:text-white transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-gold">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 font-semibold">{venue.rating}</span>
                </div>
                <div className="flex items-center text-charcoal/70">
                  <MapPin className="w-4 h-4 mr-1" />
                  {venue.location}
                </div>
                <div className="flex items-center text-charcoal/70">
                  <Users className="w-4 h-4 mr-1" />
                  {venue.capacity} guests
                </div>
              </div>

              <p className="text-charcoal/70 leading-relaxed mb-6">
                {venue.description}
              </p>

              <div className="border-t border-white/20 pt-6">
                <h3 className="font-serif text-xl font-bold text-charcoal mb-4">
                  Venue Amenities
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {venue.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-charcoal/70">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8"
            >
              <h3 className="font-serif text-xl font-bold text-charcoal mb-6">
                Available Services
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {venue.services.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-cream/50 rounded-xl">
                    <span className="font-medium text-charcoal">{service.name}</span>
                    <span className="text-gold font-semibold">{service.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="font-serif text-3xl font-bold text-gold mb-2">
                  ${venue.price.toLocaleString()}
                </div>
                <div className="text-charcoal/70">per event</div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full btn-primary mb-4"
              >
                Book Now
              </button>

              <Link
                to="/events"
                className="w-full btn-secondary text-center block"
              >
                View Similar Events
              </Link>

              <div className="border-t border-white/20 mt-6 pt-6">
                <h4 className="font-semibold text-charcoal mb-4">Availability</h4>
                <div className="space-y-2">
                  {Object.entries(venue.availability).map(([day, status]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="text-charcoal/70 capitalize">{day}</span>
                      <span className={`text-sm font-medium ${
                        status === 'Available' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/20 mt-6 pt-6">
                <h4 className="font-semibold text-charcoal mb-4">Contact Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-charcoal/70">
                    <Clock className="w-4 h-4 mr-2 text-gold" />
                    Mon-Fri: 9AM-6PM
                  </div>
                  <div className="flex items-center text-charcoal/70">
                    <Calendar className="w-4 h-4 mr-2 text-gold" />
                    Book 2+ weeks in advance
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 max-w-md w-full"
          >
            {!bookingSuccess ? (
              <>
                <h3 className="font-serif text-2xl font-bold text-charcoal mb-6">
                  Book {venue.name}
                </h3>
                
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Event Name
                    </label>
                    <input
                      type="text"
                      value={bookingData.eventName}
                      onChange={(e) => setBookingData({...bookingData, eventName: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                      placeholder="Your event name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      value={bookingData.guestCount}
                      onChange={(e) => setBookingData({...bookingData, guestCount: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                      placeholder="Number of guests"
                      max={venue.capacity}
                      min="1"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Event Type
                    </label>
                    <select 
                      value={bookingData.eventType}
                      onChange={(e) => setBookingData({...bookingData, eventType: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal"
                    >
                      <option value="Private">Private Event</option>
                      <option value="Public">Public Event</option>
                    </select>
                  </div>

                  <div className="p-4 bg-cream/50 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-charcoal/70">Venue Price:</span>
                      <span className="font-serif font-bold text-gold">${venue.price.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-charcoal/50">
                      Booking will be submitted for approval
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">
                  Booking Submitted!
                </h3>
                <p className="text-charcoal/70 mb-4">
                  Your booking request has been submitted and is pending approval.
                </p>
                <p className="text-sm text-charcoal/50">
                  Redirecting to your dashboard...
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VenueDetail;
