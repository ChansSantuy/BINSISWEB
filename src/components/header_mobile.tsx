// File: src/components/header_mobile.tsx
import React, { useEffect, useRef, useState } from "react";
import { menuData, newsData, tagColorMap, type MenuItem } from "../data/homepage/homepageData";
import { HEADER_IDS  } from "../data/homepage/ids";

type LatestNewsItem = {
  imgSrc?: string;
  image?: string;
  tag?: string;
  date?: string;
  title?: string;
  excerpt?: string;
  desc?: string;
  link?: string;
};

const itemsSidebar = [
  { icon: "fa-solid fa-graduation-cap", isActive: false },
  { icon: "fa-regular fa-newspaper", isActive: false },
  { icon: "fa-solid fa-book", isActive: false },
];

const iconKeys = ["akademik", "berita", "jurnal"];

 
function sanitizeSvg(svg?: string) {
  if (!svg) return "";
  let s = svg.replace(/<\/pathd.*?>/gi, "</path>");
  s = s.replace(/<pathd/gi, "<path");
  s = s.replace(/stroke-width=/gi, "strokeWidth=");
  s = s.replace(/stroke-linecap=/gi, "strokeLinecap=");
  s = s.replace(/stroke-linejoin=/gi, "strokeLinejoin=");
  s = s.replace(/&gt;/g, ">");
  return s.trim();
}


const HeaderMobile: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const sidebarRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Improved listener: listen to custom event *and* attach to DOM button (with short polling fallback).
 useEffect(() => {
  console.log("[HeaderMobile] useEffect mounted 🚀");

  const handleToggleEvent = () => {
    setSidebarOpen(true);
  };

  window.addEventListener("toggleMobileSidebar", handleToggleEvent);

  let pollId: number | null = null;
  let domCleanup: (() => void) | null = null;

  const tryAttachDom = () => {
    const btn = document.getElementById(HEADER_IDS.MENU_MOBILE_BUTTON);
    if (!btn) {
      return false;
    }

    const onDomClick = () => {
      setSidebarOpen(true);
    };
    btn.addEventListener("click", onDomClick);
    domCleanup = () => btn.removeEventListener("click", onDomClick);
    return true;
  };

  if (!tryAttachDom()) {
    const MAX_TRIES = 15;
    let tries = 0;
    pollId = window.setInterval(() => {
      tries += 1;
      if (tryAttachDom() || tries >= MAX_TRIES) {
        if (pollId) {
          window.clearInterval(pollId);
          pollId = null;
          console.log("[HeaderMobile] polling stopped 🛑");
        }
      }
    }, 200) as unknown as number;
  }

  return () => {
    console.log("[HeaderMobile] cleanup 🧹");
    window.removeEventListener("toggleMobileSidebar", handleToggleEvent);
    if (domCleanup) domCleanup();
    if (pollId) window.clearInterval(pollId);
  };
}, []);

useEffect(() => {
}, [sidebarOpen]);

  useEffect(() => {
  const el = sidebarRef.current;
  if (!el) return;
  // pastikan state awal mengatur class
  if (sidebarOpen) {
    el.classList.remove("-translate-x-full");
    el.classList.add("translate-x-0");
  } else {
    el.classList.remove("translate-x-0");
    el.classList.add("-translate-x-full");
  }
}, [sidebarOpen]);

  // Escape key closes sidebar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // freeze body scroll when sidebar open
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (sidebarOpen) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  const closeSidebar = () => {
    setSidebarOpen(false);
    setActiveIndex(null);
    setActiveKey(null);
  };

  const onIconClick = (index: number) => {
    const key = iconKeys[index];
    setActiveIndex(index);
    setActiveKey(key);
  };

  const renderTitle = () => {
    if (!activeKey)
      return (
        <div className="flex items-center gap-x-3">
          <i className="fa-regular fa-newspaper text-3xl text-blue-700" />
          <span>Latest News</span>
        </div>
      );
    const iconClass = itemsSidebar[activeIndex ?? 0]?.icon ?? "";
    return (
      <div className="flex items-center gap-x-3">
        <i className={`${iconClass} text-3xl text-blue-700`} />
        <span>{activeKey.charAt(0).toUpperCase() + activeKey.slice(1)}</span>
      </div>
    );
  };

  const getLatestNewsArray = (): LatestNewsItem[] => {
    if (!newsData) return [];
    if (Array.isArray(newsData)) return newsData as LatestNewsItem[];
    return [newsData as LatestNewsItem];
  };

  const renderListContent = () => {
    if (!activeKey) {
      const latestArr = getLatestNewsArray();
      if (latestArr.length === 0) {
        return (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg hover:scale-[1.01] duration-300 px-4 py-6">
            <h2 className="text-base font-semibold text-gray-800">No News Update</h2>
          </div>
        );
      }
      return latestArr.map((item, idx) => {
        const color = tagColorMap[item.tag ?? ""] ?? {
          bg: "bg-gray-100",
          text: "text-gray-800",
          cta: "text-gray-600",
        };
        const imageSrc = item.imgSrc ?? item.image ?? "https://picsum.photos/400/200";
        const title = item.title ?? item.desc ?? "Untitled";
        const excerpt = item.excerpt ?? item.desc ?? "";
        const date = item.date ?? "";
        const link = item.link ?? "#";

        return (
          <li key={idx} className="px-4">
            <a href={link} className="block bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg hover:scale-[1.01] duration-300">
              <img className="w-full h-40 object-cover" src={imageSrc} alt={title} />
              <div className="p-4 space-y-1">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className={`inline-block ${color.bg} ${color.text} font-semibold px-2 py-1 rounded-full`}>
                    {item.tag ?? "Latest"}
                  </span>
                  {date ? (
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </time>
                  ) : null}
                </div>
                <h2 className="text-base font-semibold text-gray-800">{title}</h2>
                {excerpt ? <p className="text-sm text-gray-600 line-clamp-2">{excerpt}</p> : null}
              </div>
            </a>
          </li>
        );
      });
    }

    const data: MenuItem[] = (menuData as Record<string, MenuItem[]>)[activeKey] ?? [];
    return data.map((item, idx) => (
      <li key={idx}>
        <button className="w-full flex items-center gap-x-4 p-4 rounded-l-xl border-t border-b border-l border-gray-200 hover:shadow-md hover:border-gray-300 transition duration-200 bg-white text-left ml-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 26 26"
              fill="none"
              dangerouslySetInnerHTML={{ __html: sanitizeSvg(item.svgPath) }}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold text-gray-800">{item.title}</h1>
            <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
          </div>
        </button>
      </li>
    ));
  };

  const renderIconItems = () =>
    itemsSidebar.map((it, idx) => {
      const active = idx === activeIndex;
      return (
        <li key={idx}>
          <a
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              onIconClick(idx);
            }}
            className={`p-2.5 transition-colors duration-200 rounded-lg flex justify-center ${active ? "w-full bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
            aria-current={active ? "page" : undefined}
          >
            <i className={`${it.icon} text-xl`} />
          </a>
        </li>
      );
    });

  return (
    <>
  <aside
  id="mobile-sidebar"
  ref={sidebarRef as React.RefObject<HTMLElement>}
  className="fixed inset-y-0 left-0 z-[60] transform transition-transform duration-300 md:hidden flex bg-white -translate-x-full"
  aria-hidden={!sidebarOpen}
>

        {/* Icon Bar */}
        <div className="flex flex-col items-center w-16 py-8 space-y-8 border-r border-gray-200">
          {/* Tombol close */}
          <button id="close-sidebar" onClick={closeSidebar} className="p-2 rounded-full hover:bg-gray-100 transition group">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 transition group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <ul id="icon-sidebar" className="flex flex-col items-center w-16 py-4 space-y-8 border-r border-gray-200">
            {renderIconItems()}
          </ul>
        </div>

        <div className="w-60 py-8 overflow-y-auto border-l border-gray-200 bg-white scrollbar-hide">
          <h2 id="title-active" className="px-5 pb-6 -mt-2 text-lg font-medium text-gray-800 border-b border-gray-200">
            {renderTitle()}
          </h2>

          <ul id="list-content" className="mt-8 space-y-4">
            {renderListContent()}
          </ul>
        </div>
      </aside>

      <div
        id="nav-overlay"
        ref={overlayRef}
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity ${sidebarOpen ? "block" : "hidden"}`}
        aria-hidden={!sidebarOpen}
      />
    </>
  );
};

export default HeaderMobile;