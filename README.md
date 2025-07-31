# Google Flights Clone

A modern flight search application built with React, Vite, and Tailwind CSS that replicates the Google Flights experience using the SkyScapper API.

## ✈️ Features

- **Flight Search**: Search flights by origin, destination, date, and passenger count
- **Real-time Results**: Get live flight data with pricing from multiple booking agents
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Price Comparison**: Compare prices across different booking platforms
- **Modern UI**: Clean, intuitive interface similar to Google Flights

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd google-flight
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

## 🛠️ Built With

- **React 18** - Frontend library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **SkyScapper API** - Flight data provider via RapidAPI

## 📱 API Integration

This application uses the SkyScapper API from RapidAPI to fetch flight data. The API provides:

- Flight search results
- Multiple pricing options
- Airline information
- Route details with stops
- Real-time availability

## 🎨 Design

The interface closely follows Google Flights design principles:

- Clean, minimalist layout
- Blue accent colors (#1976d2)
- Card-based flight results
- Intuitive search form
- Loading states and error handling

## 📦 Project Structure

```
src/
├── api/
│   └── flightAPI.js          # API integration
├── components/
│   ├── SearchForm.jsx        # Flight search form
│   ├── FlightCard.jsx        # Individual flight result
│   └── Loader.jsx           # Loading component
├── pages/
│   └── Home.jsx             # Main page
├── App.jsx                  # Root component
└── main.jsx                 # Entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Future Enhancements

- Add filters (airlines, stops, price range)
- Implement round-trip search
- Add flight details modal
- Include seat selection
- Add user preferences and favorites
- Implement advanced sorting options

## 📄 License

This project is for educational purposes and demonstrates modern React development practices.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
