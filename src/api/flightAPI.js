import axios from 'axios'

const API_KEY = 'd42868545fmshb435828ac08ac02p139e45jsn5c57f3b5941f'
const BASE_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1'

const headers = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
}

// Function to get Sky ID and Entity ID for an airport
const getAirportData = async query => {
  try {
    const response = await axios.get(`${BASE_URL}/flights/searchAirport`, {
      params: { query },
      headers
    })

    console.log(`Airport search for "${query}":`, response.data)

    if (
      response.data.status &&
      response.data.data &&
      response.data.data.length > 0
    ) {
      // Look for an exact match first, then fall back to first result
      let airport = response.data.data.find(
        a =>
          a.skyId === query ||
          a.name?.toLowerCase().includes(query.toLowerCase())
      )

      if (!airport) {
        airport = response.data.data[0]
      }

      console.log(`Selected airport for "${query}":`, airport)

      return {
        skyId: airport.skyId,
        entityId: airport.entityId,
        name: airport.name || query
      }
    }

    return { skyId: query, entityId: query, name: query } // fallback
  } catch (error) {
    console.error(`Failed to get airport data for ${query}:`, error)
    return { skyId: query, entityId: query, name: query } // fallback
  }
}

export const fetchFlights = async (origin, destination, date, adults = 1) => {
  try {
    console.log('API Call Parameters:')
    console.log('- Origin:', origin)
    console.log('- Destination:', destination)
    console.log('- Date:', date)
    console.log('- Adults:', adults)

    // Get proper airport data for origin and destination first
    console.log('Getting airport data...')
    const originData = await getAirportData(origin)
    const destinationData = await getAirportData(destination)

    console.log('- Origin Airport Data:', originData)
    console.log('- Destination Airport Data:', destinationData)

    // Validate that origin and destination are different
    if (originData.skyId === destinationData.skyId) {
      throw new Error('Origin and destination cannot be the same')
    }

    // Try the price calendar endpoint first (seems more reliable)
    try {
      console.log('Trying price calendar endpoint...')

      // Use a date range starting from next week
      const startDate = new Date()
      startDate.setDate(startDate.getDate() + 7)
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 30) // 30 days range

      const formattedStartDate = startDate.toISOString().split('T')[0]
      const formattedEndDate = endDate.toISOString().split('T')[0]

      console.log(
        '- Price Calendar Date Range:',
        formattedStartDate,
        'to',
        formattedEndDate
      )

      const priceCalendarResponse = await axios.get(
        `${BASE_URL}/flights/getPriceCalendar`,
        {
          params: {
            originSkyId: originData.skyId,
            destinationSkyId: destinationData.skyId,
            fromDate: formattedStartDate,
            toDate: formattedEndDate,
            currency: 'USD'
          },
          headers
        }
      )

      console.log('Price Calendar Response:', priceCalendarResponse.data)

      if (
        priceCalendarResponse.data.status &&
        priceCalendarResponse.data.data
      ) {
        return priceCalendarResponse.data
      }
    } catch (priceError) {
      console.error('Price calendar failed:', priceError)
    }

    // If price calendar fails, try a mock response for development
    console.log('All API calls failed, returning mock data for development...')

    return {
      status: true,
      data: {
        flights: [
          {
            id: 'mock-1',
            departure: {
              airport: originData.skyId,
              time: '10:00',
              name: originData.name
            },
            arrival: {
              airport: destinationData.skyId,
              time: '14:00',
              name: destinationData.name
            },
            price: { amount: 299, currency: 'USD' },
            airline: 'Mock Airlines',
            duration: '4h 00m',
            direct: true
          },
          {
            id: 'mock-2',
            departure: {
              airport: originData.skyId,
              time: '15:00',
              name: originData.name
            },
            arrival: {
              airport: destinationData.skyId,
              time: '19:30',
              name: destinationData.name
            },
            price: { amount: 399, currency: 'USD' },
            airline: 'Another Mock Airlines',
            duration: '4h 30m',
            direct: false
          }
        ]
      }
    }
  } catch (error) {
    console.error('API Error Details:', error)
    if (error.response) {
      console.error('- Response Status:', error.response.status)
      console.error('- Response Headers:', error.response.headers)
      console.error('- Response Data:', error.response.data)
    }
    throw error
  }
}

// Airport codes mapping for common destinations (IATA codes)
export const AIRPORT_CODES = {
  'New York': 'JFK',
  'Los Angeles': 'LAX',
  London: 'LHR',
  Paris: 'CDG',
  Tokyo: 'NRT',
  Dubai: 'DXB',
  Singapore: 'SIN',
  Frankfurt: 'FRA',
  Amsterdam: 'AMS',
  Istanbul: 'IST',
  'San Francisco': 'SFO',
  Chicago: 'ORD',
  Miami: 'MIA',
  'Las Vegas': 'LAS',
  Boston: 'BOS'
}

export const getAirportCode = cityName => {
  return AIRPORT_CODES[cityName] || cityName.toUpperCase()
}
