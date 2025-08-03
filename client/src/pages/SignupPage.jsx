import React, { useState } from 'react';
import BasicInfoStep from '../components/Signup/BasicInfoStep';
import ProfileDetailsStep from '../components/Signup/ProfileDetailsStep';
import logo from '../assets/logo/room8-logo.png'; // Make sure this path is correct

export default function SignupPage() {
  const [step, setStep] = useState(1); // 1 for Basic Info, 2 for Profile Details
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    gender: '',
    dob: '',
    // Profile Details
    city: '',
    preferredLocation: '',
    profession: '',
    workplace: '',
    budget: 15000,
    roomType: 'private',
    moveInDate: '',
    hobbies: [],
    routine: 'early_bird',
    smoking: 'no',
    drinking: 'no',
    food: 'no_preference',
    pets: 'no',
    bio: '',
    profilePic: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    // Add validation for the first step here if needed
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };
  
  const handleSubmit = (e) => {
      e.preventDefault();
      // Add final validation here
      console.log('Form Submitted:', formData);
      // Here you would typically send the data to your backend API
      alert('Signup successful! Check the console for form data.');
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
                setFormData={setFormData} // Pass setFormData for complex states like hobbies
                handleInputChange={handleInputChange}
                onBack={handlePrevStep}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}