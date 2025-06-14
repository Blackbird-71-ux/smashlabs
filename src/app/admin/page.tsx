'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Booking {
  _id: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  packageType: string;
  packageName: string;
  packagePrice: number;
  preferredDate: string;
  preferredTime: string;
  duration: number;
  participants: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

interface BookingResponse {
  success: boolean;
  data: {
    bookings: Booking[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);

  const fetchBookings = async (page = 1) => {
    try {
      setLoading(true);
      console.log('🔍 Fetching bookings from admin dashboard...');
      
      const response = await fetch(
        `https://smashlabs-backend-production.up.railway.app/api/bookings?page=${page}&limit=10`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', errorText);
        throw new Error(`Failed to fetch bookings: ${response.status}`);
      }

      const data: BookingResponse = await response.json();
      console.log('📊 Bookings data:', data);
      
      if (data.success) {
        setBookings(data.data.bookings);
        setCurrentPage(data.data.pagination.currentPage);
        setTotalPages(data.data.pagination.totalPages);
        setTotalBookings(data.data.pagination.totalItems);
      } else {
        throw new Error('Failed to load bookings');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => fetchBookings()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SmashLabs Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Total Bookings: <span className="font-semibold">{totalBookings}</span>
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-600">When customers make bookings, they will appear here.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {bookings.map((booking, index) => (
                <motion.li
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-6 py-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {booking.customerName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Booking ID: <span className="font-mono">{booking.bookingId}</span>
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Email:</span> {booking.customerEmail}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {booking.customerPhone}
                        </div>
                        <div>
                          <span className="font-medium">Package:</span> {booking.packageName}
                        </div>
                        <div>
                          <span className="font-medium">Price:</span> Rs {booking.packagePrice}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {new Date(booking.preferredDate).toLocaleDateString('en-IN')}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {booking.preferredTime}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {booking.duration} min
                        </div>
                        <div>
                          <span className="font-medium">Participants:</span> {booking.participants}
                        </div>
                      </div>
                      
                      {booking.specialRequests && (
                        <div className="mt-2">
                          <span className="font-medium text-sm text-gray-600">Special Requests:</span>
                          <p className="text-sm text-gray-600 mt-1">{booking.specialRequests}</p>
                        </div>
                      )}
                      
                      <div className="mt-2 text-xs text-gray-500">
                        Created: {formatDate(booking.createdAt)}
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="flex space-x-2">
              <button
                onClick={() => fetchBookings(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => fetchBookings(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => fetchBookings(currentPage)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Refresh Bookings
          </button>
        </div>
      </div>
    </div>
  );
} 