# ✈️ Google Flights Dark Theme Clone

A modern, responsive flight search application built with React and Vite, featuring a beautiful dark theme that matches Google Flights' design language.

![Google Flights Dark Theme](https://img.shields.io/badge/Theme-Dark-000000?style=for-the-badge&logo=google&logoColor=white)
![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌟 Features

### 🎨 **Design & UI**
- **Authentic Google Flights Dark Theme** - Pixel-perfect recreation of Google's dark mode
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Google Sans Typography** - Uses Google's official font family
- **Smooth Animations** - Subtle transitions and hover effects
- **Official Google Hero Image** - Integrated Google Flights SVG animation

### 🔍 **Flight Search**
- **Real-time Flight Search** - Powered by SkyScanner API via RapidAPI
- **Airport Selection** - Dropdown with major international airports
- **Date Selection** - Calendar picker with date validation
- **Passenger Count** - Support for 1-6 passengers
- **Price Calendar** - Alternative pricing data when live flights unavailable
- **Mock Data Fallback** - Development-friendly fallback data

### 🛠️ **Technical Features**
- **Modern React** - Built with React 18+ and functional components
- **Vite Build System** - Lightning-fast development and build process
- **Tailwind CSS** - Utility-first CSS framework with custom Google theme
- **API Integration** - RapidAPI SkyScanner integration
- **Error Handling** - Comprehensive error states and user feedback
- **Loading States** - Beautiful loading animations and skeleton screens

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager
- RapidAPI account (for flight data)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aadilkhan08/Google-Flight.git
   cd Google-Flight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # The .env file is already configured with API credentials
   # VITE_API_KEY=your_rapidapi_key_here
   # VITE_API_HOST=https://sky-scrapper.p.rapidapi.com/api/v1
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
Google-Flight/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── flightAPI.js          # API integration & airport codes
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── FlightCard.jsx        # Individual flight result display
│   │   ├── Loader.jsx            # Loading spinner component
│   │   └── SearchForm.jsx        # Flight search form
│   ├── pages/
│   │   └── Home.jsx              # Main page component
│   ├── App.css                   # Global app styles
│   ├── App.jsx                   # Root component
│   ├── index.css                 # Global CSS & Tailwind imports
│   └── main.jsx                  # App entry point
├── .env                          # Environment variables
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML template
├── package.json                  # Dependencies & scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── vite.config.js                # Vite configuration
```

## 🎨 Design System

### Color Palette
The application uses Google's official dark theme colors:

```css
/* Primary Colors */
--google-bg-primary: #202124      /* Main background */
--google-bg-secondary: #303134    /* Secondary background */
--google-surface: #303134         /* Card surfaces */

/* Text Colors */
--google-text: #e8eaed            /* Primary text */
--google-text-secondary: #9aa0a6  /* Secondary text */
--google-text-muted: #5f6368      /* Muted text */

/* Accent Colors */
--google-blue: #8ab4f8            /* Primary blue (dark theme) */
--google-blue-hover: #93baf9      /* Blue hover state */

/* Borders */
--google-border: #3c4043          /* Primary borders */
--google-border-light: #5f6368    /* Light borders */
```

### Typography
- **Primary Font**: Google Sans
- **Fallbacks**: Roboto, Helvetica Neue, Arial, sans-serif
- **Weights**: 300, 400, 500, 600, 700

## 🔧 Configuration

### Environment Variables
```env
# Required for API functionality
VITE_API_KEY=your_rapidapi_key_here
VITE_API_HOST=https://sky-scrapper.p.rapidapi.com/api/v1
```

### Tailwind Configuration
Custom Google-themed colors and utilities are defined in `tailwind.config.js`:

```javascript
colors: {
  'google-blue': '#8ab4f8',
  'google-bg-primary': '#202124',
  'google-surface': '#303134',
  // ... more colors
}
```

## 🛩️ API Integration

### Supported Airports
The application includes 15 major international airports:

- **Americas**: New York (JFK), Los Angeles (LAX), San Francisco (SFO), Chicago (ORD), Miami (MIA), Las Vegas (LAS), Boston (BOS)
- **Europe**: London (LHR), Paris (CDG), Frankfurt (FRA), Amsterdam (AMS), Istanbul (IST)
- **Asia-Pacific**: Tokyo (NRT), Dubai (DXB), Singapore (SIN)

### Error Handling
- API rate limiting gracefully handled
- Network errors with user-friendly messages
- Fallback to mock data during development
- Comprehensive logging for debugging

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Touch-friendly interface elements
- Optimized form layouts
- Responsive typography scaling
- Mobile-specific navigation patterns

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- ESLint configuration included
- Prettier formatting recommended
- Consistent component structure
- Comprehensive commenting

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Deployment Options
- **Vercel**: Recommended for React apps
- **Netlify**: Easy static site deployment
- **GitHub Pages**: Free hosting option
- **Traditional hosting**: Upload `dist/` folder

### Environment Variables for Production
Ensure your hosting platform has the required environment variables:
- `VITE_API_KEY`
- `VITE_API_HOST`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add comments for complex logic
- Test on multiple screen sizes
- Ensure dark theme consistency

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Flights** - Design inspiration and UI patterns
- **SkyScanner API** - Flight data integration
- **React Team** - Amazing frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next generation frontend tooling

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ by [Aadil Khan](https://github.com/aadilkhan08)**

*Making flight search beautiful, one pixel at a time.* ✈️
