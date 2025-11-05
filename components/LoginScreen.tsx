
import React, { useState } from 'react';
import type { User } from '../types';
import { ManholeIcon } from './icons/ManholeIcon';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 border border-gray-700 shadow-2xl rounded-2xl p-8 mb-4">
          <div className="flex flex-col items-center mb-6">
             <ManholeIcon className="w-20 h-20 text-cyan-400 mb-4" />
            <h1 className="text-3xl font-bold text-center text-white">Smart Manhole Monitor</h1>
            <p className="text-gray-400 text-center mt-2">Secure access to your city's infrastructure.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 bg-gray-700 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500"
                id="email"
                type="email"
                placeholder="operator@city.gov"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 bg-gray-700 text-gray-200 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 City Infrastructure Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
