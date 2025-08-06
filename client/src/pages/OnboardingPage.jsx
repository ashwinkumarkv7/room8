import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- Corrected the path here
import { CheckCircleIcon } from '@heroicons/react/24/solid';

// This is a placeholder for the form. We will build the real one later.
const OnboardingForm = ({ onComplete }) => {
    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-800">Complete Your Profile</h3>
            <p className="text-gray-500 mt-1">Fill out the details below to get better matches.</p>
            <div className="mt-6 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Your detailed profile form will go here.</p>
            </div>
            <div className="mt-6 flex justify-end">
                <button onClick={onComplete} className="bg-[#6b2184] text-white px-6 py-2 rounded-md font-semibold hover:brightness-90">
                    Save & Continue
                </button>
            </div>
        </div>
    );
};

export default function OnboardingPage() {
    const [step, setStep] = useState(2); // Start at step 2: Profile Details
    const navigate = useNavigate();
    const { userInfo } = useAuth();

    const handleCompleteStep = () => {
        setStep(prev => prev + 1);
    };

    const handleSkip = () => {
        navigate('/discover');
    };

    const steps = ["Account Created", "Profile Details", "Done!"];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-3xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome, {userInfo?.fullName?.split(' ')[0]}!</h1>
                    <p className="text-gray-600 mt-2">Let's get your profile set up so you can find the perfect match.</p>
                </div>

                {/* Stepper UI */}
                <div className="flex items-center justify-between mb-12 max-w-md mx-auto">
                    {steps.map((stepName, index) => (
                        <React.Fragment key={stepName}>
                            <div className="flex flex-col items-center text-center">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step > index ? 'bg-[#6b2184] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    {step > index + 1 ? <CheckCircleIcon className="h-6 w-6" /> : index + 1}
                                </div>
                                <p className={`mt-2 text-sm font-medium ${step > index ? 'text-[#6b2184]' : 'text-gray-500'}`}>{stepName}</p>
                            </div>
                            {index < steps.length - 1 && <div className={`flex-1 h-1 mx-4 ${step > index + 1 ? 'bg-[#6b2184]' : 'bg-gray-200'}`}></div>}
                        </React.Fragment>
                    ))}
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    {step === 2 && <OnboardingForm onComplete={handleCompleteStep} />}
                    
                    {step === 3 && (
                        <div className="text-center py-8">
                            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
                            <h2 className="mt-4 text-2xl font-bold text-gray-800">You're All Set!</h2>
                            <p className="mt-2 text-gray-600">Your profile is complete. You can now start discovering rooms and roommates.</p>
                            <button onClick={handleSkip} className="mt-6 bg-[#6b2184] text-white px-8 py-3 rounded-md font-semibold hover:brightness-90">
                                Go to Discover Page
                            </button>
                        </div>
                    )}
                </div>
                
                <div className="text-center mt-6">
                    <button onClick={handleSkip} className="text-sm font-medium text-gray-600 hover:text-[#6b2184]">
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    );
}
