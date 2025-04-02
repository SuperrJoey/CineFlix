import React from 'react'
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem("Name");
  
  const handleMoviesClick = () => {
    navigate('/movies');
  }

  return (
    <div className='py-20 min-h-screen bg-gradient-to-br
        from-green-950 via-black to-black'>
      <div className='max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8'>
        <div className='flex flex-col'>
          <h1 className='text-4xl font-extrabold text-gray-900 mb-2'>
          Welcome, {userName}
          </h1>
          <p className='text-lg text-gray-600 mt-3'>
            Book your favorite movies and seats.
          </p>
          <div>
            <button
             onClick={handleMoviesClick}
             className='mt-5 bg-gray-800 hover:bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105'
            >
              <div>
                <span>
                  🎥
                </span>
              </div>
              <p className='text-white mt-2'>
                See available movies and book tickets.
              </p>
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard