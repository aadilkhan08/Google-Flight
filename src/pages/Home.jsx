import { useState } from 'react'
import SearchForm from '../components/SearchForm'
import FlightCard from '../components/FlightCard'
import Loader from '../components/Loader'
import { fetchFlights, getAirportCode } from '../api/flightAPI'

const Home = () => {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleSearch = async searchData => {
    setLoading(true)
    setError(null)
    setSearchPerformed(true)

    console.log('Search initiated with data:', searchData)

    try {
      const result = await fetchFlights(
        searchData.from,
        searchData.to,
        searchData.date,
        searchData.passengers
      )

      console.log('API Response:', result)
      console.log('Response type:', typeof result)
      console.log('Response keys:', Object.keys(result))

      // Handle different response structures
      if (result.status === false) {
        // API returned error status
        console.log('API Error - Status false:', result.message)
        setFlights([])
        if (result.message && Array.isArray(result.message)) {
          const errorMessages = result.message.map(msg =>
            typeof msg === 'object' ? Object.values(msg).join(': ') : msg
          )
          setError(`API Error: ${errorMessages.join(', ')}`)
        } else {
          setError(
            'API returned an error. Please check your search parameters.'
          )
        }
      } else if (result.status === true || result.data) {
        // Handle successful response
        const flightData =
          result.data?.itineraries ||
          result.data?.flights ||
          result.itineraries ||
          result.flights

        if (flightData && flightData.length > 0) {
          setFlights(Array.isArray(flightData) ? flightData : [flightData])
          console.log('Flights set:', flightData)
        } else {
          // Check for price calendar data
          const priceData = result.data?.prices || result.prices
          if (priceData) {
            // Convert price data to flight-like structure for display
            const mockFlights = Object.entries(priceData).map(
              ([date, price]) => ({
                id: date,
                departure: { airport: searchData.from, time: '12:00' },
                arrival: { airport: searchData.to, time: '15:00' },
                price: { amount: price, currency: 'USD' },
                airline: 'Various Airlines',
                duration: '3h 00m'
              })
            )
            setFlights(mockFlights)
            console.log('Price data converted to flights:', mockFlights)
          } else {
            setFlights([])
            setError('No flights found for your search criteria.')
            console.log('No flights found in response')
          }
        }
      } else {
        // No flights found
        setFlights([])
        setError('No flights found for your search criteria.')
        console.log('No flights found in response')
      }
    } catch (err) {
      console.error('Search error:', err)
      setError(`Failed to search flights: ${err.message}`)
      setFlights([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-white font-google'>
      {/* Google Header */}
      <header className='bg-white border-b border-google-border'>
        <div className='max-w-7xl mx-auto px-6 py-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-8'>
              <div className='flex items-center space-x-2'>
                <svg
                  className='w-6 h-6 text-google-blue'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
                  <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
                  <path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
                  <path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
                </svg>
                <span className='text-xl text-google-text font-normal'>
                  Flights
                </span>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <button className='px-4 py-2 text-google-blue text-sm font-medium hover:bg-google-light-grey rounded'>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className='bg-white'>
        {/* Hero Section with Search */}
        <div className='max-w-7xl mx-auto px-6 py-8'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-normal text-google-text mb-2'>
              Flights
            </h1>
            <SearchForm onSearch={handleSearch} loading={loading} />
          </div>
        </div>

        {/* Results Section */}
        <div className='bg-google-light-grey min-h-[60vh]'>
          <div className='max-w-7xl mx-auto px-6 py-6'>
            {loading && <Loader />}

            {error && (
              <div className='bg-white rounded-lg border border-google-border p-6 mb-4'>
                <div className='flex items-center text-red-600'>
                  <svg
                    className='w-5 h-5 mr-3'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <div>
                    <h3 className='font-medium'>Error</h3>
                    <p className='text-sm text-google-text-secondary mt-1'>
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!loading && searchPerformed && flights.length === 0 && !error && (
              <div className='bg-white rounded-lg border border-google-border p-12 text-center'>
                <div className='text-google-text-secondary mb-4'>
                  <svg
                    className='w-16 h-16 mx-auto'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-normal text-google-text mb-2'>
                  No flights found
                </h3>
                <p className='text-google-text-secondary'>
                  Try adjusting your search criteria or selecting different
                  dates.
                </p>
              </div>
            )}

            {/* Flight Results */}
            {!loading && flights.length > 0 && (
              <div>
                <div className='mb-6'>
                  <h2 className='text-lg font-normal text-google-text'>
                    Flights ({flights.length} found)
                  </h2>
                </div>
                <div className='space-y-2'>
                  {flights.map((flight, index) => (
                    <FlightCard key={index} flight={flight} />
                  ))}
                </div>
              </div>
            )}

            {/* Default state - before search */}
            {!searchPerformed && !loading && (
              <div className='bg-white rounded-lg border border-google-border p-16 text-center'>
                <div className='text-google-text-secondary mb-6'>
                  <svg
                    className='w-20 h-20 mx-auto'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1}
                      d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                    />
                  </svg>
                </div>
                <h2 className='text-2xl font-normal text-google-text mb-3'>
                  Find and book cheap flights
                </h2>
                <p className='text-google-text-secondary text-lg'>
                  Search for flights above to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
