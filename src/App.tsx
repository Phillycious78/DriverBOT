import React, { useState } from 'react';
import { Truck, Clock, MapPin, AlertTriangle, User, Settings, LogOut } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedDriver?: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'admin'>('login');
  const [pin, setPin] = useState('');
  const [loggedInDriver, setLoggedInDriver] = useState<string>('');
  const [showSideMissions, setShowSideMissions] = useState(false);
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '1',
      title: 'Delivery to Downtown Office',
      location: '123 Main St, Downtown',
      priority: 'high',
      estimatedTime: '45 min',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Pickup from Warehouse',
      location: '456 Industrial Ave',
      priority: 'medium',
      estimatedTime: '30 min',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Client Meeting Transport',
      location: '789 Business Park',
      priority: 'low',
      estimatedTime: '60 min',
      status: 'pending'
    }
  ]);

  const handleLogin = () => {
    if (pin === '1234') {
      setLoggedInDriver('Driver #001');
      setCurrentView('dashboard');
    } else if (pin === '0000') {
      setCurrentView('admin');
    }
    setPin('');
  };

  const handleLogout = () => {
    setCurrentView('login');
    setLoggedInDriver('');
    setShowSideMissions(false);
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const clearPin = () => {
    setPin('');
  };

  const send5MinWarning = () => {
    alert('5-minute warning sent to all drivers!');
  };

  const assignMission = (missionId: string, driverName: string) => {
    setMissions(missions.map(mission => 
      mission.id === missionId 
        ? { ...mission, assignedDriver: driverName, status: 'in-progress' }
        : mission
    ));
  };

  const completeMission = (missionId: string) => {
    setMissions(missions.map(mission => 
      mission.id === missionId 
        ? { ...mission, status: 'completed' }
        : mission
    ));
  };

  const resetMission = (missionId: string) => {
    setMissions(missions.map(mission => 
      mission.id === missionId 
        ? { ...mission, status: 'pending', assignedDriver: undefined }
        : mission
    ));
  };

  const deleteMission = (missionId: string) => {
    setMissions(missions.filter(mission => mission.id !== missionId));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Truck className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Driver Portal</h1>
            <p className="text-gray-600">Enter your 4-digit PIN to continue</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-2">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full border-2 ${
                      index < pin.length ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handlePinInput(digit.toString())}
                  className="h-12 bg-gray-50 hover:bg-gray-100 rounded-lg font-semibold text-gray-700 transition-colors"
                >
                  {digit}
                </button>
              ))}
              <button
                onClick={clearPin}
                className="h-12 bg-red-50 hover:bg-red-100 rounded-lg font-semibold text-red-600 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => handlePinInput('0')}
                className="h-12 bg-gray-50 hover:bg-gray-100 rounded-lg font-semibold text-gray-700 transition-colors"
              >
                0
              </button>
              <button
                onClick={handleLogin}
                disabled={pin.length !== 4}
                className="h-12 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition-colors"
              >
                Enter
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Demo PINs:</p>
            <p>Driver: 1234 | Admin: 0000</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <header className="bg-white shadow-sm border-b border-green-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Truck className="w-8 h-8 text-green-600 mr-3" />
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={send5MinWarning}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  5 Min Warning
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Mission Overview</h2>
                <div className="space-y-4">
                  {missions.map((mission) => (
                    <div key={mission.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">{mission.title}</h3>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{mission.location}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(mission.priority)}`}>
                            {mission.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
                            {mission.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <span>Est. Time: {mission.estimatedTime}</span>
                        {mission.assignedDriver && (
                          <span>Assigned to: {mission.assignedDriver}</span>
                        )}
                      </div>

                      <div className="flex justify-end space-x-2">
                        {mission.status === 'pending' && (
                          <select
                            onChange={(e) => assignMission(mission.id, e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded text-sm"
                            defaultValue=""
                          >
                            <option value="" disabled>Assign Driver</option>
                            <option value="Driver #001">Driver #001</option>
                            <option value="Driver #002">Driver #002</option>
                            <option value="Driver #003">Driver #003</option>
                          </select>
                        )}
                        {mission.status === 'in-progress' && (
                          <button
                            onClick={() => completeMission(mission.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        {mission.status !== 'pending' && (
                          <button
                            onClick={() => resetMission(mission.id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            Reset
                          </button>
                        )}
                        <button
                          onClick={() => deleteMission(mission.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {missions.filter(m => m.status === 'pending').length}
                    </div>
                    <div className="text-sm text-blue-600">Pending Missions</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {missions.filter(m => m.status === 'in-progress').length}
                    </div>
                    <div className="text-sm text-yellow-600">In Progress</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {missions.filter(m => m.status === 'completed').length}
                    </div>
                    <div className="text-sm text-green-600">Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <header className="bg-white shadow-sm border-b border-green-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Truck className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Driver Dashboard</h1>
                  <p className="text-sm text-gray-600">{loggedInDriver}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowSideMissions(!showSideMissions)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Side Missions
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Current Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <User className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">Active</div>
                    <div className="text-sm text-green-600">Driver Status</div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">8.5h</div>
                    <div className="text-sm text-blue-600">Hours Today</div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg text-center">
                    <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-sm text-purple-600">Deliveries</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">My Assigned Missions</h2>
                <div className="space-y-4">
                  {missions.filter(m => m.assignedDriver === loggedInDriver).map((mission) => (
                    <div key={mission.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">{mission.title}</h3>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{mission.location}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(mission.priority)}`}>
                            {mission.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
                            {mission.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <span>Est. Time: {mission.estimatedTime}</span>
                      </div>

                      {mission.status === 'in-progress' && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => completeMission(mission.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Mark as Completed
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {missions.filter(m => m.assignedDriver === loggedInDriver).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No missions assigned yet</p>
                      <p className="text-sm">Check side missions for available tasks</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showSideMissions && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Side Missions</h3>
                  <div className="space-y-4">
                    {missions.filter(m => !m.assignedDriver || m.assignedDriver === loggedInDriver).map((mission) => (
                      <div key={mission.id} className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-800 text-sm mb-2">{mission.title}</h4>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="text-xs">{mission.location}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(mission.priority)}`}>
                            {mission.priority}
                          </span>
                          <span className="text-xs text-gray-500">{mission.estimatedTime}</span>
                        </div>
                        {!mission.assignedDriver && (
                          <button
                            onClick={() => assignMission(mission.id, loggedInDriver)}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Take Mission
                          </button>
                        )}
                        {mission.assignedDriver === loggedInDriver && mission.status === 'in-progress' && (
                          <button
                            onClick={() => completeMission(mission.id)}
                            className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Mark as Completed
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-800 text-sm mb-3">My Completed Tasks</h4>
                    <div className="space-y-2">
                      {missions.filter(m => m.status === 'completed' && m.assignedDriver === loggedInDriver).map((mission) => (
                        <div key={mission.id} className="bg-green-50 border border-green-200 rounded-lg p-2">
                          <div className="text-xs font-medium text-green-800">{mission.title}</div>
                          <div className="text-xs text-green-600">✓ Completed</div>
                        </div>
                      ))}
                      {missions.filter(m => m.status === 'completed' && m.assignedDriver === loggedInDriver).length === 0 && (
                        <div className="text-xs text-gray-500 text-center py-2">
                          No completed tasks yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;