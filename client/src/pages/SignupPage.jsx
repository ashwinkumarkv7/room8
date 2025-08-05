import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation after signup
import BasicInfoStep from '../components/Signup/BasicInfoStep';
import ProfileDetailsStep from '../components/Signup/ProfileDetailsStep';
import logo from '../assets/logo/room8-logo.png';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: '', email: '', password: '', confirmPassword: '',
    mobile: '', gender: '', dob: '',
    // Profile Details
    city: '', preferredLocation: '', profession: '', workplace: '',
    budget: 15000, roomType: 'private', moveInDate: '', hobbies: [],
    routine: 'early_bird', smoking: 'no', drinking: 'no',
    food: 'no_preference', pets: 'no', bio: '', profilePic: null,
  });
  const [error, setError] = useState(null); // To display error messages
  const [loading, setLoading] = useState(false); // To show a loading state
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => setStep(2);
  const handlePrevStep = () => setStep(1);
  
  // --- This is the updated handleSubmit function ---
  const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null); // Clear previous errors
      
      // Basic validation
      if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          return;
      }
      
      setLoading(true); // Start loading

      try {
        // Make the API call to your backend registration endpoint
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        setLoading(false); // Stop loading

        if (!response.ok) {
            // If the server responds with an error (e.g., user exists)
            throw new Error(data.message || 'Something went wrong');
        }

        // --- SUCCESS ---
        console.log('Registration successful:', data);
        alert('Signup successful! You will now be redirected to the login page.');
        // You can also store the user token in localStorage here
        // localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/login'); // Redirect to login page on success

      } catch (err) {
        setLoading(false); // Stop loading
        setError(err.message);
        console.error('Registration failed:', err.message);
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
          Step {step} of 2: {step === 1 ? 'Basic Information' : 'Profile Details'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Display any error messages here */}
          {error && <div className="mb-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <BasicInfoStep
                formData={formData}
                handleInputChange={handleInputChange}
                onNext={handleNextStep}
              />
            )}
            {step === 2 && (
              <ProfileDetailsStep
                formData={formData}
                setFormData={setFormData}
                handleInputChange={handleInputChange}
                onBack={handlePrevStep}
                isLoading={loading} // Pass loading state to disable button
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
