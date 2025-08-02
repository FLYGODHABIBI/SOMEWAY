export interface User {
  id: string;
  email: string;
  name: string;
  role: 'voter' | 'admin';
  hasVoted?: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  position: string;
  party?: string;
  image?: string;
  description: string;
  votes: number;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'completed';
  candidates: Candidate[];
  totalVotes: number;
}

export interface Vote {
  id: string;
  voterHash: string;
  candidateId: string;
  timestamp: Date;
  blockchainHash: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}