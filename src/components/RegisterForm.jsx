import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add your form submission logic here
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Create Account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white/80"
          >
            Join our amazing platform
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="form-group"
          >
            <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
              Email Address
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 ${
                errors.email
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-gradient-to-r from-pink-400 to-purple-400 focus:border-purple-400'
              }`}
              style={{
                borderImage: errors.email ? undefined : 'linear-gradient(90deg, #f472b6, #a855f7) 1'
              }}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1 flex items-center"
              >
                <span className="animate-pulse mr-1">⚠️</span>
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="form-group"
          >
            <label htmlFor="password" className="block text-sm font-semibold text-white/90 mb-2">
              Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 ${
                errors.password
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-gradient-to-r from-blue-400 to-cyan-400 focus:border-blue-400'
              }`}
              style={{
                borderImage: errors.password ? undefined : 'linear-gradient(90deg, #60a5fa, #22d3ee) 1'
              }}
            />
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1 flex items-center"
              >
                <span className="animate-pulse mr-1">⚠️</span>
                {errors.password}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="form-group"
          >
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white/90 mb-2">
              Confirm Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-green-500/30 transition-all duration-300 ${
                errors.confirmPassword
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-gradient-to-r from-green-400 to-emerald-400 focus:border-green-400'
              }`}
              style={{
                borderImage: errors.confirmPassword ? undefined : 'linear-gradient(90deg, #4ade80, #10b981) 1'
              }}
            />
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1 flex items-center"
              >
                <span className="animate-pulse mr-1">⚠️</span>
                {errors.confirmPassword}
              </motion.p>
            )}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 px-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center justify-center">
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full mr-2"
                  />
                  Creating Account...
                </>
              ) : (
                <>Create Account</>
              )}
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="form-footer text-center"
          >
            <p className="text-white/80">
              Already have an account?{' '}
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/login"
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-semibold hover:from-pink-300 hover:to-purple-300 transition-all duration-300 underline decoration-2 underline-offset-2"
              >
                Sign in here
              </motion.a>
            </p>
          </motion.div>
        </form>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-30 animate-bounce"></div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
