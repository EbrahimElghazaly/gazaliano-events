# Gazaliano Event & Venue Management System

A luxury, elegant wedding and event venue booking platform built with React, Vite, Tailwind CSS, and featuring role-based dashboards.

## 🎨 Design System

- **Colors**: Cream (#FDFBF7), Gold (#B8860B, #D4AF37), Charcoal (#2C2C2C)
- **Fonts**: "Playfair Display" (Serif for Headings), "Inter" (Sans for Body)
- **Style**: Glassmorphism cards with backdrop-blur, rounded-2xl (16px), soft shadows
- **Footer**: Contains `gazaliano web © 2026 - 2027` on every page

## 🚀 Features

### Public Pages
- **Homepage**: Cinematic Hero section with venue backgrounds, search bar, stats, featured venues
- **Venues Page**: Grid display with filters (capacity, price) and search functionality
- **Venue Detail Page**: Gallery, descriptions, amenities, booking modal
- **Events Page**: Public events grid with filtering options
- **Authentication**: Elegant glassmorphism login and register forms

### Role-Based Dashboards
- **Manager Dashboard** (`manager@gazaliano.com` / `Admin@2026`)
  - Stats cards (Total Bookings, Revenue, Upcoming Events)
  - Pending bookings table with approve/reject actions
  - Organizer creator form
  - Analytics with revenue charts using Recharts

- **Organizer Dashboard**
  - Task checklist with priority levels
  - Today's events management
  - QR scanner simulation for ticket validation

- **Client Dashboard**
  - Personal bookings with status tracking
  - Chat interface with organizers
  - Booking creation workflow

### Authentication System
- Mock authentication with role management
- Manager role: Hardcoded credentials
- Client role: Any email/password combination
- Organizer role: Created via Manager dashboard

## 🛠 Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS with custom Gazaliano theme
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts for analytics
- **State Management**: React Context API

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd event-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Demo Accounts

### Manager Account
- **Email**: manager@gazaliano.com
- **Password**: Admin@2026
- **Access**: Full system management, analytics, organizer creation

### Client Account
- **Email**: Any email address
- **Password**: Any password
- **Access**: Venue browsing, booking creation, personal dashboard

### Organizer Account
- **Created by**: Manager via dashboard
- **Access**: Event management, task tracking, QR scanning

## 📱 Responsive Design

The application is fully responsive across all device sizes:
- Mobile: Single column layout with collapsible navigation
- Tablet: Optimized grid layouts and touch interactions
- Desktop: Full multi-column layouts with hover effects

## 🎯 Key Features

### Booking Flow
1. Browse venues with advanced filtering
2. View detailed venue information and galleries
3. Submit booking requests with event details
4. Manager approval/rejection workflow
5. Real-time status updates in client dashboard

### Analytics & Reporting
- Monthly revenue trends
- Booking status distribution
- Key performance metrics
- Visual charts and data visualization

### User Experience
- Smooth page transitions with Framer Motion
- Glassmorphism design for modern aesthetic
- Intuitive navigation and user flows
- Loading states and error handling

## 🏗 Project Structure

```
src/
├── components/
│   └── Layout.jsx          # Main layout with navbar and footer
├── contexts/
│   └── AuthContext.jsx     # Authentication and state management
├── pages/
│   ├── Homepage.jsx
│   ├── Venues.jsx
│   ├── VenueDetail.jsx
│   ├── Events.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── dashboards/
│       ├── ManagerDashboard.jsx
│       ├── OrganizerDashboard.jsx
│       └── ClientDashboard.jsx
├── App.jsx                 # Main app with routing
├── main.jsx
└── index.css              # Custom styles and Tailwind imports
```

## 🎨 Design Principles

- **Luxury Aesthetic**: Gold accents, elegant typography, premium imagery
- **Glassmorphism**: Modern frosted glass effects with backdrop blur
- **Micro-interactions**: Hover states, smooth transitions, loading animations
- **Accessibility**: Semantic HTML, keyboard navigation, screen reader support

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📄 License

This project is a demonstration of modern React development practices and luxury UI/UX design.

---

**Gazaliano Event & Venue Management System** - Creating unforgettable moments with elegance and precision.
