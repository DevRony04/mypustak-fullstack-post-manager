import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12" id="loading-spinner">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing background ring */}
        <div className="absolute w-12 h-12 rounded-full border-4 border-blue-100 opacity-60"></div>
        {/* Inner spinning segment */}
        <div className="w-12 h-12 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
      </div>
      <span className="mt-4 text-sm font-semibold text-slate-500 tracking-wide animate-pulse">
        Fetching posts...
      </span>
    </div>
  );
};

export default Loading;
