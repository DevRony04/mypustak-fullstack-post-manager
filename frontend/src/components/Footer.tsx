import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200/60 py-6 mt-16" id="footer-section">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>&copy; 2026 All Rights Reserved</span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span>
            Created by <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Deepyaman Mondal</span>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
