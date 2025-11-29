// src/pages/homepage.tsx
import React, { useState, useEffect, Suspense } from "react"
import '../styles/styleLanding.css'
const Header = React.lazy(() => import("../components/header"))
const HeaderMobile = React.lazy(() => import("../components/header_mobile"))
const HeroSection = React.lazy(() => import("../components/hero"))
const AboutSection = React.lazy(() => import("../components/about"))
const Jurusan = React.lazy(() => import("../components/jurusan"))
const Ruangan = React.lazy(() => import("../components/gallery"))
const SPMB = React.lazy(() => import("../components/smbp"))
const Ekskul = React.lazy(() => import("../components/ekskul"))
const VideoSection = React.lazy(() => import("../components/videoSection"))
const NewsSection = React.lazy(() => import("../components/newsSection"))
const Footer = React.lazy(() => import("../components/foother"))
const LoadingScreen = React.lazy(() => import("../components/LoadingScreen"))

const Homepage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // List of assets to preload
    const assetsToPreload = [
      '/assets/bg/HeroBg.png',
      '/assets/bg/bg-mobile.png',
      '/assets/Icon/misc/right-arrow.png',
      '/assets/Icon/misc/murid_icon.gif',
      '/assets/Icon/misc/guru_icon.gif',
      '/assets/Icon/misc/class_icon.gif',
      '/assets/Video/videosection.mp4',
      // Add more assets as needed
    ];

    const preloadAssets = async () => {
      const promises = assetsToPreload.map((src) => {
        return new Promise<void>((resolve, reject) => {
          if (src.endsWith('.mp4')) {
            // Preload video
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = src;
            video.onloadedmetadata = () => resolve();
            video.onerror = () => reject();
          } else {
            // Preload image
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => reject();
          }
        });
      });

      try {
        await Promise.all(promises);
        // Add a minimum loading time for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.warn('Some assets failed to load, but continuing:', error);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    preloadAssets();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      {/* Header */}
      <HeaderMobile />
      <Header />
      <HeroSection />
      <AboutSection />
      <Jurusan />
      <Ruangan />
      <SPMB />
      <Ekskul />
      <VideoSection />
      <NewsSection />
      <Footer />
    </Suspense>
  )
}

export default Homepage
