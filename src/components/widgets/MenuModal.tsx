import { component$, useSignal, $, Signal, useVisibleTask$ } from "@builder.io/qwik";
import { LuX, LuChevronDown, LuFacebook, LuInstagram, LuGlobe } from "@qwikest/icons/lucide";
import { cn } from "@qwik-ui/utils";
import { useLocation } from "@builder.io/qwik-city";
import { Modal } from "../ui/Modal";
import IconHamburger from "../icons/IconHamburger";
import { buttonVariants } from "../ui/Button";
import { useI18n, setLanguage as setLang, type Language } from "~/context/i18n";

const CustomAccordion = component$(({ items, show }: { items: any[]; show: Signal<boolean> }) => {
  const openIndex = useSignal<number | null>(null);
  const location = useLocation();

  useVisibleTask$(({ track }) => {
    track(() => show.value);
    if (!show.value) {
      openIndex.value = null;
    }
  });

  const closeModal = $(() => (show.value = false));

  // Normalize paths to handle trailing slashes
  const normalizePath = (path: string) => path.replace(/\/$/, "");

  return (
    <div class="border-t border-primary-800/30">
      {items.map((item, index) => {
        // Check if the current route matches the item or any subitem
        const currentPath = normalizePath(location.url.pathname);
        const isActive =
          normalizePath(item.href) === currentPath ||
          (item.hasSubmenu &&
            item.subitems?.some((subitem: any) =>
              normalizePath(subitem.href.split("#")[0]) === currentPath
            ));
        return (
          <div
            key={index}
            class={cn(
              index > 0 && "border-t border-primary-800/30",
              index === items.length - 1 && "border-b-0"
            )}
          >
            {item.hasSubmenu ? (
              <>
                <button
                  class={cn(
                    "!text-xl font-medium text-tertiary-200 flex items-center justify-between w-full p-2.5 px-5",
                    isActive &&
                      "bg-primary-900/50 text-primary-300 font-bold",
                    "hover:bg-primary-900/30 transition-all duration-200"
                  )}
                  onClick$={() => (openIndex.value = openIndex.value === index ? null : index)}
                >
                  <span>{item.title}</span>
                  <LuChevronDown
                    class={cn(
                      "h-6 w-6 text-tertiary-400 transition-transform duration-200",
                      openIndex.value === index && "rotate-180"
                    )}
                  />
                </button>
                <div
                  class={cn(
                    "text-xl text-muted-foreground transition-all duration-500 ease-in-out max-h-0 overflow-hidden",
                    openIndex.value === index && "max-h-96"
                  )}
                >
                  <ul class="flex flex-col gap-0 pl-5">
                    {item.subitems!.map((subitem: any) => {
                      // Updated logic: Compare full href (including hash) with current pathname + hash
                      const isSubitemActive =
                        normalizePath(subitem.href) ===
                        normalizePath(location.url.pathname + (location.url.hash || ""));
                      const isExternalLink = subitem.href?.startsWith('http');
                      const linkProps = {
                        href: subitem.href,
                        ...(isExternalLink && { target: "_blank", rel: "noopener noreferrer" })
                      };
                      return (
                        <li key={subitem.title} class="flex items-center">
                          <span class="text-primary-400 !text-2xs mr-3">✦</span>
                          <a
                            {...linkProps}
                            class={cn(
                              "block text-tertiary-300 !text-xl p-3 pl-1 font-medium transition-all duration-200",
                              isSubitemActive &&
                                "bg-primary-900/50 text-primary-300 font-bold",
                              "hover:bg-primary-900/30"
                            )}
                            onClick$={closeModal}
                          >
                            {subitem.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            ) : (
              (() => {
                const itemLinkProps = {
                  href: item.href,
                  ...(item.href?.startsWith('http') && { target: "_blank", rel: "noopener noreferrer" })
                };
                return (
                  <a
                    {...itemLinkProps}
                    class={cn(
                      "block lg text-tertiary-200 !text-xl p-3 px-5 font-medium transition-all duration-200",
                      isActive &&
                        "bg-primary-900/50 text-primary-300 font-bold",
                      "hover:bg-primary-900/30"
                    )}
                    onClick$={closeModal}
                  >
                    <span>{item.title}</span>
                    {item.badge}
                  </a>
                );
              })()
            )}
          </div>
        );
      })}
    </div>
  );
});



// ... CustomAccordion component unchanged ...

export default component$(() => {
  const show = useSignal(false);
  const i18n = useI18n();

  const handleSetLanguage = $((lang: Language) => {
    i18n.locale.value = lang;
    setLang(lang);
  });

  const menuItems = [
      {
      title: "This Is Us",
      href: "/team",
      hasSubmenu: true,
      subitems: [
        { title: "Facilitators", href: "/team" },
            { title: "Our Logo", href: "/team#logo", badge: null },

      ],
    },
    {
      title: "About",
      href: "/about",
      hasSubmenu: true,
      subitems: [
        { title: "Our Space", href: "/about" },
        { title: "What To Expect", href: "/about#what-to-expect" },
                { title: "Benefits Of Clay", href: "/about#benefits-of-clay" },

        { title: "Newsletter", href: "/newsletter" },
            { title: "Gallery", href: "/gallery", badge: null },

        { title: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Our Offerings",
      href: "/offerings",
      hasSubmenu: true,
      subitems: [
        { title: "Classes & Workshops", href: "/offerings" },
                { title: "Corporate Events", href: "/offerings#events" },
                                { title: "Private Events", href: "/offerings#private-events" },

                        { title: "Gift Cards", href: "https://bookeo.com/earthenvessels/buyvoucher" },


      ],
    },
      {
      title: "Reviews",
      href: "/reviews",
      hasSubmenu: true,
      subitems: [
        { title: "Reviews", href: "/reviews" },
                { title: "In The News", href: "/reviews#news" },


      ],
    },
        { title: "Community", href: "/community/", badge: null },

        { title: "Contact", href: "/contact/", badge: null },

  ];

  return (
    <>
      <Modal.Root bind:show={show}>
        <div class="absolute top-2 right-3 md:static">
          <Modal.Trigger
            class={cn(
              "p-2 py-1 rounded-lg border backdrop-blur-sm transition-all duration-300",
              "bg-stone-100/40 mb-1 border-stone-300/50 hover:shadow-xl hover:bg-stone-200/50",
              "[&_svg]:stroke-stone-800"
            )}
          >
            <IconHamburger class="w-6 h-7" />
          </Modal.Trigger>
        </div>

        <Modal.Panel
          position="left"
          class="bg-gradient-to-br from-primary-950 via-black to-tertiary-950 border-r border-primary-600/30 overflow-y-auto max-h-[100vh]"
        >
          <div class="rounded-t-none border-b border-primary-800/30 bg-gradient-to-br from-primary-900/20 to-black/40 backdrop-blur-md p-2">
            <Modal.Title class="pt-3 pb-2 pl-2.5">
              <a href="/" class="focus:outline-none">
                <div style="width: 100px; height: 40px;">
                  <img src="/images/logo2.svg" alt="Logo" />
                </div>
              </a>
            </Modal.Title>
            {/* <Modal.Description class="!text-md !font-bold px-2.5 py-1 pb-2 dark:text-gray-200">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                Listening, Connecting & Creating
              </span>
            </Modal.Description> */}
          </div>

          <nav class="mt-0 space-y-4 bg-gradient-to-br from-black/40 to-tertiary-900/20">
            <CustomAccordion items={menuItems} show={show} />
          </nav>

          <div class="rounded-b-2xl border-t border-primary-800/30 bg-gradient-to-br from-primary-900/20 to-black/40 backdrop-blur-md pb-5">
            {/* Language Selector */}
            <div class="px-5 pt-4 pb-3 border-b border-primary-800/30">
              <div class="flex items-center gap-2 mb-2">
                <LuGlobe class="w-5 h-5 text-tertiary-400" />
                <span class="text-sm font-medium text-tertiary-300">Language</span>
              </div>
              <div class="flex gap-2">
                <button
                  class={cn(
                    "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    i18n.locale.value === 'en'
                      ? "bg-primary-600 text-white"
                      : "bg-primary-900/30 text-tertiary-300 hover:bg-primary-900/50"
                  )}
                  onClick$={() => handleSetLanguage('en')}
                >
                  English
                </button>
                <button
                  class={cn(
                    "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    i18n.locale.value === 'fr'
                      ? "bg-primary-600 text-white"
                      : "bg-primary-900/30 text-tertiary-300 hover:bg-primary-900/50"
                  )}
                  onClick$={() => handleSetLanguage('fr')}
                >
                  Français
                </button>
              </div>
            </div>
            <div class="sm:max-w-md px-5 pt-4 flex flex-row items-center justify-between gap-4 lg:justify-start lg:max-w-7xl">
              <div class="flex-shrink-0">
                <a
                  href="https://www.bookeo.com/earthenvessels"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group relative inline-flex items-center justify-center px-5 py-2.5 !text-lg font-medium text-white bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-300"
                  role="button"
                  aria-label="Book a workshop"
                >
                  <span class="relative z-10 flex items-center gap-2">
                    Book A Class

                  </span>
                  <div class="absolute inset-0 bg-gradient-to-r from-primary-300/40 via-primary-200/30 to-primary-300/40 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
              <div class="flex-shrink-0 flex gap-6">
                <a
                  href="https://www.facebook.com/p/earthen-vessels-61562702795370/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-tertiary-400 hover:text-primary-400 transition-colors"
                >
                  <LuFacebook class="h-7 w-7" />
                </a>
                <a
                  href="https://www.instagram.com/earthenvesselspottery_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-tertiary-400 hover:text-primary-400 transition-colors"
                >
                  <LuInstagram class="h-7 w-7" />
                </a>
              </div>
            </div>
            {/* Banner with Added Border */}
            {/* Dynamic Open House Banner */}

      </div>

          <Modal.Close
            class={cn(
              buttonVariants({ size: "icon", look: "link" }),
              "absolute right-8 top-5 text-tertiary-400 hover:text-primary-300 hover:bg-primary-900/30 transition-all duration-200"
            )}
            type="submit"
          >
            <LuX class="h-5 w-5" />
          </Modal.Close>
        </Modal.Panel>
      </Modal.Root>
    </>
  );
});