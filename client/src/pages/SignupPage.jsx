import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_URL from '../apiConfig';
import logo from '../assets/logo/room8-logo.png';
import DobPicker from '../components/Signup/DobPicker';
import { UsersIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

const InputField = ({ id, label, type = 'text', value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1">
      <input id={id} name={id} type={type} required value={value} onChange={onChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#6b2184] focus:border-[#6b2184] sm:text-sm" />
    </div>
  </div>
);

// --- New component for the role selection cards ---
const RoleSelector = ({ selectedRole, setRole }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">What are you here for?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div onClick={() => setRole('seeker')} className={`cursor-pointer p-4 border-2 rounded-lg flex items-center space-x-4 transition-all ${selectedRole === 'seeker' ? 'border-[#6b2184] ring-2 ring-[#6b2184]' : 'border-gray-300'}`}>
                <UsersIcon className="h-8 w-8 text-[#6b2184]" />
                <div>
                    <p className="font-semibold">I'm looking for a room or roommate</p>
                    <p className="text-xs text-gray-500">Find a new place or a person to share with.</p>
                </div>
            </div>
            <div onClick={() => setRole('lister')} className={`cursor-pointer p-4 border-2 rounded-lg flex items-center space-x-4 transition-all ${selectedRole === 'lister' ? 'border-[#6b2184] ring-2 ring-[#6b2184]' : 'border-gray-300'}`}>
                <BuildingOffice2Icon className="h-8 w-8 text-[#6b2184]" />
                <div>
                    <p className="font-semibold">I'm listing a private property</p>
                    <p className="text-xs text-gray-500">Rent out an entire flat or house.</p>
                </div>
            </div>
        </div>
    </div>
);


export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: '', dob: '',
    userRole: 'seeker', // Default role
  });
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
      if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          return;
      }
      setLoading(true);

      try {
        const response = await fetch(`${API_URL}/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                dob: formData.dob,
                userRole: formData.userRole,
            }),
        });

        const data = await response.json();
        setLoading(false);

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        // --- SUCCESS ---
        login(data); // Auto-login the user
        
        // Smart redirection based on the chosen role
        if (data.userRole === 'lister') {
            navigate('/add-room');
        } else {
            navigate('/onboarding');
        }

      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <img className="mx-auto h-12 w-auto" src={logo} alt="Room8" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join the Room8 Community
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#6b2184] hover:text-purple-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <div className="mb-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <RoleSelector selectedRole={formData.userRole} setRole={(role) => setFormData({...formData, userRole: role})} />
            <InputField id="fullName" label="Full Name" value={formData.fullName} onChange={handleInputChange} />
            <InputField id="email" label="Email address" type="email" value={formData.email} onChange={handleInputChange} />
            <InputField id="password" label="Password" type="password" value={formData.password} onChange={handleInputChange} />
            <InputField id="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleInputChange} />
            <DobPicker value={formData.dob} onChange={handleInputChange} />
            
            <div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6b2184] hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6b2184] disabled:opacity-50">
                {loading ? 'Creating Account...' : 'Create Account & Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
