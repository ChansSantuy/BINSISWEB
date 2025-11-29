import React from "react";
import { ruanganData } from "../data/homepage/homepageData";

export default function Ruangan() {
  const getData = (id: string) => ruanganData.find((r) => r.id === id)!;

  const labkom = getData("labkom");
  const labjaringan = getData("labjaringan");
  const labperakitan = getData("labperakitan");
  const perpustakaan = getData("perpustakaan");
  const bengkel = getData("bengkel");
  const lapangan = getData("lapangan");

  const slides = [labkom, bengkel];
  const [current, setCurrent] = React.useState<number>(0);
  const [prev, setPrev] = React.useState<number | null>(null);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const touchStartX = React.useRef<number | null>(null);

  // autoplay (sets prev before advancing so we can animate exit)
  React.useEffect(() => {
    const id = setInterval(() => {
      if (!isPaused) {
        setCurrent((c) => {
          setPrev(c);
          return (c + 1) % slides.length;
        });
      }
    }, 4200);
    return () => clearInterval(id);
  }, [isPaused, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) {
      setIsPaused(false);
      return;
    }
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        setPrev(current);
        setCurrent((c) => (c + 1) % slides.length);
      } else {
        setPrev(current);
        setCurrent((c) => (c - 1 + slides.length) % slides.length);
      }
    }
    touchStartX.current = null;
    // resume autoplay shortly after interaction
    setTimeout(() => setIsPaused(false), 600);
  };

  const handleClickAdvance = () => {
    setPrev(current);
    setCurrent((c) => (c + 1) % slides.length);
  };

  return (
    <>
      {/* RUANGAN - DESKTOP */}
      <section className="w-full max-w-7xl mx-auto px-8 hidden md:block py-16 font-[League_Spartan]">
        <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
          {/* CARD 1: Lab Komputer (col-span-4 row-span-2) */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000" data-aos-once="false"
            className="relative col-span-4 row-span-2 rounded-2xl overflow-hidden group shadow-soft transform transition duration-700 will-change-transform"
          >
            <img
              src={labkom.image}
              alt={labkom.title}
              className="absolute inset-0 w-full h-full object-cover object-center z-0 transition duration-500 group-hover:scale-105 group-hover:blur-[2px]"
              loading="lazy"
            />
            <div className="relative z-10 p-6 flex flex-col justify-center items-center text-center h-full bg-black/50 group-hover:bg-black/70 transition text-white">
              <h2 className="text-2xl font-bold mb-1">
              {labkom.title}
              </h2>
              <p className="text-sm text-gray-200">{labkom.description}</p>
            </div>
          </div>

          {/* CARD 2: Lab Jaringan (col-span-2) */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000" data-aos-once="false"
            className="relative col-span-2 rounded-2xl overflow-hidden group shadow-soft"
          >
            <img
              src={labjaringan.image}
              alt={labjaringan.title}
              className="absolute inset-0 w-full h-full object-cover object-center z-0 transition duration-500 group-hover:scale-105 group-hover:blur-[2px]"
              loading="lazy"
            />
            <div className="relative z-10 p-5 flex flex-col justify-end h-full bg-black/50 group-hover:bg-black/70 transition text-white">
              <h2 className="text-xl font-semibold">
               {labjaringan.title}
              </h2>
              <p className="text-sm text-gray-200">{labjaringan.description}</p>
            </div>
          </div>

          {/* CARD 3: Lab Perakitan (col-span-2) */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000" data-aos-once="false"
            className="relative col-span-2 rounded-2xl overflow-hidden group shadow-soft"
          >
            <img
              src={labperakitan.image}
              alt={labperakitan.title}
              className="absolute inset-0 w-full h-full object-cover object-center z-0 transition duration-500 group-hover:scale-105 group-hover:blur-[2px]"
              loading="lazy"
            />
            <div className="relative z-10 p-5 flex flex-col justify-end h-full bg-black/50 group-hover:bg-black/70 transition text-white">
              <h2 className="text-xl font-semibold">
               {labperakitan.title}
              </h2>
              <p className="text-sm text-gray-200">{labperakitan.description}</p>
            </div>
          </div>

          {/* CARD 4: Perpustakaan (col-span-2) */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000" data-aos-once="false"
            className="relative col-span-2 rounded-2xl overflow-hidden group shadow-soft"
          >
            <img
              src={perpustakaan.image}
              alt={perpustakaan.title}
              className="absolute inset-0 w-full h-full object-cover object-center z-0 transition duration-500 group-hover:scale-105 group-hover:blur-[2px]"
              loading="lazy"
            />
            <div className="relative z-10 p-6 flex flex-col justify-end h-full bg-black/50 group-hover:bg-black/70 transition text-white">
              <h2 className="text-xl font-semibold">
                 {perpustakaan.title}
              </h2>
              <p className="text-sm text-gray-200">{perpustakaan.description}</p>
            </div>
          </div>

          {/* CARD 6: Bengkel Teknik (col-span-4 row-span-2) */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000" data-aos-once="false"
            className="relative col-span-4 row-span-2 rounded-2xl overflow-hidden group shadow-soft"
          >
            <img
              src={bengkel.image}
              alt={bengkel.title}
              className="absolute inset-0 w-full h-full object-cover object-center z-0 transition duration-500 group-hover:scale-105 group-hover:blur-[2px]"
              loading="lazy"
            />
            <div className="relative z-10 p-6 flex flex-col justify-center items-center text-center h-full bg-black/50 group-hover:bg-black/70 transition text-white">
              <h2 className="text-2xl font-bold mb-1">
             {bengkel.title}
              </h2>
              <p className="text-sm text-gray-200 max-w-md">{bengkel.description}</p>
            </div>
          </div>

          {/* CARD 5: Lapangan (col-span-2) */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000" data-aos-once="false"
            className="relative col-span-2 rounded-2xl overflow-hidden group shadow-soft"
          >
            <img
              src={lapangan.image}
              alt={lapangan.title}
              className="absolute inset-0 w-full h-full object-cover object-center z-0 transition duration-500 group-hover:scale-105 group-hover:blur-[2px]"
              loading="lazy"
            />
            <div className="relative z-10 p-5 flex flex-col justify-end h-full bg-black/50 group-hover:bg-black/70 transition text-white">
              <h2 className="text-xl font-semibold">
                {lapangan.title}
              </h2>
              <p className="text-sm text-gray-200">{lapangan.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* RUANGAN - MOBILE */}
      <section className="max-w-sm block md:hidden w-full mx-auto px-2 py-16 font-[League_Spartan] overflow-hidden">
        <div className="flex justify-center">
          <div className="relative w-full h-[90vh]">
            {/* Lab Komputer (top) - with small slider behaviour */}
            <div
              data-aos="fade-up"
              data-aos-duration="1000" data-aos-once="false"
              className="absolute top-0 left-0 w-full h-[37%] rounded-t-[16px] overflow-hidden group shadow-soft"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onClick={handleClickAdvance} // tap to advance
            >
              {/* scoped animation styles */}
              <style>{`
                .rg-slide {
                  position: absolute; inset: 0; width: 100%; height: 100%;
                  background-size: cover; background-position: center;
                  will-change: transform, opacity, filter;
                  transition: transform 700ms cubic-bezier(.22,.9,.35,1), opacity 700ms cubic-bezier(.22,.9,.35,1), filter 700ms;
                  transform: translateX(100%); opacity: 0; z-index: 0; filter: blur(2px) brightness(.7);
                }
                .rg-enter {
                  transform: translateX(0) scale(1);
                  opacity: 1;
                  z-index: 20;
                  filter: blur(0) brightness(1);
                }
                .rg-exit {
                  transform: translateX(-30%) scale(.98) rotateZ(-0.5deg);
                  opacity: 0;
                  z-index: 10;
                  filter: blur(2px) brightness(.6);
                }
                .rg-off {
                  transform: translateX(100%) scale(1.02);
                  opacity: 0;
                  z-index: 0;
                  filter: blur(3px) brightness(.6);
                }
                @media (prefers-reduced-motion: reduce) {
                  .rg-slide { transition: none !important; transform: none !important; opacity: 1 !important; filter: none !important; }
                }
              `}</style>

              {slides.map((s, i) => {
                const cls =
                  i === current ? "rg-slide rg-enter" : i === prev ? "rg-slide rg-exit" : "rg-slide rg-off";
                return (
                  <div
                    key={s.id}
                    className={cls}
                    style={{ backgroundImage: `url('${s.image}')` }}
                    role="img"
                    aria-label={s.title}
                  />
                );
              })}

              <div className="absolute inset-0 bg-black/42 transition-all duration-500 rounded-t-[16px] flex flex-col items-center justify-center text-white text-center p-4 z-30 pointer-events-none">
                <h2 className="text-xl font-bold drop-shadow-sm">
                  {slides[current].title}
                </h2>
                <p className="text-sm mt-1 max-w-[90%] leading-snug">{slides[current].description}</p>
              </div>
            </div>

            {/* Lab Perakitan (left middle) */}
            <div
              data-aos="fade-right"
              data-aos-duration="1000" data-aos-once="false"
              className="absolute top-[39%] left-[1.5%] w-[47%] h-[28%] rounded-bl-[16px] overflow-hidden group shadow-soft"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${labperakitan.image}')` }}
                role="img"
                aria-label={labperakitan.title}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500 rounded-bl-[16px] flex flex-col items-center justify-center text-white text-center p-3 z-10">
                <h2 className="text-sm font-semibold">
                {labperakitan.title}
                </h2>
                <p className="text-xs">{labperakitan.description}</p>
              </div>
            </div>

            {/* Lapangan (left bottom) */}
            <div
              data-aos="fade-right"
              data-aos-duration="1000" data-aos-once="false"
              className="absolute top-[69%] left-[1.5%] w-[47%] h-[36%] rounded-tl-[16px] rounded-bl-[16px] overflow-hidden group shadow-soft"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${lapangan.image}')` }}
                role="img"
                aria-label={lapangan.title}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500 rounded-tl-[16px] rounded-bl-[16px] flex flex-col items-center justify-center text-white text-center p-3 z-10">
                <h2 className="text-sm font-semibold">
                {lapangan.title}
                </h2>
                <p className="text-xs">{lapangan.description}</p>
              </div>
            </div>

            {/* Perpustakaan (right bottom) */}
            <div
              data-aos="fade-left"
              data-aos-duration="1000" data-aos-once="false"
              className="absolute top-[77%] left-[51.5%] w-[47%] h-[28%] rounded-tr-[16px] rounded-br-[16px] overflow-hidden group shadow-soft"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${perpustakaan.image}')` }}
                role="img"
                aria-label={perpustakaan.title}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500 rounded-tr-[16px] rounded-br-[16px] flex flex-col items-center justify-center text-white text-center p-3 z-10">
                <h2 className="text-sm font-semibold">
                 {perpustakaan.title}
                </h2>
                <p className="text-xs">{perpustakaan.description}</p>
              </div>
            </div>

            {/* Lab Jaringan (right middle) */}
            <div
              data-aos="fade-left"
              data-aos-duration="1000" data-aos-once="false"
              className="absolute top-[39%] left-[51.5%] w-[47%] h-[36%] rounded-tr-[16px] rounded-br-[16px] overflow-hidden group shadow-soft"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${labjaringan.image}')` }}
                role="img"
                aria-label={labjaringan.title}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500 rounded-tr-[16px] rounded-br-[16px] flex flex-col items-center justify-center text-white text-center p-3 z-10">
                <h2 className="text-sm font-semibold">
                   {labjaringan.title}
                </h2>
                <p className="text-xs">{labjaringan.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
