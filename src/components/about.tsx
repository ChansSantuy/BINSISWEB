import { aboutData } from "../data/homepage/homepageData";

const CheckIcon = ({ className = "w-6 md:w-8 h-6 md:h-8 text-gray-800 mt-1" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M7.293 13.293a1 1 0 011.414 0l5.586-5.586a1 1 0 00-1.414-1.414L8 11.172 6.707 9.879a1 1 0 00-1.414 1.414l2 2z"
      clipRule="evenodd"
    />
  </svg>
);

const AboutSection = () => {

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 font-[League_Spartan] overflow-hidden"
    >
      {/* Gambar kiri (desktop) */}
      <div data-aos="fade-right" data-aos-once="false">
        <img
          src={aboutData.heroImage}
          alt="Gedung SMK"
          className="hidden md:block w-full h-[220px] sm:h-[300px] lg:h-[380px] object-cover rounded-xl shadow-[-4px_12px_12px_rgba(0,0,0,0.25)] transition-all duration-500 hover:scale-105"
        />
      </div>

      {/* Kalimat kanan */}
      <div className="flex flex-col justify-center items-center text-center -translate-y-2" data-aos="fade-left" data-aos-delay="200" data-aos-once="false">
        <h1 className="text-[20px] sm:text-[30px] lg:text-[33px] font-extrabold text-gray-900 mb-4 md:mb-6  md:leading-[14px] leading-[11px] uppercase">
          <span className="text-[15px] sm:text-[16px] lg:text-[21px] lowercase font-bold block">
            {aboutData.subtitle}
          </span>
          <br />
          {aboutData.title}
        </h1>

        <p className="text-gray-800 text-[13px] sm:text-[14px] lg:text-[16px] leading-[22px] sm:leading-[24px] lg:leading-[25px] translate-y-2 sm:translate-y-3 text-justify font-medium max-w-xl px-2 sm:px-0  mb-4 md:mb-8">
          {aboutData.intro}
          <br />
          <br />
          <span className="hidden md:block">{aboutData.more}</span>
        </p>

        {/* mobile image */}
        <div className="block md:hidden mb-6" data-aos="fade-up" data-aos-delay="400" data-aos-once="false">
          <img
            src={aboutData.heroImage}
            alt="Gedung SMK"
            className="w-full aspect-[16/9] object-cover rounded-xl shadow-[-4px_12px_12px_rgba(0,0,0,0.25)] transition-all duration-500 hover:scale-105"
          />
        </div>

        {/* mobile-only extra paragraph */}
        <span
          className="block md:hidden text-gray-800 text-[14px] sm:text-[16px] lg:text-[18px] leading-[22px] sm:leading-[24px] lg:leading-[25px] translate-y-2 sm:translate-y-3 text-justify font-medium max-w-xl px-2 sm:px-0"
          data-aos="fade-down"
          data-aos-delay="300"
          data-aos-once="false"
        >
          {aboutData.more}
        </span>
      </div>

      {/* Card VISI */}
      <div className="order-2 md:order-1" data-aos="fade-up" data-aos-delay="300" data-aos-once="false">
        <div
          className="w-full md:w-[590px] h-auto md:h-[180px] text-white rounded-xl shadow-[-4px_12px_12px_rgba(0,0,0,0.25)] py-4 px-5 md:py-5 md:px-7 transition-all duration-300 transform hover:scale-105 hover:brightness-110 hover:shadow-xl"
          style={{ backgroundImage: "var(--gradient-main)" }}
        >
          <div className="flex items-center space-x-1 md:space-x-3 mb-1 md:mb-2">
            <img src={aboutData.visi.icon} alt="Ikon Visi" className="w-6 md:w-10" />
            <h3 className="font-bold tracking-widest uppercase text-[13px] md:text-[20px]">
              {aboutData.visi.title}
            </h3>
          </div>

          <p className="text-[13px] md:text-[17px] leading-[14px] md:leading-relaxed text-justify md:pl-4 pr-1 md:pr-3">
            {aboutData.visi.text}
          </p>
        </div>
      </div>

      {/* Card MISI */}
      <div className="order-1 md:order-2" data-aos="fade-up" data-aos-delay="400" data-aos-once="false">
        <div
          className="w-full md:w-[600px] h-auto md:h-[250px] md:-translate-y-[70px] md:ml-2 rounded-xl shadow-[-4px_12px_12px_rgba(0,0,0,0.25)] p-5 md:p-7 transition-all duration-300 transform hover:scale-105 hover:brightness-110 hover:shadow-xl"
          style={{ backgroundImage: "var(--gradient-accent)" }}
        >
          <div className="md:-translate-y-[7px]">
            <div className="flex items-center space-x-1 md:space-x-3 mb-2">
              <img src={aboutData.misi.icon} alt="Ikon Misi" className="w-6 md:w-8" />
              <h3 className="font-bold tracking-widest uppercase text-[13px] md:text-[20px] text-gray-900">
                {aboutData.misi.title}
              </h3>
            </div>

            <ul className="space-y-1 md:space-y-2 text-[12px] md:text-[17px] leading-[13px] md:leading-relaxed md:pl-4 pr-1 md:pr-3 text-gray-800 font-medium">
              {aboutData.misi.items.map((mi, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckIcon />
                  <span>{mi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
