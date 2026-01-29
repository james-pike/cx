import { component$, useSignal, useVisibleTask$, useTask$, $ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';
import { useLocation } from "@builder.io/qwik-city";
import { LuChevronLeft, LuChevronRight } from '@qwikest/icons/lucide';

interface Workshop {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  isActive?: boolean;
}

export default component$(() => {
  const workshops = useSignal<Workshop[]>([]);
  const isPlaying = useSignal<boolean>(false);
  const slidesPerViewSig = useSignal(4); // Start with 4 for desktop to avoid flash
  const loc = useLocation();

  // Fetch workshops data client-side
  useVisibleTask$(async () => {
    try {
      const response = await fetch('/api/classes');
      if (response.ok) {
        const data = await response.json();
        workshops.value = data;
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  });

  // Handle hash navigation
  useTask$(({ track }) => {
    track(() => loc.url.pathname + loc.url.hash);
    const hash = loc.url.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }
    }
  });

  // Responsive slidesPerView – 1 on mobile (<768px), then scale up
  useVisibleTask$(({ cleanup }) => {
    isPlaying.value = true;

    const updateSlidesPerView = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        slidesPerViewSig.value = 4; // Desktop and up: 4 per row
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        slidesPerViewSig.value = 2; // Tablet: 2 per row
      } else {
        slidesPerViewSig.value = 1; // Mobile: strictly 1 per row
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    cleanup(() => {
      window.removeEventListener('resize', updateSlidesPerView);
    });
  });

  const handleMouseEnter$ = $(() => {
    isPlaying.value = false;
  });

  const handleMouseLeave$ = $(() => {
    isPlaying.value = true;
  });

  return (
    <>
      <div class="p-5 md:px-16 py-20 md:py-28 bg-gradient-to-b from-stone-50 via-gray-50 to-stone-100 max-w-7xl md:mx-auto relative">
        {/* Subtle grid overlay */}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"></div>

        {/* Header */}
        <div class="text-center mb-12 relative">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span class="bg-gradient-to-r from-stone-700 via-stone-800 to-stone-700 bg-clip-text text-transparent">
              Featured Performances
            </span>
          </h2>
          <p class="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto">
            Recent sessions, collaborations, and live performances
          </p>
        </div>

        {/* Carousel */}
        {workshops.value.length === 0 ? (
          <div class="text-center py-12">
            <p class="text-stone-500 text-lg">Loading performances...</p>
          </div>
        ) : (
          <Carousel.Root
            class="carousel-root relative"
            slidesPerView={slidesPerViewSig.value}
            gap={25}
            autoPlayIntervalMs={4000}
            bind:autoplay={isPlaying}
            draggable={true}
            align="start"
            sensitivity={{ mouse: 2.5, touch: 2.0 }}
            onMouseEnter$={handleMouseEnter$}
            onMouseLeave$={handleMouseLeave$}
          >
            <Carousel.Scroller class="carousel-scroller">
              {workshops.value.map((workshop) => (
                <Carousel.Slide key={workshop.id} class="h-auto">
                  <a
                    href={workshop.url || "/gallery"}
                    target={workshop.url ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    class="group flex flex-col h-full bg-gradient-to-br from-white/95 to-stone-100/95 border border-stone-200/80 rounded-2xl transition-all duration-300 hover:border-amber-400/50 hover:shadow-xl cursor-pointer overflow-hidden block hover:scale-105"
                  >
                    <div class="relative overflow-hidden">
                      <img
                        src={workshop.image}
                        class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        alt={workshop.name}
                      />
                      {/* Gradient overlay */}
                      <div class="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent"></div>

                      {/* Play button overlay */}
                      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div class="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm border-2 border-amber-400 flex items-center justify-center">
                          <svg class="w-6 h-6 text-amber-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col flex-1 p-5">
                      <h3 class="text-xl font-bold text-stone-800 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors">
                        {workshop.name}
                      </h3>
                      <p class="text-sm md:text-base text-stone-500 line-clamp-3 flex-1">
                        {workshop.description}
                      </p>
                      <div class="mt-4 flex items-center text-amber-600 font-medium">
                        <span class="mr-2">Watch</span>
                        <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </a>
                </Carousel.Slide>
              ))}
            </Carousel.Scroller>

            {/* Navigation and Pagination */}
            <div class="flex items-center justify-end mt-8 gap-4">
              <Carousel.Pagination class="flex space-x-2">
                {workshops.value.map((_, index) => (
                  <Carousel.Bullet key={index} class="w-3 h-3 rounded-full bg-stone-300 hover:bg-amber-500 transition-colors [&.active]:bg-amber-500" />
                ))}
              </Carousel.Pagination>
              <div class="flex gap-2">
                <Carousel.Previous class="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed">
                  <LuChevronLeft class="h-5 w-5" />
                </Carousel.Previous>
                <Carousel.Next class="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed">
                  <LuChevronRight class="h-5 w-5" />
                </Carousel.Next>
              </div>
            </div>
          </Carousel.Root>
        )}

        {/* Booking Options Section */}
        <div id="bookings" class="text-center mt-20 mb-12 relative">
          <h3 class="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Booking Options
          </h3>
          <p class="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto mb-12">
            Whether it's a live event or a studio session, let's make music together
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Live Performances */}
            <a
              href="/contact"
              class="group flex flex-col bg-gradient-to-br from-white/95 to-stone-100/95 border border-stone-200/80 rounded-2xl transition-all duration-300 hover:border-amber-400/50 hover:shadow-xl cursor-pointer overflow-hidden hover:scale-105"
            >
              <div class="h-56 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80"
                  alt="Live Performances"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent"></div>
              </div>
              <div class="flex flex-col flex-1 p-6">
                <h3 class="text-2xl font-bold text-stone-800 mb-3 group-hover:text-amber-700 transition-colors">
                  Live Performances
                </h3>
                <p class="text-base text-stone-500 mb-4">
                  Elevate your event with live violin. Perfect for weddings, corporate events, concerts, and special occasions. Professional, versatile, and unforgettable.
                </p>
                <div class="mt-auto flex items-center text-amber-600 font-medium">
                  <span class="mr-2">Book Now</span>
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </a>

            {/* Studio Sessions */}
            <a
              href="/contact"
              class="group flex flex-col bg-gradient-to-br from-white/95 to-stone-100/95 border border-stone-200/80 rounded-2xl transition-all duration-300 hover:border-amber-400/50 hover:shadow-xl cursor-pointer overflow-hidden hover:scale-105"
            >
              <div class="h-56 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&q=80"
                  alt="Studio Sessions"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 md:object-top lg:object-top"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent"></div>
              </div>

              <div class="flex flex-col flex-1 p-6">
                <h3 class="text-2xl font-bold text-stone-800 mb-3 group-hover:text-amber-700 transition-colors">
                  Studio Sessions
                </h3>
                <p class="text-base text-stone-500 mb-4">
                  High-quality violin recording for your albums, singles, and soundtracks. Fast turnaround, professional sound, and creative collaboration to bring your vision to life.
                </p>
                <div class="mt-auto flex items-center text-amber-600 font-medium">
                  <span class="mr-2">Book Now</span>
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
});