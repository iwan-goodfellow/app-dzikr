import React, { useEffect } from 'react';
import { useProgress } from './hooks/useProgress';
import DzikirCard from './components/DzikirCard';
import Counter from './components/Counter';
import pagiData from './data/pagi.json';
import petangData from './data/petang.json'; 

export default function App() {
  const [darkMode, setDarkMode] = useProgress('theme-dark', true);
  const [isPagi, setIsPagi] = useProgress('mode-pagi', true); 
  const [currentIndex, setCurrentIndex] = useProgress('dzikir-index', 0);
  const [tapCount, setTapCount] = useProgress('dzikir-tap', 0);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const currentData = isPagi ? pagiData : petangData; 
  const currentDzikir = currentData[currentIndex];

  const handleModeChange = (e) => {
    setIsPagi(e.target.value === 'pagi');
    setCurrentIndex(0); 
    setTapCount(0);     
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
    <div className="min-h-screen selection:bg-light-primary selection:text-white pb-24">
      <div className="max-w-md mx-auto pt-6 px-4">
        
        {/* HEADER BARU YANG CLEAN */}
        <header className="flex justify-between items-center mb-6">
          
          {/* Judul yang merangkap jadi Dropdown */}
          <div className="relative">
            <select 
              value={isPagi ? 'pagi' : 'petang'}
              onChange={handleModeChange}
              className="appearance-none text-2xl font-bold text-light-primary dark:text-dark-primary bg-transparent cursor-pointer outline-none pr-6"
            >
              <option value="pagi" className="text-base bg-light-surface dark:bg-dark-surface">Dzikir Pagi ▾</option>
              <option value="petang" className="text-base bg-light-surface dark:bg-dark-surface">Dzikir Petang ▾</option>
            </select>
          </div>

          {/* Tombol Dark Mode sendirian di kanan */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-light-secondary dark:bg-dark-secondary hover:opacity-80 transition flex-shrink-0"
            title="Toggle Theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>

        {/* Progress Tracker */}
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

        {/* 
          FIX BUG FADHILAH: 
          Nambahin 'key={currentDzikir.id}' bikin React nge-reset ulang 
          komponen ini tiap kali user pindah halaman. Fadhilah dijamin mingkem lagi! 
        */}
        {currentDzikir && <DzikirCard key={currentDzikir.id} data={currentDzikir} />}
        
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