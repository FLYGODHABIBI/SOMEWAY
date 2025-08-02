# UniVote - University Blockchain E-Voting Platform

A modern, secure, and transparent blockchain-powered voting system designed specifically for university elections. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Secure Authentication** - Separate login portals for students and administrators
- **Blockchain Integration** - All votes are secured and verified using blockchain technology
- **Real-time Results** - Live election results with interactive charts and analytics
- **Candidate Management** - Admin interface for managing candidates and elections
- **Responsive Design** - Fully responsive UI that works on all devices
- **Professional UI/UX** - Modern, intuitive interface with smooth animations

### User Roles
- **Students**: Vote for candidates, view results
- **Administrators**: Manage candidates, monitor elections, view detailed analytics

### Security Features
- **Immutable Voting** - Votes cannot be changed once submitted
- **Blockchain Verification** - Each vote is cryptographically secured
- **Anonymous Voting** - Voter privacy is maintained while ensuring vote integrity
- **One Vote Per Student** - System prevents multiple voting attempts

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd university-evoting
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   └── Navbar.tsx      # Navigation component
├── hooks/              # Custom React hooks
│   └── useAuth.tsx     # Authentication logic
├── pages/              # Page components
│   ├── LandingPage.tsx # Homepage
│   ├── LoginPage.tsx   # Student login
│   ├── AdminLoginPage.tsx # Admin login
│   ├── VotePage.tsx    # Voting interface
│   ├── CandidatesPage.tsx # Candidate management
│   └── ResultsPage.tsx # Election results
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
├── utils/              # Utility functions
│   └── mockData.ts     # Mock data for development
└── App.tsx             # Main application component
```

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🎨 Design System

### Colors
- **Primary**: Blue color palette for main actions and branding
- **Secondary**: Gray color palette for supporting elements
- **Success**: Green for positive actions and confirmations
- **Warning**: Yellow/Orange for alerts and warnings
- **Error**: Red for errors and destructive actions

### Typography
- **Font Family**: Inter (loaded from Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700

### Components
- Consistent spacing using Tailwind's spacing scale
- Rounded corners (4px, 8px, 12px)
- Shadow system for depth and hierarchy
- Smooth transitions and micro-interactions

## 🔐 Authentication

### Demo Credentials

**Student Account:**
- Email: `student@university.edu`
- Password: `password123`

**Admin Account:**
- Email: `admin@university.edu`
- Password: `password123`

### Security Implementation
- Session-based authentication with localStorage
- Role-based access control (RBAC)
- Protected routes for authenticated users
- Automatic logout functionality

## 📱 Pages Overview

### 1. Landing Page (`/`)
- Hero section with compelling messaging
- Feature highlights
- Call-to-action buttons
- Statistics and social proof
- Responsive design with animations

### 2. Student Login (`/login`)
- Clean, focused login form
- Demo credentials display
- Password visibility toggle
- Error handling and validation
- Link to admin login

### 3. Admin Login (`/admin-login`)
- Similar to student login with admin branding
- Administrative access warnings
- Separate credential validation
- Enhanced security messaging

### 4. Voting Page (`/vote`)
- Position-based candidate selection
- Interactive candidate cards
- Vote confirmation flow
- Blockchain transaction simulation
- Success confirmation with transaction hash

### 5. Candidate Management (`/candidates`)
- CRUD operations for candidates
- Search and filter functionality
- Statistics dashboard
- Batch operations
- Real-time updates

### 6. Results Page (`/results`)
- Live election results
- Interactive charts and graphs
- Position-based filtering
- Export functionality
- Blockchain verification status

## 🚧 Future Enhancements

### Phase 2 Features
- [ ] Real blockchain integration (Ethereum/Polygon)
- [ ] Advanced analytics and reporting
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Audit trail and logs

### Phase 3 Features
- [ ] Mobile app development
- [ ] Advanced security features (2FA)
- [ ] Integration with university systems
- [ ] Advanced voting mechanisms (ranked choice)
- [ ] Real-time collaboration features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Team

Built with ❤️ for modern university elections.

## 📞 Support

For support and questions, please open an issue on GitHub or contact the development team.

---

**Note**: This is a demonstration application. For production use, ensure proper security audits, real blockchain integration, and compliance with election regulations.
