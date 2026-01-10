import { component$, useSignal, useStore, $, useVisibleTask$ } from "@builder.io/qwik";
import { LuPlay, LuPause, LuSkipBack, LuSkipForward, LuX, LuChevronUp, LuChevronDown, LuVolume2, LuVolumeX } from "@qwikest/icons/lucide";

interface Track {
  id: string;
  title: string;
  artist: string;
  image: string;
  videoUrl?: string;
}

export default component$(() => {
  const isExpanded = useSignal(false);
  const isPlaying = useSignal(false);
  const isMuted = useSignal(false);
  const currentTrackIndex = useSignal(0);
  const progress = useSignal(0);

  const store = useStore({
    isVisible: true,
  });

  const tracks: Track[] = [
    {
      id: "1",
      title: "Concert Hall Recording",
      artist: "Classical Performance",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80",
    },
    {
      id: "2",
      title: "Jazz Collaboration",
      artist: "Live Session",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
    },
    {
      id: "3",
      title: "Studio Session",
      artist: "Recording Studio",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    },
    {
      id: "4",
      title: "Orchestral Performance",
      artist: "Symphony Hall",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=80",
    },
  ];

  const currentTrack = tracks[currentTrackIndex.value];

  // Simulate progress
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      if (isPlaying.value) {
        progress.value = (progress.value + 0.5) % 100;
      }
    }, 100);
    cleanup(() => clearInterval(interval));
  });

  const togglePlay = $(() => {
    isPlaying.value = !isPlaying.value;
  });

  const toggleMute = $(() => {
    isMuted.value = !isMuted.value;
  });

  const nextTrack = $(() => {
    currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.length;
    progress.value = 0;
  });

  const prevTrack = $(() => {
    currentTrackIndex.value = (currentTrackIndex.value - 1 + tracks.length) % tracks.length;
    progress.value = 0;
  });

  const toggleExpanded = $(() => {
    isExpanded.value = !isExpanded.value;
  });

  const closePlayer = $(() => {
    store.isVisible = false;
    isPlaying.value = false;
  });

  if (!store.isVisible) return null;

  return (
    <div
      class={`
        fixed bottom-0 left-0 right-0 z-50
        transition-all duration-500 ease-in-out
        ${isExpanded.value ? "h-80" : "h-14"}
      `}
    >
      {/* Background with blur - grayscale theme */}
      <div class="absolute inset-0 bg-gradient-to-t from-stone-100 via-stone-50/98 to-gray-50/95 backdrop-blur-lg border-t border-stone-300/50"></div>

      {/* Expanded View - Video/Image Carousel */}
      {isExpanded.value && (
        <div class="relative h-64 overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center p-3">
            <div class="relative w-full max-w-4xl mx-auto">
              {/* Main Carousel */}
              <div class="flex gap-3 justify-center items-center">
                {/* Previous track preview */}
                <div
                  class="hidden md:block w-28 h-28 rounded-xl overflow-hidden opacity-40 hover:opacity-60 transition-opacity cursor-pointer"
                  onClick$={prevTrack}
                >
                  <img
                    src={tracks[(currentTrackIndex.value - 1 + tracks.length) % tracks.length].image}
                    alt="Previous"
                    class="w-full h-full object-cover"
                  />
                </div>

                {/* Current track */}
                <div class="relative w-44 h-44 md:w-52 md:h-52 rounded-xl overflow-hidden shadow-xl border border-stone-300/50">
                  <img
                    src={currentTrack.image}
                    alt={currentTrack.title}
                    class={`w-full h-full object-cover transition-transform duration-300 ${isPlaying.value ? "scale-105" : "scale-100"}`}
                  />
                  {/* Play overlay */}
                  <div class="absolute inset-0 flex items-center justify-center bg-stone-900/20">
                    <button
                      onClick$={togglePlay}
                      class="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm border border-stone-400 flex items-center justify-center hover:bg-white/90 transition-all duration-300 hover:scale-110"
                    >
                      {isPlaying.value ? (
                        <LuPause class="w-7 h-7 text-stone-700" />
                      ) : (
                        <LuPlay class="w-7 h-7 text-stone-700 ml-0.5" />
                      )}
                    </button>
                  </div>
                  {/* Gradient overlay */}
                  <div class="absolute inset-0 bg-gradient-to-t from-stone-100/50 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Next track preview */}
                <div
                  class="hidden md:block w-28 h-28 rounded-xl overflow-hidden opacity-40 hover:opacity-60 transition-opacity cursor-pointer"
                  onClick$={nextTrack}
                >
                  <img
                    src={tracks[(currentTrackIndex.value + 1) % tracks.length].image}
                    alt="Next"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Track info */}
              <div class="text-center mt-3">
                <h3 class="text-base font-semibold text-stone-800">{currentTrack.title}</h3>
                <p class="text-stone-500 text-sm">{currentTrack.artist}</p>
              </div>

              {/* Track indicators */}
              <div class="flex justify-center gap-1.5 mt-3">
                {tracks.map((_, index) => (
                  <button
                    key={index}
                    onClick$={() => {
                      currentTrackIndex.value = index;
                      progress.value = 0;
                    }}
                    class={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentTrackIndex.value
                        ? "w-6 bg-gradient-to-r from-stone-600 to-stone-500"
                        : "w-1.5 bg-stone-400/40 hover:bg-stone-400/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mini Player Bar - more compact */}
      <div class="relative h-14 px-3 flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Track info */}
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <div class="relative w-9 h-9 rounded-md overflow-hidden flex-shrink-0 border border-stone-300/50">
            <img
              src={currentTrack.image}
              alt={currentTrack.title}
              class={`w-full h-full object-cover ${isPlaying.value ? "animate-pulse" : ""}`}
            />
          </div>
          <div class="min-w-0">
            <h4 class="text-stone-800 font-medium truncate text-xs md:text-sm">{currentTrack.title}</h4>
            <p class="text-stone-500 text-[10px] md:text-xs truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Center: Controls */}
        <div class="flex items-center gap-1 md:gap-2">
          <button
            onClick$={prevTrack}
            class="w-7 h-7 md:w-8 md:h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 flex items-center justify-center text-stone-600 transition-colors"
          >
            <LuSkipBack class="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            onClick$={togglePlay}
            class="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-stone-600 to-stone-700 hover:from-stone-500 hover:to-stone-600 flex items-center justify-center text-white shadow-md shadow-stone-900/20 transition-all duration-300 hover:scale-105"
          >
            {isPlaying.value ? (
              <LuPause class="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <LuPlay class="w-4 h-4 md:w-5 md:h-5 ml-0.5" />
            )}
          </button>
          <button
            onClick$={nextTrack}
            class="w-7 h-7 md:w-8 md:h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 flex items-center justify-center text-stone-600 transition-colors"
          >
            <LuSkipForward class="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>

        {/* Right: Additional controls */}
        <div class="flex items-center gap-1.5 flex-1 justify-end">
          {/* Progress bar - hidden on mobile */}
          <div class="hidden md:flex items-center gap-1.5 flex-1 max-w-xs">
            <span class="text-[10px] text-stone-500">0:{Math.floor(progress.value * 0.6).toString().padStart(2, '0')}</span>
            <div class="flex-1 h-1 bg-stone-300/50 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-stone-600 to-stone-500 transition-all duration-100"
                style={{ width: `${progress.value}%` }}
              ></div>
            </div>
            <span class="text-[10px] text-stone-500">1:00</span>
          </div>

          <button
            onClick$={toggleMute}
            class="w-6 h-6 rounded-full bg-stone-200/70 hover:bg-stone-300 flex items-center justify-center text-stone-600 transition-colors"
          >
            {isMuted.value ? (
              <LuVolumeX class="w-3 h-3" />
            ) : (
              <LuVolume2 class="w-3 h-3" />
            )}
          </button>

          <button
            onClick$={toggleExpanded}
            class="w-6 h-6 rounded-full bg-stone-200/70 hover:bg-stone-300 flex items-center justify-center text-stone-600 transition-colors"
          >
            {isExpanded.value ? (
              <LuChevronDown class="w-3 h-3" />
            ) : (
              <LuChevronUp class="w-3 h-3" />
            )}
          </button>

          <button
            onClick$={closePlayer}
            class="w-6 h-6 rounded-full bg-stone-200/70 hover:bg-stone-300 flex items-center justify-center text-stone-500 hover:text-stone-700 transition-colors"
          >
            <LuX class="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Mobile progress bar */}
      <div class="md:hidden absolute top-0 left-0 right-0 h-0.5 bg-stone-300/50">
        <div
          class="h-full bg-gradient-to-r from-stone-600 to-stone-500 transition-all duration-100"
          style={{ width: `${progress.value}%` }}
        ></div>
      </div>
    </div>
  );
});
