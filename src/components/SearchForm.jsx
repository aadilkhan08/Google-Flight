import { useState } from 'react'
import { AIRPORT_CODES } from '../api/flightAPI'

const SearchForm = ({ onSearch, loading }) => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  })

  const handleSubmit = e => {
    e.preventDefault()
    if (searchData.from && searchData.to && searchData.date) {
      onSearch(searchData)
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className='bg-google-surface rounded-lg shadow-google-dark border border-google-border p-6 mb-8 max-w-4xl mx-auto'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-0 mb-4'>
          {/* From Input */}
          <div className='relative'>
            <div className='border border-google-border rounded-l-lg md:rounded-r-none hover:border-google-blue focus-within:border-google-border transition-all bg-google-bg-secondary'>
              <label className='block text-xs text-google-text-secondary px-4 pt-3 pb-1 font-medium'>
                From
              </label>
              <select
                name='from'
                value={searchData.from}
                onChange={handleInputChange}
                className='w-full px-4 pb-3 text-google-text bg-transparent border-none outline-none appearance-none cursor-pointer focus:ring-0 focus:outline-none focus:border-none'
                required
              >
                <option
                  value=''
                  className='bg-google-bg-secondary text-google-text'
                >
                  Where from?
                </option>
                {Object.keys(AIRPORT_CODES).map(city => (
                  <option
                    key={city}
                    value={AIRPORT_CODES[city]}
                    className='bg-google-bg-secondary text-google-text'
                  >
                    {city}
                  </option>
                ))}
              </select>
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-google-text-secondary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* To Input */}
          <div className='relative'>
            <div className='border border-google-border -ml-px hover:border-google-blue focus-within:border-google-border transition-all bg-google-bg-secondary'>
              <label className='block text-xs text-google-text-secondary px-4 pt-3 pb-1 font-medium'>
                To
              </label>
              <select
                name='to'
                value={searchData.to}
                onChange={handleInputChange}
                className='w-full px-4 pb-3 text-google-text bg-transparent border-none outline-none appearance-none cursor-pointer focus:ring-0 focus:outline-none focus:border-none'
                required
              >
                <option
                  value=''
                  className='bg-google-bg-secondary text-google-text'
                >
                  Where to?
                </option>
                {Object.keys(AIRPORT_CODES).map(city => (
                  <option
                    key={city}
                    value={AIRPORT_CODES[city]}
                    className='bg-google-bg-secondary text-google-text'
                  >
                    {city}
                  </option>
                ))}
              </select>
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-google-text-secondary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Date Input */}
          <div className='relative'>
            <div className='border border-google-border -ml-px hover:border-google-blue focus-within:border-google-border transition-all bg-google-bg-secondary'>
              <label className='block text-xs text-google-text-secondary px-4 pt-3 pb-1 font-medium'>
                Departure
              </label>
              <input
                type='date'
                name='date'
                value={searchData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className='w-full px-4 pb-3 text-google-text bg-transparent border-none outline-none focus:ring-0 focus:outline-none focus:border-none [color-scheme:dark]'
                required
              />
            </div>
          </div>

          {/* Passengers Input */}
          <div className='relative'>
            <div className='border border-google-border -ml-px rounded-r-lg hover:border-google-blue focus-within:border-google-border transition-all bg-google-bg-secondary'>
              <label className='block text-xs text-google-text-secondary px-4 pt-3 pb-1 font-medium'>
                Passengers
              </label>
              <select
                name='passengers'
                value={searchData.passengers}
                onChange={handleInputChange}
                className='w-full px-4 pb-3 text-google-text bg-transparent border-none outline-none appearance-none cursor-pointer focus:ring-0 focus:outline-none focus:border-none'
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option
                    key={num}
                    value={num}
                    className='bg-google-bg-secondary text-google-text'
                  >
                    {num} {num === 1 ? 'passenger' : 'passengers'}
                  </option>
                ))}
              </select>
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-google-text-secondary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className='flex justify-center mt-6'>
          <button
            type='submit'
            disabled={loading}
            className='bg-google-blue hover:bg-google-blue-hover disabled:bg-google-grey text-google-bg-primary px-8 py-3 rounded-full font-medium transition-colors duration-200 flex items-center space-x-2 shadow-google'
          >
            {loading ? (
              <>
                <div className='w-4 h-4 border-2 border-google-bg-primary border-t-transparent rounded-full animate-spin'></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchForm
