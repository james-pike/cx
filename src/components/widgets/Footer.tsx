import { component$, type JSXOutput, type JSXNode } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {
  LuMail,
  LuClock,
  LuMapPin,
  LuFacebook,
  LuInstagram,
} from "@qwikest/icons/lucide";
import type { SVGProps } from "@builder.io/qwik";

interface Item {
  title: string | JSXNode | JSXOutput;
  href: string | null;
  icon?: (props: SVGProps<SVGSVGElement>) => JSXNode<unknown>;
}

interface LinkSection {
  title: string;
  items: Item[];
}

export default component$(() => {
  const links: LinkSection[] = [
    {
      title: "About",
      items: [
        { title: "Our Space", href: "/about" },
        { title: "What To Expect", href: "/about#what-to-expect" },
        { title: "Benefits Of Clay", href: "/about#clay" },
        { title: "Our Logo", href: "/team#logo" },

        { title: "Gallery", href: "/gallery" },
        { title: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "Community",
      items: [
                { title: "Facilitators", href: "/team" },

        { title: "Classes & Workshops", href: "/offerings" },
                        { title: "Corporate Events", href: "/offerings#events" },

        { title: "Community", href: "/community" },

        { title: "Reviews", href: "/reviews" },
        { title: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Contact",
      items: [
        {
          title: "hello@earthenvessels.ca",
          href: "mailto:hello@earthenvessels.ca",
          icon: LuMail,
        },
        {
          title: "Hours: By appointment",
          href: null,
          icon: LuClock,
        },
        {
          title: (
            <span class="block leading-tight">
              <span class="block">36 Rosemount Ave</span>
              <span class="block">Ottawa, ON</span>
              <span class="block">K1Y 1P4</span>
            </span>
          ),
          href: "https://www.google.com/maps/search/?api=1&query=36+Rosemount+Ave,+K1Y+1P4,+Ottawa,+ON",
          icon: LuMapPin,
        },
      ],
    },
    {
      title: "Connect",
      items: [
        {
          title: "Instagram",
                  href: "https://www.instagram.com/earthenvesselspottery_/",
          icon: LuInstagram,
        },
        {
          title: "Facebook",
          href: "https://www.facebook.com/p/earthen-vessels-61562702795370/",
          icon: LuFacebook,
        },
      ],
    },
  ];

  return (
    <footer class="relative border-t pl-1 mt-2 md:pb-2 border-stone-200/80 overflow-hidden bg-gradient-to-b from-stone-100 to-stone-200">
      <div class="relative max-w-7xl mx-auto px-4 md:mr-4 sm:px-6 md:px-8">
        <div class="grid grid-cols-12 gap-4 gap-y-4 sm:gap-4 py-8 md:pt-12 md:pb-2">
          {/* First Column: Logo, Description, Newsletter */}
          <div class="col-span-12 lg:col-span-5 md:pr-8">
            <div class="mb-4 mt-2 md:mt-0">
              <Link class="inline-block xdxd font-bold !text-3xl" href={"/"}>
                <span class="bg-gradient-to-r from-stone-700 via-amber-700 to-stone-700 bg-clip-text text-transparent">
                  Session Violinist
                </span>
              </Link>
            </div>
            <div class="text-sm text-stone-600 leading-relaxed">
              Professional session violinist bringing soul and precision to every recording session and live performance. Collaborating with artists across all genres to create memorable musical experiences.
            </div>
            {/* Newsletter Signup */}
            <div class="mt-6">
              <div class="text-sm font-semibold mb-3 ml-1">
                <span class="bg-gradient-to-r from-stone-700 via-amber-700 to-stone-700 bg-clip-text text-transparent flex items-center gap-2">
                  Join Our Newsletter
                </span>
              </div>
              <div id="mc_embed_shell">
                <div id="mc_embed_signup">
                  <form
                    action="#"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    class="validate flex w-full max-w-md"
                    target="_self"
                    noValidate
                  >
                    <div id="mc_embed_signup_scroll" class="flex w-full">
                      <input
                        type="email"
                        name="EMAIL"
                        class="required email flex-1 px-4 !text-sm border border-stone-300 rounded-l-xl bg-white/80 backdrop-blur-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        id="mce-EMAIL"
                        placeholder="Enter your email"
                        aria-label="Enter email for newsletter"
                        required
                        value=""
                      />
                      <input
                        type="submit"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        class="px-4 py-3 bg-gradient-to-r from-stone-500 to-stone-600 text-white text-base font-medium rounded-r-full hover:from-stone-400 hover:to-stone-500 transition-all duration-200"
                        value="Subscribe"
                        role="button"
                        aria-label="Subscribe to newsletter"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Sitemap Columns */}
          {links.map(({ title, items }, index) => (
            <div
              key={index}
              class={`
                col-span-6 sm:col-span-6 md:col-span-3 mt-1
                ${index === 0 ? 'lg:col-span-2'
                  : index === 1 ? 'lg:col-span-2'
                    : index === 2 ? 'lg:col-span-2'
                      : 'lg:col-span-1'}
              `}
            >
              <div class="text-sm font-semibold mb-4 mt-2">
                <span class="bg-gradient-to-r from-stone-700 via-amber-700 to-stone-700 bg-clip-text text-transparent">
                  {title}
                </span>
              </div>
              {Array.isArray(items) && items.length > 0 && (
                <ul class="text-sm space-y-2">
                  {items.map(({ title, href, icon: Icon }, index2) => (
                    <li key={index2} class="flex items-start gap-2 text-stone-500">
                      {Icon && <Icon class="w-4 h-4 flex-shrink-0 mt-0.5" />}
                      {href ? (
                        <Link
                          class="text-stone-600 hover:text-amber-600 transition-colors duration-200 ease-in-out"
                          href={href}
                          target={href.startsWith("http") || href.startsWith("mailto") ? "_blank" : undefined}
                          rel={href.startsWith("http") || href.startsWith("mailto") ? "noopener noreferrer" : undefined}
                        >
                          {title}
                        </Link>
                      ) : (
                        <span class="text-stone-600">{title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between -mt-4 md:-mt-0 md:pt-4 pb-3 md:pb-6 border-t border-stone-300/50">
          <div class="flex flex-col md:flex-row md:items-center text-sm text-stone-500 w-full md:w-auto">
            <div class="flex items-center py-4 md:pb-2 mb-2">
              <img
                src="/images/logo22.svg"
                alt="Logo"
                class="w-18 h-18 md:w-120 md:h-30 mr-4 rounded-sm"
                width={80}
                height={80}
              />
              <span class="block text-stone-500">© 2025 Session Violinist · All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});