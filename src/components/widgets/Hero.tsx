import { component$, useSignal, useVisibleTask$, useStyles$, $ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import { menuItems } from "./MenuModal";
import IconHamburger from "../icons/IconHamburger";
import { LuX, LuChevronRight, LuMapPin, LuMail, LuClock, LuFacebook, LuInstagram, LuSun, LuMoon } from "@qwikest/icons/lucide";

// NFT-specific menu items for hero card
const nftMenuItems = [
  {
    title: "Holders",
    hasSubmenu: true,
    subitems: [
      { title: "Verify Wallet", href: "/holders/verify" },
      { title: "Benefits", href: "/holders/benefits" },
      { title: "Leaderboard", href: "/holders/leaderboard" },
    ],
  },
  {
    title: "Whitelists",
    hasSubmenu: true,
    subitems: [
      { title: "Active Whitelists", href: "/whitelists" },
      { title: "Apply", href: "/whitelists/apply" },
      { title: "Check Status", href: "/whitelists/status" },
    ],
  },
  {
    title: "Community",
    hasSubmenu: true,
    subitems: [
      { title: "Discord", href: "https://discord.gg/" },
      { title: "Twitter/X", href: "https://x.com/" },
      { title: "Telegram", href: "https://t.me/" },
    ],
  },
  {
    title: "Merch",
    hasSubmenu: true,
    subitems: [
      { title: "Shop", href: "/merch" },
      { title: "Exclusive Drops", href: "/merch/drops" },
    ],
  },
];

type FlipTarget = 'none' | 'menu' | 'portfolio' | 'booking';

export default component$(() => {
  const carouselIndex = useSignal(0);
  const isAutoPlaying = useSignal(true);
  const currentSlideIndex = useSignal(0);
  const rightColumnImageIndex = useSignal(0);
  const touchStartX = useSignal(0);
  const touchEndX = useSignal(0);
  // Separate touch tracking for video carousel
  const videoTouchStartX = useSignal(0);
  const videoTouchEndX = useSignal(0);

  // 3D Flip card state
  const isFlipped = useSignal<boolean>(false);
  const flipTarget = useSignal<FlipTarget>('none');
  const flipTouchStartX = useSignal<number>(0);
  const flipTouchStartY = useSignal<number>(0);

  // Menu accordion state for flip card
  const menuOpenIndex = useSignal<number | null>(null);

  // Theme toggle
  const isDark = useSignal(false);

  // Track last user interaction for carousel pause
  const lastInteractionTime = useSignal(0);

  // Initialize theme from localStorage
  useVisibleTask$(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      isDark.value = true;
    }
  });

  const carouselImages = [
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80"
  ];

  // NFT images for each card - using IPFS gateway URLs
  const cardVideos = [
    // Card 1: Azuki (Ethereum) - Using Pinata gateway
    [
      "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/1.png",
      "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/2.png"
    ],
    // Card 2: NodeMonkes - Bitcoin Ordinals
    [
      "https://ordinals.com/content/a271eb2d6a71fee706bb8c6b8acd44903a1909f5ff950bd65d5944c7809d558bi0",
      "https://ordinals.com/content/bc5cdc8387dcc5fb2988146bcdab2c04a88cc27e0c07897cc10fafd2df0a501fi0"
    ],
    // Card 3: Kaspa NFTs - Jeets (placeholder - replace with actual IPFS links)
    [
      "https://placehold.co/800x800/14b8a6/ffffff?text=Nacho+Kat+%231",
      "https://placehold.co/800x800/0d9488/ffffff?text=Nacho+Kat+%232"
    ]
  ];

  const heroCards = [
    {
      badge: "Ethereum NFT",
      title: ["Azuki"],
      description: "10,000 anime-inspired PFPs on Ethereum. Metadata stored on IPFS.",
      stats: [
        { value: "10K", label: "Supply" },
        { value: "ETH", label: "Chain" },
        { value: "ERC-721", label: "Standard" }
      ],
      ipfsImage: "ipfs://QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/1.png",
      ipfsGateway: "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/1.png",
      collection: "Azuki",
      tokenId: "1"
    },
    {
      badge: "Bitcoin Ordinal",
      title: ["NodeMonkes"],
      description: "10,000 pixel monkes on Bitcoin. Fully on-chain and immutable.",
      stats: [
        { value: "10K", label: "Supply" },
        { value: "BTC", label: "Chain" },
        { value: "On-Chain", label: "Storage" }
      ],
      ipfsImage: "https://ordinals.com/content/a271eb2d6a71fee706bb8c6b8acd44903a1909f5ff950bd65d5944c7809d558bi0",
      ipfsGateway: "https://ordinals.com/content/a271eb2d6a71fee706bb8c6b8acd44903a1909f5ff950bd65d5944c7809d558bi0",
      collection: "NodeMonkes",
      tokenId: "1"
    },
    {
      badge: "Kaspa NFT",
      title: ["Jeets"],
      description: "10,000 unique cats on Kaspa. KRC-721 with IPFS storage.",
      stats: [
        { value: "10K", label: "Supply" },
        { value: "KAS", label: "Chain" },
        { value: "KRC-721", label: "Standard" }
      ],
      ipfsImage: "ipfs://[NACHO_COLLECTION_CID]/1.png",
      ipfsGateway: "https://placehold.co/800x800/14b8a6/ffffff?text=Nacho+Kat+%231",
      collection: "Jeets",
      tokenId: "1"
    }
  ];

  useStyles$(`
    .hero-carousel-container {
      position: relative;
      width: 100%;
      min-height: 920px;
      perspective: 1000px;
      touch-action: pan-y;
      user-select: none;
    }
    .carousel-card-wrapper {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center center;
      visibility: hidden;
    }
    .carousel-card-wrapper.active {
      z-index: 3;
      transform: translate(0, 0) scale(1) rotate(0deg);
      opacity: 1;
      visibility: visible;
    }
    .carousel-card-wrapper.next {
      z-index: 2;
      transform: translate(8px, -12px) scale(0.97) rotate(1deg);
      opacity: 0.85;
      pointer-events: none;
      visibility: visible;
    }
    .carousel-card-wrapper.prev {
      z-index: 1;
      transform: translate(-6px, -22px) scale(0.94) rotate(-1deg);
      opacity: 0.7;
      pointer-events: none;
      visibility: visible;
    }
    .carousel-card-wrapper.hidden {
      display: none;
    }
    .progress-bar {
      height: 3px;
      background: rgba(120, 113, 108, 0.2);
      border-radius: 999px;
      overflow: hidden;
      margin-top: 1rem;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #57534e, #78716c);
      width: 0%;
      animation: fillProgress 5s linear infinite;
    }
    @keyframes fillProgress {
      0% { width: 0%; }
      100% { width: 100%; }
    }
    /* 3D Flip Card Styles */
    .flip-card-container {
      position: relative;
      width: 100%;
      perspective: 1200px;
      -webkit-perspective: 1200px;
    }
    .flip-card-inner {
      position: relative;
      width: 100%;
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
    }
    .flip-card-inner.flipped {
      transform: rotateY(180deg);
    }
    .flip-card-inner.flipped .flip-card-front {
      visibility: hidden;
    }
    .flip-card-front, .flip-card-back {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
    }
    .flip-card-front {
      position: relative;
    }
    .flip-card-back {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: rotateY(180deg) translateZ(0);
      -webkit-transform: rotateY(180deg) translateZ(0);
      overflow-y: auto;
    }
  `);

  // Auto-advance carousel for images (paused when flipped)
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      if (isAutoPlaying.value && !isFlipped.value) {
        carouselIndex.value = (carouselIndex.value + 1) % carouselImages.length;
      }
    }, 3000);
    cleanup(() => clearInterval(interval));
  });

  // Auto-advance hero cards (paused when flipped or user recently interacted)
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      // Pause auto-advance when card is flipped
      if (isFlipped.value) return;

      // Pause if user interacted within last 8 seconds
      const timeSinceInteraction = Date.now() - lastInteractionTime.value;
      if (lastInteractionTime.value > 0 && timeSinceInteraction < 8000) return;

      // Advance the hero card
      currentSlideIndex.value = (currentSlideIndex.value + 1) % heroCards.length;
    }, 8000); // 8 seconds per card
    cleanup(() => clearInterval(interval));
  });

  // Flip card handlers
  const handleFlip = $((target: FlipTarget) => {
    isFlipped.value = true;
    flipTarget.value = target;
    menuOpenIndex.value = null;
  });

  const handleFlipBack = $(() => {
    isFlipped.value = false;
    flipTarget.value = 'none';
    menuOpenIndex.value = null;
  });

  // Track user interaction to pause carousel
  const handleCardInteraction = $(() => {
    lastInteractionTime.value = Date.now();
  });

  // Swipe handler for back of card (down or horizontal to close)
  const handleBackTouchStart = $((e: TouchEvent) => {
    e.stopPropagation();
    flipTouchStartX.value = e.touches[0].clientX;
    flipTouchStartY.value = e.touches[0].clientY;
  });

  const handleBackTouchEnd = $((e: TouchEvent) => {
    e.stopPropagation();
    const diffX = Math.abs(e.changedTouches[0].clientX - flipTouchStartX.value);
    const diffY = e.changedTouches[0].clientY - flipTouchStartY.value;

    // Swipe down (80px) or horizontal swipe (50px) to close
    if (diffY > 80 || diffX > 50) {
      handleFlipBack();
    }
    flipTouchStartX.value = 0;
    flipTouchStartY.value = 0;
  });

  const toggleTheme = $(() => {
    isDark.value = !isDark.value;
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  return (
    <section class="relative min-h-[auto] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-100 via-gray-50 to-stone-50 dark:from-stone-900 dark:via-gray-900 dark:to-stone-950 pt-0 pb-0 lg:py-0 transition-colors duration-300">
      {/* Animated gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-stone-200/60 via-gray-100/50 to-stone-100/60 dark:from-stone-800/60 dark:via-gray-900/50 dark:to-stone-900/60 opacity-80"></div>

      {/* Floating decorations */}
      <div class="absolute top-20 left-10 w-32 h-32 bg-stone-400/15 dark:bg-stone-600/15 rounded-full blur-2xl animate-float" aria-hidden="true"></div>
      <div class="absolute top-40 right-20 w-48 h-48 bg-gray-300/15 dark:bg-gray-700/15 rounded-full blur-3xl animate-floatx" aria-hidden="true"></div>
      <div class="absolute bottom-20 left-1/3 w-40 h-40 bg-stone-300/15 dark:bg-stone-700/15 rounded-full blur-2xl animate-float" aria-hidden="true"></div>

      {/* Subtle grid overlay */}
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"></div>

      <div class="relative z-10 container lg:-mt-28 mx-auto px-3.5 pt-3 pb-2 lg:px-12 lg:py-8">
        {/* Mobile Layout - Card Stack */}
        <div class="lg:hidden relative">
          <div
            class="hero-carousel-container"
            onTouchStart$={(e) => {
              // Disable carousel swipe when flipped
              if (isFlipped.value) return;
              touchStartX.value = e.touches[0].clientX;
              touchEndX.value = e.touches[0].clientX;
            }}
            onTouchMove$={(e) => {
              if (isFlipped.value) return;
              touchEndX.value = e.touches[0].clientX;
              const diff = Math.abs(touchStartX.value - touchEndX.value);
              if (diff > 10) {
                e.preventDefault();
              }
            }}
            onTouchEnd$={(e) => {
              if (isFlipped.value) return;
              const swipeThreshold = 50;
              const diff = touchStartX.value - touchEndX.value;

              if (Math.abs(diff) > swipeThreshold) {
                e.preventDefault();
                if (diff > 0) {
                  // Swipe left - next slide
                  currentSlideIndex.value = (currentSlideIndex.value + 1) % heroCards.length;
                } else {
                  // Swipe right - previous slide
                  currentSlideIndex.value = (currentSlideIndex.value - 1 + heroCards.length) % heroCards.length;
                }
              }

              touchStartX.value = 0;
              touchEndX.value = 0;
            }}
          >
            {heroCards.map((card, index) => {
              const getCardClass = () => {
                const current = currentSlideIndex.value;
                const total = heroCards.length;

                if (index === current) return 'active';

                const distance = (index - current + total) % total;

                if (distance === 1) return 'next';
                if (distance === 2) return 'prev';

                return 'hidden';
              };

              // Different color schemes for each card - blockchain themed with dark mode
              const cardStyles = [
                // Card 1: Ethereum Blue theme
                {
                  bg: "from-blue-50/95 to-indigo-50/95 dark:from-blue-950/95 dark:to-indigo-950/95",
                  innerBg: "bg-blue-50/90 dark:bg-blue-950/90",
                  border: "border-blue-400/60 dark:border-blue-500/60",
                  badge: "bg-blue-100/70 dark:bg-blue-900/70 border-blue-300/50 dark:border-blue-600/50 text-blue-700 dark:text-blue-300",
                  title: "from-gray-900 via-gray-800 to-gray-900",
                  titleLast: "text-blue-700 dark:text-blue-400",
                  button: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-200/20 text-white",
                  buttonOutline: "border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-100/30 dark:hover:bg-blue-800/30",
                  statValue: "text-blue-600 dark:text-blue-400",
                  statLabel: "text-blue-500/70 dark:text-blue-400/70",
                  divider: "border-blue-200/50 dark:border-blue-700/50",
                  description: "text-slate-600 dark:text-slate-300"
                },
                // Card 2: Bitcoin Orange theme
                {
                  bg: "from-orange-50/95 to-amber-50/95 dark:from-orange-950/95 dark:to-amber-950/95",
                  innerBg: "bg-orange-50/90 dark:bg-orange-950/90",
                  border: "border-orange-400/60 dark:border-orange-500/60",
                  badge: "bg-orange-100/70 dark:bg-orange-900/70 border-orange-300/50 dark:border-orange-600/50 text-orange-700 dark:text-orange-300",
                  title: "from-gray-900 via-gray-800 to-gray-900",
                  titleLast: "text-orange-600 dark:text-orange-400",
                  button: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-200/20 text-white",
                  buttonOutline: "border-orange-400 text-orange-600 dark:text-orange-400 hover:bg-orange-100/30 dark:hover:bg-orange-800/30",
                  statValue: "text-orange-600 dark:text-orange-400",
                  statLabel: "text-orange-500/70 dark:text-orange-400/70",
                  divider: "border-orange-200/50 dark:border-orange-700/50",
                  description: "text-slate-600 dark:text-slate-300"
                },
                // Card 3: Kaspa Teal/Green theme
                {
                  bg: "from-teal-50/95 to-emerald-50/95 dark:from-teal-950/95 dark:to-emerald-950/95",
                  innerBg: "bg-teal-50/90 dark:bg-teal-950/90",
                  border: "border-teal-400/60 dark:border-teal-500/60",
                  badge: "bg-teal-100/70 dark:bg-teal-900/70 border-teal-300/50 dark:border-teal-600/50 text-teal-700 dark:text-teal-300",
                  title: "from-gray-900 via-gray-800 to-gray-900",
                  titleLast: "text-teal-600 dark:text-teal-400",
                  button: "from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-teal-200/20 text-white",
                  buttonOutline: "border-teal-400 text-teal-600 dark:text-teal-400 hover:bg-teal-100/30 dark:hover:bg-teal-800/30",
                  statValue: "text-teal-600 dark:text-teal-400",
                  statLabel: "text-teal-500/70 dark:text-teal-400/70",
                  divider: "border-teal-200/50 dark:border-teal-700/50",
                  description: "text-slate-600 dark:text-slate-300"
                }
              ];

              const style = cardStyles[index];
              const isActiveCard = index === currentSlideIndex.value;

              return (
                <div key={index} class={`carousel-card-wrapper ${getCardClass()}`}>
                  {/* 3D Flip Card Container */}
                  <div class="flip-card-container">
                    <div class={`flip-card-inner ${isActiveCard && isFlipped.value ? 'flipped' : ''}`}>
                      {/* FRONT OF CARD */}
                      <div class="flip-card-front" onClick$={handleCardInteraction}>
                        <div class={`relative bg-gradient-to-br ${style.bg} backdrop-blur-sm p-4 rounded-2xl border ${style.border} shadow-2xl`}>
                          <div class={`absolute inset-0 ${style.innerBg} -z-10 rounded-2xl`}></div>

                          {/* Badge and controls row */}
                          <div class="flex items-center justify-between mb-3">
                            <span class={`px-3 py-1 rounded-full ${style.badge} text-sm font-medium tracking-wide`}>
                              nft.cx
                            </span>
                            <div class="flex gap-2">
                              {/* Theme Toggle */}
                              <button
                                class={`p-1.5 rounded-lg border backdrop-blur-sm transition-all duration-300 ${style.border} ${style.innerBg} hover:scale-105`}
                                onClick$={toggleTheme}
                                aria-label={isDark.value ? "Switch to light mode" : "Switch to dark mode"}
                              >
                                {isDark.value ? (
                                  <LuSun class="w-4 h-4 text-amber-500" />
                                ) : (
                                  <LuMoon class={`w-4 h-4 ${style.statValue}`} />
                                )}
                              </button>
                              {/* Menu Button */}
                              <button
                                class={`p-1.5 rounded-lg border backdrop-blur-sm transition-all duration-300 ${style.border} ${style.innerBg} hover:scale-105`}
                                onClick$={() => handleFlip('menu')}
                              >
                                <IconHamburger class={`w-5 h-5 ${style.statValue}`} />
                              </button>
                            </div>
                          </div>

                          {/* NFT Image Carousel - Square */}
                          <div
                            class={`rounded-xl overflow-hidden border ${style.border} mb-4`}
                              onTouchStart$={(e) => {
                                e.stopPropagation();
                                videoTouchStartX.value = e.touches[0].clientX;
                                videoTouchEndX.value = e.touches[0].clientX;
                              }}
                              onTouchMove$={(e) => {
                                e.stopPropagation();
                                videoTouchEndX.value = e.touches[0].clientX;
                              }}
                              onTouchEnd$={(e) => {
                                e.stopPropagation();
                                const swipeThreshold = 50;
                                const diff = videoTouchStartX.value - videoTouchEndX.value;
                                const videosPerCard = cardVideos[0].length;

                                if (Math.abs(diff) > swipeThreshold) {
                                  if (diff > 0) {
                                    rightColumnImageIndex.value = (rightColumnImageIndex.value + 1) % videosPerCard;
                                  } else {
                                    rightColumnImageIndex.value = (rightColumnImageIndex.value - 1 + videosPerCard) % videosPerCard;
                                  }
                                }

                                videoTouchStartX.value = 0;
                                videoTouchEndX.value = 0;
                              }}
                            >
                              <div class="relative aspect-square">
                                {cardVideos[index].map((img, imgIdx) => (
                                  <div
                                    key={imgIdx}
                                    class={`absolute inset-0 transition-all duration-700 ${
                                      imgIdx === rightColumnImageIndex.value
                                        ? 'opacity-100 scale-100'
                                        : 'opacity-0 scale-110'
                                    }`}
                                  >
                                    <img
                                      src={img}
                                      alt={`$nft.cx #${imgIdx + 1}`}
                                      class="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                                <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                                <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                  {cardVideos[index].map((_, dotIdx) => (
                                    <button
                                      key={dotIdx}
                                      onClick$={() => { rightColumnImageIndex.value = dotIdx; }}
                                      class={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        dotIdx === rightColumnImageIndex.value
                                          ? 'bg-white'
                                          : 'bg-white/50'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                          {/* Title - Single line */}
                              <h1 class="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-2">
                                <span class={`${style.titleLast}`}>{card.title[0]}</span>
                              </h1>

                              <p class={`text-sm ${style.description} mb-4`}>
                                {card.description}
                              </p>

                              {/* Stats row */}
                              <div class={`grid grid-cols-3 gap-2 mb-4 py-3 border-t border-b ${style.divider}`}>
                                {card.stats.map((stat, idx) => (
                                  <div key={idx} class="text-center">
                                    <div class={`text-lg font-bold ${style.statValue}`}>{stat.value}</div>
                                    <div class={`text-xs ${style.statLabel} uppercase tracking-wide`}>{stat.label}</div>
                                  </div>
                                ))}
                              </div>

                          {/* Single button */}
                          <button
                            onClick$={() => handleFlip('portfolio')}
                            class={`group w-full px-6 py-3 bg-gradient-to-r ${style.button} font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 text-center`}
                          >
                            View Collection
                            <span class="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                          </button>

                          {/* Navigation Menu */}
                          <div class={`mt-4 pt-4 border-t ${style.divider}`}>
                            <nav class="space-y-1">
                              {nftMenuItems.map((item, menuIdx) => (
                                <div key={menuIdx}>
                                  <button
                                    onClick$={() => {
                                      menuOpenIndex.value = menuOpenIndex.value === menuIdx ? null : menuIdx;
                                    }}
                                    class={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-base font-medium ${style.description} hover:${style.innerBg} transition-colors`}
                                  >
                                    <span>{item.title}</span>
                                    <LuChevronRight class={`w-4 h-4 transition-transform ${menuOpenIndex.value === menuIdx ? 'rotate-90' : ''}`} />
                                  </button>
                                  {menuOpenIndex.value === menuIdx && (
                                    <div class="pl-4 space-y-1 mt-1">
                                      {item.subitems?.map((subitem: { title: string; href: string }) => (
                                        <a
                                          key={subitem.title}
                                          href={subitem.href}
                                          class={`block px-3 py-1.5 rounded-lg text-sm ${style.statLabel} hover:${style.innerBg} transition-colors`}
                                        >
                                          {subitem.title}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </nav>

                            {/* Social Links */}
                            <div class={`mt-3 pt-3 border-t ${style.divider} flex justify-center gap-4`}>
                              <a
                                href="https://www.facebook.com/p/earthen-vessels-61562702795370/"
                                target="_blank"
                                rel="noopener noreferrer"
                                class={`p-2 rounded-full ${style.innerBg} border ${style.border} ${style.statValue} hover:scale-110 transition-transform`}
                              >
                                <LuFacebook class="w-5 h-5" />
                              </a>
                              <a
                                href="https://www.instagram.com/earthenvesselspottery_/"
                                target="_blank"
                                rel="noopener noreferrer"
                                class={`p-2 rounded-full ${style.innerBg} border ${style.border} ${style.statValue} hover:scale-110 transition-transform`}
                              >
                                <LuInstagram class="w-5 h-5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BACK OF CARD */}
                      <div
                        class="flip-card-back"
                        onTouchStart$={handleBackTouchStart}
                        onTouchEnd$={handleBackTouchEnd}
                      >
                        <div class={`relative bg-gradient-to-br ${style.bg} backdrop-blur-sm p-6 rounded-2xl border ${style.border} shadow-2xl h-full`}>
                          <div class={`absolute inset-0 ${style.innerBg} -z-10 rounded-2xl`}></div>

                          {/* Close button */}
                          <button
                            onClick$={handleFlipBack}
                            class={`absolute top-4 right-4 z-10 p-2 rounded-full ${style.innerBg} border ${style.border} transition-all duration-200 hover:scale-110`}
                          >
                            <LuX class={`w-5 h-5 ${style.statValue}`} />
                          </button>

                          {/* Swipe hint */}
                          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
                            <div class={`w-10 h-1 rounded-full ${style.innerBg} border ${style.border}`}></div>
                            <span class={`text-xs ${style.statLabel}`}>Swipe down to close</span>
                          </div>

                          {/* Menu Back Content */}
                          {flipTarget.value === 'menu' && (
                            <div class="pt-2">
                              {/* Logo */}
                              <div class="mb-4">
                                <a href="/" class="focus:outline-none">
                                  <img src="/images/logo2.svg" alt="Logo" class="h-10" />
                                </a>
                              </div>

                              {/* Navigation */}
                              <nav class="space-y-1 max-h-[45vh] overflow-y-auto pr-2">
                                {menuItems.map((item, menuIdx) => (
                                  <div key={menuIdx}>
                                    {item.hasSubmenu ? (
                                      <>
                                        <button
                                          onClick$={() => {
                                            menuOpenIndex.value = menuOpenIndex.value === menuIdx ? null : menuIdx;
                                          }}
                                          class={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-lg font-medium ${style.description} hover:${style.innerBg} transition-colors`}
                                        >
                                          <span>{item.title}</span>
                                          <LuChevronRight class={`w-5 h-5 transition-transform ${menuOpenIndex.value === menuIdx ? 'rotate-90' : ''}`} />
                                        </button>
                                        {menuOpenIndex.value === menuIdx && (
                                          <div class="pl-4 space-y-1 mt-1">
                                            {item.subitems?.map((subitem: { title: string; href: string }) => (
                                              <a
                                                key={subitem.title}
                                                href={subitem.href}
                                                class={`block px-3 py-2 rounded-lg text-base ${style.statLabel} hover:${style.innerBg} transition-colors`}
                                              >
                                                {subitem.title}
                                              </a>
                                            ))}
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <a
                                        href={item.href}
                                        class={`block px-3 py-2.5 rounded-lg text-lg font-medium ${style.description} hover:${style.innerBg} transition-colors`}
                                      >
                                        {item.title}
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </nav>

                              {/* Social Links */}
                              <div class={`mt-4 pt-4 border-t ${style.divider} flex justify-center gap-6`}>
                                <a
                                  href="https://www.facebook.com/p/earthen-vessels-61562702795370/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class={`p-3 rounded-full ${style.innerBg} border ${style.border} ${style.statValue} hover:scale-110 transition-transform`}
                                >
                                  <LuFacebook class="w-6 h-6" />
                                </a>
                                <a
                                  href="https://www.instagram.com/earthenvesselspottery_/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class={`p-3 rounded-full ${style.innerBg} border ${style.border} ${style.statValue} hover:scale-110 transition-transform`}
                                >
                                  <LuInstagram class="w-6 h-6" />
                                </a>
                              </div>

                              {/* Book CTA */}
                              <div class={`mt-4 pt-4 border-t ${style.divider}`}>
                                <a
                                  href="https://www.bookeo.com/earthenvessels"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class={`block w-full px-6 py-3 bg-gradient-to-r ${style.button} font-semibold rounded-lg shadow-lg text-center transition-all duration-300 hover:scale-105`}
                                >
                                  Book A Class
                                </a>
                              </div>
                            </div>
                          )}

                          {/* Portfolio Back Content */}
                          {flipTarget.value === 'portfolio' && (
                            <div class="pt-2">
                              <h3 class={`text-xl font-bold ${style.description} mb-4`}>Gallery Preview</h3>

                              {/* 2x2 Grid of images */}
                              <div class="grid grid-cols-2 gap-2 mb-4">
                                {cardVideos[index].map((img, imgIdx) => (
                                  <div key={imgIdx} class={`aspect-square rounded-lg overflow-hidden border ${style.border}`}>
                                    <img
                                      src={img}
                                      alt={`Gallery ${imgIdx + 1}`}
                                      class="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>

                              {/* View Full Gallery Link */}
                              <a
                                href="/gallery"
                                class={`flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r ${style.button} font-semibold rounded-lg shadow-lg text-center transition-all duration-300 hover:scale-105`}
                              >
                                View Full Gallery
                                <LuChevronRight class="w-5 h-5" />
                              </a>
                            </div>
                          )}

                          {/* Booking Back Content */}
                          {flipTarget.value === 'booking' && (
                            <div class="pt-2">
                              <h3 class={`text-xl font-bold ${style.description} mb-4`}>Contact Us</h3>

                              {/* Contact Info Cards */}
                              <div class="space-y-3 mb-4">
                                <div class={`flex items-start gap-3 p-3 rounded-lg ${style.innerBg} border ${style.border}`}>
                                  <LuMapPin class={`w-5 h-5 ${style.statValue} flex-shrink-0 mt-0.5`} />
                                  <div>
                                    <p class={`font-medium ${style.description}`}>Address</p>
                                    <p class={`text-sm ${style.statLabel}`}>2567 Yonge St, Toronto, ON M4P 2J1</p>
                                  </div>
                                </div>

                                <div class={`flex items-start gap-3 p-3 rounded-lg ${style.innerBg} border ${style.border}`}>
                                  <LuMail class={`w-5 h-5 ${style.statValue} flex-shrink-0 mt-0.5`} />
                                  <div>
                                    <p class={`font-medium ${style.description}`}>Email</p>
                                    <a href="mailto:hello@earthenvessels.ca" class={`text-sm ${style.statLabel} hover:underline`}>
                                      hello@earthenvessels.ca
                                    </a>
                                  </div>
                                </div>

                                <div class={`flex items-start gap-3 p-3 rounded-lg ${style.innerBg} border ${style.border}`}>
                                  <LuClock class={`w-5 h-5 ${style.statValue} flex-shrink-0 mt-0.5`} />
                                  <div>
                                    <p class={`font-medium ${style.description}`}>Hours</p>
                                    <p class={`text-sm ${style.statLabel}`}>Mon-Fri: 10am-8pm</p>
                                    <p class={`text-sm ${style.statLabel}`}>Sat-Sun: 10am-6pm</p>
                                  </div>
                                </div>
                              </div>

                              {/* Book CTA */}
                              <a
                                href="https://www.bookeo.com/earthenvessels"
                                target="_blank"
                                rel="noopener noreferrer"
                                class={`block w-full px-6 py-3 bg-gradient-to-r ${style.button} font-semibold rounded-lg shadow-lg text-center transition-all duration-300 hover:scale-105`}
                              >
                                Book A Class
                              </a>

                              {/* Contact Page Link */}
                              <a
                                href="/contact"
                                class={`flex items-center justify-center gap-2 w-full mt-3 px-6 py-3 bg-transparent border-2 ${style.buttonOutline} font-semibold rounded-lg transition-all duration-300 hover:scale-105`}
                              >
                                View Contact Page
                                <LuChevronRight class="w-5 h-5" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Desktop Layout - Card Stack */}
        <div class="hidden lg:block max-w-7xl mx-auto">
          {/* Desktop Controls */}
          <div class="flex justify-end gap-2 mb-4">
            {/* Theme Toggle */}
            <button
              class="p-2 rounded-lg border backdrop-blur-sm transition-all duration-300 border-stone-300 dark:border-stone-600 bg-white/60 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-700"
              onClick$={toggleTheme}
              aria-label={isDark.value ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark.value ? (
                <LuSun class="w-5 h-5 text-amber-500" />
              ) : (
                <LuMoon class="w-5 h-5 text-stone-600" />
              )}
            </button>
          </div>
          <div
            class="hero-carousel-container"
            onTouchStart$={(e) => {
              touchStartX.value = e.touches[0].clientX;
              touchEndX.value = e.touches[0].clientX;
            }}
            onTouchMove$={(e) => {
              touchEndX.value = e.touches[0].clientX;
              const diff = Math.abs(touchStartX.value - touchEndX.value);
              if (diff > 10) {
                e.preventDefault();
              }
            }}
            onTouchEnd$={(e) => {
              const swipeThreshold = 50;
              const diff = touchStartX.value - touchEndX.value;

              if (Math.abs(diff) > swipeThreshold) {
                e.preventDefault();
                if (diff > 0) {
                  // Swipe left - next slide
                  currentSlideIndex.value = (currentSlideIndex.value + 1) % heroCards.length;
                } else {
                  // Swipe right - previous slide
                  currentSlideIndex.value = (currentSlideIndex.value - 1 + heroCards.length) % heroCards.length;
                }
              }

              touchStartX.value = 0;
              touchEndX.value = 0;
            }}
          >
            {heroCards.map((card, index) => {
              const getCardClass = () => {
                const current = currentSlideIndex.value;
                const total = heroCards.length;

                if (index === current) return 'active';

                // Calculate the distance from current card
                const distance = (index - current + total) % total;

                // Cards ahead of current
                if (distance === 1) return 'next';
                if (distance === 2) return 'prev';

                return 'hidden';
              };

              // Different color schemes for each card (desktop) - blockchain themed with dark mode
              const desktopStyles = [
                // Card 1: Ethereum Blue theme
                {
                  cardBg: "bg-blue-50 dark:bg-blue-950",
                  leftBg: "from-blue-50/95 to-indigo-50/95 dark:from-blue-950/95 dark:to-indigo-950/95",
                  leftInner: "bg-blue-50/90 dark:bg-blue-950/90",
                  leftBorder: "border-blue-400/60 dark:border-blue-500/60",
                  rightBg: "from-indigo-50/95 to-blue-50/95 dark:from-indigo-950/95 dark:to-blue-950/95",
                  rightInner: "bg-blue-100/90 dark:bg-blue-900/90",
                  rightBorder: "border-blue-400/60 dark:border-blue-500/60",
                  imageBorder: "border-blue-400/60 dark:border-blue-500/60",
                  badge: "bg-blue-100/70 dark:bg-blue-900/70 border-blue-300/50 dark:border-blue-600/50 text-blue-700 dark:text-blue-300",
                  title: "from-gray-900 via-gray-800 to-gray-900",
                  titleMiddle: "text-blue-700 dark:text-blue-400",
                  titleLast: "text-blue-600 dark:text-blue-400",
                  description: "text-slate-600 dark:text-slate-300",
                  button: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-200/20 text-white",
                  buttonOutline: "border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-100/30 dark:hover:bg-blue-800/30",
                  statValue: "text-blue-600 dark:text-blue-400",
                  statLabel: "text-blue-500/70 dark:text-blue-400/70",
                  divider: "border-blue-200/50 dark:border-blue-700/50"
                },
                // Card 2: Bitcoin Orange theme
                {
                  cardBg: "bg-orange-50 dark:bg-orange-950",
                  leftBg: "from-orange-50/95 to-amber-50/95 dark:from-orange-950/95 dark:to-amber-950/95",
                  leftInner: "bg-orange-50/90 dark:bg-orange-950/90",
                  leftBorder: "border-orange-400/60 dark:border-orange-500/60",
                  rightBg: "from-amber-50/95 to-orange-50/95 dark:from-amber-950/95 dark:to-orange-950/95",
                  rightInner: "bg-amber-50/90 dark:bg-amber-900/90",
                  rightBorder: "border-orange-400/60 dark:border-orange-500/60",
                  imageBorder: "border-orange-400/60 dark:border-orange-500/60",
                  badge: "bg-orange-100/70 dark:bg-orange-900/70 border-orange-300/50 dark:border-orange-600/50 text-orange-700 dark:text-orange-300",
                  title: "from-gray-900 via-gray-800 to-gray-900",
                  titleMiddle: "text-orange-600 dark:text-orange-400",
                  titleLast: "text-orange-500 dark:text-orange-400",
                  description: "text-slate-600 dark:text-slate-300",
                  button: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-200/20 text-white",
                  buttonOutline: "border-orange-400 text-orange-600 dark:text-orange-400 hover:bg-orange-100/30 dark:hover:bg-orange-800/30",
                  statValue: "text-orange-600 dark:text-orange-400",
                  statLabel: "text-orange-500/70 dark:text-orange-400/70",
                  divider: "border-orange-200/50 dark:border-orange-700/50"
                },
                // Card 3: Kaspa Teal/Green theme
                {
                  cardBg: "bg-teal-50 dark:bg-teal-950",
                  leftBg: "from-teal-50/95 to-emerald-50/95 dark:from-teal-950/95 dark:to-emerald-950/95",
                  leftInner: "bg-teal-50/90 dark:bg-teal-950/90",
                  leftBorder: "border-teal-400/60 dark:border-teal-500/60",
                  rightBg: "from-emerald-50/95 to-teal-50/95 dark:from-emerald-950/95 dark:to-teal-950/95",
                  rightInner: "bg-teal-50/90 dark:bg-teal-900/90",
                  rightBorder: "border-teal-400/60 dark:border-teal-500/60",
                  imageBorder: "border-teal-400/60 dark:border-teal-500/60",
                  badge: "bg-teal-100/70 dark:bg-teal-900/70 border-teal-300/50 dark:border-teal-600/50 text-teal-700 dark:text-teal-300",
                  title: "from-gray-900 via-gray-800 to-gray-900",
                  titleMiddle: "text-teal-600 dark:text-teal-400",
                  titleLast: "text-teal-500 dark:text-teal-400",
                  description: "text-slate-600 dark:text-slate-300",
                  button: "from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-teal-200/20 text-white",
                  buttonOutline: "border-teal-400 text-teal-600 dark:text-teal-400 hover:bg-teal-100/30 dark:hover:bg-teal-800/30",
                  statValue: "text-teal-600 dark:text-teal-400",
                  statLabel: "text-teal-500/70 dark:text-teal-400/70",
                  divider: "border-teal-200/50 dark:border-teal-700/50"
                }
              ];

              const ds = desktopStyles[index];

              return (
                <div key={index} class={`carousel-card-wrapper ${getCardClass()}`}>
                  {/* Unified Card - Both Columns */}
                  <div class={`grid grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl ${ds.cardBg}`} style="transform-style: preserve-3d;">

                    {/* Left: Messaging */}
                    <div class={`relative bg-gradient-to-br ${ds.leftBg} backdrop-blur-md border-2 border-r-0 ${ds.leftBorder} rounded-l-2xl p-8 xl:p-12`}>
                      <div class={`absolute inset-0 ${ds.leftInner} -z-10 rounded-l-2xl`}></div>
                      <div class="inline-block mb-4">
                        <span class={`px-4 py-2 rounded-full ${ds.badge} text-base font-medium tracking-wide`}>
                          nft.cx
                        </span>
                      </div>

                      <h1 class="text-4xl xl:text-5xl font-bold tracking-tight leading-tight mb-4">
                        <span class={ds.titleLast}>{card.title[0]}</span>
                      </h1>

                      <p class={`text-base xl:text-lg ${ds.description} mb-6 max-w-md`}>
                        {card.description}
                      </p>

                      <a
                        href={card.ipfsGateway}
                        target="_blank"
                        rel="noopener noreferrer"
                        class={`group/btn inline-block px-6 py-3 mb-6 bg-gradient-to-r ${ds.button} font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 text-center`}
                      >
                        View Collection
                        <span class="inline-block ml-2 transition-transform group-hover/btn:translate-x-1">→</span>
                      </a>

                      <div class={`grid grid-cols-3 gap-4 pt-4 border-t ${ds.divider}`}>
                        {card.stats.map((stat, idx) => (
                          <div key={idx}>
                            <div class={`text-2xl xl:text-3xl font-bold ${ds.statValue}`}>{stat.value}</div>
                            <div class={`text-xs ${ds.statLabel} uppercase tracking-wide`}>{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div class="progress-bar">
                        <div class="progress-fill"></div>
                      </div>
                    </div>

                    {/* Right: Image Carousel Card */}
                    <div class={`relative bg-gradient-to-br ${ds.rightBg} backdrop-blur-md border-2 border-l-0 ${ds.rightBorder} rounded-r-2xl p-8 flex items-center justify-center`}>
                      <div class={`absolute inset-0 ${ds.rightInner} -z-10 rounded-r-2xl`}></div>
                      <div class={`relative border-2 ${ds.imageBorder} rounded-xl overflow-hidden w-full aspect-square shadow-2xl`}>
                        {cardVideos[index].map((img, idx) => (
                          <div
                            key={idx}
                            class={`absolute inset-0 transition-all duration-700 ${
                              idx === rightColumnImageIndex.value
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-110'
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`Gallery ${idx + 1}`}
                              class="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        <div class="absolute inset-0 bg-gradient-to-br from-stone-950/20 via-transparent to-stone-950/40"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
});