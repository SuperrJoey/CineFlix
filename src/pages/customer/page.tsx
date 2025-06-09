import { useEffect, useState } from 'react';
import axios from 'axios';

interface Customer {
  UserID: number;
  username: string;
  name: string;
  role: string;
  createdAt: string;
  totalBookings: number;
}

interface CustomerDetails extends Customer {
  bookings: Booking[];
}

interface Booking {
  BookingID: number;
  ShowtimeID: number;
  BookingDate: string;
  AvailabilityStatus: string;
  movieTitle: string;
  Genre: string;
  StartTime: string;
  ScreenID: number;
  seatCount: number;
}

const Customer = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/customers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setCustomers(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching customers:', err);
        setError(err.response?.data?.message || 'Failed to fetch customers');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerClick = async (customerId: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`http://localhost:5000/api/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSelectedCustomer(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching customer details:', err);
      setError(err.response?.data?.message || 'Failed to fetch customer details');
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-green-950 via-black to-black flex items-center justify-center'>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-green-950 via-black to-black flex items-center justify-center'>
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-950 via-black to-black p-8'>
      <div className="max-w-7xl mx-auto py-10">
        {/* <h1 className="text-3xl font-bold text-white mb-6">Customer Management</h1> */}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer List */}
          <div className="lg:col-span-1 bg-black bg-opacity-50 rounded-lg border border-gray-800 p-4">
            <h2 className="text-xl font-semibold text-white mb-4">Customers</h2>
            
            {customers.length === 0 ? (
              <p className="text-gray-400">No customers found</p>
            ) : (
              <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
                {customers.map(customer => (
                  <div 
                    key={customer.UserID}
                    onClick={() => handleCustomerClick(customer.UserID)}
                    className="bg-gray-900 hover:bg-gray-800 rounded-md p-3 cursor-pointer transition duration-200"
                  >
                    <h3 className="text-white font-medium">{customer.name}</h3>
                    <p className="text-gray-400 text-sm">@{customer.username}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="bg-green-900 text-green-200 text-xs px-2 py-1 rounded-full">
                        {customer.totalBookings} booking(s)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Customer Details */}
          <div className="lg:col-span-2 bg-black bg-opacity-50 rounded-lg border border-gray-800 p-4">
            {!selectedCustomer ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <span className="text-5xl mb-4">👥</span>
                <h2 className="text-xl font-semibold text-white">Select a customer to view details</h2>
                <p className="text-gray-400 mt-2">Customer booking history and information will appear here</p>
              </div>
            ) : (
              <div>
                <div className="border-b border-gray-700 pb-4 mb-4">
                  <h2 className="text-2xl font-bold text-white">{selectedCustomer.name}</h2>
                  <p className="text-gray-400">@{selectedCustomer.username}</p>
                  <div className="flex gap-4 mt-3">
                    <div className="bg-gray-900 px-3 py-1 rounded-full text-sm text-gray-300">
                      {selectedCustomer.bookings.length} bookings
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">Booking History</h3>
                
                {selectedCustomer.bookings.length === 0 ? (
                  <p className="text-gray-400">No booking history found</p>
                ) : (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {selectedCustomer.bookings.map(booking => (
                      <div key={booking.BookingID} className="bg-gray-900 rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-medium text-white">{booking.movieTitle}</h4>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            booking.AvailabilityStatus === 'confirmed' 
                              ? 'bg-green-900 text-green-200' 
                              : 'bg-red-900 text-red-200'
                          }`}>
                            {booking.AvailabilityStatus}
                          </span>
                        </div>
                        
                        <p className="text-gray-400 mt-1">{booking.Genre}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                          <div>
                            <p className="text-gray-500">Booking Date</p>
                            <p className="text-gray-300">{formatDate(booking.BookingDate)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Show Time</p>
                            <p className="text-gray-300">{formatDate(booking.StartTime)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Screen</p>
                            <p className="text-gray-300">Screen {booking.ScreenID}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Seats</p>
                            <p className="text-gray-300">{booking.seatCount} seat(s)</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;