import React, { useEffect, useRef, useState } from "react";
import { motion, Reorder } from "framer-motion";
import type { Transition } from "framer-motion";
 
interface JurusanItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
}
 
const jurusanDataOriginal: JurusanItem[] = [
  {
    id: "tsm",
    icon: "/assets/Icon/TSM_ICON.png",
    title: "TEKNIK SEPEDA MOTOR",
      desc: `<span>Jurusan buat anak mesin sejati!! Belajar tune up, injeksi, kelistrikan, sampai bongkar mesin tanpa ragu.
          Langsung praktik, langsung bisa. Siap kerja di bengkel resmi atau buka bengkel sendiri.</span>`,
  },
  {
    id: "tkj",
    icon: "/assets/Icon/TKJ_ICON.png",
    title: "TEKNIK KOMPUTER JARINGAN",
    desc: `<span>membekali siswa dengan keahlian paling dicari industri, mulai dari instalasi dan konfigurasi jaringan (LAN/WiFi),
          infrastruktur perusahaan, administrasi server & keamanan siber, troubleshooting hardware/software,
          hingga persiapan sertifikasi kompetensi nasional.</span>`,
  },
  {
    id: "bsm",
    icon: "/assets/Icon/BISNIS_ICONS.png",
    title: "BISNIS DAN PEMASARAN",
    desc: `<span>Di sini kamu belajar hal-hal penting dalam dunia bisnis seperti ngatur manajemen, bikin strategi digital marketing, 
        baca arah pasar, sampai ngehandle pelanggan dan ngelola toko offline maupun online. Cocok buat kamu yang pengen 
        terjun ke dunia bisnis.</span>`,

  },
];


const motionTransition: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 30,
  mass: 0.9,
  duration: 0.9,
};

export default function JurusanFramer(): React.ReactElement {
  const [items, setItems] = useState<string[]>(jurusanDataOriginal.map((d) => d.id));

  // store static mapping id->data in a ref so it's stable between renders
  const dataByIdRef = useRef<Record<string, JurusanItem>>(
    jurusanDataOriginal.reduce((acc, d) => {
      acc[d.id] = d;
      return acc;
    }, {} as Record<string, JurusanItem>)
  );

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);

  // update title/desc whenever center item changes
  useEffect(() => {
    const centerId = items[1];
    const center = dataByIdRef.current[centerId];
    if (titleRef.current) titleRef.current.textContent = center.title;
    if (descRef.current) descRef.current.innerHTML = center.desc;
  }, [items]);

  // prevent drag & right-click on images (cleanup on unmount)
  useEffect(() => {
    const imgs = Array.from(document.querySelectorAll("img")) as HTMLImageElement[];
    const handlers = new Map<HTMLImageElement, EventListener>();

    imgs.forEach((img) => {
      img.setAttribute("draggable", "false");
      const handler = (e: Event) => e.preventDefault();
      handlers.set(img, handler);
      img.addEventListener("dragstart", handler);
    });

    const onContext = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.tagName === "IMG") e.preventDefault();
    };

    document.addEventListener("contextmenu", onContext);

    return () => {
      handlers.forEach((handler, img) => img.removeEventListener("dragstart", handler));
      document.removeEventListener("contextmenu", onContext);
    };
  }, []);

  // bring clicked index to center (index 1)
  const bringToCenter = (clickedIndex: number): void => {
    if (clickedIndex === 1) return;
    const newOrder = [...items];
    const [clickedId] = newOrder.splice(clickedIndex, 1);
    newOrder.splice(1, 0, clickedId);
    setItems(newOrder);
  };

  return (
    <section className="w-full px-4 py-16 text-center font-[League_Spartan] translate-y-[20px] md:translate-y-[10px] overflow-hidden">
      <div className="mb-20" data-aos="fade-up" data-aos-once="false">
        <h2 className="text-[24px] md:text-[33px] font-extrabold text-gray-900 mb-1 md:mb-4 leading-5 uppercase">
          Program Keahlian
        </h2>
        <p className="mt-2 text-gray-600 text-[14px] md:text-[16px] leading-[22px] md:leading-[23px] hidden md:block">
          SMK Bina Siswa 2 Cililin menawarkan program keahlian unggulan yang dirancang untuk
          <br />
          mempersiapkan siswa menjadi tenaga kerja siap pakai dan profesional di bidangnya masing-masing.
        </p>
        <p className="text-gray-600 text-[14px] md:text-[16px] leading-[22px] md:leading-[23px] block md:hidden">
          Siapkan diri jadi tenaga siap kerja bersama SMK Bina Siswa 2 Cililin.
        </p>
      </div>

      <div data-aos="fade-up" data-aos-delay="300" data-aos-once="false">
        <div>
          <Reorder.Group
            axis="x"
            values={items}
            onReorder={setItems}
            className="jurusan-list relative flex w-full max-w-4xl mx-auto h-40 items-center justify-center"
          >
            {items.map((id, idx) => {
              const jurusan = dataByIdRef.current[id];

              let transformClass = "";
              if (idx === 0)
                transformClass = "translate-x-[-15px] md:translate-x-[-80px] translate-y-[30px] md:translate-y-[20px]";
              if (idx === 1) transformClass = "translate-y-[-20px] scale-110 z-10";
              if (idx === 2)
                transformClass = "translate-x-[15px] md:translate-x-[80px] translate-y-[30px] md:translate-y-[20px]";

              const wrapperSizeClass = idx === 1 ? "w-28 md:w-36 h-28 md:h-36" : "w-24 md:w-32 h-24 md:h-32";

              return (
                <Reorder.Item
                  key={id}
                  value={id}
                  initial={false}
                  layout
                  data-pos={idx === 1 ? "center" : "side"}
                  className={`transform ${transformClass} transition-none cursor-pointer relative`}
                  onClick={() => bringToCenter(idx)}
                  whileHover={{ scale: idx === 1 ? 1.14 : 1.06 }}
                  transition={motionTransition}
                >
                  <motion.div
                    layoutId={jurusan.id}
                    className={`${wrapperSizeClass} rounded-full bg-[#2F71DC] border-[5px] md:border-[7px] border-[#1F2937] shadow-soft flex items-center justify-center overflow-hidden relative group`}
                    transition={motionTransition}
                    style={{ transformOrigin: "50% 50%" }}
                    animate={{ scale: idx === 1 ? 1.12 : 1 }}
                  >
                    <img
                      src={jurusan.icon}
                      alt={jurusan.title}
                      className="jurusan-img w-[4rem] md:w-[5rem] pointer-events-none select-none"
                      draggable={false}
                    />
                  </motion.div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>

        <div className="-my-5 md:my-0 relative" data-aos="fade-up" data-aos-delay="500" data-aos-once="false">
          <div className="absolute left-1/2 -translate-x-1/2 top-full h-10 w-[2px] border-l-2 border-dotted border-blue-600"></div>
          <div className="absolute -translate-x-1/2 left-1/2 top-full mt-[48px] w-4 h-4 bg-[#2F71DC] rounded-full shadow-md"></div>
        </div>

        <div data-aos="fade-left" data-aos-delay="500" data-aos-once="false">
          <h3 ref={titleRef} className="mt-[80px] text-[20px] font-bold text-gray-800 font-[Inter] rounded-xl">
            {dataByIdRef.current[items[1]].title}
          </h3>
        </div>

        <div data-aos="fade-right" data-aos-delay="700" data-aos-once="false">
          <div
            ref={descRef}
            style={{ backgroundImage: "var(--gradient-main)" }}
            className="p-6 md:p-8 mt-4 md:mt-6 mx-auto w-full text-justify md:text-center max-w-md md:max-w-3xl md:w-[700px] text-white text-xs md:text-[14px] font-medium font-inter transition-all duration-300 hover:scale-105 hover:brightness-105 shadow-medium rounded-xl"
            dangerouslySetInnerHTML={{ __html: dataByIdRef.current[items[1]].desc }}
          />
        </div>
      </div>
    </section>
  );
}