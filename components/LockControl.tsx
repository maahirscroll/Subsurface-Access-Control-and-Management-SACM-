
import React, { useState } from 'react';
import { LockIcon } from './icons/LockIcon';
import { UnlockIcon } from './icons/UnlockIcon';

interface LockControlProps {
  isLocked: boolean;
  onToggle: (newState: boolean) => Promise<void>;
}

const LockControl: React.FC<LockControlProps> = ({ isLocked, onToggle }) => {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    await onToggle(!isLocked);
    setIsToggling(false);
  };

  const statusText = isLocked ? 'Secured & Locked' : 'Unlocked';
  const buttonText = isLocked ? 'Unlock Manhole' : 'Lock Manhole';
  const icon = isLocked ? <LockIcon className="w-8 h-8" /> : <UnlockIcon className="w-8 h-8" />;
  const statusColor = isLocked ? 'text-green-400' : 'text-yellow-400';

  return (
    <div className="p-6 rounded-2xl border border-gray-700 bg-gray-800 shadow-lg flex flex-col justify-between">
      <div>
        <p className="text-gray-400 font-medium">Security Status</p>
        <div className="flex items-center gap-4 mt-2">
            <div className={`p-3 rounded-full bg-gray-900/50 ${statusColor}`}>
                {icon}
            </div>
            <span className={`text-2xl font-bold ${statusColor}`}>
                {statusText}
            </span>
        </div>
      </div>
      <button
        onClick={handleToggle}
        disabled={isToggling}
        className={`w-full mt-6 py-3 px-4 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2
          ${isLocked 
            ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
            : 'bg-green-600 hover:bg-green-700 text-white'}
          disabled:bg-gray-600 disabled:cursor-not-allowed`}
      >
        {isToggling ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
};

export default LockControl;
