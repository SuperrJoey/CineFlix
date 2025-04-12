import { useState, useEffect } from 'react';
import axios from 'axios';

// Staff interface based on backend response structure
interface Staff {
  UserID: number;
  Username: string;
  Name: string;
  Role: string;
}

// Schedule interface based on backend response
interface Schedule {
  reportId: number;
  adminId: number;
  adminName: string;
  adminRole: string;
  generatedDate: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  notes: string;
}

// Work area options for staff permissions
const WORK_AREAS = [
  { id: 'movies', label: 'Movies' },
  { id: 'seats', label: 'Seats' },
  { id: 'staff', label: 'Staff Management' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'customer', label: 'Customer Service' },
  { id: 'reports', label: 'Reports' }
];

const Staff = () => {
  // State management
  const [staff, setStaff] = useState<Staff[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'view' | 'add' | 'schedule' | 'view-schedules'>('view');
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  
  // Form states
  const [newStaff, setNewStaff] = useState({
    username: '',
    name: '',
    password: '',
    adminRole: 'staff',
    workAreas: [] as string[]
  });
  
  const [schedule, setSchedule] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    staffIds: [] as number[],
    notes: ''
  });
  
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch all staff on component mount
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/staff', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStaff(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching staff:', err);
      setError('Failed to load staff data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch schedules for a specific staff member
  const fetchStaffSchedules = async (staffId: number) => {
    if (!staffId) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/staff/${staffId}/schedules`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchedules(response.data);
      setSelectedStaff(staffId);
      setError(null);
    } catch (err) {
      console.error('Error fetching schedules:', err);
      setError('Failed to load schedules. Please try again.');
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    // If timeString is in HH:MM format, convert to proper time string
    if (timeString.length === 5) {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
    
    // If it's already a full date string
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Handle form input change for adding new staff
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewStaff({
      ...newStaff,
      [name]: value
    });
  };

  // Handle checkbox changes for work areas
  const handleWorkAreaChange = (areaId: string) => {
    setNewStaff(prev => {
      const updatedAreas = prev.workAreas.includes(areaId)
        ? prev.workAreas.filter(id => id !== areaId)
        : [...prev.workAreas, areaId];
      
      return {
        ...prev,
        workAreas: updatedAreas
      };
    });
  };

  // Handle form input change for scheduling
  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value
    });
  };

  // Handle staff selection for scheduling
  const handleStaffSelection = (staffId: number) => {
    setSchedule(prev => {
      const updatedStaffIds = prev.staffIds.includes(staffId)
        ? prev.staffIds.filter(id => id !== staffId)
        : [...prev.staffIds, staffId];
      
      return {
        ...prev,
        staffIds: updatedStaffIds
      };
    });
  };

  // Submit new staff form
  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/staff',
        newStaff,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Reset form and show success message
      setNewStaff({
        username: '',
        name: '',
        password: '',
        adminRole: 'staff',
        workAreas: []
      });
      
      setSuccessMessage('Staff member added successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      // Refresh staff list
      fetchStaff();
      setSelectedTab('view');
    } catch (err: any) {
      console.error('Error adding staff:', err);
      setError(err.response?.data?.message || 'Failed to add staff member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Submit schedule form
  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (schedule.staffIds.length === 0) {
      setError('Please select at least one staff member for the schedule.');
      return;
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/staff/schedules',
        schedule,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Reset form and show success message
      setSchedule({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        staffIds: [],
        notes: ''
      });
      
      setSuccessMessage('Work schedule created successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      setSelectedTab('view');
    } catch (err: any) {
      console.error('Error creating schedule:', err);
      setError(err.response?.data?.message || 'Failed to create schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle view schedules for specific staff
  const handleViewSchedules = (staffId: number) => {
    fetchStaffSchedules(staffId);
    setSelectedTab('view-schedules');
  };

  // Tab component for navigation
  const TabNavigation = () => (
    <div className="mb-6 flex border-b border-gray-700 overflow-x-auto">
      <button
        className={`py-3 px-6 whitespace-nowrap ${selectedTab === 'view' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400 hover:text-gray-300'}`}
        onClick={() => setSelectedTab('view')}
      >
        View Staff
      </button>
      <button
        className={`py-3 px-6 whitespace-nowrap ${selectedTab === 'add' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400 hover:text-gray-300'}`}
        onClick={() => setSelectedTab('add')}
      >
        Add Staff
      </button>
      <button
        className={`py-3 px-6 whitespace-nowrap ${selectedTab === 'schedule' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400 hover:text-gray-300'}`}
        onClick={() => setSelectedTab('schedule')}
      >
        Create Schedule
      </button>
      <button
        className={`py-3 px-6 whitespace-nowrap ${selectedTab === 'view-schedules' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400 hover:text-gray-300'}`}
        onClick={() => {
          if (staff.length > 0 && !selectedStaff) {
            fetchStaffSchedules(staff[0].UserID);
          } else if (selectedStaff) {
            fetchStaffSchedules(selectedStaff);
          }
          setSelectedTab('view-schedules');
        }}
      >
        View Schedules
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-black py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-transparent rounded-2xl shadow-lg p-8 border border-[#6A7077]">
          <h1 className="text-4xl font-extrabold text-gray-300 mb-2">
            Staff Management
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            Manage staff members, their roles, and work schedules
          </p>

          {/* Status messages */}
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-100 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-900/50 border border-green-500 text-green-100 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          {/* Tab navigation */}
          <TabNavigation />

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          )}

          {/* View Staff Tab */}
          {!loading && selectedTab === 'view' && (
            <div className="overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-black/40 text-left">
                    <th className="px-4 py-3 text-gray-300">ID</th>
                    <th className="px-4 py-3 text-gray-300">Name</th>
                    <th className="px-4 py-3 text-gray-300">Username</th>
                    <th className="px-4 py-3 text-gray-300">Role</th>
                    <th className="px-4 py-3 text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.length > 0 ? (
                    staff.map((member) => (
                      <tr key={member.UserID} className="border-b border-gray-800 hover:bg-black/20">
                        <td className="px-4 py-3 text-gray-300">{member.UserID}</td>
                        <td className="px-4 py-3 text-white font-medium">{member.Name}</td>
                        <td className="px-4 py-3 text-gray-300">{member.Username}</td>
                        <td className="px-4 py-3 text-gray-300">{member.Role}</td>
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => handleViewSchedules(member.UserID)}
                            className="text-green-500 hover:text-green-400 transition-colors"
                          >
                            View Schedules
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-gray-400 text-center">
                        No staff members found. Add staff to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Staff Tab */}
          {!loading && selectedTab === 'add' && (
            <form onSubmit={handleAddStaff} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newStaff.name}
                    onChange={handleInputChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={newStaff.username}
                    onChange={handleInputChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newStaff.password}
                    onChange={handleInputChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="adminRole">
                    Admin Role
                  </label>
                  <select
                    id="adminRole"
                    name="adminRole"
                    value={newStaff.adminRole}
                    onChange={handleInputChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                  >
                    <option value="staff">Staff</option>
                    <option value="junior_manager">Junior Manager</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-3">
                  Work Areas (Permissions)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {WORK_AREAS.map(area => (
                    <div key={area.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`area-${area.id}`}
                        checked={newStaff.workAreas.includes(area.id)}
                        onChange={() => handleWorkAreaChange(area.id)}
                        className="mr-2 h-5 w-5 text-green-500 bg-black/30 border-gray-700 rounded focus:ring-0"
                      />
                      <label htmlFor={`area-${area.id}`} className="text-gray-300">
                        {area.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                >
                  Add Staff Member
                </button>
              </div>
            </form>
          )}

          {/* Create Schedule Tab */}
          {!loading && selectedTab === 'schedule' && (
            <form onSubmit={handleCreateSchedule} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="title">
                    Schedule Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={schedule.title}
                    onChange={handleScheduleChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    placeholder="e.g. Weekend Shift"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="date">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={schedule.date}
                    onChange={handleScheduleChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="startTime">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={schedule.startTime}
                    onChange={handleScheduleChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="endTime">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={schedule.endTime}
                    onChange={handleScheduleChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="notes">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={schedule.notes}
                  onChange={handleScheduleChange}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 h-24"
                  placeholder="Add any additional information or instructions"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-3">
                  Select Staff for this Schedule
                </label>
                <div className="border border-gray-700 rounded-lg bg-black/30 p-4 max-h-60 overflow-y-auto">
                  {staff.length > 0 ? (
                    staff.map((member) => (
                      <div key={member.UserID} className="mb-2 flex items-center">
                        <input
                          type="checkbox"
                          id={`staff-${member.UserID}`}
                          checked={schedule.staffIds.includes(member.UserID)}
                          onChange={() => handleStaffSelection(member.UserID)}
                          className="mr-3 h-5 w-5 text-green-500 bg-black/30 border-gray-700 rounded focus:ring-0"
                        />
                        <label htmlFor={`staff-${member.UserID}`} className="text-white">
                          {member.Name} ({member.Role})
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">
                      No staff members available. Please add staff first.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                  disabled={schedule.staffIds.length === 0}
                >
                  Create Work Schedule
                </button>
              </div>
            </form>
          )}
          
          {/* View Schedules Tab */}
          {!loading && selectedTab === 'view-schedules' && (
            <div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Select Staff Member</label>
                <select
                  value={selectedStaff || ''}
                  onChange={(e) => fetchStaffSchedules(Number(e.target.value))}
                  className="w-full md:w-1/2 bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                >
                  <option value="">Select staff member</option>
                  {staff.map((member) => (
                    <option key={member.UserID} value={member.UserID}>
                      {member.Name} ({member.Username})
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedStaff ? (
                schedules.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">
                      Schedule for {staff.find(s => s.UserID === selectedStaff)?.Name || 'Selected Staff'}
                    </h3>
                    
                    <div className="overflow-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-black/40 text-left">
                            <th className="px-4 py-3 text-gray-300">Title</th>
                            <th className="px-4 py-3 text-gray-300">Date</th>
                            <th className="px-4 py-3 text-gray-300">Time</th>
                            <th className="px-4 py-3 text-gray-300">Created By</th>
                            <th className="px-4 py-3 text-gray-300">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schedules.map((schedule) => (
                            <tr key={schedule.reportId} className="border-b border-gray-800 hover:bg-black/20">
                              <td className="px-4 py-3 text-white font-medium">{schedule.title}</td>
                              <td className="px-4 py-3 text-gray-300">{formatDate(schedule.date)}</td>
                              <td className="px-4 py-3 text-gray-300">
                                {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                              </td>
                              <td className="px-4 py-3 text-gray-300">{schedule.adminName}</td>
                              <td className="px-4 py-3 text-gray-300">
                                {schedule.notes ? schedule.notes : "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-black/20 rounded-lg p-8 text-center">
                    <p className="text-gray-300 text-lg">No schedules found for this staff member.</p>
                    <button
                      onClick={() => setSelectedTab('schedule')}
                      className="mt-4 text-green-500 hover:text-green-400"
                    >
                      Create a new schedule
                    </button>
                  </div>
                )
              ) : (
                <div className="bg-black/20 rounded-lg p-8 text-center">
                  <p className="text-gray-300 text-lg">Please select a staff member to view their schedules.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Staff;