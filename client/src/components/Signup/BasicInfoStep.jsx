import React from 'react';

const InputField = ({ id, label, type = 'text', value, onChange, required = true, className = "sm:col-span-1" }) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1">
      <input id={id} name={id} type={type} required={required} value={value} onChange={onChange} className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#6b2184] focus:border-[#6b2184] sm:text-sm" />
    </div>
  </div>
);

export default function BasicInfoStep({ formData, handleInputChange, onNext }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
        <InputField id="fullName" label="Full Name" value={formData.fullName} onChange={handleInputChange} className="sm:col-span-2" />
        <InputField id="email" label="Email address" type="email" value={formData.email} onChange={handleInputChange} />
        <InputField id="mobile" label="Mobile Number" type="tel" value={formData.mobile} onChange={handleInputChange} />
        <InputField id="password" label="Password" type="password" value={formData.password} onChange={handleInputChange} />
        <InputField id="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleInputChange} />
        
        <div className="sm:col-span-1">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#6b2184] focus:border-[#6b2184] sm:text-sm rounded-md">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <InputField id="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleInputChange} />
      </div>

      <div className="pt-6">
        <button type="button" onClick={onNext} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6b2184] hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6b2184]">
          Next: Profile Details
        </button>
      </div>
    </>
  );
}
