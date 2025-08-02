import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, Shield, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-12 w-12 text-primary-500" />,
      title: 'Blockchain Security',
      description: 'Every vote is secured and verified using blockchain technology, ensuring transparency and immutability.'
    },
    {
      icon: <Clock className="h-12 w-12 text-primary-500" />,
      title: 'Real-time Results',
      description: 'Get instant access to election results as votes are counted automatically and transparently.'
    },
    {
      icon: <Users className="h-12 w-12 text-primary-500" />,
      title: 'Student-Centric',
      description: 'Designed specifically for university elections with student verification and accessibility in mind.'
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-primary-500" />,
      title: 'Verified Voting',
      description: 'Each student gets one verified vote, preventing fraud while maintaining voter anonymity.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg blockchain-pattern min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              The Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                University Voting
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Secure, transparent, and efficient blockchain-powered elections for your university. 
              Experience democracy reimagined for the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-primary-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <Vote className="h-5 w-5" />
                <span>Cast Your Vote</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/admin-login"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Shield className="h-5 w-5" />
                <span>Admin Access</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose UniVote?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge blockchain technology to ensure every vote counts and every voice is heard.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            <motion.div variants={itemVariants}>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-primary-200">Uptime Guarantee</div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-primary-200">Students Served</div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-primary-200">Transparent Results</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Vote?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of students who have already experienced the future of university elections.
            </p>
            <Link
              to="/login"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
            >
              <Vote className="h-5 w-5" />
              <span>Get Started Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;