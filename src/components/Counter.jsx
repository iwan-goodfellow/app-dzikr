import React from 'react';

export default function Counter({ count, target, onTap, onNext }) {
  const isDone = count >= target;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-md shadow-[0_-4px_15px_rgba(0,0,0,0.05)] border-t border-light-secondary dark:border-dark-secondary pb-8 z-50">
      <div className="max-w-md mx-auto">
        {target > 1 ? (
          <button
            onClick={isDone ? onNext : onTap}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 shadow-sm ${
              isDone 
                ? 'bg-light-primary dark:bg-dark-primary text-white' 
                : 'bg-light-secondary dark:bg-dark-secondary text-gray-800 dark:text-gray-100'
            }`}
          >
            {/* Di dalam string template JS, pakai > biasa nggak apa-apa */}
            {isDone ? 'Selesai! Lanjut \u2192' : `TAP (${count} / ${target})`}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="w-full py-4 bg-light-primary dark:bg-dark-primary text-white rounded-xl font-bold text-lg transition-all transform active:scale-95 shadow-sm"
          >
            {/* Di luar string, pakai &rarr; (right arrow) biar aman dan cakep */}
            Selesai & Lanjut &rarr;
          </button>
        )}
      </div>
    </div>
  );
}