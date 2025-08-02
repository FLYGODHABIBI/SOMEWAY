import React, { useState } from 'react';
import { Check, Vote, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Candidate } from '../types';
import { getPositions, getCandidatesByPosition } from '../utils/mockData';
import { useAuth } from '../hooks/useAuth';

const VotePage: React.FC = () => {
  const { user } = useAuth();
  const [selectedCandidates, setSelectedCandidates] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(user?.hasVoted || false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const positions = getPositions();

  const handleCandidateSelect = (position: string, candidateId: string) => {
    setSelectedCandidates(prev => ({
      ...prev,
      [position]: candidateId
    }));
  };

  const handleSubmitVote = async () => {
    if (Object.keys(selectedCandidates).length === 0) {
      alert('Please select at least one candidate before submitting your vote.');
      return;
    }

    setShowConfirmation(true);
  };

  const confirmVote = async () => {
    setIsSubmitting(true);
    setShowConfirmation(false);

    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 3000));

    setHasVoted(true);
    setIsSubmitting(false);
  };

  const CandidateCard: React.FC<{ 
    candidate: Candidate; 
    position: string;
    isSelected: boolean;
    onSelect: () => void;
  }> = ({ candidate, position, isSelected, onSelect }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-primary-500 bg-primary-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={candidate.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&size=400&background=random`}
            alt={candidate.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {isSelected && (
            <div className="absolute -top-2 -right-2 bg-primary-500 rounded-full p-1">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
          {candidate.party && (
            <p className="text-sm text-primary-600 font-medium">{candidate.party}</p>
          )}
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{candidate.description}</p>
        </div>

        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isSelected ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
        }`}>
          {isSelected && <Check className="h-4 w-4 text-white" />}
        </div>
      </div>
    </motion.div>
  );

  const ConfirmationModal: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <h3 className="text-lg font-semibold mb-4">Confirm Your Vote</h3>
        <p className="text-gray-600 mb-4">
          Please review your selections. Once submitted, your vote cannot be changed.
        </p>
        
        <div className="space-y-3 mb-6">
          {Object.entries(selectedCandidates).map(([position, candidateId]) => {
            const candidate = getCandidatesByPosition(position).find(c => c.id === candidateId);
            return (
              <div key={position} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{position}</p>
                  <p className="text-sm text-gray-600">{candidate?.name}</p>
                </div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
            );
          })}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setShowConfirmation(false)}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Review
          </button>
          <button
            onClick={confirmVote}
            className="flex-1 px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
          >
            Submit Vote
          </button>
        </div>
      </motion.div>
    </div>
  );

  const LoadingScreen: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-8 text-center"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold mb-2">Processing Your Vote</h3>
        <p className="text-gray-600">Submitting to blockchain...</p>
      </motion.div>
    </div>
  );

  const SuccessScreen: React.FC = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vote Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your vote has been successfully recorded on the blockchain. Thank you for participating in the election.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm font-medium text-gray-500 mb-2">Transaction Hash:</p>
            <p className="text-xs text-gray-700 font-mono break-all">
              0x7d4a2e5f8b9c1a3d6e7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d
            </p>
          </div>
          <p className="text-sm text-gray-500">
            You can view live results on the results page.
          </p>
        </div>
      </motion.div>
    </div>
  );

  if (hasVoted) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cast Your Vote</h1>
          <p className="text-gray-600">
            Select your candidates for the Student Government Elections 2024
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Important</h3>
              <p className="text-sm text-yellow-700 mt-1">
                You can vote for one candidate per position. Once submitted, your vote cannot be changed.
                All votes are secured using blockchain technology.
              </p>
            </div>
          </div>
        </div>

        {/* Voting Sections */}
        <div className="space-y-8">
          {positions.map(position => {
            const candidates = getCandidatesByPosition(position);
            const selectedCandidate = selectedCandidates[position];

            return (
              <div key={position} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{position}</h2>
                <div className="space-y-4">
                  {candidates.map(candidate => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      position={position}
                      isSelected={selectedCandidate === candidate.id}
                      onSelect={() => handleCandidateSelect(position, candidate.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmitVote}
            disabled={Object.keys(selectedCandidates).length === 0}
            className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Vote className="h-5 w-5" />
            <span>Submit My Vote</span>
            <Lock className="h-4 w-4" />
          </button>
        </div>

        {/* Selection Summary */}
        {Object.keys(selectedCandidates).length > 0 && (
          <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-4">
            <h3 className="font-medium text-primary-900 mb-3">Your Selections:</h3>
            <div className="space-y-2">
              {Object.entries(selectedCandidates).map(([position, candidateId]) => {
                const candidate = getCandidatesByPosition(position).find(c => c.id === candidateId);
                return (
                  <div key={position} className="flex justify-between items-center">
                    <span className="text-primary-800">{position}:</span>
                    <span className="font-medium text-primary-900">{candidate?.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showConfirmation && <ConfirmationModal />}
      {isSubmitting && <LoadingScreen />}
    </div>
  );
};

export default VotePage;