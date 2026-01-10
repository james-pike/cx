import { component$, useTask$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import {
  LuHeart,
  LuFlower,
  LuLeaf,
  LuPalette,
  LuUsers,
  LuActivity,
} from "@qwikest/icons/lucide";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();

  useTask$(({ track }) => {
    track(() => loc.url.pathname + loc.url.hash);
    const hash = loc.url.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "instant" }); // Changed to instant, removed setTimeout
      }
    }
  });

  const expertise = [
    {
      icon: LuHeart,
      title: "Classical Training",
      description:
        "Classically trained with years of study in orchestral and chamber music, bringing technical precision to every performance.",
    },
    {
      icon: LuFlower,
      title: "Genre Versatility",
      description:
        "Comfortable performing everything from classical to jazz, rock, folk, and contemporary styles.",
    },
    {
      icon: LuLeaf,
      title: "Studio Experience",
      description:
        "Extensive recording experience with quick turnarounds and professional-quality deliverables.",
    },
    {
      icon: LuPalette,
      title: "Creative Collaboration",
      description:
        "Work closely with artists and producers to bring their vision to life with unique string arrangements.",
    },
    {
      icon: LuUsers,
      title: "Live Performance",
      description:
        "Proven track record of memorable live performances at weddings, concerts, and special events.",
    },
    {
      icon: LuActivity,
      title: "Custom Arrangements",
      description:
        "Create custom violin parts and arrangements tailored to your project's specific needs.",
    },
  ];

  return (
    <div class="min-h-screen bg-black">
      <main class="isolate max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section class="relative overflow-hidden py-20 md:py-28">
          <div class="absolute inset-0 bg-gradient-to-br from-primary-950 via-black to-tertiary-950 opacity-80"></div>

          <div id="bio" class="relative">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1">
                <div class="bg-gradient-to-br from-tertiary-900/50 to-black backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 border border-primary-800/50">
                  <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                    <span class="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
                      About Me
                    </span>
                  </h1>
                  <p class="text-lg md:text-xl leading-relaxed text-tertiary-300 mb-6">
                    I'm a professional session violinist with over 15 years of experience bringing musical visions to life. From intimate studio recordings to grand concert halls, I've had the privilege of collaborating with artists across every genre.
                  </p>
                  <p class="text-lg md:text-xl leading-relaxed text-tertiary-300">
                    My passion lies in the intersection of technical precision and emotional expression. Whether it's laying down strings for a pop album, improvising with a jazz ensemble, or performing classical repertoire, I approach every project with dedication and creativity.
                  </p>
                </div>
              </div>
              <div class="order-1 lg:order-2">
                <div class="relative">
                  <div class="absolute -inset-4 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 rounded-2xl opacity-20 blur-xl"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80"
                    alt="Professional Violinist"
                    class="relative w-full max-w-lg lg:max-w-none rounded-2xl object-cover shadow-2xl border border-primary-800/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Background Section */}
        <section class="relative overflow-hidden py-12 md:py-20">
          <div class="relative">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div class="order-1 lg:order-1">
                <div class="relative">
                  <div class="absolute -inset-4 bg-gradient-to-r from-secondary-600 via-secondary-500 to-secondary-600 rounded-2xl opacity-15 blur-xl"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80"
                    alt="Musical Journey"
                    class="relative w-full max-w-lg lg:max-w-none rounded-2xl object-cover shadow-2xl border border-secondary-800/50"
                  />
                </div>
              </div>
              <div class="order-2 lg:order-2">
                <div class="bg-gradient-to-br from-tertiary-900/50 to-black backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 border border-secondary-800/50">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                    <span class="bg-gradient-to-r from-secondary-400 via-primary-400 to-secondary-500 bg-clip-text text-transparent">
                      Musical Journey
                    </span>
                  </h2>
                  <p class="text-lg md:text-xl leading-relaxed text-tertiary-300">
                    Trained at prestigious music conservatories, my journey has taken me from orchestra pits to recording studios, and from wedding ceremonies to international stages. Each experience has shaped my versatile approach to music-making and deepened my understanding of what makes a performance truly memorable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" class="relative overflow-hidden py-12 md:py-20">
          <div class="relative">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1">
                <div class="bg-gradient-to-br from-tertiary-900/50 to-black backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 border border-primary-800/50">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                    <span class="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
                      My Approach
                    </span>
                  </h2>
                  <p class="text-lg md:text-xl leading-relaxed text-tertiary-300 mb-4">
                    Music is a conversation, not a monologue. I believe in listening deeply to understand the soul of a project before adding my voice. This collaborative spirit, combined with technical excellence, allows me to enhance your music while respecting your artistic vision.
                  </p>
                  <p class="text-lg md:text-xl leading-relaxed text-tertiary-300">
                    Whether you need a classically elegant string section or a gritty, improvisational solo, I adapt my playing to serve the music and elevate your creative vision.
                  </p>
                </div>
              </div>
              <div class="order-1 lg:order-2">
                <div class="relative">
                  <div class="absolute -inset-4 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 rounded-2xl opacity-15 blur-xl"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80"
                    alt="Performance Philosophy"
                    class="relative w-full max-w-lg lg:max-w-none rounded-2xl object-cover shadow-2xl border border-primary-800/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" class="relative overflow-hidden py-12 pb-20 md:py-20">
          <div class="relative max-w-7xl mx-auto">
            <h2 class="text-4xl md:text-5xl lg:text-6xl text-center font-bold tracking-tight mb-16">
              <span class="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
                What I Bring
              </span>
            </h2>
            <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    class="bg-gradient-to-br from-tertiary-900/50 to-black backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-tertiary-800/50 hover:border-primary-600/50 transition-all duration-300 hover:scale-105"
                  >
                    <Icon class="w-8 h-8 text-secondary-400 mb-4" />
                    <p class="text-xl font-bold tracking-tight text-white mb-3">
                      {item.title}
                    </p>
                    <p class="text-base leading-relaxed text-tertiary-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
});