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
  const [arabicFontSize, setArabicFontSize] = useProgress('arabic-font-size', 32);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const currentData = isPagi ? pagiData : petangData; 
  const currentDzikir = currentData[currentIndex];
  const isFinished = currentIndex === currentData.length;

  const handleModeChange = (e) => {
    setIsPagi(e.target.value === 'pagi');
    setCurrentIndex(0); 
    setTapCount(0);     
    window.scrollTo(0, 0);
  };

const handleTap = () => {
    if (tapCount < currentDzikir.target) {
      setTapCount(tapCount + 1);
      
      // Kasih geteran pendek (50 milidetik) tiap kali nge-tap
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }
  };

  const handleNext = () => {
    // Kasih geteran pola (panjang-jeda-panjang) sebagai penanda selesai 1 dzikir
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([100, 50, 100]); 
    }

    if (currentIndex < currentData.length) {
      setCurrentIndex(currentIndex + 1);
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

  const handleReset = () => {
    setCurrentIndex(0);
    setTapCount(0);
    window.scrollTo(0, 0);
  };

  const increaseFont = () => setArabicFontSize(prev => Math.min(prev + 4, 48)); 
  const decreaseFont = () => setArabicFontSize(prev => Math.max(prev - 4, 24)); 

  return (
    <div className="min-h-screen selection:bg-light-primary selection:text-white pb-24">
      <div className="max-w-md mx-auto pt-6 px-4">
        
        <header className="flex justify-between items-center mb-6">
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

          <div className="flex gap-2 items-center">
            {!isFinished && (
              <div className="flex bg-light-secondary/50 dark:bg-dark-secondary/50 rounded-lg overflow-hidden">
                <button onClick={decreaseFont} className="px-3 py-2 text-sm font-bold hover:bg-light-secondary dark:hover:bg-dark-secondary transition">A-</button>
                <button onClick={increaseFont} className="px-3 py-2 text-sm font-bold hover:bg-light-secondary dark:hover:bg-dark-secondary transition border-l border-light-bg dark:border-dark-bg">A+</button>
              </div>
            )}
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-light-secondary dark:bg-dark-secondary hover:opacity-80 transition flex-shrink-0"
              title="Toggle Theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {isFinished ? (
          <div className="bg-light-surface dark:bg-dark-surface p-8 rounded-2xl shadow-sm text-center border border-light-secondary dark:border-dark-secondary animate-fade-in mt-10">
            <h2 className="text-3xl font-bold mb-4 text-light-primary dark:text-dark-primary">Alhamdulillah 🌿</h2>
            <p className="mb-6 opacity-80">
              Kamu udah nyelesaiin Dzikir {isPagi ? 'Pagi' : 'Petang'} hari ini. Semoga Allah senantiasa menerima amal ibadah kita dan memberikan taufiknya Aamiin.
            </p>
            
            <button 
              onClick={handleReset}
              className="w-full py-3 mb-8 bg-light-primary dark:bg-dark-primary text-white rounded-xl font-bold transition-transform active:scale-95"
            >
              ↺ Ulangi Dzikir
            </button>

            <div className="border-t border-light-secondary dark:border-dark-secondary pt-6 text-sm opacity-60">
              <p className="mb-2">Referensi Shahih dari:</p>
              
              <div className="flex flex-col items-center gap-1">
                <a 
                  href="https://rumaysho.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-light-primary dark:text-dark-primary font-bold hover:underline w-fit"
                >
                  Rumaysho.com
                </a>
                
                <span className="block text-center">
                  Buku Dzikir Pagi Petang Ustadz Yazid bin Abdul Qadir Jawas
                </span>
              </div>

              <div className="mt-8">
                <p>Dibuat dengan ❤️ dari Jogja</p>
              </div>
            </div>
          </div>
        ) : (
          <>
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

            {currentDzikir && <DzikirCard key={currentDzikir.id} data={currentDzikir} fontSize={arabicFontSize} />}
            
            {currentDzikir && (
              <Counter 
                count={tapCount} 
                target={currentDzikir.target} 
                onTap={handleTap} 
                onNext={handleNext} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}