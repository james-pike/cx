import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { SITE } from "~/config.mjs";
import Hero from "~/components/widgets/Hero";
import LandingCards from "~/components/LandingCards";

export default component$(() => {
  return (
    <>
      <div class="bg-gradient-to-br from-stone-100 via-gray-50 to-stone-50">
        <Hero />

        {/* Services Section */}
        <LandingCards />

        {/* Video Showcase Section */}
        <section class="relative py-20 md:py-28 bg-gradient-to-b from-stone-50 via-gray-50 to-stone-100 overflow-hidden">
          {/* Subtle grid overlay */}
          <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"></div>

          <div class="relative max-w-7xl mx-auto px-5 md:px-12">
            <div class="text-center mb-16">
              <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span class="bg-gradient-to-r from-stone-700 via-stone-800 to-stone-700 bg-clip-text text-transparent">
                  Recent Performances
                </span>
              </h2>
              <p class="text-xl text-stone-600 max-w-3xl mx-auto">
                Watch highlights from recent studio sessions and live performances.
              </p>
            </div>

            {/* Video Grid */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Video Card 1 */}
              <div class="group relative bg-gradient-to-br from-white/90 to-stone-100/90 border border-stone-200/80 rounded-2xl overflow-hidden hover:border-amber-400/50 hover:shadow-xl transition-all duration-300">
                <div class="aspect-video relative bg-stone-200/50">
                  {/* Placeholder for video - replace with actual video embed */}
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center">
                      <div class="w-20 h-20 mx-auto rounded-full bg-amber-100/80 border-2 border-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cursor-pointer">
                        <svg class="w-8 h-8 text-amber-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                        </svg>
                      </div>
                      <p class="text-stone-500">Studio Session Highlight</p>
                    </div>
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-stone-800 mb-2">Concert Hall Recording</h3>
                  <p class="text-stone-500">Classical performance at the Grand Theater</p>
                </div>
              </div>

              {/* Video Card 2 */}
              <div class="group relative bg-gradient-to-br from-white/90 to-stone-100/90 border border-stone-200/80 rounded-2xl overflow-hidden hover:border-amber-400/50 hover:shadow-xl transition-all duration-300">
                <div class="aspect-video relative bg-stone-200/50">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center">
                      <div class="w-20 h-20 mx-auto rounded-full bg-amber-100/80 border-2 border-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cursor-pointer">
                        <svg class="w-8 h-8 text-amber-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                        </svg>
                      </div>
                      <p class="text-stone-500">Live Performance</p>
                    </div>
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-stone-800 mb-2">Jazz Collaboration</h3>
                  <p class="text-stone-500">Improvisation session with local jazz quartet</p>
                </div>
              </div>
            </div>

            {/* View All Button */}
            <div class="text-center mt-12">
              <a
                href="/gallery"
                class="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-lg shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-105"
              >
                View Full Gallery
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: SITE.title,
  meta: [
    {
      name: "description",
      content: SITE.description,
    },
  ],
};