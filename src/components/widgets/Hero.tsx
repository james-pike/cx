import { component$, useSignal, useVisibleTask$, useStyles$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

export default component$(() => {
  const carouselIndex = useSignal(0);
  const isAutoPlaying = useSignal(true);
  const currentSlideIndex = useSignal(0);
  const rightColumnImageIndex = useSignal(0);
  const touchStartX = useSignal(0);
  const touchEndX = useSignal(0);

  const carouselImages = [
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80"
  ];

  const rightColumnImages = [
    "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
    "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=800&q=80",
    "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800&q=80",
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"
  ];

  const heroCards = [
    {
      badge: "Studio Sessions",
      title: ["Polishing", "Every", "Recording"],
      description: "Professional recording services with attention to detail and musical excellence.",
      stats: [
        { value: "40+", label: "Tracks" },
        { value: "20+", label: "Artists" },
        { value: "10+", label: "Genres" }
      ]
    },
    {
      badge: "Session Violinist",
      title: ["Crafting", "Musical", "Moments"],
      description: "Bringing soul and precision to every recording session and live performance we create.",
      stats: [
        { value: "50+", label: "Sessions" },
        { value: "15+", label: "Albums" },
        { value: "10+", label: "Years" }
      ]
    },
    {
      badge: "Live Performances",
      title: ["Creating", "Unforgettable", "Experiences"],
      description: "From intimate venues to grand stages, delivering performances that truly resonate.",
      stats: [
        { value: "30+", label: "Concerts" },
        { value: "10+", label: "Venues" },
        { value: "5+", label: "Cities" }
      ]
    }
  ];

  useStyles$(`
    .hero-carousel-container {
      position: relative;
      width: 100%;
      min-height: 600px;
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
  `);

  // Auto-advance carousel for images
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      if (isAutoPlaying.value) {
        carouselIndex.value = (carouselIndex.value + 1) % carouselImages.length;
      }
    }, 3000);
    cleanup(() => clearInterval(interval));
  });

  // Auto-advance hero cards carousel
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      currentSlideIndex.value = (currentSlideIndex.value + 1) % heroCards.length;
    }, 5000);
    cleanup(() => clearInterval(interval));
  });

  // Auto-advance right column images
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      rightColumnImageIndex.value = (rightColumnImageIndex.value + 1) % rightColumnImages.length;
    }, 5000);
    cleanup(() => clearInterval(interval));
  });

  return (
    <section class="relative min-h-[auto] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-100 via-gray-50 to-stone-50 pt-0 pb-4 lg:py-0">
      {/* Animated gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-stone-200/60 via-gray-100/50 to-stone-100/60 opacity-80"></div>

      {/* Floating decorations */}
      <div class="absolute top-20 left-10 w-32 h-32 bg-stone-400/15 rounded-full blur-2xl animate-float" aria-hidden="true"></div>
      <div class="absolute top-40 right-20 w-48 h-48 bg-gray-300/15 rounded-full blur-3xl animate-floatx" aria-hidden="true"></div>
      <div class="absolute bottom-20 left-1/3 w-40 h-40 bg-stone-300/15 rounded-full blur-2xl animate-float" aria-hidden="true"></div>

      {/* Subtle grid overlay */}
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"></div>

      <div class="relative z-10 container lg:-mt-28 mx-auto px-4 pt-8 pb-2 lg:py-8">
        {/* Mobile Layout - Card Stack */}
        <div class="lg:hidden">
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

                const distance = (index - current + total) % total;

                if (distance === 1) return 'next';
                if (distance === 2) return 'prev';

                return 'hidden';
              };

              // Different color schemes for each card - soft pastel with black headlines
              const cardStyles = [
                // Card 1: Soft stone/taupe - with black headline (Studio Sessions)
                {
                  bg: "from-stone-100/95 to-stone-50/95",
                  innerBg: "bg-stone-50/90",
                  border: "border-stone-200/60",
                  badge: "bg-stone-100/70 border-stone-300/50 text-stone-600",
                  title: "from-gray-900 via-gray-800 to-gray-900",
                  titleLast: "text-gray-900",
                  button: "from-stone-200 to-stone-300 hover:from-stone-300 hover:to-stone-400 shadow-stone-200/20 text-stone-700",
                  buttonOutline: "border-stone-300 text-stone-600 hover:bg-stone-200/30",
                  statValue: "text-stone-600",
                  statLabel: "text-stone-500/70",
                  divider: "border-stone-200/50",
                  description: "text-stone-600"
                },
                // Card 2: Soft cream/yellow - with black headline (Session Violinist)
                {
                  bg: "from-amber-50/90 to-stone-50/90",
                  innerBg: "bg-amber-50/80",
                  border: "border-amber-200/40",
                  badge: "bg-amber-100/50 border-amber-200/40 text-amber-600",
                  title: "from-gray-900 via-gray-800 to-gray-900",
                  titleLast: "text-gray-900",
                  button: "from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 shadow-amber-100/20 text-amber-700",
                  buttonOutline: "border-amber-200 text-amber-500 hover:bg-amber-100/30",
                  statValue: "text-amber-500",
                  statLabel: "text-amber-400/70",
                  divider: "border-amber-200/40",
                  description: "text-stone-600"
                },
                // Card 3: Soft tan/warm beige - with black headline (Live Performances)
                {
                  bg: "from-orange-50/95 to-amber-50/95",
                  innerBg: "bg-orange-50/90",
                  border: "border-orange-200/60",
                  badge: "bg-orange-100/70 border-orange-300/50 text-orange-700",
                  title: "from-gray-900 via-gray-800 to-gray-900",
                  titleLast: "text-gray-900",
                  button: "from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400 shadow-orange-200/20 text-orange-800",
                  buttonOutline: "border-orange-300 text-orange-600 hover:bg-orange-200/30",
                  statValue: "text-orange-600",
                  statLabel: "text-orange-500/70",
                  divider: "border-orange-200/50",
                  description: "text-stone-600"
                }
              ];

              const style = cardStyles[index];

              return (
                <div key={index} class={`carousel-card-wrapper ${getCardClass()}`}>
                  {/* Mobile Text Panel */}
                  <div class={`relative bg-gradient-to-br ${style.bg} backdrop-blur-sm p-8 rounded-2xl border ${style.border} shadow-2xl`}>
                    <div class={`absolute inset-0 ${style.innerBg} -z-10 rounded-2xl`}></div>
                    <div class="inline-block mb-4">
                      <span class={`px-3 py-1 rounded-full ${style.badge} text-xs font-medium tracking-wider uppercase`}>
                        {card.badge}
                      </span>
                    </div>
                    <h1 class="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
                      <span class={`bg-gradient-to-r ${style.title} bg-clip-text text-transparent block`}>
                        {card.title[0]}
                      </span>
                      <span class={`bg-gradient-to-r ${style.title} bg-clip-text text-transparent block`}>
                        {card.title[1]}
                      </span>
                      <span class={`${style.titleLast} block`}>{card.title[2]}</span>
                    </h1>
                    <p class={`text-lg ${style.description} mb-6 min-h-[3.5rem]`}>
                      {card.description}
                    </p>
                    <div class="flex flex-col sm:flex-row gap-3">
                      <a
                        href="/gallery"
                        class={`group px-6 py-3 bg-gradient-to-r ${style.button} font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 text-center`}
                      >
                        View Portfolio
                        <span class="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </a>
                      <a
                        href="/contact"
                        class={`px-6 py-3 bg-transparent border-2 ${style.buttonOutline} font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-center`}
                      >
                        Book Session
                      </a>
                    </div>
                    <div class={`grid grid-cols-3 gap-4 mt-8 pt-6 border-t ${style.divider}`}>
                      {card.stats.map((stat, idx) => (
                        <div key={idx} class="text-center">
                          <div class={`text-2xl font-bold ${style.statValue}`}>{stat.value}</div>
                          <div class={`text-xs ${style.statLabel} uppercase tracking-wide`}>{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    {/* <div class="progress-bar">
                      <div class="progress-fill"></div>
                    </div> */}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Media Player Section */}
          <div class="relative mt-3">
            {/* Main media container */}
            <div class="relative bg-gradient-to-br from-stone-100/95 to-stone-50/95 backdrop-blur-sm rounded-2xl border border-stone-300/60 shadow-2xl overflow-hidden">
              {/* Video/Image display */}
              <div class="relative aspect-video">
                <img
                  src={rightColumnImages[rightColumnImageIndex.value]}
                  alt="Performance"
                  class="w-full h-full object-cover"
                />
                {/* Play button overlay */}
                <div class="absolute inset-0 flex items-center justify-center bg-stone-900/20">
                  <button class="w-16 h-16 rounded-full bg-white/70 backdrop-blur-sm border-2 border-stone-500 flex items-center justify-center hover:bg-white/90 transition-all duration-300 hover:scale-110">
                    <svg class="w-8 h-8 text-stone-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
                {/* Gradient overlay */}
                <div class="absolute inset-0 bg-gradient-to-t from-stone-100/40 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Media info bar */}
              <div class="p-4 border-t border-stone-300/50">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-stone-800 font-semibold text-sm">Latest Performance</h3>
                    <p class="text-stone-500 text-xs">Live Session Recording</p>
                  </div>
                  <div class="flex gap-2">
                    <button
                      onClick$={() => {
                        rightColumnImageIndex.value = (rightColumnImageIndex.value - 1 + rightColumnImages.length) % rightColumnImages.length;
                      }}
                      class="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                      </svg>
                    </button>
                    <button
                      onClick$={() => {
                        rightColumnImageIndex.value = (rightColumnImageIndex.value + 1) % rightColumnImages.length;
                      }}
                      class="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Desktop Layout - Card Stack */}
        <div class="hidden lg:block max-w-7xl  mx-auto">
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

              // Different color schemes for each card (desktop) - soft pastel with black headlines
              const desktopStyles = [
                // Card 1: Soft stone/taupe - with black headline (Studio Sessions)
                {
                  cardBg: "bg-stone-50",
                  leftBg: "from-stone-100/95 to-stone-50/95",
                  leftInner: "bg-stone-50/90",
                  leftBorder: "border-stone-200/60",
                  rightBg: "from-stone-50/95 to-stone-100/95",
                  rightInner: "bg-stone-100/90",
                  rightBorder: "border-stone-200/60",
                  imageBorder: "border-stone-300/50",
                  badge: "bg-stone-100/70 border-stone-300/50 text-stone-600",
                  title: "from-gray-900 via-gray-800 to-gray-900",
                  titleMiddle: "text-gray-900",
                  titleLast: "text-gray-900",
                  description: "text-stone-600",
                  button: "from-stone-200 to-stone-300 hover:from-stone-300 hover:to-stone-400 shadow-stone-200/20 text-stone-700",
                  buttonOutline: "border-stone-300 text-stone-600 hover:bg-stone-200/30",
                  statValue: "text-stone-600",
                  statLabel: "text-stone-500/70",
                  divider: "border-stone-200/50"
                },
                // Card 2: Soft cream/yellow - with black headline (Session Violinist)
                {
                  cardBg: "bg-amber-50/80",
                  leftBg: "from-amber-50/90 to-stone-50/90",
                  leftInner: "bg-amber-50/80",
                  leftBorder: "border-amber-200/40",
                  rightBg: "from-stone-50/90 to-amber-50/90",
                  rightInner: "bg-amber-50/80",
                  rightBorder: "border-amber-200/40",
                  imageBorder: "border-amber-200/40",
                  badge: "bg-amber-100/50 border-amber-200/40 text-amber-600",
                  title: "from-gray-900 via-gray-800 to-gray-900",
                  titleMiddle: "text-gray-900",
                  titleLast: "text-gray-900",
                  description: "text-stone-600",
                  button: "from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 shadow-amber-100/20 text-amber-700",
                  buttonOutline: "border-amber-200 text-amber-500 hover:bg-amber-100/30",
                  statValue: "text-amber-500",
                  statLabel: "text-amber-400/70",
                  divider: "border-amber-200/40"
                },
                // Card 3: Soft tan/warm beige - with black headline (Live Performances)
                {
                  cardBg: "bg-orange-50",
                  leftBg: "from-orange-50/95 to-amber-50/95",
                  leftInner: "bg-orange-50/90",
                  leftBorder: "border-orange-200/60",
                  rightBg: "from-amber-50/95 to-orange-50/95",
                  rightInner: "bg-amber-50/90",
                  rightBorder: "border-orange-200/60",
                  imageBorder: "border-orange-300/50",
                  badge: "bg-orange-100/70 border-orange-300/50 text-orange-700",
                  title: "from-gray-900 via-gray-800 to-gray-900",
                  titleMiddle: "text-gray-900",
                  titleLast: "text-gray-900",
                  description: "text-stone-600",
                  button: "from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400 shadow-orange-200/20 text-orange-800",
                  buttonOutline: "border-orange-300 text-orange-600 hover:bg-orange-200/30",
                  statValue: "text-orange-600",
                  statLabel: "text-orange-500/70",
                  divider: "border-orange-200/50"
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
                        <span class={`px-4 py-2 rounded-full ${ds.badge} text-sm font-medium tracking-wider uppercase`}>
                          {card.badge}
                        </span>
                      </div>

                      <h1 class="text-4xl xl:text-6xl font-bold tracking-tight leading-tight mb-4">
                        <span class={`bg-gradient-to-r ${ds.title} bg-clip-text text-transparent`}>
                          {card.title[0]}
                        </span>
                        <br />
                        <span class={ds.titleMiddle}>{card.title[1]}</span>
                        <br />
                        <span class={`bg-gradient-to-r ${ds.titleLast} bg-clip-text text-transparent`}>
                          {card.title[2]}
                        </span>
                      </h1>

                      <p class={`text-base xl:text-lg ${ds.description} mb-6 max-w-md`}>
                        {card.description}
                      </p>

                      <div class="flex flex-col gap-3 mb-6">
                        <a
                          href="/gallery"
                          class={`group/btn px-6 py-3 bg-gradient-to-r ${ds.button} font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 text-center`}
                        >
                          View Portfolio
                          <span class="inline-block ml-2 transition-transform group-hover/btn:translate-x-1">→</span>
                        </a>
                        <a
                          href="/contact"
                          class={`px-6 py-3 bg-transparent border-2 ${ds.buttonOutline} font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-center`}
                        >
                          Book Session
                        </a>
                      </div>

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
                        {rightColumnImages.map((img, idx) => (
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

          {/* Carousel Indicators - Centered box */}
          <div class="absolute bottom-[-90px] left-1/2 -translate-x-1/2 z-50 bg-gradient-to-br from-stone-100/95 via-gray-50/95 to-stone-50/95 backdrop-blur-md border-2 border-stone-300/60 shadow-2xl px-8 py-3 rounded-full">
            <div class="flex justify-center gap-3">
              {heroCards.map((_, index) => (
                <button
                  key={index}
                  onClick$={() => {
                    currentSlideIndex.value = index;
                  }}
                  class={`transition-all duration-300 rounded-full ${
                    currentSlideIndex.value === index
                      ? 'w-12 h-3 bg-gradient-to-r from-stone-600 to-stone-500'
                      : 'w-3 h-3 bg-stone-400/40 hover:bg-stone-400/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
});