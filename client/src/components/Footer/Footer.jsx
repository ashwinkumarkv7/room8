import React from 'react';
import logo from '../../assets/logo/room8-logo.png';

// --- SVG Icons for Social Media (More reliable than Font Awesome) ---
const FacebookIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-1.5 c-1,0-1.5,0.7-1.5,1.5V12h3l-0.5,3H13v6.95C18.05,21.45,22,17.19,22,12z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M22.46,6c-0.77,0.35-1.6,0.58-2.46,0.67c0.88-0.53,1.56-1.37,1.88-2.38c-0.83,0.5-1.75,0.85-2.72,1.05 C18.37,4.5,17.26,4,16,4c-2.35,0-4.27,1.92-4.27,4.29c0,0.34,0.04,0.67,0.11,0.98C8.28,9.09,5.11,7.38,3,4.79 C2.63,5.42,2.42,6.16,2.42,6.94c0,1.49,0.76,2.8,1.9,3.58C3.66,10.49,3.02,10.3,2.45,10v0.05c0,2.08,1.48,3.82,3.44,4.21 c-0.36,0.1-0.74,0.15-1.12,0.15c-0.28,0-0.55-0.03-0.81-0.08c0.55,1.7,2.14,2.94,4.03,2.97c-1.47,1.15-3.32,1.83-5.33,1.83 c-0.35,0-0.69-0.02-1.03-0.06C2.64,20.4,5.08,21,7.74,21c7.21,0,11.14-5.99,11.14-11.14c0-0.17,0-0.34-0.01-0.5 C19.64,8.98,20.28,8.22,21.5,6.45C20.71,6.8,19.85,7.05,19,7.19c0.82-0.49,1.44-1.27,1.73-2.18L22.46,6z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.2,5.2 0 0,1 16.2,21.4H7.8C4.6,21.4 2,18.8 2,15.6V7.8C2,4.6 4.6,2 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.43 13,11.1V10.28H10.13V18.5H13V13.57C13,12.8 13.69,12.1 14.5,12.1A1.5,1.5 0 0,1 16,13.6V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,6 7.78,5.2 6.88,5.2A1.68,1.68 0 0,0 5.2,6.88C5.2,7.78 6,8.56 6.88,8.56M8.27,18.5V10.28H5.5V18.5H8.27Z" />
  </svg>
);


export default function Footer() {
  return (
    // 1. Using a standard dark gray for the background
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Logo Section */}
          <div className="md:col-span-1">
            {/* 2. Using only the logo image as requested, with a set width to preserve aspect ratio */}
            <a href="#">
              <img src={logo} alt="Room8 Logo" className="w-28 h-auto mb-4" />
            </a>
            <p className="text-gray-400 mb-4">Finding your perfect roommate since 2023.</p>
            {/* 3. Replaced Font Awesome icons with the SVG components defined above */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><LinkedInIcon className="h-6 w-6" /></a>
            </div>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wider">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          {/* 4. Updated the year to be dynamic */}
          <p>&copy; {new Date().getFullYear()} Room8. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}