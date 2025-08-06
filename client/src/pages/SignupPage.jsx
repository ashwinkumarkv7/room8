import React, { useState } from 'react'; // <-- Corrected this line
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo/room8-logo.png';
import DobPicker from '../components/Signup/DobPicker';

const InputField = ({ id, label, type = 'text', value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1">
      <input id={id} name={id} type={type} required value={value} onChange={onChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#6b2184] focus:border-[#6b2184] sm:text-sm" />
    </div>
  </div>
);

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
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
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                dob: formData.dob,
            }),
        });

        const data = await response.json();
        setLoading(false);

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        login(data); 
        navigate('/onboarding'); 

      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src={logo} alt="Room8" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#6b2184] hover:text-purple-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <div className="mb-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
