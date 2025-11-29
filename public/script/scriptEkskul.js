document.addEventListener("DOMContentLoaded", () => {
  const centerInfo     = document.getElementById("center-info");
  const centerIcon     = document.getElementById("center-icon");
  const centerTitle    = document.getElementById("center-title");
  const centerSub      = document.getElementById("center-subtitle");

  const wrapper        = document.getElementById("eksul-layout");
  const card           = document.getElementById("eksul-description-card");
  const descImg        = document.getElementById("desc-img");
  const descTitle      = document.getElementById("desc-title");
  const descText       = document.getElementById("desc-text");

  const outerContainer = document.getElementById("outer-ring");
  const innerContainer = document.getElementById("inner-ring");

const icons = [
  {
    icon: "fa-laptop-code",
    label: "HISS TKJ",
    tagline: "Teknologi untuk masa depan",
    img: "/img/ekskul/tkj.jpg",
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Belajar jaringan, pemrograman, dan teknologi terbaru di sini."
  },
  {
    icon: "fa-tools",
    label: "HISS TSM",
    tagline: "MESIN MESIN MESIN!!",
    img: "/img/ekskul/tsm.jpg",
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ekskul ini cocok buat kamu yang suka otak-atik motor dan mesin."
  },
  {
    icon: "fa-flag",
    label: "Paskibra",
    tagline: "Disiplin. Tangguh. Berwibawa.",
    img: "/img/ekskul/paskibra.jpg",
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paskibra mengajarkan disiplin, kekompakan, dan nasionalisme."
  },
  {
    icon: "fa-heart",
    label: "PMR",
    tagline: "Siap menolong kapan pun",
    img: "/img/ekskul/pmr.jpg",
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. PMR mendidik siswa menjadi relawan yang tanggap dan peduli."
  },
  {
    icon: "fa-language",
    label: "Japanese Club",
    tagline: "語学と文化を楽しもう!",
    img: "/img/ekskul/japanese.jpg",
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ekskul ini mengenalkan budaya Jepang, dari bahasa hingga animenya."
  },
  {
    icon: "fa-fist-raised",
    label: "Taekwondo",
    tagline: "Tangguh secara fisik dan mental",
    img: "/img/ekskul/taekwondo.jpg",
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Melatih diri melalui seni bela diri asal Korea."
  },
  {
    icon: "fa-globe",
    label: "English Club",
    tagline: "Speak up your world",
    img: "/img/ekskul/english.jpg",
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempat asyik belajar Bahasa Inggris sambil bermain peran dan debat."
  },
  {
    icon: "fa-volleyball-ball",
    label: "Voli",
    tagline: "Spike your limits",
    img: "/img/ekskul/voli.jpg",
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tim voli sekolah siap mengharumkan nama di setiap turnamen."
  },
  {
    icon: "fa-basketball-ball",
    label: "Basket",
    tagline: "Dribble your dream",
    img: "/img/ekskul/basket.jpg",
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Buat kamu yang suka olahraga dan teamwork."
  },
  {
    icon: "fa-futbol",
    label: "Futsal",
    tagline: "Kompak, cepat, dan taktis",
    img: "/img/ekskul/futsal.jpg",
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Serunya olahraga tim dalam lapangan kecil yang cepat."
  },
  {
    icon: "fa-music",
    label: "Seni Tari",
    tagline: "Ekspresikan lewat gerak",
    img: "/img/ekskul/senitari.jpg",
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Seni Tari membawa kamu menjelajahi budaya lewat gerakan."
  },
  {
    icon: "fa-campground",
    label: "Pramuka",
    tagline: "Bersatu, siap sedia!",
    img: "/img/ekskul/pramuka.jpg",
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Petualangan, kebersamaan, dan kepemimpinan diajarkan di sini."
  }
];
  let selectedIcon = icons[0];   // default HISSTIK

    // 1) Fungsi pause (hanya pause, tanpa reset)
const pauseAllAnimations = () => {
  [outerContainer, innerContainer].forEach(el =>
    el.style.animationPlayState = 'paused'
  );
  document.querySelectorAll('.icon-wrapper-outer, .icon-wrapper-inner')
    .forEach(el =>
      el.style.animationPlayState = 'paused'
    );
};

const resumeAllAnimations = () => {
  [outerContainer, innerContainer].forEach(el =>
    el.style.animationPlayState = 'running'
  );
  document.querySelectorAll('.icon-wrapper-outer, .icon-wrapper-inner')
    .forEach(el =>
      el.style.animationPlayState = 'running'
    );
};

    // 2) Fungsi reset+play ulang dari awal
    const resetAllAnimations = () => {
        // Ring luar
        outerContainer.style.animation = 'none';
        void outerContainer.offsetWidth;
        outerContainer.style.animation = 'rotateClockwise 30s linear infinite';

        // Ring dalam
        innerContainer.style.animation = 'none';
        void innerContainer.offsetWidth;
        innerContainer.style.animation = 'rotateCounter 45s linear infinite';

        // Icon wrappers
        document.querySelectorAll('.icon-wrapper-outer').forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth;
            el.style.animation = 'rotateCounter 30s linear infinite';
        });
        document.querySelectorAll('.icon-wrapper-inner').forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth;
            el.style.animation = 'rotateClockwise 45s linear infinite';
        });
    };

    let expanded = false;
centerInfo.addEventListener("click", () => {
  // isi konten dari selectedIcon
  const { img, label, tagline, deskripsi } = selectedIcon;

  if (window.innerWidth < 768) {
    // === MOBILE: tampilkan modal ===
    const modal      = document.getElementById("eksul-modal");
    const modalImg   = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalText  = document.getElementById("modal-text");

    modalImg.src = img;
    modalTitle.textContent = `${label} - ${tagline}`;
    modalText.textContent  = deskripsi;

    modal.classList.remove("hidden");
  } else {
    // === DESKTOP: tampilkan card biasa ===
    if (!expanded) {
      pauseAllAnimations();
      wrapper.classList.replace('flex','md:grid');
      wrapper.classList.add("grid-cols-1","md:grid-cols-2");
      card.classList.remove("hidden");

      setTimeout(() => {
        renderIcons();       
        resetAllAnimations();
      }, 300);
    }

    descImg.src       = img;
    descTitle.textContent = `${label} - ${tagline}`;
    descText.textContent  = deskripsi;

    expanded = true;
  }
});

// tombol close modal
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("eksul-modal").classList.add("hidden");
});


    function renderIcons() {
        const ringSize  = outerContainer.offsetWidth;
        const innerSize = innerContainer.offsetWidth;
        if (ringSize < 50 || innerSize < 50) {
            return requestAnimationFrame(renderIcons);
        }
        outerContainer.innerHTML = "";
        innerContainer.innerHTML = "";

        const center      = ringSize/2;
        const innerCenter = innerSize/2;
        const iconSize    = ringSize<400?40:48;
        const halfIcon    = iconSize/2;

        const outerIcons = icons.slice(0,6),
              innerIcons = icons.slice(6);

        outerIcons.forEach((item,i) => {
            const angle = (i/outerIcons.length)*2*Math.PI - Math.PI/2;
            const x = center + (ringSize/2)*Math.cos(angle) - halfIcon;
            const y = center + (ringSize/2)*Math.sin(angle) - halfIcon;
        const el = document.createElement("div");
            el.className = `absolute w-8 h-8 md:w-12 md:h-12 bg-white rounded-xl flex 
                            items-center justify-center shadow-md border border-blue-200 
                            hover:scale-110 transition-all duration-300`;
            el.style.left = `${x}px`;
            el.style.top  = `${y}px`;
            el.innerHTML = `
  <div class="icon-wrapper-outer relative group">
    <i class="fas ${item.icon} text-blue-500 text-sm md:text-xl"></i>
  </div>`;


el.addEventListener("mouseenter", () => {
  pauseAllAnimations();

  // update center card otomatis saat hover
  selectedIcon = item;
  centerIcon.className = `fa-solid ${item.icon} text-white text-[28px] md:text-[38px] lg:text-[40px]`;
  centerTitle.textContent = item.label;
  centerSub.textContent   = item.tagline;
});

el.addEventListener("mouseleave", resumeAllAnimations);
   // **klik ikon untuk update center-info**
      el.addEventListener("click", () => {
        selectedIcon = item;
        centerIcon.className = `fa-solid ${item.icon} text-white text-[28px] md:text-[38px] lg:text-[40px]`;
        centerTitle.textContent = item.label;
        centerSub.textContent   = item.tagline;
      });

      outerContainer.appendChild(el);
            });

        innerIcons.forEach((item,i) => {
            const angle = (i/innerIcons.length)*2*Math.PI;
            const x = innerCenter + (innerSize/2)*Math.cos(angle) - halfIcon;
            const y = innerCenter + (innerSize/2)*Math.sin(angle) - halfIcon;
            const el = document.createElement("div");
            el.className = `absolute w-8 h-8 md:w-12 md:h-12 bg-white rounded-xl flex 
                            items-center justify-center shadow-md border border-blue-200 
                            hover:scale-110 transition-all duration-300`;
            el.style.left = `${x}px`;
            el.style.top  = `${y}px`;
             el.innerHTML = `
  <div class="icon-wrapper-inner relative group">
    <i class="fas ${item.icon} text-blue-500 text-sm md:text-xl"></i>
  </div>`;
        // PENTING: gunakan resumeAllAnimations, bukan reset!
el.addEventListener("mouseenter", () => {
  pauseAllAnimations();

  selectedIcon = item;
  centerIcon.className = `fa-solid ${item.icon} text-white text-[28px] md:text-[38px] lg:text-[40px]`;
  centerTitle.textContent = item.label;
  centerSub.textContent   = item.tagline;
});
        el.addEventListener("mouseleave", resumeAllAnimations);
      el.addEventListener("click", () => {
        selectedIcon = item;
        centerIcon.className = `fa-solid ${item.icon} text-white text-[28px] md:text-[38px] lg:text-[40px]`;
        centerTitle.textContent = item.label;
        centerSub.textContent   = item.tagline;
      });
      innerContainer.appendChild(el);
    });

    }

    
    // 3) Resize: pause, render ulang, lalu reset+play
    let resizeTimeout;
    window.addEventListener("resize", () => {
        pauseAllAnimations();
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            renderIcons();
            resetAllAnimations();
        }, 250);
    });

    // initial render + start animasi
    renderIcons();
    resetAllAnimations();
});
