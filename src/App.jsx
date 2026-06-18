import React from 'react';
import { useProgress } from './hooks/useProgress';
import DzikirCard from './components/DzikirCard';
import Counter from './components/Counter';
import pagiData from './data/pagi.json';

export default function App() {
  const [darkMode, setDarkMode] = useProgress('theme-dark', true);
  const [currentIndex, setCurrentIndex] = useProgress('dzikir-index', 0);
  const [tapCount, setTapCount] = useProgress('dzikir-tap', 0);

  // Efek ganti tema
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const currentDzikir = pagiData[currentIndex];

  const handleTap = () => {
    if (tapCount < currentDzikir.target) {
      setTapCount(tapCount + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < pagiData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTapCount(0);
      window.scrollTo(0, 0);
    } else {
      alert("Alhamdulillah, Dzikir Pagi Selesai!");
      setCurrentIndex(0);
      setTapCount(0);
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
            Dzikir Pagi
          </h1>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-light-secondary dark:bg-dark-secondary hover:opacity-80 transition"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>

        <div className="flex justify-between items-center text-sm font-semibold opacity-60 mb-4 px-1">
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            className={currentIndex === 0 ? 'invisible' : 'hover:text-light-primary dark:hover:text-dark-primary'}
          >
            &larr; Sebelumnya
          </button>
          <span>{currentIndex + 1} / {pagiData.length}</span>
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