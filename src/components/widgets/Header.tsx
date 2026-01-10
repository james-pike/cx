import { component$, useStore, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import IconChevronDown from "../icons/IconChevronDown";
import MenuModal from "./MenuModal";
import { useBannerLoader } from "~/routes/layout";
import { 
  LuUsers, 
  LuImage, 
  LuHome, 
  LuEye, 
  LuNewspaper, 
  LuHelpCircle,
  LuCalendarDays,
  LuBuilding2,
  LuPartyPopper,
  LuGift,
  
  LuCuboid,
} from "@qwikest/icons/lucide";

export default component$(() => {
  const store = useStore({
    isScrolling: false,
    isMobile: false,
    showBanner: true,
  });

  const isInitialized = useSignal(false);
  const location = useLocation();
  const isHomeRoute = location.url.pathname === "/";

  const bannerMessages = useBannerLoader();
  const hasBannerMessages = useSignal<boolean>(false);

  const currentMessageIndex = useSignal(0);

  useVisibleTask$(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    store.isMobile = mediaQuery.matches;
    isInitialized.value = true;
    const handler = (e: MediaQueryListEvent) => {
      store.isMobile = e.matches;
    };
    mediaQuery.addEventListener("change", handler);

    hasBannerMessages.value = !!(bannerMessages.value && 
      (Array.isArray(bannerMessages.value) ? bannerMessages.value.length > 0 : !!bannerMessages.value));

    let interval: NodeJS.Timeout | undefined;
    if (bannerMessages.value && Array.isArray(bannerMessages.value) && bannerMessages.value.length > 1) {
      interval = setInterval(() => {
        currentMessageIndex.value = (currentMessageIndex.value + 1) % bannerMessages.value.length;
      }, 4000);
    }

    return () => {
      mediaQuery.removeEventListener("change", handler);
      if (interval) clearInterval(interval);
    };
  });

  const menu = {
    items: [
      { 
        text: "This Is Us", 
        href: "/team",
        items: [
          { text: "Facilitators", href: "/team", icon: LuUsers },
          { text: "Our Logo", href: "/team#logo", icon: LuImage },
        ]
      },
      //
      {
        text: "About",
        href: "/about",
        items: [
          { text: "Our Space", href: "/about", icon: LuHome },
          { text: "What To Expect", href: "/about#what-to-expect", icon: LuEye },
                    { text: "Benefits Of Clay", href: "/about#benefits-of-clay", icon: LuCuboid },

          { text: "Newsletter", href: "/newsletter", icon: LuNewspaper },
          { text: "Gallery", href: "/gallery", icon: LuImage },
          { text: "FAQ", href: "/faq", icon: LuHelpCircle },
        ],
      },
      {
        text: "Our Offerings",
        href: "/offerings",
        items: [
          { text: "Classes & Workshops", href: "/offerings", icon: LuCalendarDays },
          { text: "Corporate Events", href: "/offerings#events", icon: LuBuilding2 },
          { text: "Private Events", href: "/offerings#events", icon: LuPartyPopper },
          { text: "Gift Cards", href: "https://bookeo.com/earthenvessels/buyvoucher", icon: LuGift },
        ],
      },
         {
        text: "Reviews",
        href: "/reviews/",
        items: [
          { text: "Reviews", href: "/reviews", icon: LuCalendarDays },
          { text: "In The News", href: "/reviews/#news", icon: LuNewspaper },
       
        ],
      },
            { text: "Community", href: "/community" },

    
      { text: "Contact", href: "/contact" },
    ],
  };

  return (
    <>
      {/* Banner - Both mobile and desktop */}
      {(hasBannerMessages.value ?? false) && (
        <div
          class={`
            bg-primary-200/70 max-w-7xl md:mx-auto px-0.5
             shadow-sm
            transition-all duration-100 ease-in-out
            ${store.showBanner ? 'h-auto py-0.5 opacity-100' : 'h-0 py-0 opacity-0 overflow-hidden'}
          `}
        >
          <div class="mx-auto px-0 md:px-6 max-w-7xl shadow-sm">
            <div class="flex items-center justify-between gap-2">
              <div class="flex-1 min-w-0 overflow-hidden">
                {/* Mobile: Scrolling text */}
                <div class="md:hidden relative h-6 flex items-center text-primary-700">
                  <div class="animate-scroll whitespace-nowrap">
                    <span class="inline-flex items-center gap-2 mx-3">
                      <h3 class="font-bold text-md text-primary-600 ">{bannerMessages.value?.title}</h3>
                      <span class="text-md opacity-90">•</span>
                      <span class="text-md opacity-90">{bannerMessages.value?.subtitle}</span>
                      <span class="text-xs opacity-90">•</span>
                      <span class="text-md opacity-90">{bannerMessages.value?.message}</span>
                      {bannerMessages.value?.gif && (
                        <>
                          <span class="text-md opacity-90">•</span>
                          <img
                            src={bannerMessages.value.gif}
                            alt="Banner animation"
                            class="h-6 w-auto object-contain inline-block"
                          />
                        </>
                      )}
                      <span class="text-md opacity-0 mx-8">•</span>
                    </span>
                    {/* Duplicate for seamless loop */}
                    <span class="inline-flex items-center gap-2">
                      <h3 class="font-bold text-md text-primary-600">{bannerMessages.value?.title}</h3>
                      <span class="text-md opacity-90">•</span>
                      <span class="text-md opacity-90">{bannerMessages.value?.subtitle}</span>
                      <span class="text-md opacity-90">•</span>
                      <span class="text-md opacity-90">{bannerMessages.value?.message}</span>
                      {bannerMessages.value?.gif && (
                        <>
                          <span class="text-md opacity-90">•</span>
                          <img
                            src={bannerMessages.value.gif}
                            alt="Banner animation"
                            class="h-6 w-auto object-contain inline-block"
                          />
                        </>
                      )}
                      <span class="text-md opacity-0 mx-8">•</span>
                    </span>
                  </div>
                </div>

                {/* Desktop: Static wrapped text */}
                <div class="hidden md:flex items-center gap-2 flex-wrap text-primary-700">
                  <h3 class="font-bold text-md text-primary-600 whitespace-nowrap">{bannerMessages.value?.title}</h3>
                  <span class="text-md opacity-90">•</span>
                  <span class="text-md md:text-md opacity-90">{bannerMessages.value?.subtitle}</span>
                  <span class="text-sm opacity-90">•</span>
                  <span class="text-md md:text-sm opacity-90">{bannerMessages.value?.message}</span>
                  {bannerMessages.value?.gif && (
                    <>
                      <span class="text-md opacity-90">•</span>
                      <img
                        src={bannerMessages.value.gif}
                        alt="Banner animation"
                        class="h-6 w-auto object-contain inline-block"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>
        {`
          @keyframes scroll {
            0%, 10% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            display: inline-block;
            animation: scroll 22s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      {/* Header - hidden on mobile */}
      <header
        id="header"
        class={`
          hidden lg:block
          sticky top-0 z-40 flex-none mx-auto max-w-7xl
          transition-all duration-300 ease-in-out
          bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50
          ${store.isScrolling ? "md:backdrop-blur-sm shadow-lg" : ""}
        `}
        window:onScroll$={() => {
          const scrollY = window.scrollY;

          if (!store.isScrolling && scrollY >= 10) {
            store.isScrolling = true;
            store.showBanner = false;
          } else if (store.isScrolling && scrollY < 10) {
            store.isScrolling = false;
            store.showBanner = true;
          }
        }}
      >
        <div class="absolute inset-0" aria-hidden="true"></div>
        <div class="relative text-default py-1 pb-1.5 md:p-1 px-2 md:px-6 mx-auto w-full md:flex md:justify-between max-w-7xl">
          <div class="mr-auto rtl:mr-0 rtl:ml-auto flex justify-between">
            <a class="flex items-center pb-1" href="/">
              <div style={{ width: "100px", height: "40px", position: "relative" }}>
                <img
                  src={isHomeRoute ? "/images/logo2-cropped.svg" : "/images/logo22.svg"}
                  alt={isHomeRoute ? "Logo Cropped" : "Logo"}
                  class={{
                    "absolute top-1 left-1 object-contain": true,
                    "w-[40px] h-[40px]": isHomeRoute,
                    "w-[100px] h-[40px]": !isHomeRoute,
                  }}
                  style={{ display: isInitialized.value ? "none" : "block" }}
                />
                {isInitialized.value && (
                  <>
                    {store.isMobile && isHomeRoute && (
                      <img
                        src="/images/logo2-cropped.svg"
                        alt="Logo Cropped"
                        class={{
                          "absolute top-1 left-1 w-[40px] h-[40px] object-contain transition-all duration-500 ease-in-out": true,
                          "opacity-100 translate-x-0": !store.isScrolling,
                          "opacity-0 translate-x-full": store.isScrolling,
                        }}
                      />
                    )}
                    <img
                      src="/images/logo22.svg"
                      alt="Logo"
                      class={{
                        "absolute top-1 -left-1 w-[100px] h-[40px] object-contain": true,
                        "transition-all duration-500 ease-in-out": store.isMobile && isHomeRoute,
                        "opacity-0 -translate-x-full": store.isMobile && isHomeRoute && !store.isScrolling,
                        "opacity-100 translate-x-0": !store.isMobile || !isHomeRoute || store.isScrolling,
                      }}
                    />
                  </>
                )}
              </div>
            </a>
            <div class="flex items-center md:hidden gap-1">
              <MenuModal />
            </div>
          </div>
          <nav
            class="items-center w-full md:w-auto hidden md:flex dark:text-white overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:mx-5 group"
            aria-label="Main navigation"
          >
            {menu && menu.items ? (
              <ul class="flex flex-col md:flex-row text-stone-800 md:self-center w-full md:w-auto text-xl md:text-xl tracking-[0.01rem] font-medium bg-gradient-to-br from-amber-100/80 via-orange-50/80 to-yellow-100/80 backdrop-blur-md border border-amber-300/50 shadow-xl rounded-full px-2 py-1">
                {menu.items.map(({ text, href, items,  }, key) => {
                  const isActive = location.url.pathname === href;
                  return (
                    <li key={key} class={items?.length ? "dropdown" : ""}>
                      {items?.length ? (
                        <>
                          <a
                            href={href}
                            class={`
                              hover:text-amber-600
                              px-4 py-3
                              flex items-center
                              transition-all duration-200
                              relative
                              rounded-full
                              after:content-['']
                              after:absolute
                              after:bottom-[6px]
                              after:left-1/2
                              after:h-[2px]
                              after:bg-amber-600
                              after:transition-all
                              after:duration-200
                              ${isActive
                                ? "text-amber-700 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                                : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                              }
                            `}
                            onClick$={(event) => {
                              // Only "Our Offerings" has the special home-page scroll behaviour
                              if (href === "/offerings" && location.url.pathname === "/") {
                                event.preventDefault();
                                const servicesSection = document.getElementById("services");
                                if (servicesSection) {
                                  servicesSection.scrollIntoView({ behavior: "smooth" });
                                }
                              }
                              // all other cases (including clicking "Our Offerings" when not on home) → normal navigation
                            }}
                          >
                            {text}
                            <IconChevronDown class="w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden md:inline" />
                          </a>
                          <ul
                            class={`
                              dropdown-menu
                              md:backdrop-blur-md
                              rounded-lg
                              md:absolute
                              pl-4 md:pl-0
                              md:hidden
                              font-medium
                              md:bg-gradient-to-br md:from-amber-50/95 md:via-orange-50/95 md:to-yellow-50/95
                              md:border md:border-amber-300/50
                              md:min-w-[200px]
                              drop-shadow-xl
                              py-2
                            `}
                          >
                            {items.map(({ text: text2, href: href2, icon: ItemIcon }, key2) => {
                              const isDropdownActive = location.url.pathname === href2;
                              const isFirst = key2 === 0;
                              const isLast = key2 === items.length - 1;
                              const isExternalLink = href2?.startsWith('http');
                              return (
                                <li key={key2}>
                                  <a
                                    class={`
                                      hover:bg-amber-200/50
                                      hover:text-amber-700
                                      text-stone-700
                                      py-2 px-5
                                      flex items-center gap-2
                                      whitespace-no-wrap
                                      transition-all duration-200
                                      relative
                                      after:content-['']
                                      after:absolute
                                      after:bottom-[4px]
                                      after:left-1/2
                                      after:h-[2px]
                                      after:bg-amber-600
                                      after:transition-all
                                      after:duration-200
                                      ${isDropdownActive
                                        ? "text-amber-700 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                                        : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                                      }
                                      ${isFirst ? "hover:rounded-t-lg" : ""}
                                      ${isLast ? "hover:rounded-b-lg" : ""}
                                      ${!isFirst && !isLast ? "hover:rounded-none" : ""}
                                    `}
                                    href={href2}
                                    {...(isExternalLink && { target: "_blank", rel: "noopener noreferrer" })}
                                    onClick$={(e) => {
                                      if (text2 === "Clay" && href2 === "/about#clay") {
                                        e.preventDefault();
                                        if (location.url.pathname !== "/about") {
                                          window.location.href = "/about#clay";
                                        } else {
                                          const claySection = document.getElementById("clay");
                                          if (claySection) {
                                            claySection.scrollIntoView({ behavior: "smooth" });
                                          }
                                        }
                                      }
                                    }}
                                  >
                                    {ItemIcon && <ItemIcon class="w-4 h-4 flex-shrink-0" />}
                                    {text2}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        <a
                          class={`
                            hover:text-amber-600
                            px-4 py-3
                            flex items-center
                            relative
                            transition-all duration-200
                            after:content-['']
                            after:absolute
                            after:bottom-[6px]
                            after:left-1/2
                            after:h-[2px]
                            after:bg-amber-600
                            after:transition-all
                            after:duration-200
                            rounded-full
                            ${isActive
                              ? "text-amber-700 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                              : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                            }
                          `}
                          href={href}
                        >
                          {text}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </nav>
          {/* FIXED: Simplified button container - no more fixed/bottom positioning */}
          <div class="hidden md:flex items-center justify-end space-x-2">
            <a
              href="https://bookeo.com/earthenvessels"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-600 group relative inline-flex items-center justify-center px-3 pl-5 py-2.5 text-xl font-semibold text-white rounded-xl shadow-lg hover:shadow-[0_0_12px_rgba(217,119,6,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500 hover:scale-102 hover:bg-gradient-to-r hover:from-amber-500 hover:via-amber-600 hover:to-amber-500"
              role="button"
              aria-label="Book a workshop"
            >
              <span class="relative z-10 flex items-center gap-1">
                Book a Class
                <svg class="w-5 h-5 -ml-0.5 transform group-hover:translate-x-0.75 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
              <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:opacity-90 transform group-hover:translate-x-full transition-all duration-500"></div>
            </a>
          </div>
        </div>
      </header>
    </>
  );
});