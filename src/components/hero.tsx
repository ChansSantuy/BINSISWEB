
// File: components/Hero.tsx
import React from "react";
import { HERO_IDS } from "../data/homepage/ids"; // sesuaikan path jika perlu
import { heroData } from "../data/homepage/homepageData";

const HeroSection: React.FC = () => {
  const { bgDesktop, bgMobile, titleSmall, titleLarge, cta, stats } = heroData;

  return (
    <section
      id={HERO_IDS.SECTION}
      className="w-full max-w-screen-2xl overflow-hidden md:py-3 mx-auto md:px-4 relative"
    >
      <div className="relative w-full rounded-3xl overflow-hidden">
        {/* Background Image */}
        <img
          id={HERO_IDS.BG_DESKTOP}
          src={bgDesktop.src}
          alt={bgDesktop.alt}
          className="hidden md:block w-full object-cover object-center rounded-3xl shadow-[0px_35px_60px_-15px_rgba(0,0,0,0.3)]"
        />
        <img
          id={HERO_IDS.BG_MOBILE}
          src={bgMobile.src}
          alt={bgMobile.alt}
          className="block md:hidden mt-4 w-full object-cover object-center rounded-3xl"
        />

        {/* Optional Dark Overlay */}
        <div
          id={HERO_IDS.OVERLAY}
          className="absolute inset-0 z-10 rounded-3xl hidden bg-black/50 backdrop-blur-[2px] pointer-events-none"
        ></div>

        {/* Text Content */}
        <div className="absolute text-center w-full md:text-left top-[33%] md:left-[8%] md:max-w-[90%] sm:max-w-[516px] z-20">
          <h2
            id={HERO_IDS.TITLE_SMALL}
            className="mb-2 md:absolute md:mb-0 text-[18px] md:-top-[28px] md:text-[24px] md:left-1 md:w-[425px] md:h-[37px] text-white md:leading-[28px] tracking-[-1px] font-[Poppins]"
          >
            {titleSmall}
          </h2>

          <h2
            id={HERO_IDS.TITLE_LARGE}
            className="md:absolute md:top-4 md:left-0 md:w-[490px] md:h-[430px] text-white text-[50px] md:text-[89px] leading-[50px] md:leading-[80px] tracking-[-2px] font-[Nunito] font-bold whitespace-pre-line"
          >
            {titleLarge}
          </h2>

          <div
            id={HERO_IDS.CTA_CONTAINER}
            className="relative md:absolute mt-6 md:mt-0 md:top-[18.5em] justify-center md:justify-start md:left-1 flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:pl-5"
          >
            <h2
              id={HERO_IDS.CTA_TEXT}
              className="z-[10] text-white text-[12px] md:text-[15px] font-bold leading-[40px] whitespace-nowrap font-[Nunito] transition-all duration-300"
            >
              {cta.text}
            </h2>
            <img
              id={HERO_IDS.CTA_ARROW}
              src={cta.arrow.src}
              className="z-[10] md:mt-0 w-5 filter invert transition-transform duration-300 group-hover:translate-x-1 animate-[arrowMove_2s_ease-in-out_infinite]"
              alt={cta.arrow.alt}
            />

            <span
              id={HERO_IDS.CTA_UNDERLINE}
              className="z-[1] absolute -bottom-[0.2em] md:-bottom-[0] left-1/2 md:left-0 -translate-y-2 md:-translate-y-0 -translate-x-1/2 md:translate-x-0 w-[200px] md:w-[239px] h-[2px] bg-white rounded transition-all duration-300 md:group-hover:-bottom-[0.3em] group-hover:w-[230px] md:group-hover:w-[269px] group-hover:ml-[10px] md:group-hover:ml-[0px] group-hover:h-[50px] group-hover:-translate-y-0 origin-bottom group-hover:bg-blue-800"
            ></span>
          </div>
        </div>

        {/* Statistik Cards */}
        <div className="relative md:absolute -translate-y-[4em] md:-translate-y-[0] -translate-x-1/2 md:translate-x-0 md:bottom-[24px] left-1/2 md:left-[18.7em] w-full flex justify-center gap-4 md:gap-10 z-30">
          {stats.map((s) => (
            <div
              key={s.id}
              id={
                s.id === "pelajar"
                  ? HERO_IDS.STAT_PELAJAR
                  : s.id === "pengajar"
                  ? HERO_IDS.STAT_PENGAJAR
                  : HERO_IDS.STAT_RUANGAN
              }
              className="rounded-xl px-6 py-2 flex flex-col items-center w-[95px] h-[90px] sm:w-[120px] sm:h-[110px] md:w-[180px] md:h-[150px] text-center [background-image:radial-gradient(closest-side_at_center,_rgba(255,255,255,0.82)_59%,_rgba(230,238,255,0.82)_100%)] shadow-[-1px_4px_4px_rgba(0,0,0,0.25)]"
            >
              <img src={s.icon.src} className="w-[60px] md:w-[70px] mb-2 -mt-1 md:mt-0" alt={s.icon.alt} />
              <div className="-mt-[10px] leading-[14px] md:leading-[25px]">
                <p className="text-[14px] md:text-[20px] font-bold text-gray-800">{s.number}</p>
                <p className="text-[13px] md:text-[20px] font-semibold text-gray-800">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
HeroSection.displayName = "HeroSection";

export default HeroSection;
