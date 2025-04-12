import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, parseISO, subDays } from 'date-fns';
import PageWrapper from '../../components/pageWrapper';

interface Report {
  reportId: number;
  adminId: number | null;
  userId: number | null;
  adminName: string | null;
  adminRole: string | null;
  userName: string | null;
  userUsername: string | null;
  reportType: string;
  generatedDate: string;
  data: {
    action?: string;
    details?: any;
    [key: string]: any;
  };
}

interface ReportSummary {
  totalReports: number;
  reportsByType: Record<string, number>;
  adminActions: Record<string, number>;
  userActions: Record<string, number>;
  topAdmins: Array<{name: string; count: number}>;
  period: {
    startDate: string;
    endDate: string;
  };
}

export const ReportsDashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  
  // Filter states
  const [reportTypes, setReportTypes] = useState<string[]>([]);
  const [selectedReportTypes, setSelectedReportTypes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>(
    format(subDays(new Date(), 30), 'yyyy-MM-dd')
  );
  const [endDate, setEndDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reportsPerPage] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'list' | 'summary'>('list');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Authentication required');
          return;
        }

        // Fetch reports
        const reportsResponse = await axios.get('http://localhost:5000/api/reports', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            startDate,
            endDate,
            reportType: selectedReportTypes.length > 0 ? selectedReportTypes.join(',') : undefined
          }
        });

        // Fetch summary
        const summaryResponse = await axios.get('http://localhost:5000/api/reports/summary', {
          headers: { Authorization: `Bearer ${token}` },
          params: { startDate, endDate }
        });

        setReports(reportsResponse.data);
        setSummary(summaryResponse.data);
        
        // Extract unique report types
        const types: string[] = Array.from(
          new Set(reportsResponse.data.map((report: Report) => report.reportType))
        );
        setReportTypes(types);
      } catch (err: any) {
        console.error("Error fetching reports:", err);
        setError(err.response?.data?.message || 'Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, selectedReportTypes]);

  const fetchReportById = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required');
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSelectedReport(response.data);
    } catch (err: any) {
      console.error(`Error fetching report ${id}:`, err);
      setError(err.response?.data?.message || 'Failed to fetch report details');
    }
  };

  const handleReportTypeToggle = (type: string) => {
    setSelectedReportTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Pagination logic
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(reports.length / reportsPerPage);

  const formatDateTime = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, yyyy h:mm a');
  };
  
  // Helper function to render data values based on type
  const renderDataValue = (value: any) => {
    if (value === null || value === undefined) {
      return <span className="text-gray-500">None</span>;
    }
    
    if (typeof value === 'boolean') {
      return value ? 
        <span className="text-green-400">Yes</span> : 
        <span className="text-red-400">No</span>;
    }
    
    if (typeof value === 'number') {
      return <span className="font-mono">{value}</span>;
    }
    
    if (typeof value === 'string') {
      // Check if it's a date string
      const dateCheck = new Date(value);
      if (!isNaN(dateCheck.getTime()) && value.includes('-') && value.length > 8) {
        try {
          return <span>{formatDateTime(value)}</span>;
        } catch {
          return <span>{value}</span>;
        }
      }
      
      return <span>{value}</span>;
    }
    
    return JSON.stringify(value);
  };
  
  // Function to recursively render nested objects
  const renderDataObject = (data: any, level = 0) => {
    if (!data || typeof data !== 'object') {
      return renderDataValue(data);
    }
    
    return (
      <div className={`${level > 0 ? 'pl-4 border-l border-gray-700' : ''}`}>
        {Object.entries(data).map(([key, value]) => {
          // Skip rendering if value is undefined or null
          if (value === undefined || value === null) return null;
          
          // Handle arrays
          if (Array.isArray(value)) {
            return (
              <div key={key} className="py-2">
                <div className="text-gray-400 text-sm mb-1">{key}</div>
                {value.length === 0 ? (
                  <span className="text-gray-500">Empty array</span>
                ) : (
                  <div className="space-y-2">
                    {value.map((item, idx) => (
                      <div key={idx} className="bg-gray-800 p-2 rounded">
                        {typeof item === 'object' ? 
                          renderDataObject(item, level + 1) : 
                          renderDataValue(item)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          
          // Handle nested objects
          if (typeof value === 'object') {
            return (
              <div key={key} className="py-2">
                <div className="text-gray-400 text-sm mb-1">{key}</div>
                <div className="bg-gray-800 p-2 rounded">
                  {renderDataObject(value, level + 1)}
                </div>
              </div>
            );
          }
          
          // Handle primitive values
          return (
            <div key={key} className="py-2 flex justify-between">
              <span className="text-gray-400">{key}</span>
              <span className="font-medium">{renderDataValue(value)}</span>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading && !reports.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6">
        <div className="w-full flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (error && !reports.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6">
        <div className="bg-red-500/20 text-red-300 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
  <PageWrapper>

    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto py-16">
        {/* <h1 className="text-3xl font-bold mb-8">Reports Dashboard</h1> */}

        {/* Filters */}
        <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          {/* Report Types Filter */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Report Types</label>
            <div className="flex flex-wrap gap-2">
              {reportTypes.map(type => (
                <button
                  key={type}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedReportTypes.includes(type) 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-700 text-gray-300'
                  }`}
                  onClick={() => handleReportTypeToggle(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === 'list' 
                ? 'border-b-2 border-green-500 text-green-500' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('list')}
          >
            Report List
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === 'summary' 
                ? 'border-b-2 border-green-500 text-green-500' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
        </div>

        {/* List Tab */}
        {activeTab === 'list' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reports List */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Reports List</h2>
                
                {reports.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No reports found for the selected filters
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Admin/User
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {currentReports.map((report) => (
                            <tr 
                              key={report.reportId} 
                              className="hover:bg-gray-700/50 cursor-pointer"
                              onClick={() => fetchReportById(report.reportId)}
                            >
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                {report.reportId}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs rounded-full bg-gray-700">
                                  {report.reportType}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                {report.adminName ? (
                                  <span className="text-blue-400">{report.adminName}</span>
                                ) : report.userName ? (
                                  <span className="text-purple-400">{report.userName}</span>
                                ) : (
                                  <span className="text-gray-500">System</span>
                                )}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                                {formatDateTime(report.generatedDate)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                {report.data.action || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-6">
                        <nav className="flex items-center space-x-2">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 disabled:bg-gray-800 disabled:text-gray-500"
                          >
                            Previous
                          </button>
                          
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-1 rounded-md ${
                                currentPage === page
                                  ? 'bg-green-600 text-white'
                                  : 'bg-gray-700 text-gray-300'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 disabled:bg-gray-800 disabled:text-gray-500"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Report Details */}
            <div>
              <div className="bg-gray-800/50 rounded-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Report Details</h2>
                
                {selectedReport ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Report ID</span>
                      <span className="font-mono bg-gray-700/50 px-2 py-1 rounded">{selectedReport.reportId}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-400 block mb-1">Type</span>
                      <span className="inline-block px-3 py-1 bg-gray-700 rounded-full text-sm">
                        {selectedReport.reportType}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-gray-400 block mb-1">Date</span>
                      <span>{formatDateTime(selectedReport.generatedDate)}</span>
                    </div>
                    
                    {selectedReport.adminName && (
                      <div>
                        <span className="text-gray-400 block mb-1">Admin</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{selectedReport.adminName}</span>
                          {selectedReport.adminRole && (
                            <span className="bg-blue-900/30 px-2 py-0.5 text-xs rounded-full">
                              {selectedReport.adminRole}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {selectedReport.userName && (
                      <div>
                        <span className="text-gray-400 block mb-1">User</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{selectedReport.userName}</span>
                          {selectedReport.userUsername && (
                            <span className="text-gray-400 text-sm">@{selectedReport.userUsername}</span>
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-gray-400 block mb-2">Data</span>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-80">
                        {/* Beautiful data display instead of raw JSON */}
                        <div className="space-y-3">
                          {renderDataObject(selectedReport.data)}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    Select a report to view details
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Summary Tab */}
        {activeTab === 'summary' && summary && (
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Summary Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Total Reports</p>
                <p className="text-2xl font-bold">{summary.totalReports}</p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Date Range</p>
                <p className="text-sm">
                  {format(new Date(summary.period.startDate), 'MMM d, yyyy')} - {' '}
                  {format(new Date(summary.period.endDate), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Report Types */}
              <div>
                <h3 className="text-lg font-medium mb-4">Report Types</h3>
                <div className="space-y-2">
                  {Object.entries(summary.reportsByType).map(([type, count], index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg">
                      <span className="text-gray-300">{type}</span>
                      <span className="bg-gray-600 px-2 py-1 rounded-full text-sm">
                        {count} reports
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Top Admins */}
              <div>
                <h3 className="text-lg font-medium mb-4">Top Admins</h3>
                <div className="space-y-2">
                  {summary.topAdmins.map((admin, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg">
                      <span className="text-gray-300">{admin.name || 'Unknown'}</span>
                      <span className="bg-green-900/30 px-2 py-1 rounded-full text-sm">
                        {admin.count} reports
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Admin Actions */}
              {Object.keys(summary.adminActions).length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Admin Actions</h3>
                  <div className="space-y-2">
                    {Object.entries(summary.adminActions).map(([action, count], index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg">
                        <span className="text-gray-300">{action}</span>
                        <span className="bg-blue-900/30 px-2 py-1 rounded-full text-sm">
                          {count} times
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* User Actions */}
              {Object.keys(summary.userActions).length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">User Actions</h3>
                  <div className="space-y-2">
                    {Object.entries(summary.userActions).map(([action, count], index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg">
                        <span className="text-gray-300">{action}</span>
                        <span className="bg-purple-900/30 px-2 py-1 rounded-full text-sm">
                          {count} times
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </PageWrapper>
  );
};

export default ReportsDashboard;