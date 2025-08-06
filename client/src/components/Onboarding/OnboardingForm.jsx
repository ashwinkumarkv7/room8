import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PhotoIcon, XCircleIcon } from '@heroicons/react/24/solid';

const HOBBY_OPTIONS = ['Music', 'Reading', 'Partying', 'Cooking', 'Gaming', 'Sports', 'Travel', 'Movies'];

const Section = ({ title, children }) => (
    <div className="pt-6 border-t border-gray-200 first:pt-0 first:border-t-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">{children}</div>
    </div>
);

const FormField = ({ children, className = "sm:col-span-3" }) => <div className={className}>{children}</div>;

export default function OnboardingForm({ onComplete }) {
  const { userInfo, login: updateAuthContext } = useAuth();
  const [details, setDetails] = useState({
    fullName: userInfo.fullName || '',
    city: '', preferredLocation: '', profession: '', workplace: '',
    budget: 15000, roomType: 'private', moveInDate: '', hobbies: [],
    routine: 'early_bird', smoking: 'no', drinking: 'no',
    food: 'no_preference', pets: 'no', bio: '',
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const removeProfilePic = () => {
      setProfilePicFile(null);
      setProfilePicPreview(null);
  };
  
  const handleHobbyToggle = (hobby) => {
    setDetails(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby]
    }));
  };

  const handleSave = async () => {
      setError(null);
      setLoading(true);

      try {
        // Step 1: Upload profile picture ONLY if a new one has been selected
        if (profilePicFile) {
            console.log("Attempting to upload profile picture...");
            const formData = new FormData();
            formData.append('profilePic', profilePicFile);

            const uploadRes = await fetch('http://localhost:5000/api/upload/profile-picture', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${userInfo.token}` },
                body: formData,
            });

            const uploadData = await uploadRes.json();
            if (!uploadRes.ok) throw new Error(uploadData.message || 'Image upload failed');
            console.log("Profile picture uploaded successfully.");
        }

        // Step 2: Update the rest of the profile details
        console.log("Attempting to update profile details...");
        const profileUpdateRes = await fetch('http://localhost:5000/api/users/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify(details),
        });
        
        const profileUpdateData = await profileUpdateRes.json();
        if (!profileUpdateRes.ok) throw new Error(profileUpdateData.message || 'Failed to update profile');
        console.log("Profile details updated successfully.");

        // --- SUCCESS ---
        updateAuthContext(profileUpdateData);
        onComplete();

      } catch (err) {
          setError(err.message);
          console.error("Profile update failed:", err);
      } finally {
          setLoading(false);
      }
  }

  return (
    <>
      {error && <div className="mb-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}
      
      <Section title="Location & Profession">
        <FormField><label>Full Name</label><input type="text" name="fullName" value={details.fullName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#6b2184] focus:ring-[#6b2184] sm:text-sm" /></FormField>
        <FormField><label>Current City</label><input type="text" name="city" value={details.city} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#6b2184] focus:ring-[#6b2184] sm:text-sm" /></FormField>
        <FormField><label>Preferred Location</label><input type="text" name="preferredLocation" value={details.preferredLocation} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#6b2184] focus:ring-[#6b2184] sm:text-sm" /></FormField>
        <FormField><label>Profession</label><input type="text" name="profession" value={details.profession} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#6b2184] focus:ring-[#6b2184] sm:text-sm" /></FormField>
        <FormField><label>Workplace/College</label><input type="text" name="workplace" value={details.workplace} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#6b2184] focus:ring-[#6b2184] sm:text-sm" /></FormField>
      </Section>

      <Section title="Preferences">
        <FormField><label>Budget Range (₹/month)</label><input type="number" name="budget" value={details.budget} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#6b2184] focus:ring-[#6b2184] sm:text-sm" /></FormField>
        <FormField><label>Room Type</label><select name="roomType" value={details.roomType} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#6b2184] focus:ring-[#6b2184] sm:text-sm"><option>Private</option><option>Shared</option><option>1BHK</option><option>2BHK</option></select></FormField>
        <FormField><label>Move-in Date</label><input type="date" name="moveInDate" value={details.moveInDate} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#6b2184] focus:ring-[#6b2184] sm:text-sm" /></FormField>
      </Section>
      
      <Section title="Lifestyle & Habits">
        <FormField className="sm:col-span-6"><label>Hobbies & Interests</label><div className="mt-2 flex flex-wrap gap-2">{HOBBY_OPTIONS.map(hobby => (<button type="button" key={hobby} onClick={() => handleHobbyToggle(hobby)} className={`px-3 py-1 text-sm rounded-full transition-colors ${details.hobbies.includes(hobby) ? 'bg-[#6b2184] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{hobby}</button>))}</div></FormField>
      </Section>

      <Section title="About You">
          <FormField className="sm:col-span-6"><label>Bio</label><textarea name="bio" rows={3} value={details.bio} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#6b2184] focus:ring-[#6b2184] sm:text-sm"></textarea></FormField>
          <FormField className="sm:col-span-6"><label>Profile Picture</label>
            {profilePicPreview ? (
                <div className="mt-2 relative w-32 h-32">
                    <img src={profilePicPreview} alt="Profile Preview" className="w-full h-full object-cover rounded-full" />
                    <button type="button" onClick={removeProfilePic} className="absolute top-0 right-0 bg-white rounded-full p-1 text-gray-500 hover:text-red-600">
                        <XCircleIcon className="h-6 w-6" />
                    </button>
                </div>
            ) : (
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"><div className="text-center"><PhotoIcon className="mx-auto h-12 w-12 text-gray-300" /><div className="mt-4 flex text-sm leading-6 text-gray-600"><label htmlFor="profilePic" className="relative cursor-pointer rounded-md bg-white font-semibold text-[#6b2184] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#6b2184] focus-within:ring-offset-2 hover:text-purple-500"><span>Upload a file</span><input id="profilePic" name="profilePic" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p></div></div>
            )}
          </FormField>
      </Section>
      <div className="mt-8 flex justify-end">
        <button onClick={handleSave} disabled={loading} className="bg-[#6b2184] text-white px-6 py-2 rounded-md font-semibold hover:brightness-90 disabled:opacity-50">
            {loading ? 'Saving...' : 'Save & Continue'}
        </button>
      </div>
    </>
  );
}
