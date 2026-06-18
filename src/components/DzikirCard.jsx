import React, { useState } from 'react';

export default function DzikirCard({ data }) {
  const [showFadhilah, setShowFadhilah] = useState(false);

  return (
    <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-sm mb-28 transition-colors border border-light-secondary dark:border-dark-secondary">
      <h2 className="text-xl font-bold mb-6 text-light-primary dark:text-dark-primary border-b border-light-secondary dark:border-dark-secondary pb-2">
        {data.title}
      </h2>
      
      <div dir="rtl" className="mb-6">
        <p className="font-arabic text-4xl leading-[2.5] text-right">
          {data.arabic}
        </p>
      </div>

      <p className="text-sm italic opacity-80 mb-4">{data.latin}</p>
      <p className="text-sm mb-6 leading-relaxed">{data.translation}</p>

      <div className="mt-4">
        <button 
          onClick={() => setShowFadhilah(!showFadhilah)}
          className="text-xs font-bold text-light-primary dark:text-dark-primary uppercase tracking-wider bg-light-secondary/50 dark:bg-dark-secondary/50 px-3 py-2 rounded-lg"
        >
          {showFadhilah ? '- Tutup Fadhilah' : '+ Lihat Fadhilah'}
        </button>
        {showFadhilah && (
          <div className="mt-3 p-4 bg-light-secondary dark:bg-dark-secondary rounded-lg text-sm leading-relaxed">
            {data.fadhilah}
          </div>
        )}
      </div>
    </div>
  );
}