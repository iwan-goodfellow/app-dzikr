import React, { useState, useEffect } from 'react';
import { useProgress } from './hooks/useProgress';
import DzikirCard from './components/DzikirCard';
import Counter from './components/Counter';
import pagiData from './data/pagi.json';
// Nanti kalau petang.json udah ada, tinggal un-comment baris di bawah ini:
// import petangData from './data/petang.json'; 

export default function App() {
  const [darkMode, setDarkMode] = useProgress('theme-dark', true);
  const [isPagi, setIsPagi] = useProgress('mode-pagi', true); // State baru buat Pagi/Petang
  const [currentIndex, setCurrentIndex] = useProgress('dzikir-index', 0);
  const [tapCount, setTapCount] = useProgress('dzikir-tap', 0);

  // Efek ganti tema
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Nanti ganti fallback pagiData ini jadi petangData kalau filenya udah lo bikin
  const currentData = isPagi ? pagiData : pagiData; 
  const currentDzikir = currentData[currentIndex];

  // Fungsi ganti mode (Pagi <-> Petang)
  const toggleMode = () => {
    setIsPagi(!isPagi);
    setCurrentIndex(0); // Reset ke dzikir pertama
    setTapCount(0);     // Reset hitungan
    window.scrollTo(0, 0);
  };

  const handleTap = () => {
    if (tapCount < currentDzikir.target) {
      setTapCount(tapCount + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < currentData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTapCount(0);
      window.scrollTo(0, 0);
    } else {
      alert(`Alhamdulillah, Dzikir ${isPagi ? 'Pagi' : 'Petang'} Selesai!`);
      setCurrentIndex(0);
      setTapCount(0);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTapCount(0);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen selection:bg-light-primary selection:text-white">
      <div className="max-w-md mx-auto pt-6 px-4">
        
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-light-primary dark:text-dark-primary">
            Dzikir {isPagi ? 'Pagi' : 'Petang'}
          </h1>
          
          <div className="flex gap-2">
            {/* Tombol Switch Pagi/Petang */}
            <button 
              onClick={toggleMode}
              className="px-3 py-1 text-sm font-bold rounded-lg bg-light-primary/10 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary hover:opacity-80 transition"
            >
              {isPagi ? '☀️ Pagi' : '🌙 Petang'}
            </button>

            {/* Tombol Dark Mode */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-light-secondary dark:bg-dark-secondary hover:opacity-80 transition"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <div className="flex justify-between items-center text-sm font-semibold opacity-60 mb-4 px-1">
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            className={currentIndex === 0 ? 'invisible' : 'hover:text-light-primary dark:hover:text-dark-primary'}
          >
            &larr; Sebelumnya
          </button>
          <span>{currentIndex + 1} / {currentData.length}</span>
        </div>

        {currentDzikir && <DzikirCard data={currentDzikir} />}
        
        {currentDzikir && (
          <Counter 
            count={tapCount} 
            target={currentDzikir.target} 
            onTap={handleTap} 
            onNext={handleNext} 
          />
        )}
      </div>
    </div>
  );
}