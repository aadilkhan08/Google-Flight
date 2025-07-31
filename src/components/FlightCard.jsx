const FlightCard = ({ flight }) => {
  const formatTime = dateTime => {
    if (!dateTime) return '--:--'
    if (typeof dateTime === 'string' && dateTime.includes(':')) {
      return dateTime // Already formatted
    }
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const formatDuration = minutes => {
    if (!minutes) return '--'
    if (typeof minutes === 'string') return minutes // Already formatted
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatPrice = price => {
    if (typeof price === 'object' && price.amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency || 'USD'
      }).format(price.amount)
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price || 0)
  }

  // Handle different flight data structures
  if (!flight) return null

  // Check for our mock flight structure (from price calendar)
  if (flight.departure && flight.arrival && !flight.legs) {
    return (
      <div className='bg-white rounded-lg border border-google-border hover:shadow-google-lg transition-shadow p-4 mb-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-8'>
            <div className='text-sm text-google-text-secondary'>
              {flight.airline || 'Various Airlines'}
            </div>
            <div className='flex items-center space-x-4'>
              <div className='text-center'>
                <div className='text-lg font-medium text-google-text'>
                  {formatTime(flight.departure.time)}
                </div>
                <div className='text-sm text-google-text-secondary'>
                  {flight.departure.airport}
                </div>
              </div>
              <div className='flex-1 px-4'>
                <div className='text-center'>
                  <div className='text-sm text-google-text-secondary'>
                    {flight.duration || '--'}
                  </div>
                  <div className='h-px bg-google-border my-2 relative'>
                    <div className='absolute left-0 w-2 h-2 bg-google-border rounded-full -mt-1'></div>
                    <div className='absolute right-0 w-2 h-2 bg-google-border rounded-full -mt-1'></div>
                  </div>
                  <div className='text-xs text-google-text-secondary'>
                    Direct
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-medium text-google-text'>
                  {formatTime(flight.arrival.time)}
                </div>
                <div className='text-sm text-google-text-secondary'>
                  {flight.arrival.airport}
                </div>
              </div>
            </div>
          </div>
          <div className='text-right'>
            <div className='text-xl font-semibold text-google-text'>
              {formatPrice(flight.price)}
            </div>
            <div className='text-sm text-google-text-secondary'>per person</div>
          </div>
        </div>
      </div>
    )
  }

  // Original flight structure handling
  if (!flight.legs || flight.legs.length === 0) {
    return null
  }

  const leg = flight.legs[0]
  const segment = leg.segments[0]
  const bestPrice = flight.pricingOptions
    ? Math.min(...flight.pricingOptions.map(option => option.totalPrice))
    : leg.price || 0
  const bestAgent = flight.pricingOptions
    ? flight.pricingOptions.find(option => option.totalPrice === bestPrice)
        ?.agents[0]
    : null

  return (
    <div className='bg-white rounded-lg border border-google-border hover:shadow-google-lg transition-shadow duration-200 p-6 mb-2'>
      <div className='flex items-center justify-between'>
        {/* Left section - Flight details */}
        <div className='flex-1'>
          <div className='flex items-center justify-between mb-4'>
            {/* Time and Airport codes */}
            <div className='flex items-center space-x-8'>
              <div className='text-center'>
                <div className='text-2xl font-normal text-google-text'>
                  {formatTime(segment.departure)}
                </div>
                <div className='text-sm text-google-text-secondary'>
                  {segment.origin.displayCode}
                </div>
              </div>

              <div className='flex items-center space-x-2 min-w-[120px]'>
                <div className='flex-1 h-px bg-google-border'></div>
                <div className='text-center px-2'>
                  <div className='text-sm text-google-text-secondary'>
                    {formatDuration(segment.duration)}
                  </div>
                  <div className='text-xs text-google-text-secondary'>
                    {leg.stopCount === 0
                      ? 'Nonstop'
                      : `${leg.stopCount} stop${leg.stopCount > 1 ? 's' : ''}`}
                  </div>
                </div>
                <div className='flex-1 h-px bg-google-border'></div>
              </div>

              <div className='text-center'>
                <div className='text-2xl font-normal text-google-text'>
                  {formatTime(segment.arrival)}
                </div>
                <div className='text-sm text-google-text-secondary'>
                  {segment.destination.displayCode}
                </div>
              </div>
            </div>
          </div>

          {/* Airline info */}
          <div className='flex items-center space-x-3'>
            <img
              src={segment.marketingCarrier.logo}
              alt={segment.marketingCarrier.name}
              className='w-6 h-6 rounded'
              onError={e => {
                e.target.style.display = 'none'
              }}
            />
            <div className='text-sm text-google-text-secondary'>
              {segment.marketingCarrier.name} {segment.flightNumber}
            </div>
          </div>
        </div>

        {/* Right section - Price and select */}
        <div className='text-right ml-8'>
          <div className='text-2xl font-normal text-google-text mb-1'>
            {formatPrice(bestPrice)}
          </div>
          {bestAgent && (
            <div className='text-sm text-google-text-secondary mb-3'>
              {bestAgent.name}
            </div>
          )}
          <button
            onClick={() => window.open(bestAgent?.url, '_blank')}
            className='bg-google-blue hover:bg-google-blue-hover text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-google'
          >
            Select
          </button>
        </div>
      </div>

      {/* Additional pricing options - collapsed by default like Google Flights */}
      {flight.pricingOptions.length > 1 && (
        <details className='mt-4 pt-4 border-t border-google-border'>
          <summary className='text-sm text-google-blue cursor-pointer hover:underline'>
            {flight.pricingOptions.length - 1} more booking option
            {flight.pricingOptions.length > 2 ? 's' : ''}
          </summary>
          <div className='mt-3 space-y-2'>
            {flight.pricingOptions.slice(1, 4).map((option, index) => (
              <div
                key={index}
                className='flex justify-between items-center py-2 border-b border-google-border last:border-b-0'
              >
                <div className='flex items-center space-x-3'>
                  <div className='text-sm text-google-text'>
                    {option.agents[0].name}
                  </div>
                  <div className='flex items-center space-x-1'>
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.round(option.agents[0].rating?.value || 0)
                            ? 'text-yellow-400'
                            : 'text-google-border'
                        }`}
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    ))}
                    <span className='text-xs text-google-text-secondary ml-1'>
                      {option.agents[0].rating?.value?.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='text-sm font-medium text-google-text'>
                    {formatPrice(option.totalPrice)}
                  </div>
                  <button
                    onClick={() => window.open(option.agents[0].url, '_blank')}
                    className='text-google-blue hover:bg-google-light-grey px-3 py-1 rounded text-sm'
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
            {flight.pricingOptions.length > 4 && (
              <div className='text-center py-2'>
                <button className='text-google-blue text-sm hover:underline'>
                  Show {flight.pricingOptions.length - 4} more options
                </button>
              </div>
            )}
          </div>
        </details>
      )}
    </div>
  )
}

export default FlightCard
