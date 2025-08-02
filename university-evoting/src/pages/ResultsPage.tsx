import React, { useState } from 'react';
import { BarChart3, PieChart, Trophy, Users, TrendingUp, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockCandidates, getPositions, getCandidatesByPosition } from '../utils/mockData';

const ResultsPage: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState('all');
  const positions = getPositions();
  
  const totalVotes = mockCandidates.reduce((sum, candidate) => sum + candidate.votes, 0);
  
  const getFilteredCandidates = () => {
    if (selectedPosition === 'all') {
      return mockCandidates;
    }
    return getCandidatesByPosition(selectedPosition);
  };

  const getWinnerByPosition = (position: string) => {
    const candidates = getCandidatesByPosition(position);
    return candidates.reduce((winner, candidate) => 
      candidate.votes > (winner?.votes || 0) ? candidate : winner
    );
  };

  const ProgressBar: React.FC<{ 
    percentage: number; 
    color: string; 
    animate?: boolean;
  }> = ({ percentage, color, animate = true }) => (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <motion.div
        className={`h-3 rounded-full ${color}`}
        initial={animate ? { width: 0 } : undefined}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );

  const CandidateResultCard: React.FC<{ 
    candidate: any; 
    isWinner?: boolean; 
    totalVotes: number;
  }> = ({ candidate, isWinner, totalVotes }) => {
    const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow ${
          isWinner ? 'ring-2 ring-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50' : ''
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={candidate.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&size=400&background=random`}
              alt={candidate.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {isWinner && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                <Trophy className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center">
                  {candidate.name}
                  {isWinner && <span className="ml-2 text-yellow-600 text-sm">Winner</span>}
                </h3>
                <p className="text-sm text-gray-600">{candidate.position}</p>
                {candidate.party && (
                  <p className="text-sm text-primary-600 font-medium">{candidate.party}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{candidate.votes}</p>
                <p className="text-sm text-gray-500">{percentage.toFixed(1)}%</p>
              </div>
            </div>
            
            <ProgressBar 
              percentage={percentage} 
              color={isWinner ? "bg-yellow-500" : "bg-primary-500"} 
            />
          </div>
        </div>
      </motion.div>
    );
  };

  const PositionWinners: React.FC = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
        Position Winners
      </h3>
      <div className="space-y-4">
        {positions.map(position => {
          const winner = getWinnerByPosition(position);
          if (!winner) return null;
          
          return (
            <div key={position} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{position}</p>
                <p className="text-sm text-gray-600">{winner.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-600">{winner.votes} votes</p>
                <p className="text-sm text-gray-500">
                  {((winner.votes / getCandidatesByPosition(position).reduce((sum, c) => sum + c.votes, 0)) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const filteredCandidates = getFilteredCandidates();
  const filteredTotalVotes = filteredCandidates.reduce((sum, candidate) => sum + candidate.votes, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Election Results</h1>
          <p className="text-gray-600">Live results from the Student Government Elections 2024</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Users className="h-10 w-10 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Votes</p>
                <p className="text-2xl font-bold text-gray-900">{totalVotes}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Users className="h-10 w-10 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{mockCandidates.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <TrendingUp className="h-10 w-10 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Positions</p>
                <p className="text-2xl font-bold text-gray-900">{positions.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Trophy className="h-10 w-10 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Turnout</p>
                <p className="text-2xl font-bold text-gray-900">76.3%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Vote Results</h2>
                <div className="flex space-x-4">
                  <select
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Positions</option>
                    {positions.map(position => (
                      <option key={position} value={position}>{position}</option>
                    ))}
                  </select>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredCandidates
                  .sort((a, b) => b.votes - a.votes)
                  .map((candidate, index) => {
                    const isWinner = selectedPosition !== 'all' ? 
                      index === 0 : 
                      candidate === getWinnerByPosition(candidate.position);
                    
                    return (
                      <CandidateResultCard
                        key={candidate.id}
                        candidate={candidate}
                        isWinner={isWinner}
                        totalVotes={selectedPosition === 'all' ? 
                          getCandidatesByPosition(candidate.position).reduce((sum, c) => sum + c.votes, 0) :
                          filteredTotalVotes
                        }
                      />
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PositionWinners />
            
            {/* Election Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Election Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Started:</span>
                  <span className="font-medium">Mar 15, 08:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ends:</span>
                  <span className="font-medium">Mar 17, 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Update:</span>
                  <span className="font-medium">Just now</span>
                </div>
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Blockchain Verification</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">All votes verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Blockchain synced</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Results immutable</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Block Hash: 0x7d4a...f9c2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;