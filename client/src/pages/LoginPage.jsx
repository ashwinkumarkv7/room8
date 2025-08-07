import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo/room8-logo.png';

// --- Reusable Input Field Component ---
const InputField = ({ id, label, type, value, onChange, required = true }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1">
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#6b2184] focus:border-[#6b2184] sm:text-sm"
      />
    </div>
  </div>
);

// --- Google SVG Icon ---
const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512S0 403.3 0 261.8C0 120.3 106.4 8 244 8s244 112.3 244 253.8zM138.3 377.4c23.7 23.7 55.3 37.4 90.7 37.4s67-13.7 90.7-37.4c12.3-12.3 20.2-27.9 24.1-44.1H114.2c3.9 16.2 11.8 31.8 24.1 44.1zM244 118c-33.8 0-63.8 13.5-85.6 35.6-1.6 1.6-3.1 3.2-4.6 4.8l79.4 79.4c2.8-1.5 5.8-2.8 8.9-3.9h.۱c16.3-5.5 34.3-8.5 53.4-8.5s37.1 3 53.4 8.5h.1c3.1 1.1 6.1 2.4 8.9 3.9l79.4-79.4c-1.5-1.6-3-3.2-4.6-4.8C307.8 131.5 277.8 118 244 118z"></path>
    </svg>
);


export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // --- Updated this line with your live server URL ---
      const response = await fetch('https://room8-server.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // --- SUCCESS ---
      login(data);
      navigate('/discover'); // Redirect to the discovery page

    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error('Login failed:', err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src={logo} alt="Room8" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-[#6b2184] hover:text-purple-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <div className="mb-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField id="email" label="Email address" type="email" value={formData.email} onChange={handleInputChange} />
            <InputField id="password" label="Password" type="password" value={formData.password} onChange={handleInputChange} />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#6b2184] focus:ring-[#6b2184] border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-[#6b2184] hover:text-purple-500">Forgot your password?</a>
              </div>
            </div>

            <div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6b2184] hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6b2184] disabled:opacity-50">
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <GoogleIcon />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
