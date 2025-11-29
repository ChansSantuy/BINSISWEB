// File: src/components/Ekskul.tsx
import React from "react";
import { ekskulIcons, type EkskulItem } from "../data/homepage/homepageData";
 
export default function Ekskul(): React.ReactElement {
  const outerRef = React.useRef<HTMLDivElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const centerIconRef = React.useRef<HTMLElement | null>(null);
  const centerTitleRef = React.useRef<HTMLHeadingElement | null>(null);
  const centerSubRef = React.useRef<SVGTextPathElement | null>(null);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const descCardRef = React.useRef<HTMLDivElement | null>(null);
  const descImgRef = React.useRef<HTMLImageElement | null>(null);
  const descTitleRef = React.useRef<HTMLHeadingElement | null>(null);
  const descTextRef = React.useRef<HTMLParagraphElement | null>(null);

  const [selected, setSelected] = React.useState<EkskulItem | null>(ekskulIcons[0]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  // pause/resume/reset helpers
  const pauseAllAnimations = () => {
    [outerRef.current, innerRef.current].forEach((el) => {
      if (el) el.style.animationPlayState = "paused";
    });
    document.querySelectorAll<HTMLElement>(".icon-wrapper-outer, .icon-wrapper-inner").forEach((el) => {
      el.style.animationPlayState = "paused";
    });
  };

  const resumeAllAnimations = () => {
    [outerRef.current, innerRef.current].forEach((el) => {
      if (el) el.style.animationPlayState = "running";
    });
    document.querySelectorAll<HTMLElement>(".icon-wrapper-outer, .icon-wrapper-inner").forEach((el) => {
      el.style.animationPlayState = "running";
    });
  };

  const resetAllAnimations = () => {
    const oc = outerRef.current;
    const ic = innerRef.current;
    if (oc) {
      oc.style.animation = "none";
      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      oc.offsetWidth;
      oc.style.animation = "rotateClockwise 30s linear infinite";
    }
    if (ic) {
      ic.style.animation = "none";
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ic.offsetWidth;
      ic.style.animation = "rotateCounter 45s linear infinite";
    }

    document.querySelectorAll<HTMLElement>(".icon-wrapper-outer").forEach((el) => {
      el.style.animation = "none";
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetWidth;
      el.style.animation = "rotateCounter 30s linear infinite";
    });
    document.querySelectorAll<HTMLElement>(".icon-wrapper-inner").forEach((el) => {
      el.style.animation = "none";
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetWidth;
      el.style.animation = "rotateClockwise 45s linear infinite";
    });
  };

  // render icons positioned around rings (imperative, kept for performance & layout calc)
  const renderIcons = React.useCallback(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // clear previous
    outer.innerHTML = "";
    inner.innerHTML = "";

    const ringSize = outer.offsetWidth;
    const innerSize = inner.offsetWidth;
    if (ringSize < 50 || innerSize < 50) {
      requestAnimationFrame(renderIcons);
      return;
    }

    const center = ringSize / 2;
    const innerCenter = innerSize / 2;
    const iconSize = ringSize < 400 ? 40 : 48;
    const halfIcon = iconSize / 2;

    const outerIcons = ekskulIcons.slice(0, 6);
    const innerIcons = ekskulIcons.slice(6);

    outerIcons.forEach((item, i) => {
      const angle = (i / outerIcons.length) * 2 * Math.PI - Math.PI / 2;
      const x = center + (ringSize / 2) * Math.cos(angle) - halfIcon;
      const y = center + (ringSize / 2) * Math.sin(angle) - halfIcon;

      const el = document.createElement("div");
      el.className = `absolute w-8 h-8 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-blue-200 hover:scale-110 transition-all duration-300`;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.setAttribute('data-aos', 'fade-up');
      el.setAttribute('data-aos-delay', (i * 100).toString());
      el.setAttribute('data-aos-once', 'true');
      el.innerHTML = `
        <div class="icon-wrapper-outer relative group">
          <i class="fas ${item.icon} text-blue-500 text-sm md:text-xl"></i>
        </div>
      `;

      el.addEventListener("mouseenter", () => {
        pauseAllAnimations();
        setSelected(item);
        if (centerIconRef.current) {
          centerIconRef.current.className = `fa-solid ${item.icon} text-white text-[28px] md:text-[38px] lg:text-[40px]`;
        }
        if (centerTitleRef.current) centerTitleRef.current.textContent = item.label;
        if (centerSubRef.current) centerSubRef.current.textContent = item.tagline;
      });

      el.addEventListener("mouseleave", resumeAllAnimations);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelected(item);
        if (centerIconRef.current) {
          centerIconRef.current.className = `fa-solid ${item.icon} text-white text-[28px] md:text-[38px] lg:text-[40px]`;
        }
        if (centerTitleRef.current) centerTitleRef.current.textContent = item.label;
        if (centerSubRef.current) centerSubRef.current.textContent = item.tagline;
      });

      outer.appendChild(el);
    });

    innerIcons.forEach((item, i) => {
      const angle = (i / innerIcons.length) * 2 * Math.PI;
      const x = innerCenter + (innerSize / 2) * Math.cos(angle) - halfIcon;
      const y = innerCenter + (innerSize / 2) * Math.sin(angle) - halfIcon;

      const el = document.createElement("div");
      el.className = `absolute w-8 h-8 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-blue-200 hover:scale-110 transition-all duration-300`;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.setAttribute('data-aos', 'fade-up');
      el.setAttribute('data-aos-delay', ((i + 6) * 100).toString());
      el.setAttribute('data-aos-once', 'true');
      el.innerHTML = `
        <div class="icon-wrapper-inner relative group">
          <i class="fas ${item.icon} text-blue-500 text-sm md:text-xl"></i>
        </div>
      `;

      el.addEventListener("mouseenter", () => {
        pauseAllAnimations();
        setSelected(item);
        if (centerIconRef.current) {
          centerIconRef.current.className = `fa-solid ${item.icon} text-white text-[28px] md:text-[38px] lg:text-[40px]`;
        }
        if (centerTitleRef.current) centerTitleRef.current.textContent = item.label;
        if (centerSubRef.current) centerSubRef.current.textContent = item.tagline;
      });

      el.addEventListener("mouseleave", resumeAllAnimations);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelected(item);
        if (centerIconRef.current) {
          centerIconRef.current.className = `fa-solid ${item.icon} text-white text-[28px] md:text-[38px] lg:text-[40px]`;
        }
        if (centerTitleRef.current) centerTitleRef.current.textContent = item.label;
        if (centerSubRef.current) centerSubRef.current.textContent = item.tagline;
      });

      inner.appendChild(el);
    });
  }, []);

  // initial render and resize handling
  React.useEffect(() => {
    renderIcons();
    resetAllAnimations();
    let resizeTimeout: number | undefined;
    const handleResize = () => {
      pauseAllAnimations();
      if (resizeTimeout !== undefined) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(() => {
        renderIcons();
        resetAllAnimations();
      }, 250);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
   }, [renderIcons]);

  // sync center content when `selected` changes externally
  React.useEffect(() => {
    if (!selected) return;
    if (centerIconRef.current) {
      centerIconRef.current.className = `fa-solid ${selected.icon} text-white text-[28px] md:text-[38px] lg:text-[40px]`;
    }
    if (centerTitleRef.current) centerTitleRef.current.textContent = selected.label;
    if (centerSubRef.current) centerSubRef.current.textContent = selected.tagline;
    if (expanded && descImgRef.current && descTitleRef.current && descTextRef.current) {
      descImgRef.current.src = selected.img;
      descTitleRef.current.textContent = `${selected.label} - ${selected.tagline}`;
      descTextRef.current.textContent = selected.deskripsi;
    }
  }, [selected, expanded]);

// helpers to open/close the description card with animation
const openDescCard = () => {
  if (!descCardRef.current || !wrapperRef.current) return;

  pauseAllAnimations();

  // swap layout to grid so the desc card appears on the right
  wrapperRef.current.classList.remove("flex");
  wrapperRef.current.classList.add("md:grid", "grid-cols-1", "md:grid-cols-2");

  // show card (remove hidden) then animate
  descCardRef.current.classList.remove("hidden");
  // ensure no leftover classes
  descCardRef.current.classList.remove("eksul-desc-closing");
  // force reflow for reliable transition
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  descCardRef.current.offsetWidth;
  descCardRef.current.classList.add("eksul-desc-open");

  // fill content
  if (descImgRef.current && selected) descImgRef.current.src = selected.img;
  if (descTitleRef.current && selected) descTitleRef.current.textContent = `${selected.label} - ${selected.tagline}`;
  if (descTextRef.current && selected) descTextRef.current.textContent = selected.deskripsi;

  // small delay to re-render icons and restart rotations smoothly
  setTimeout(() => {
    renderIcons();
    resetAllAnimations();
  }, 300);

  setExpanded(true);
};

const closeDescCard = () => {
  if (!descCardRef.current || !wrapperRef.current) return;

  // animate out
  descCardRef.current.classList.remove("eksul-desc-open");
  descCardRef.current.classList.add("eksul-desc-closing");

  // after animation duration hide completely and revert layout
  const duration = 440; // should match CSS transition (ms)
  setTimeout(() => {
    // hide card
    descCardRef.current?.classList.add("hidden");
    descCardRef.current?.classList.remove("eksul-desc-closing");

    // revert wrapper back to flex layout so circle centers again
    wrapperRef.current?.classList.remove("md:grid", "grid-cols-1", "md:grid-cols-2");
    wrapperRef.current?.classList.add("flex");

    // re-layout icons and resume animations
    renderIcons();
    resetAllAnimations();
    resumeAllAnimations();

    setExpanded(false);
  }, duration);
};

const onCenterClick = () => {
  if (!selected) return;

  if (window.innerWidth < 768) {
    // mobile: open modal (unchanged)
    setModalOpen(true);
    return;
  }

  // desktop: toggle
  if (!expanded) {
    openDescCard();
  } else {
    closeDescCard();
  }
};


  const closeModal = () => setModalOpen(false);

  return (
    <>
      <section id="EKSKUL" className="section-snap w-full max-w-7xl mx-auto px-8 py-16 font-[League_Spartan] overflow-hidden">
        <header className="text-center mb-24">
          <h2 className="text-3xl font-bold mb-2">BUKAN SEKADAR EKSKUL BIASA!</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Eksplor 12 ekskul di SMK Bina Siswa 2 Cililin dan temukan passion terbaikmu!
          </p>
        </header>

        <div id="eksul-wrapper" className="py-5 md:py-5 transition-all duration-500 flex justify-center">
          <div
            id="eksul-layout"
            ref={wrapperRef}
            className="flex flex-col md:flex-row lg:gap-28 items-center justify-center"
          >
            <div className="flex justify-center w-full md:w-auto order-1 pb-10 md:pb-0">
              <div className="relative w-[280px] sm:w-[450px] lg:w-[500px] aspect-square flex items-center justify-center">
                {/* Outer Ring (rendered icons appended here) */}
                <div
                  id="outer-ring"
                  ref={outerRef}
                  className="absolute inset-0 rounded-full border-[2px] border-dashed border-[#1CA4FF] z-0 animate-spin-slow"
                />

                {/* Inner Ring */}
                <div
                  id="inner-ring"
                  ref={innerRef}
                  className="absolute w-[180px] md:w-[300px] lg:w-[350px] aspect-square rounded-full border-[2px] border-dashed border-[#1CA4FF] z-0 animate-spin-reverse-slow"
                />

                {/* Center Card */}
                <div
                  id="center-info"
                  onClick={onCenterClick}
                  className="relative w-[100px] sm:w-[170px] md:w-[200px] lg:w-[220px] aspect-square bg-white rounded-full shadow-soft flex flex-col items-center justify-center text-center z-10 cursor-pointer hover:scale-105 transition"
                >
                  <div className="w-12 sm:w-16 md:w-20 lg:w-20 aspect-square rounded-full gradient-main flex items-center justify-center shadow-inner mb-2">
                    <i
                      ref={centerIconRef}
                      id="center-icon"
                      className="fa-solid fa-star text-white text-[24px] md:text-[38px] lg:text-[40px]"
                    />
                  </div>

                  <h1
                    id="center-title"
                    ref={centerTitleRef}
                    className="font-semibold text-[12px] sm:text-[20px] md:text-[24px] lg:text-[26px] text-neutral-800 tracking-normal leading-none"
                  >
                    choose your passion
                  </h1>

                  <svg
                    viewBox="0 0 200 200"
                    className="absolute hidden sm:block sm:-mt-16 md:-mt-12 -ml-2 md:-ml-[] w-[200px] h-[250px] md:w-[250px] md:h-[300px] pointer-events-none z-10"
                  >
                    <defs>
                      <path id="bottomCurve" d="M 25 120 A 60 60 0 0 0 180 120" />
                    </defs>
                    <text
                      fill="#6B7280"
                      className="text-[8px] md:text-[12px]"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <textPath id="center-subtitle" ref={centerSubRef as React.RefObject<SVGTextPathElement>} xlinkHref="#bottomCurve" startOffset="50%" />
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card Ekskul Deskriptif */}
<div
  id="eksul-description-card"
  ref={descCardRef}
  // initially hidden via .hidden; animations controlled by JS via classes:
  className="hidden mt-10 md:mt-0 max-w-md w-full mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-soft bg-white transition-all duration-500 transform md:order-2"
  aria-hidden={!expanded}
>
  <img id="desc-img" ref={descImgRef} src={undefined} alt="" className="w-full h-44 md:h-56 object-cover object-center" />
  <div className="p-4 md:p-6">
    <h1 id="desc-title" ref={descTitleRef} className="text-lg md:text-2xl font-bold text-gray-800 mb-2" />
    <p id="desc-text" ref={descTextRef} className="text-sm md:text-base text-gray-600 leading-relaxed" />
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Modal (mobile) */}
      {modalOpen && selected && (
        <div
          id="eksul-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md overflow-hidden relative">
            <button
              id="close-modal"
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              <i className="fas fa-times text-xl" />
            </button>

            <img id="modal-img" src={selected.img} alt={selected.label} className="w-full h-44 object-cover object-center" />
            <div className="p-4">
              <h1 id="modal-title" className="text-lg font-bold text-gray-800 mb-2">
                {selected.label} - {selected.tagline}
              </h1>
              <p id="modal-text" className="text-sm text-gray-600 leading-relaxed">
                {selected.deskripsi}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles & keyframes used by original script */}
      <style>{`
      
        /* Description card enter/exit helpers */
.eksul-desc-open {
  opacity: 1 !important;
  transform: translateX(0) scale(1) !important;
  pointer-events: auto !important;
  transition: transform 420ms cubic-bezier(.22,.9,.35,1), opacity 420ms ease;
}

/* starting state when we just removed 'hidden' — JS forces reflow then adds eksul-desc-open */
#eksul-description-card {
  opacity: 0;
  transform: translateX(1rem) scale(.98);
  pointer-events: none;
}

/* closing animation */
.eksul-desc-closing {
  opacity: 0 !important;
  transform: translateX(1.5rem) scale(.96) !important;
  pointer-events: none !important;
  transition: transform 420ms cubic-bezier(.22,.9,.35,1), opacity 420ms ease;
}

/* keep mobile behavior (we still keep it hidden by default) */
/* optional: smoother focus outline */
#eksul-description-card:focus {
  outline: none;
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
}

      `}</style>
    </>
  );
}
