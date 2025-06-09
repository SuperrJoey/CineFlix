import { useState } from 'react';
import axios from 'axios';

interface AddMovieDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddMovieDialog = ({ isOpen, onClose, onSuccess }: AddMovieDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    rating: '',
    duration: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('You must be logged in to add a movie');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/movies', 
        {
          title: formData.title,
          genre: formData.genre,
          rating: parseFloat(formData.rating),
          duration: parseInt(formData.duration)
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Success - movie created
      onSuccess();
      onClose();
      setFormData({ title: '', genre: '', rating: '', duration: '' });
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('You do not have permission to add movies. Admin access required.');
      } else {
        setError(error.response?.data?.message || 'Failed to add movie');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Movie</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-1">
              Rating (0-10)
            </label>
            <input
              type="number"
              id="rating"
              min="0"
              max="10"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              min="1"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Adding...' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 