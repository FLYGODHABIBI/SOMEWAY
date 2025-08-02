import { Candidate, Election } from '../types';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Student Body President',
    party: 'Progressive Student Alliance',
    description: 'Experienced student leader with a focus on mental health initiatives and campus sustainability.',
    votes: 342,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b796?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Student Body President',
    party: 'Unity Coalition',
    description: 'Computer Science major advocating for improved technology infrastructure and affordable textbooks.',
    votes: 289,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'Vice President',
    party: 'Progressive Student Alliance',
    description: 'Business major passionate about diversity, inclusion, and student financial support programs.',
    votes: 156,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'David Thompson',
    position: 'Vice President',
    party: 'Students First',
    description: 'Engineering student focused on improving campus facilities and academic resources.',
    votes: 134,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Jessica Park',
    position: 'Secretary',
    party: 'Independent',
    description: 'Communications major with experience in student journalism and campus event organization.',
    votes: 98,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Alex Kim',
    position: 'Treasurer',
    party: 'Fiscal Responsibility Club',
    description: 'Economics major committed to transparent financial management and student fee optimization.',
    votes: 87,
    image: 'https://images.unsplash.com/photo-1507038732509-8b1a2b229daa?w=400&h=400&fit=crop&crop=face'
  }
];

export const mockElection: Election = {
  id: 'election-2024',
  title: 'Student Government Elections 2024',
  description: 'Annual student government elections for academic year 2024-2025',
  startDate: new Date('2024-03-15T08:00:00'),
  endDate: new Date('2024-03-17T18:00:00'),
  status: 'active',
  candidates: mockCandidates,
  totalVotes: mockCandidates.reduce((total, candidate) => total + candidate.votes, 0)
};

export const getPositions = (): string[] => {
  return Array.from(new Set(mockCandidates.map(candidate => candidate.position)));
};

export const getCandidatesByPosition = (position: string): Candidate[] => {
  return mockCandidates.filter(candidate => candidate.position === position);
};