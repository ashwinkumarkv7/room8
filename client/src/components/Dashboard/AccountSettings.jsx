import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PhotoIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import API_URL from '../../apiConfig';

const HOBBY_OPTIONS = ['Music', 'Reading', 'Partying', 'Cooking', 'Gaming', 'Sports', 'Travel', 'Movies'];

// --- Reusable Form Components ---

const Section = ({ title, description, children }) => (
    <div className="py-8 border-b border-gray-200 last:border-b-0">
        <div>
            <h3 className="text-xl font-bold leading-6 text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">{children}</div>
    </div>
);

const FormField = ({ id, label, children, className = "sm:col-span-3" }) => (
    <div className={className}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">
            {children}
        </div>
    </div>
);

const RadioCardGroup = ({ legend, name, value, options, onChange }) => (
    <div className="sm:col-span-6">
        <label className="text-base font-medium text-gray-900">{legend}</label>
        <fieldset className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {options.map((option) => (
                    <label key={option.value} htmlFor={`${name}-${option.value}`} className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#6A2083] ${value === option.value ? 'border-transparent ring-2 ring-[#6A2083]' : 'border-gray-300'}`}>
                        <input
                            id={`${name}-${option.value}`}
                            name={name}
                            type="radio"
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                            className="sr-only"
                        />
                        <span className="flex flex-1 items-center justify-center">
                            <span className="text-sm font-medium text-gray-900">{option.label}</span>
                        </span>
                    </label>
                ))}
            </div>
        </fieldset>
    </div>
);


export default function AccountSettings() {
    const { userInfo, login: updateAuthContext } = useAuth();
    // Start with null to show a loading state until data is populated
    const [details, setDetails] = useState(null);
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // Populate form with data from AuthContext on component mount
    useEffect(() => {
        if (userInfo) {
            // Pre-fill the form state directly from the userInfo object
            setDetails({
                fullName: userInfo.fullName || '',
                city: userInfo.city || '',
                preferredLocation: userInfo.preferredLocation || '',
                profession: userInfo.profession || '',
                workplace: userInfo.workplace || '',
                budget: userInfo.budget || 15000,
                roomType: userInfo.roomType || 'private',
                moveInDate: userInfo.moveInDate ? new Date(userInfo.moveInDate).toISOString().split('T')[0] : '',
                hobbies: userInfo.hobbies || [],
                bio: userInfo.bio || '',
                cleanliness: userInfo.cleanliness || 'tidy',
                socialHabits: userInfo.socialHabits || 'occasionally',
                sleepSchedule: userInfo.sleepSchedule || 'early_bird',
                smoking: userInfo.smoking || 'no',
                drinking: userInfo.drinking || 'no',
                pets: userInfo.pets || 'no',
            });

            // Set profile picture from existing user data in context
            if (userInfo.profilePic) {
                setProfilePicPreview(userInfo.profilePic);
            }
        }
    }, [userInfo]);

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
        setUpdateSuccess(false);
        try {
            if (profilePicFile) {
                const formData = new FormData();
                formData.append('profilePic', profilePicFile);
                const uploadRes = await fetch(`${API_URL}/api/upload/profile-picture`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${userInfo.token}` },
                    body: formData,
                });
                const uploadData = await uploadRes.json();
                if (!uploadRes.ok) throw new Error(uploadData.message || 'Image upload failed');
            }
            
            const profileUpdateRes = await fetch(`${API_URL}/api/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify(details),
            });
            const profileUpdateData = await profileUpdateRes.json();
            if (!profileUpdateRes.ok) throw new Error(profileUpdateData.message || 'Failed to update profile');
            
            updateAuthContext(profileUpdateData); // Update context with latest user info
            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 4000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputStyles = "block w-full rounded-lg border-2 border-gray-300 shadow-md focus:border-[#6A2083] focus:ring-4 focus:ring-[#6A2083]/20 sm:text-sm p-3 transition-all duration-200";

    // Show a loading state while fetching initial data
    if (!details) {
        return <div>Loading your profile...</div>;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h2>
            <p className="text-gray-600 mb-6">Update your profile details, preferences, and lifestyle habits.</p>
            
            {updateSuccess && (
                <div className="mb-6 flex items-center gap-x-3 rounded-md bg-green-100 p-4 text-sm text-green-700">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    Your profile has been updated successfully!
                </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                {error && <div className="mb-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}
                
                <Section title="Location & Profession" description="Tell us where you are and what you do.">
                    <FormField id="fullName" label="Full Name" className="sm:col-span-6">
                        <input type="text" name="fullName" value={details.fullName} onChange={handleInputChange} className={inputStyles} />
                    </FormField>
                    <FormField id="city" label="Current City">
                        <input type="text" name="city" value={details.city} onChange={handleInputChange} className={inputStyles} />
                    </FormField>
                    <FormField id="preferredLocation" label="Preferred Location">
                        <input type="text" name="preferredLocation" value={details.preferredLocation} onChange={handleInputChange} className={inputStyles} />
                    </FormField>
                    <FormField id="profession" label="Profession">
                        <input type="text" name="profession" value={details.profession} onChange={handleInputChange} className={inputStyles} />
                    </FormField>
                    <FormField id="workplace" label="Workplace/College">
                        <input type="text" name="workplace" value={details.workplace} onChange={handleInputChange} className={inputStyles} />
                    </FormField>
                </Section>

                <Section title="Living Preferences" description="Help us understand your ideal living situation.">
                    <FormField id="budget" label="Monthly Budget (₹)" className="sm:col-span-2">
                        <input type="number" name="budget" value={details.budget} onChange={handleInputChange} className={inputStyles} />
                    </FormField>
                    <FormField id="roomType" label="Room Type" className="sm:col-span-2">
                        <select name="roomType" value={details.roomType} onChange={handleInputChange} className={inputStyles}><option>Private</option><option>Shared</option></select>
                    </FormField>
                    <FormField id="moveInDate" label="Move-in Date" className="sm:col-span-2">
                        <input type="date" name="moveInDate" value={details.moveInDate} onChange={handleInputChange} className={inputStyles} />
                    </FormField>
                </Section>

                <Section title="Lifestyle & Habits" description="This helps us find people you'll get along with.">
                    <RadioCardGroup legend="How tidy are you?" name="cleanliness" value={details.cleanliness} onChange={handleInputChange} options={[{ value: 'tidy', label: 'Sparkling Clean' }, { value: 'average', label: 'Neat & Average' }, { value: 'relaxed', label: 'Lived-in & Relaxed' }]}/>
                    <RadioCardGroup legend="What's your sleep schedule?" name="sleepSchedule" value={details.sleepSchedule} onChange={handleInputChange} options={[{ value: 'early_bird', label: 'Early Bird' }, { value: 'night_owl', label: 'Night Owl' }]}/>
                    <FormField className="sm:col-span-6"><label className="block text-sm font-medium text-gray-700 mb-2">Hobbies & Interests</label><div className="flex flex-wrap gap-2">{HOBBY_OPTIONS.map(hobby => (<button type="button" key={hobby} onClick={() => handleHobbyToggle(hobby)} className={`px-3 py-1 text-sm rounded-full transition-colors ${details.hobbies.includes(hobby) ? 'bg-[#6b2184] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{hobby}</button>))}</div></FormField>
                </Section>
                
                <Section title="About You" description="Let people know a bit more about you.">
                    <FormField id="bio" label="Your Bio" className="sm:col-span-6"><textarea name="bio" rows={3} value={details.bio} onChange={handleInputChange} className={inputStyles}></textarea></FormField>
                    <FormField label="Profile Picture" className="sm:col-span-6">
                        {profilePicPreview ? (
                            <div className="relative w-32 h-32"><img src={profilePicPreview} alt="Profile Preview" className="w-full h-full object-cover rounded-full" /><button type="button" onClick={removeProfilePic} className="absolute top-0 right-0 bg-white rounded-full p-1 text-gray-500 hover:text-red-600"><XCircleIcon className="h-6 w-6" /></button></div>
                        ) : (
                            <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"><div className="text-center"><PhotoIcon className="mx-auto h-12 w-12 text-gray-300" /><div className="mt-4 flex text-sm leading-6 text-gray-600"><label htmlFor="profilePic" className="relative cursor-pointer rounded-md bg-white font-semibold text-[#6b2184] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#6b2184] focus-within:ring-offset-2 hover:text-purple-500"><span>Upload a file</span><input id="profilePic" name="profilePic" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p></div></div>
                        )}
                    </FormField>
                </Section>

                <div className="pt-8 flex justify-end">
                    <button type="submit" disabled={loading} className="bg-[#6b2184] text-white px-8 py-3 rounded-lg font-semibold hover:brightness-90 disabled:opacity-50 text-base">
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}