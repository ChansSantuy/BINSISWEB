
// File: src/components/SPMB.tsx
import { spmbData } from "../data/homepage/homepageData";

export default function SPMB() {
  const { header, intro, cards, facilities } = spmbData;

  return (
    <section id="SPMB" className="py-8 md:py-16">
      <header
        className="relative h-[220px] sm:h-[280px] md:h-[360px] bg-fixed bg-no-repeat bg-cover flex items-center justify-center md:[background-position:55%_center;background-size:120%;]"
        style={{ backgroundImage: `url('${header.image}')` }}
      >
        <div className="bg-black/50 w-full h-full absolute inset-0 z-0"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">{header.title}</h1>
          <p className="text-sm sm:text-lg md:text-xl mt-2 font-[League_Spartan] leading-snug whitespace-pre-line">
            {header.subtitle}
          </p>
          <button className="mt-4 px-4 sm:px-5 md:px-6 py-2 bg-[#2F71DC] rounded-full font-semibold text-xs sm:text-sm md:text-base">
            {header.buttonText}
          </button>

          <div className="mt-3 sm:mt-4 animate__animated animate__fadeIn animate__infinite animate__alternate">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto -mt-5 sm:-mt-14 md:-mt-16 bg-white rounded-xl shadow-medium p-4 sm:p-6 md:p-10">
        <section className="text-center mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900">{intro.title}</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">{intro.description}</p>
        </section>

    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 sm:mb-12">
  {cards.map((c, idx) => {
    const isFirst = idx === 0;
    const accentTextClass = isFirst ? "text-[#2F71DC]" : "text-[--color-accent]";
    const btnClass = isFirst
      ? "bg-[#2F71DC] hover:bg-[#265fc4] text-white"
      : "bg-accent hover:opacity-95 text-white";
    const percentClass = isFirst ? "text-[#2F71DC]" : "text-[#f69d08]";

    return (
      <div
        key={c.id}
        className="p-4 sm:p-6 rounded-lg border border-gray-200 shadow-soft bg-white flex flex-col justify-between h-full"
      >
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1">{c.title}</h3>
          <p className="text-xs sm:text-base md:text-lg text-gray-700 font-medium mb-1">{c.dateRange}</p>
          <p className="text-[11px] sm:text-sm md:text-base text-gray-600 mb-4">
            {c.description}{" "}
            <span className={`${accentTextClass} font-semibold`}>
            </span>
          </p>
        </div>

        <div className="flex justify-between items-end gap-2">
          <div className="flex items-baseline space-x-1 sm:space-x-2">
            <span className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${percentClass}`}>
              {c.discountPercent}
            </span>
            <span className={`${percentClass} text-[10px] sm:text-xs md:text-sm font-bold`}>
              {c.discountLabel}
            </span>
          </div>
          <button
            className={`${btnClass} text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-md font-semibold`}
          >
            {c.ctaText}
          </button>
        </div>
      </div>
    );
  })}
</section>


        <section className="p-6 rounded-lg bg-white">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6 tracking-wide">{facilities.title}</h2>
          <div className="translate-x-4 md:translate-x-0 grid grid-cols-2 md:grid-cols-2 gap-10 md:gap-[25rem] text-xs sm:text-sm md:text-base text-gray-700">
            {facilities.columns.map((col, idx) => (
              <ul key={idx} className={`list-disc list-outside space-y-2 text-left ${idx === 0 ? 'md:ml-10 md:w-80' : ''}`}>
                {col.map((li, i) => (
                  <li key={i} className={li.includes('BEBAS UANG PRAKTEK') ? 'font-semibold text-[--color-accent]' : ''}>
                    {li}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}
