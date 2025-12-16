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
    "/images/hero.webp",
    "/images/space.jpeg",
    "/images/a2.webp",
    "/images/a3.jpg"
  ];

  const rightColumnImages = [
    "/images/bowls.jpeg",
    "/images/lanterns.jpg",
    "/images/summer.jpg",
    "/images/space.jpeg",
    "/images/labyrinth.jpeg",
    "/images/welcome.jpeg"
  ];

  const heroCards = [
    {
      badge: "Session Violinist",
      title: ["Crafting", "Musical", "Moments"],
      description: "Bringing soul and precision to every recording session and live performance.",
      stats: [
        { value: "200+", label: "Sessions" },
        { value: "50+", label: "Albums" },
        { value: "15+", label: "Years" }
      ]
    },
    {
      badge: "Live Performances",
      title: ["Creating", "Unforgettable", "Experiences"],
      description: "From intimate venues to grand stages, delivering captivating performances that resonate.",
      stats: [
        { value: "100+", label: "Concerts" },
        { value: "25+", label: "Festivals" },
        { value: "10+", label: "Countries" }
      ]
    },
    {
      badge: "Studio Sessions",
      title: ["Elevating", "Your", "Sound"],
      description: "Professional recording services with meticulous attention to detail and musical excellence.",
      stats: [
        { value: "300+", label: "Tracks" },
        { value: "75+", label: "Artists" },
        { value: "20+", label: "Genres" }
      ]
    }
  ];

  useStyles$(`
    .hero-carousel-container {
      position: relative;
      width: 100%;
      min-height: 600px;
      perspective: 1000px;
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
      transform: translate(20px, -20px) scale(0.95) rotate(2deg);
      opacity: 1;
      pointer-events: none;
      visibility: visible;
    }
    .carousel-card-wrapper.prev {
      z-index: 1;
      transform: translate(40px, -40px) scale(0.9) rotate(4deg);
      opacity: 1;
      pointer-events: none;
      visibility: visible;
    }
    .carousel-card-wrapper.hidden {
      display: none;
    }
    .progress-bar {
      height: 3px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 999px;
      overflow: hidden;
      margin-top: 1rem;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary-400), var(--secondary-400));
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
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-950 via-black to-tertiary-950 py-12 md:py-0 -mt-1">
      {/* Animated gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-primary-950 via-black to-tertiary-950 opacity-80"></div>

      {/* Floating decorations */}
      <div class="absolute top-20 left-10 w-32 h-32 bg-primary-600/10 rounded-full blur-2xl animate-float" aria-hidden="true"></div>
      <div class="absolute top-40 right-20 w-48 h-48 bg-secondary-500/10 rounded-full blur-3xl animate-floatx" aria-hidden="true"></div>
      <div class="absolute bottom-20 left-1/3 w-40 h-40 bg-primary-700/10 rounded-full blur-2xl animate-float" aria-hidden="true"></div>

      {/* Subtle grid overlay */}
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"></div>

      <div class="relative z-10 container -mt-60 mx-auto px-4 py-8">
        {/* Mobile Layout - Card Stack */}
        <div class="lg:hidden">
          <div
            class="hero-carousel-container"
            onTouchStart$={(e) => {
              touchStartX.value = e.touches[0].clientX;
            }}
            onTouchMove$={(e) => {
              touchEndX.value = e.touches[0].clientX;
            }}
            onTouchEnd$={() => {
              const swipeThreshold = 50;
              const diff = touchStartX.value - touchEndX.value;

              if (Math.abs(diff) > swipeThreshold) {
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

              return (
                <div key={index} class={`carousel-card-wrapper ${getCardClass()}`}>
                  {/* Mobile Text Panel */}
                  <div class="bg-gradient-to-br from-tertiary-900/80 to-black/80 backdrop-blur-sm p-8 rounded-2xl border border-primary-800/50 shadow-2xl">
                    <div class="inline-block mb-4">
                      <span class="px-3 py-1 rounded-full bg-primary-900/50 border border-primary-600/30 text-primary-300 text-xs font-medium tracking-wider uppercase">
                        {card.badge}
                      </span>
                    </div>
                    <h1 class="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
                      <span class="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
                        {card.title[0]} {card.title[1]}
                      </span>
                      <br />
                      <span class="text-white">{card.title[2]}</span>
                    </h1>
                    <p class="text-lg text-tertiary-300 mb-6">
                      {card.description}
                    </p>
                    <div class="flex flex-col sm:flex-row gap-3">
                      <a
                        href="/gallery"
                        class="group px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-semibold rounded-lg shadow-lg shadow-primary-900/50 transition-all duration-300 hover:scale-105 text-center"
                      >
                        View Portfolio
                        <span class="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </a>
                      <a
                        href="/contact"
                        class="px-6 py-3 bg-transparent border-2 border-secondary-500 text-secondary-400 hover:bg-secondary-500/10 font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-center"
                      >
                        Book Session
                      </a>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-tertiary-800">
                      {card.stats.map((stat, idx) => (
                        <div key={idx} class="text-center">
                          <div class="text-2xl font-bold text-secondary-400">{stat.value}</div>
                          <div class="text-xs text-tertiary-400 uppercase tracking-wide">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div class="progress-bar">
                      <div class="progress-fill"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Carousel Indicators */}
          <div class="relative z-50 flex justify-center gap-3 mt-8">
            {heroCards.map((_, index) => (
              <button
                key={index}
                onClick$={() => {
                  currentSlideIndex.value = index;
                }}
                class={`transition-all duration-300 rounded-full ${
                  currentSlideIndex.value === index
                    ? 'w-12 h-3 bg-gradient-to-r from-primary-400 to-secondary-400'
                    : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout - Card Stack */}
        <div class="hidden lg:block max-w-7xl  mx-auto">
          <div
            class="hero-carousel-container"
            onTouchStart$={(e) => {
              touchStartX.value = e.touches[0].clientX;
            }}
            onTouchMove$={(e) => {
              touchEndX.value = e.touches[0].clientX;
            }}
            onTouchEnd$={() => {
              const swipeThreshold = 50;
              const diff = touchStartX.value - touchEndX.value;

              if (Math.abs(diff) > swipeThreshold) {
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

              return (
                <div key={index} class={`carousel-card-wrapper ${getCardClass()}`}>
                  {/* Unified Card - Both Columns */}
                  <div class="grid grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl bg-black" style="transform-style: preserve-3d;">

                    {/* Left: Messaging */}
                    <div class="relative bg-gradient-to-br from-primary-900/20 via-black/40 to-tertiary-900/20 backdrop-blur-md border-2 border-r-0 border-primary-600/30 rounded-l-2xl p-8 xl:p-12">
                      <div class="absolute inset-0 bg-black/70 -z-10 rounded-l-2xl"></div>
                      <div class="inline-block mb-4">
                        <span class="px-4 py-2 rounded-full bg-primary-900/50 border border-primary-600/30 text-primary-300 text-sm font-medium tracking-wider uppercase">
                          {card.badge}
                        </span>
                      </div>

                      <h1 class="text-4xl xl:text-6xl font-bold tracking-tight leading-tight mb-4">
                        <span class="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
                          {card.title[0]}
                        </span>
                        <br />
                        <span class="text-white">{card.title[1]}</span>
                        <br />
                        <span class="bg-gradient-to-r from-secondary-400 to-primary-500 bg-clip-text text-transparent">
                          {card.title[2]}
                        </span>
                      </h1>

                      <p class="text-base xl:text-lg text-tertiary-300 mb-6 max-w-md">
                        {card.description}
                      </p>

                      <div class="flex flex-col gap-3 mb-6">
                        <a
                          href="/gallery"
                          class="group/btn px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-semibold rounded-lg shadow-lg shadow-primary-900/50 transition-all duration-300 hover:scale-105 text-center"
                        >
                          View Portfolio
                          <span class="inline-block ml-2 transition-transform group-hover/btn:translate-x-1">→</span>
                        </a>
                        <a
                          href="/contact"
                          class="px-6 py-3 bg-transparent border-2 border-secondary-500 text-secondary-400 hover:bg-secondary-500/10 font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-center"
                        >
                          Book Session
                        </a>
                      </div>

                      <div class="grid grid-cols-3 gap-4 pt-4 border-t border-tertiary-800/50">
                        {card.stats.map((stat, idx) => (
                          <div key={idx}>
                            <div class="text-2xl xl:text-3xl font-bold text-secondary-400">{stat.value}</div>
                            <div class="text-xs text-tertiary-400 uppercase tracking-wide">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div class="progress-bar">
                        <div class="progress-fill"></div>
                      </div>
                    </div>

                    {/* Right: Image Carousel Card */}
                    <div class="relative bg-gradient-to-br from-primary-900/20 via-black/40 to-tertiary-900/20 backdrop-blur-md border-2 border-l-0 border-secondary-600/30 rounded-r-2xl p-8 flex items-center justify-center">
                      <div class="absolute inset-0 bg-black/70 -z-10 rounded-r-2xl"></div>
                      <div class="relative border-2 border-primary-600/30 rounded-xl overflow-hidden w-full aspect-square shadow-2xl">
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
                        <div class="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Indicators - Centered box */}
          <div class="absolute bottom-[-90px] left-1/2 -translate-x-1/2 z-50 bg-gradient-to-br from-primary-900/80 via-black/90 to-tertiary-900/80 backdrop-blur-md border-2 border-primary-600/40 shadow-2xl px-8 py-3 rounded-full">
            <div class="flex justify-center gap-3">
              {heroCards.map((_, index) => (
                <button
                  key={index}
                  onClick$={() => {
                    currentSlideIndex.value = index;
                  }}
                  class={`transition-all duration-300 rounded-full ${
                    currentSlideIndex.value === index
                      ? 'w-12 h-3 bg-gradient-to-r from-primary-400 to-secondary-400'
                      : 'w-3 h-3 bg-white/30 hover:bg-white/50'
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
        <svg class="w-6 h-6 text-tertiary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
});