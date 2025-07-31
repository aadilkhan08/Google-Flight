const Loader = () => {
  return (
    <div className='bg-white rounded-lg border border-google-border p-12 text-center'>
      <div className='inline-block'>
        <div className='w-8 h-8 border-4 border-google-border border-t-google-blue rounded-full animate-spin mx-auto mb-4'></div>
      </div>
      <p className='text-google-text-secondary'>Finding flights...</p>
    </div>
  )
}

export default Loader
