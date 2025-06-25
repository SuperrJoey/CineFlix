# Theatre Management System (TMS)

A comprehensive web-based theatre management system built with React and TypeScript. This application provides a complete solution for managing movie theaters, including ticket booking, seat reservations, user management, and administrative features.

## 🎬 Features

### Customer Features
- Browse available movies and showtimes
- Interactive seat selection with real-time availability
- Secure booking process with timer-based reservations
- User authentication and profile management
- Booking history and management

### Staff Features
- Movie management (add, edit, remove)
- Showtime scheduling
- Booking overview and management
- Customer support tools

### Admin Features
- Complete system administration
- User role management
- Comprehensive reporting and analytics
- Theater configuration and settings

### Real-time Features
- Live seat availability updates
- Booking notifications
- Reservation timers
- Multi-user synchronization

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.0.0
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React, React Icons
- **Animations**: Framer Motion
- **Charts**: Chart.js with React Chart.js 2
- **HTTP Client**: Axios
- **Real-time Communication**: Socket.IO
- **Routing**: React Router DOM
- **Date Handling**: date-fns

## 📋 Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the production build

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddMovieDialog.tsx
│   ├── BookingModal.tsx
│   ├── Header.tsx
│   └── ...
├── pages/              # Main application pages
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard views
│   ├── movies/         # Movie-related pages
│   ├── seats/          # Seat selection
│   └── ...
├── styles/             # Global styles and animations
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## 🎯 Key Components

- **Booking System**: Complete ticket booking workflow with seat selection
- **Real-time Updates**: Live synchronization using Socket.IO
- **User Management**: Role-based access control for customers, staff, and admins
- **Movie Management**: Comprehensive movie and showtime administration
- **Reporting**: Analytics and reporting dashboard for business insights

## 🔧 Configuration

The project uses several configuration files:
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint rules and settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

---

Built with ❤️ using React and TypeScript
