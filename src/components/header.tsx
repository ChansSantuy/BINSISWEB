// File: src/components/headerDesk.tsx
import React, { useEffect, useRef, useState } from "react";
import { menuData, newsData, tagColorMap, type MenuItem } from "../data/homepage/homepageData";
import { HERO_IDS,HEADER_IDS  } from "../data/homepage/ids";
import "animate.css";
  
const HeaderDesk: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

const [, setIsMenuOpenState] = useState<boolean>(false);

    // mutable refs for DOM-driven state
  const isMenuOpen = useRef(false);
  const positionRef = useRef<"onhero" | "nonhero">("onhero");
  const lastScrollTopRef = useRef<number>(0);
  const hideTimeoutRef = useRef<number | null>(null);
  const navbarTimeoutRef = useRef<number | null>(null);

  // carousel state for latestNews (desktop)
  const [newsIndex, setNewsIndex] = useState(0);
  const carouselIntervalRef = useRef<number | null>(null);
  const [carouselPaused, setCarouselPaused] = useState(false);

  // touch swipe refs
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);
  const isTouchingRef = useRef<boolean>(false);

  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

const newsArray = Array.isArray(newsData) ? newsData : [newsData];
const currentNews = newsArray.length > 0 ? newsArray[newsIndex % newsArray.length] : null;

  const clearHideTimeout = () => {
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };
  const clearNavbarTimeout = () => {
    if (navbarTimeoutRef.current) {
      window.clearTimeout(navbarTimeoutRef.current);
      navbarTimeoutRef.current = null;
    }
  };

  const sanitizeSvg = (svg?: string) => {
    if (!svg) return "";
    let s = svg.replace(/<\/pathd.*?>/gi, "</path>");
    s = s.replace(/&gt;/g, ">");
    return s.trim();
  };

  useEffect(() => {
    const start = () => {
      if (carouselIntervalRef.current) return;
      carouselIntervalRef.current = window.setInterval(() => {
        setNewsIndex((prev) => {
          const len = newsArray.length;
          if (len <= 1) return prev;
          return (prev + 1) % len;
        });
      }, 3500) as unknown as number;
    };
    const stop = () => {
      if (carouselIntervalRef.current) {
        window.clearInterval(carouselIntervalRef.current);
        carouselIntervalRef.current = null;
      }
    };

    if (!isMobile() && !carouselPaused) start();
    else stop();

    return () => stop();
   }, [carouselPaused, newsArray.length]);

  useEffect(() => {
    const mega = document.getElementById("megamenu-with-image");
    if (!mega) return;
    const onEnter = () => setCarouselPaused(true);
    const onLeave = () => setCarouselPaused(false);

    mega.addEventListener("mouseenter", onEnter);
    mega.addEventListener("mouseleave", onLeave);

    return () => {
      mega.removeEventListener("mouseenter", onEnter);
      mega.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ---- robust DOM init: wait for elements if they are rendered after HeaderDesk ----
  useEffect(() => {
    let stopped = false;
    const POLL_INTERVAL = 80;
    const POLL_TIMEOUT = 3000; // try up to 3s
    let elapsed = 0;
    let pollHandle: number | null = null;

    const waitForElements = () =>
      new Promise<{
        menuBtn: HTMLElement | null;
        arrow: HTMLElement | null;
        megaMenu: HTMLElement | null;
        navbar: HTMLElement | null;
        navContent: HTMLElement | null;
        hero: HTMLElement | null;
        brandLogo: HTMLElement | null;
        brandTitle: HTMLElement | null;
        mobileBtn: HTMLElement | null;
      }>((resolve, reject) => {
        const poll = () => {
          if (stopped) {
            reject(new Error("stopped"));
            return;
          }
          const menuBtn = document.getElementById("menu-button");
          const arrow = document.getElementById("menu-arrow");
          const megaMenu = document.getElementById("megamenu-with-image");
          const navbar = document.getElementById("navbar");
          const navContent = document.getElementById("navbar-content");
          // use HERO_IDS constant for hero lookup
          const hero = document.getElementById(HERO_IDS.SECTION);
          const brandLogo = document.getElementById("brand-logo");
          const brandTitle = document.querySelector("#brand-logo h1") as HTMLElement | null;
          const mobileBtn = document.getElementById("menu-mobile-button");

          // resolve even if some optional elements missing, but navbar & navContent must exist
          if (navbar && navContent) {
            resolve({ menuBtn, arrow, megaMenu, navbar, navContent, hero, brandLogo, brandTitle, mobileBtn });
            return;
          }

          elapsed += POLL_INTERVAL;
          if (elapsed >= POLL_TIMEOUT) {
            // fallback resolve with whatever found (so app won't hang)
            resolve({ menuBtn, arrow, megaMenu, navbar, navContent, hero, brandLogo, brandTitle, mobileBtn });
            return;
          }

          pollHandle = window.setTimeout(poll, POLL_INTERVAL) as unknown as number;
        };

        poll();
      });

    const cleanupFns: Array<() => void> = [];

    waitForElements()
      .then((els) => {
        if (stopped) return;
        const { menuBtn, arrow, megaMenu, navbar, navContent, hero, brandLogo, brandTitle, mobileBtn } = els;

        const NAVBAR_HIDE_DELAY = 5000;
        const MENU_HIDE_DELAY = 150;

        const applyNavbarStyle = (style: "transparent" | "glass" | "white" | "hidden") => {
          if (!navbar || !navContent) return;
          navbar.classList.remove("navbar-transparent", "navbar-glass", "bg-white", "text-white", "text-black", "shadow-md", "hidden-nav", "show-nav");
          navContent.classList.remove("py-1", "py-3", "md:py-3");

          switch (style) {
            case "transparent":
              navbar.classList.add("navbar-transparent", "text-white", "show-nav");
              navContent.classList.add("py-3");
              break;
            case "glass":
              navbar.classList.add("navbar-glass", "text-white", "show-nav");
              navContent.classList.add("py-1");
              break;
            case "white":
              navbar.classList.add("bg-white", "text-black", "shadow-md", "show-nav");
              navContent.classList.add("py-1");
              break;
            case "hidden":
              navbar.classList.add("hidden-nav");
              break;
          }
        };

        const setBrandColor = (color: "white" | "black") => {
          if (!brandTitle) return;
          brandTitle.classList.remove("text-white", "text-black");
          brandTitle.classList.add(color === "white" ? "text-white" : "text-black");
        };

        const showNavbar = () => {
          if (!navbar) return;
          navbar.classList.remove("hidden-nav");
          navbar.classList.add("show-nav");
        };
        const hideNavbar = () => {
          if (!navbar) return;
          navbar.classList.remove("show-nav");
          navbar.classList.add("hidden-nav");
        };
        const startNavbarHideTimeout = () => {
          clearNavbarTimeout();
          navbarTimeoutRef.current = window.setTimeout(() => {
            if (!isMenuOpen.current && positionRef.current === "nonhero") {
              hideNavbar();
            }
          }, NAVBAR_HIDE_DELAY) as unknown as number;
        };
        const stopNavbarHideTimeout = () => {
          clearNavbarTimeout();
        };

        const showMenu = () => {
          clearHideTimeout();
          clearNavbarTimeout();
          isMenuOpen.current = true;
          setIsMenuOpenState(true);
          if (megaMenu) megaMenu.classList.remove("hidden");
          if (overlayRef.current) overlayRef.current.classList.remove("hidden");
          if (arrow) arrow.classList.add("rotate-up");
          applyNavbarStyle("white");
          // keep default behavior for both desktop and mobile when menu opens
          if (brandTitle) {
            setBrandColor("black");
          }
        };

        const hideMenu = () => {
          clearHideTimeout();
          hideTimeoutRef.current = window.setTimeout(() => {
            isMenuOpen.current = false;
            setIsMenuOpenState(false);
            if (megaMenu) megaMenu.classList.add("hidden");
            if (overlayRef.current) overlayRef.current.classList.add("hidden");
            if (arrow) arrow.classList.remove("rotate-up");

            const scrollTop = window.scrollY;
            if (positionRef.current === "onhero") {
              if (scrollTop === 0) {
                applyNavbarStyle("transparent");
                // mobile: at top -> black; desktop: keep original (white)
                if (brandTitle) {
                  if (isMobile()) setBrandColor("black");
                  else setBrandColor("white");
                }
              } else {
                applyNavbarStyle("glass");
                if (brandTitle) {
                  if (isMobile()) setBrandColor("white");
                  else setBrandColor("white");
                }
              }
              showNavbar();
            } else {
              applyNavbarStyle("white");
              if (brandTitle) {
                // both desktop & mobile non-hero -> black
                setBrandColor("black");
              }
              startNavbarHideTimeout();
            }
          }, MENU_HIDE_DELAY) as unknown as number;
        };

        const onMenuBtnEnter = () => showMenu();
        const onMenuBtnLeave = () => hideMenu();

        const onMegaMenuEnter = () => {
          clearHideTimeout();
          stopNavbarHideTimeout();
        };
        const onMegaMenuLeave = () => {
          hideMenu();
        };

        const onNavbarEnter = () => {
          stopNavbarHideTimeout();
        };
        const onNavbarLeave = () => {
          if (!isMenuOpen.current && positionRef.current === "nonhero") {
            startNavbarHideTimeout();
          }
        };

        const onScroll = () => {
          const scrollTop = window.scrollY || 0;
          const heroEl = hero; // obtained via HERO_IDS
          const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight : 0;
          const isScrollingUp = scrollTop < lastScrollTopRef.current;

          if (scrollTop < heroBottom) {
            positionRef.current = "onhero";
            stopNavbarHideTimeout();
            showNavbar();

            if (scrollTop === 0) {
                      if (!isMobile()) {
  if (positionRef.current === "onhero") {
    navContent?.classList.remove("md:py-1");
    navContent?.classList.add("md:py-3");
  } 
}
          if (!isMobile()) {
                if (isMenuOpen.current) {
                  applyNavbarStyle("white");
                  if (brandTitle) setBrandColor("black");
                } else {
                  applyNavbarStyle("transparent");
                  if (brandTitle) setBrandColor("white");
                }
                if (brandLogo) {
brandLogo.classList.remove("mt-1", "py-1.5");
brandLogo.classList.add("mt-2", "py-1");
}    
          } else {
            if (brandLogo) {
brandLogo.classList.remove("mt-1", "py-1.5");
brandLogo.classList.add("mt-1.5", "py-1");
}    
                // mobile at top -> black regardless of menu
                if (isMenuOpen.current) applyNavbarStyle("white");
                else applyNavbarStyle("transparent");
                if (brandTitle) setBrandColor("black");
              }
            } else {
           
              if (!isMobile()) {
                
                if (isMenuOpen.current) {
                  applyNavbarStyle("white");
                  if (brandTitle) setBrandColor("black");
                } else {
                  applyNavbarStyle("glass");
                  if (brandTitle) setBrandColor("white");
                }
                 if (brandLogo) {
brandLogo.classList.remove("mt-2", "py-1");
brandLogo.classList.add("mt-1", "py-1.5");
}
              } else {
                if (isMenuOpen.current) applyNavbarStyle("white");
                else applyNavbarStyle("glass");
                if (brandTitle) setBrandColor("white");
   if (brandLogo) {
brandLogo.classList.remove("mt-1.5", "py-1");
brandLogo.classList.add("mt-1", "py-1.5");
}
              }
            }
        
          } else {
            positionRef.current = "nonhero";
            applyNavbarStyle("white");
            if (brandTitle) setBrandColor("black");

            if (isMenuOpen.current) {
              showNavbar();
              stopNavbarHideTimeout();
            } else {
              if (!isScrollingUp) {
                hideNavbar();
              } else {
                showNavbar();
                startNavbarHideTimeout();
              }
            }

         if (!isMobile()) {
  // Jika posisi nonhero dan sedang scroll (bukan di atas hero)
  if (positionRef.current === "nonhero") {
    navContent?.classList.remove("md:py-3");
    navContent?.classList.add("md:py-1");
  } else {
    navContent?.classList.remove("md:py-1");
  }
}

          }

          lastScrollTopRef.current = scrollTop;
        };

        // overlay click closes menu
        const overlay = overlayRef.current;
        const onOverlayClick = () => {
          isMenuOpen.current = false;
          setIsMenuOpenState(false);
          if (megaMenu) megaMenu.classList.add("hidden");
          if (overlay) overlay.classList.add("hidden");
          clearHideTimeout();

          const scrollTop = window.scrollY;
          if (positionRef.current === "onhero") {
            if (scrollTop === 0) applyNavbarStyle("transparent");
            else applyNavbarStyle("glass");
            if (brandTitle) {
              if (isMobile()) {
                // mobile at top -> black; in-hero scrolled -> white
                if (scrollTop === 0) setBrandColor("black");
                else setBrandColor("white");
              } else {
                brandTitle.classList.remove("text-black");
                brandTitle.classList.add("text-white");
              }
            }
            showNavbar();
          } else {
            applyNavbarStyle("white");
            if (brandTitle) setBrandColor("black");
            startNavbarHideTimeout();
          }
        };

        const onMobileClick = () => {
          window.dispatchEvent(new CustomEvent("open-mobile-sidebar"));
        };

        // attach listeners (check existences)
        if (menuBtn) {
          menuBtn.addEventListener("mouseenter", onMenuBtnEnter);
          menuBtn.addEventListener("mouseleave", onMenuBtnLeave);
          cleanupFns.push(() => {
            menuBtn.removeEventListener("mouseenter", onMenuBtnEnter);
            menuBtn.removeEventListener("mouseleave", onMenuBtnLeave);
          });
        }
        if (megaMenu) {
          megaMenu.addEventListener("mouseenter", onMegaMenuEnter);
          megaMenu.addEventListener("mouseleave", onMegaMenuLeave);
          megaMenu.addEventListener("mouseenter", onNavbarEnter);
          megaMenu.addEventListener("mouseleave", onNavbarLeave);
          cleanupFns.push(() => {
            megaMenu.removeEventListener("mouseenter", onMegaMenuEnter);
            megaMenu.removeEventListener("mouseleave", onMegaMenuLeave);
            megaMenu.removeEventListener("mouseenter", onNavbarEnter);
            megaMenu.removeEventListener("mouseleave", onNavbarLeave);
          });
        }

        if (navbar) {
          navbar.addEventListener("mouseenter", onNavbarEnter);
          navbar.addEventListener("mouseleave", onNavbarLeave);
          cleanupFns.push(() => {
            navbar.removeEventListener("mouseenter", onNavbarEnter);
            navbar.removeEventListener("mouseleave", onNavbarLeave);
          });
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        cleanupFns.push(() => window.removeEventListener("scroll", onScroll));

        if (overlay) {
          overlay.addEventListener("click", onOverlayClick);
          cleanupFns.push(() => overlay.removeEventListener("click", onOverlayClick));
        }
        if (mobileBtn) {
          mobileBtn.addEventListener("click", onMobileClick);
          cleanupFns.push(() => mobileBtn.removeEventListener("click", onMobileClick));
        }

        // initial styling
        onScroll();

        // cleanup function
        return () => {
          cleanupFns.forEach((fn) => fn());
        };
      })
      .catch(() => {
        // ignore
      });

    return () => {
      stopped = true;
      if (pollHandle) {
        window.clearTimeout(pollHandle);
        pollHandle = null;
      }
      clearHideTimeout();
      clearNavbarTimeout();
    };
  }, []);

  // touch handlers for swipe on news image (React handlers attached on element)
  const onTouchStart = (e: React.TouchEvent) => {
    isTouchingRef.current = true;
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
    setCarouselPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isTouchingRef.current || touchStartXRef.current == null) return;
    const currentX = e.touches[0].clientX;
    touchDeltaXRef.current = currentX - touchStartXRef.current;
  };

  const onTouchEnd = () => {
    if (!isTouchingRef.current) return;
    const delta = touchDeltaXRef.current;
    isTouchingRef.current = false;
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    setCarouselPaused(false);

    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        prevNews();
      } else {
        nextNews();
      }
    }
  };

  const prevNews = () => {
    setNewsIndex((n) => (newsArray.length ? (n - 1 + newsArray.length) % newsArray.length : n));
    setCarouselPaused(true);
    setTimeout(() => setCarouselPaused(false), 1200);
  };
  const nextNews = () => {
    setNewsIndex((n) => (newsArray.length ? (n + 1) % newsArray.length : n));
    setCarouselPaused(true);
    setTimeout(() => setCarouselPaused(false), 1200);
  };

  const renderSvg = (item: MenuItem) => {
    const hasCustomSvg = !!item.svgPath && item.svgPath.trim() !== "-" && item.svgPath.trim() !== "";
    if (!hasCustomSvg) {
      return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
          <path d="M4 13c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" stroke="#9CA3AF" strokeWidth="1.2" fill="none" />
        </svg>
      );
    }
    const safe = sanitizeSvg(item.svgPath);
    return <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden dangerouslySetInnerHTML={{ __html: safe }} />;
  };

const renderMenuItem = (item: MenuItem, idx: number, delayMs: number) => {
  return (
    <li
      key={idx}
       style={{
         animationDelay: `${delayMs}ms`,
        animationDuration: "600ms",
        animationFillMode: "both", // supaya tetap pada akhir animasi
      }}
       className={`transition-all duration-1000 animate__animated animate__fadeInUp`}
    >
      <a
        href="#"
        className="px-3 py-5 hover:bg-gray-50 hover:rounded-xl flex"
      >
        <div className="rounded-lg w-12 h-12 flex justify-center items-center">
          {renderSvg(item)}
        </div>
        <div className="ml-4 w-4/5">
          <h5 className="text-gray-900 text-base mb-1.5 font-semibold">
            {item.title}
          </h5>
          <p className="text-xs font-medium text-gray-400">{item.desc}</p>
        </div>
      </a>
    </li>
  );
};


  return (
    <>
      {/* overlay for desktop mega menu */}
      <div
        id="overlay-mega"
        ref={overlayRef}
        className={`hidden fixed inset-0 bg-black/20 transition-opacity`}
        onClick={() => {
          const mega = document.getElementById("megamenu-with-image");
          if (mega) mega.classList.add("hidden");
          if (overlayRef.current) overlayRef.current.classList.add("hidden");
          isMenuOpen.current = false;
          setIsMenuOpenState(false);
          clearHideTimeout();
        }}
      />

      <header id="navbar" className="fixed w-full z-50 select-none transition-all duration-300 show-nav text-white navbar-transparent">
        <nav id="navbar-content" className="container mx-auto flex justify-between items-center transition-all duration-300 md:py-3">
          {/* Brand */}
       <div id="brand-logo" className="flex items-center space-x-2 ease-in-out delay-100 hover:scale-105 transition-all duration-300 ml-4 md:ml-0">
<img src="https://i.imghippo.com/files/Ms9413lNc.webp" alt="Logo" className="w-10 h-10 md:h-14 md:w-14" />
<h1 className="text-[12.5px] mt-[1px] leading-[1.3] md:text-base font-bold md:leading-tight uppercase font-[Roboto] italic transition-colors duration-300">
SMK Bina Siswa <br />
2 Cililin
</h1>
</div>

          <div className="hidden md:block group list-none transition-all duration-300">
            <button
              id="menu-button"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-base text-center font-medium hover:text-blue-700 transition-all duration-100"
            >
              MENU
              <svg id="menu-arrow" className="w-3 h-2 mt-1 transition-transform duration-300" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L3.58579 3.58579C4.25245 4.25245 4.58579 4.58579 5 4.58579C5.41421 4.58579 5.74755 4.25245 6.41421 3.58579L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>

            {/* Dropdown menu */}
            <div
              id="megamenu-with-image"
              className="hidden dropdown-menu animate-fade z-10 absolute top-full left-[68px] right-[68px] bg-white rounded-b-lg shadow-md px-6 py-2 group-hover:block"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
            >
              <div className="container mx-auto lg:flex justify-between">
                <div className="p-0 pb-5 pr-4 lg:flex lg:justify-between lg:w-2/3">
                  <ul id="menu-akademik" className="text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                    <h6 className="font-medium text-sm text-gray-500 mb-2 ml-4"> Akademik </h6>
                    {menuData.akademik.map((it, i) => renderMenuItem(it, i, i * 100))}
                  </ul>
                  <ul id="menu-berita" className="text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                    <h6 className="font-medium text-sm text-gray-500 mb-2 ml-5"> Blog/Berita </h6>
                    {menuData.berita.map((it, i) => renderMenuItem(it, i, i * 100))}
                  </ul>
                  <ul id="menu-jurnal" className="text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    <h6 className="font-medium text-sm text-gray-500 mb-2 ml-5"> Journey/Projek </h6>
                    {menuData.jurnal.map((it, i) => renderMenuItem(it, i, i * 100))}
                  </ul>
                </div>

                {/* Latest News carousel (desktop) */}
      <div id="latest-news-box" className="bg-gray-50 p-8 lg:w-2/6 flex flex-col">
  {/* header bar: Latest News (left) + tag/date (right) */}
  <div className="w-full flex items-start justify-between mb-4">
    <h6 className="font-medium text-sm text-gray-500 self-start">Latest News</h6>

    {/* badge kanan — aman akses tagColorMap jika tag tidak ada */}
    {currentNews?.tag && currentNews?.date && (
      <div
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium`}
        // fallback class jika tagColorMap tidak punya entry
        style={{
          // kalau tagColorMap punya property CTA/warna dipakai lewat class; jika tidak, pake inline warna netral
        }}
      >
        <span
          className={`${tagColorMap?.[currentNews.tag]?.bg ?? "bg-gray-100"} ${tagColorMap?.[currentNews.tag]?.text ?? "text-gray-700"} px-2 py-0.5 rounded-full`}
        >
          {currentNews.tag}
        </span>
        <span className="ml-2 text-xs text-gray-400">
          {new Date(currentNews.date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    )}
  </div>

  <div
    id="latest-news-image"
    className="mb-4 relative"
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd}
  >
    <img
      src={currentNews?.image ?? "https://picsum.photos/seed/default/400/200"}
      alt={currentNews?.title ?? "News image"}
      className="w-72 h-36 rounded-lg shadow-sm object-cover mx-auto"
    />
  </div>

  {currentNews && (
    <div id="latest-news-content" className="w-full text-left">
      {/* judul: 1 baris, ellipsis */}
      <h5
        className="text-gray-900 text-base font-semibold mb-2 truncate"
        style={{ maxWidth: "100%" }} // memastikan truncate bekerja
      >
        {currentNews.title ?? "No news"}
      </h5>

      {/* excerpt: rata kiri-kanan (justified) + clamp 2 lines dengan ellipsis */}
      <p
        className="text-sm font-medium text-gray-500 mb-3"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: "justify",
        }}
      >
        {currentNews.excerpt ?? ""}
      </p>

      <a
        href={currentNews.link ?? "#"}
        className={`inline-flex items-center mt-2 text-xs font-semibold ${tagColorMap?.[currentNews.tag]?.cta ?? "text-indigo-600"}`}
      >
        Learn more
        <svg className="ml-2" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M2 8L12.6667 8M9.33333 12L12.8619 8.4714" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </a>
    </div>
  )}

  {newsArray.length > 1 && (
    <div className="flex gap-3 justify-center mt-4">
      <button onClick={prevNews} aria-label="Previous news" className="w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button onClick={nextNews} aria-label="Next news" className="w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )}
</div>


              </div>
            </div>
          </div>

     <button
  id={HEADER_IDS.MENU_MOBILE_BUTTON}
  className="md:hidden absolute right-5 top-1/2 -translate-y-1/2 inline-flex items-center gap-0.5 text-[14px] font-medium hover:text-blue-700 transition-all duration-100"
>
  <svg
    style={{ transform: "rotate(90deg)", transition: "transform 0.3s" }}
    className="w-3 h-3 -translate-y-[1.2px]"
    width="10"
    height="10"
    viewBox="0 0 10 6"
    fill="none"
  >
    <path
      d="M1 1L3.58579 3.58579C4.25245 4.25245 4.58579 4.58579 5 4.58579C5.41421 4.58579 5.74755 4.25245 6.41421 3.58579L9 1"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  <span className="leading-none">MENU</span>
</button>


          {/* Right Action */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="hidden md:block bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-950 hover:scale-110 transition-all duration-300">Daftar SPMB</button>
            <button className="hidden md:block text-white text-xl hover:text-yellow-300 hover:scale-125 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

    </>
  );
};

HeaderDesk.displayName = 'HeaderDesk';

export default HeaderDesk;
