// File: components/Footer.tsx
import React from "react";

export interface FooterProps {
  logoSrc?: string;
  tiktokHref?: string;
  instagramHref?: string;
}

const Footer: React.FC<FooterProps> = ({
  logoSrc = "/assets/Icon/support/14.png",
  tiktokHref = "#",
  instagramHref = "#",
}) => {
  const year = new Date().getFullYear();

  return (
    <>    <footer className="px-4 md:px-10 translate-y-8 overflow-hidden py-8">
      <div className="shadow-soft py-4 px-10 bg-gradient-to-r from-[#508FD4] to-[#CFA64D] w-full rounded-[30px] text-white grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo */}
        <div
          data-aos="zoom-in"
          data-aos-delay="0"
          data-aos-once="false"
          className="flex flex-col gap-1 items-center translate-y-8 mb-8 md:mb-0"
        >
          <img src={logoSrc} alt="Logo Sekolah" className="w-72 md:w-80 hover:scale-110 transition-transform duration-300" />
        </div>

        {/* Navigasi + Akademik */}
        <div className="grid grid-cols-2 md:grid-cols-4 justify-center mx-auto max-w-fit gap-y-6 md:gap-x-72 text-center lg:text-left md:translate-x-36 translate-y-6">

          {/* Navigasi */}
          <div
            data-aos="fade-right"
            data-aos-delay="150"
            data-aos-once="false"
            className="flex flex-col gap-4 items-center lg:items-start whitespace-nowrap"
          >
            <h3 className="font-semibold text-lg md:text-xl">Navigasi</h3>
            <a href="/" className="text-white/80 hover:text-white text-sm md:text-base">Beranda</a>
            <a href="/profil" className="text-white/80 hover:text-white text-sm md:text-base">Profil Sekolah</a>
            <a href="/jurusan" className="text-white/80 hover:text-white text-sm md:text-base">Kompetensi Keahlian</a>
            <a href="/berita" className="text-white/80 hover:text-white text-sm md:text-base">Berita & Kegiatan</a>
          </div>

          {/* Akademik */}
          <div
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-once="false"
            className="flex flex-col gap-4 items-center lg:items-start whitespace-nowrap"
          >
            <h3 className="font-semibold text-lg md:text-xl">Akademik</h3>
            <a href="/kurikulum" className="text-white/80 hover:text-white text-sm md:text-base">Kurikulum</a>
            <a href="/ekstrakurikuler" className="text-white/80 hover:text-white text-sm md:text-base">Ekstrakurikuler</a>
            <a href="/prestasi" className="text-white/80 hover:text-white text-sm md:text-base">Prestasi Siswa</a>
          </div>
        </div>
 
        {/* Ikuti Kami */}
        <div
          data-aos="flip-up"
          data-aos-delay="450"
          data-aos-once="false"
          className="flex flex-col gap-4 items-center md:translate-y-14 translate-y-7 md:translate-x-80"
        >
          <h3 className="font-semibold text-xl">Ikuti Kami</h3>
          <div className="flex gap-4">
            <a href={tiktokHref} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <img src="/assets/Icon/tiktokIcon.png" alt="TikTok" className="w-14" />
            </a>
            <a href={instagramHref} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <img src="/assets/Icon/instaIcon.png" alt="Instagram" className="w-14" />
            </a>
          </div>
        </div>

        {/* Footer Bottom Info */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-once="false"
          className="col-span-full mt-4 pt-4 border-t border-white/30 text-xs text-white/70 text-center"
        >
          <p>Copyright © {year} SMK Bina Siswa 2 Cililin. All rights reserved.</p>
          <div className="mt-1 flex flex-wrap justify-center gap-x-2 gap-y-1">
            <a href="/terms" className="underline hover:text-white">Terms & Conditions</a>
            <span>|</span>
            <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>
            <span>|</span>
            <a href="/cookies" className="underline hover:text-white">Cookies Policy</a>
            <span>|</span>
            <a href="/copyright" className="underline hover:text-white">Copyright Notice</a>
            <span>|</span>
            <a href="/cookie-settings" className="underline hover:text-white">Cookie Settings</a>
          </div>
        </div>
      </div>

    </footer>
<div className="mb-6 w-2 h-10 overflow-hidden"></div>
    </>

  );
};

export default Footer;
