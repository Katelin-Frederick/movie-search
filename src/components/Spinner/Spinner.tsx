const Spinner = () => (
  <div className='w-full h-full flex flex-col items-center justify-center space-y-4 min-h-screen'>
    <div className='w-8 h-8 border-4 border-t-yellow-500 border-gray-200 rounded-full animate-spin' />
    <span className='text-lg'>Loading...</span>
  </div>
)

export default Spinner