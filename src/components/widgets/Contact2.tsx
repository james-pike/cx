import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

export default component$(() => {
  const contactInfo = [
    {
      icon: (
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      title: "Visit Our Studio",
      details: "36 Rosemount Ave, Ottawa ON, K1Y1P4",
      link: "https://www.google.com/maps/place/36+Rosemount+Ave,+Ottawa,+ON+K1Y+1P4/"
    },
    {
      icon: (
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      title: "Email Us",
      details: "hello@earthenvessels.ca",
      link: "mailto:hello@earthenvessels.ca"
    },
    {
      icon: (
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: "Studio Hours",
      details: "By appointment",
      link: "#"
    }
  ];

  return (
    <section id="contact" class="relative overflow-hidden py-12 md:py-16 bg-gradient-to-b from-black via-tertiary-950 to-black">
      <div class="relative max-w-6xl mx-auto px-5 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="!text-5xl md:!text-5xl xdxd font-bold mb-6">
            <span class="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
        </div>

        <div class="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left side image */}
          <div class="relative rounded-2xl overflow-hidden shadow-xl border-2 border-primary-600/30">
            <Image
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80"
              layout="constrained"
              width={600}
              height={400}
              alt="Music Studio"
              class="w-full h-auto max-w-full mx-auto object-cover"
              breakpoints={[320, 480, 640, 768, 1024]}
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Right side cards */}
          <div class="space-y-4">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target={info.link.startsWith('http') ? "_blank" : undefined}
                rel={info.link.startsWith('http') ? "noopener noreferrer" : undefined}
                class="flex flex-col p-6 rounded-2xl border-2 border-tertiary-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary-600/50 transition-all duration-300
                       bg-gradient-to-br from-tertiary-900/50 via-black/50 to-tertiary-950/50"
              >
                <div class="flex items-center space-x-4 mb-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-800/50 to-primary-900/50 rounded-xl flex items-center justify-center text-secondary-400">
                    {info.icon}
                  </div>
                  <h3 class="text-md font-semibold text-white">
                    {info.title}
                  </h3>
                </div>
                <p class="text-sm text-tertiary-300">{info.details}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});