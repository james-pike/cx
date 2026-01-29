import { useSignal, useVisibleTask$, type Signal } from "@builder.io/qwik";

export type Language = "en" | "fr";

export interface I18nStore {
  locale: Signal<Language>;
}

// Create a hook that manages locale state locally
// Since Qwik's signals are reactive, this works across components
export const useI18n = (): I18nStore => {
  const locale = useSignal<Language>("en");

  // Load saved preference on client
  useVisibleTask$(() => {
    const saved = localStorage.getItem("locale") as Language;
    if (saved && (saved === "en" || saved === "fr")) {
      locale.value = saved;
    }

    // Listen for changes from other components
    const handler = (e: StorageEvent) => {
      if (e.key === "locale" && e.newValue) {
        locale.value = e.newValue as Language;
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  });

  return { locale };
};

// Function to change language and persist
export const setLanguage = (lang: Language) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("locale", lang);
    // Dispatch storage event for other tabs/components
    window.dispatchEvent(new StorageEvent("storage", {
      key: "locale",
      newValue: lang,
    }));
  }
};

export const translations = {
  en: {
    // Navigation
    "nav.thisIsUs": "This Is Us",
    "nav.facilitators": "Facilitators",
    "nav.ourLogo": "Our Logo",
    "nav.about": "About",
    "nav.ourSpace": "Our Space",
    "nav.whatToExpect": "What To Expect",
    "nav.benefitsOfClay": "Benefits Of Clay",
    "nav.newsletter": "Newsletter",
    "nav.gallery": "Gallery",
    "nav.faq": "FAQ",
    "nav.ourOfferings": "Our Offerings",
    "nav.classesWorkshops": "Classes & Workshops",
    "nav.corporateEvents": "Corporate Events",
    "nav.privateEvents": "Private Events",
    "nav.giftCards": "Gift Cards",
    "nav.reviews": "Reviews",
    "nav.inTheNews": "In The News",
    "nav.community": "Community",
    "nav.contact": "Contact",
    "nav.bookAClass": "Book a Class",

    // Hero
    "hero.studioSessions": "Studio Sessions",
    "hero.polishingEveryRecording": "Polishing Every Recording",
    "hero.sessionViolinist": "Session Violinist",
    "hero.craftingMusicalMoments": "Crafting Musical Moments",
    "hero.livePerformances": "Live Performances",
    "hero.creatingUnforgettableExperiences": "Creating Unforgettable Experiences",

    // Sections
    "section.featuredPerformances": "Featured Performances",
    "section.recentSessions": "Recent sessions, collaborations, and live performances",
    "section.bookingOptions": "Booking Options",
    "section.bookingDescription": "Whether it's a live event or a studio session, let's make music together",
    "section.whatIDo": "What I Do",
    "section.whatIDoDescription": "From intimate studio sessions to grand live performances, I bring versatility and passion to every project.",
    "section.recentPerformances": "Recent Performances",
    "section.recentPerformancesDescription": "Watch highlights from recent studio sessions and live performances.",

    // Services
    "service.studioSessions": "Studio Sessions",
    "service.studioSessionsDesc": "Professional violin recording for albums, singles, and soundtracks. Quick turnaround with studio-quality sound.",
    "service.livePerformance": "Live Performance",
    "service.livePerformanceDesc": "Bringing elegance and emotion to weddings, corporate events, concerts, and private functions.",
    "service.collaboration": "Collaboration",
    "service.collaborationDesc": "Creative partnerships with producers, composers, and artists across all genres. Let's create something unique.",
    "service.sheetMusic": "Sheet Music",
    "service.sheetMusicDesc": "Custom arrangements and transcriptions for violin. Classical to contemporary, I can help bring your musical vision to life.",

    // Buttons
    "button.watch": "Watch",
    "button.bookNow": "Book Now",
    "button.learnMore": "Learn more",
    "button.viewFullGallery": "View Full Gallery",
    "button.subscribe": "Subscribe",

    // Footer
    "footer.joinNewsletter": "Join Our Newsletter",
    "footer.copyright": "© 2025 Session Violinist · All rights reserved.",
    "footer.description": "Professional session violinist bringing soul and precision to every recording session and live performance. Collaborating with artists across all genres to create memorable musical experiences.",

    // Language
    "language": "Language",
    "language.en": "English",
    "language.fr": "Français",
  },
  fr: {
    // Navigation
    "nav.thisIsUs": "Qui Sommes-Nous",
    "nav.facilitators": "Animateurs",
    "nav.ourLogo": "Notre Logo",
    "nav.about": "À Propos",
    "nav.ourSpace": "Notre Espace",
    "nav.whatToExpect": "À Quoi S'attendre",
    "nav.benefitsOfClay": "Bienfaits de l'Argile",
    "nav.newsletter": "Infolettre",
    "nav.gallery": "Galerie",
    "nav.faq": "FAQ",
    "nav.ourOfferings": "Nos Services",
    "nav.classesWorkshops": "Cours et Ateliers",
    "nav.corporateEvents": "Événements Corporatifs",
    "nav.privateEvents": "Événements Privés",
    "nav.giftCards": "Cartes Cadeaux",
    "nav.reviews": "Avis",
    "nav.inTheNews": "Dans les Médias",
    "nav.community": "Communauté",
    "nav.contact": "Contact",
    "nav.bookAClass": "Réserver un Cours",

    // Hero
    "hero.studioSessions": "Sessions Studio",
    "hero.polishingEveryRecording": "Perfectionner Chaque Enregistrement",
    "hero.sessionViolinist": "Violoniste de Session",
    "hero.craftingMusicalMoments": "Créer des Moments Musicaux",
    "hero.livePerformances": "Performances Live",
    "hero.creatingUnforgettableExperiences": "Créer des Expériences Inoubliables",

    // Sections
    "section.featuredPerformances": "Performances en Vedette",
    "section.recentSessions": "Sessions récentes, collaborations et performances live",
    "section.bookingOptions": "Options de Réservation",
    "section.bookingDescription": "Que ce soit pour un événement live ou une session studio, créons de la musique ensemble",
    "section.whatIDo": "Ce Que Je Fais",
    "section.whatIDoDescription": "Des sessions studio intimes aux grandes performances live, j'apporte polyvalence et passion à chaque projet.",
    "section.recentPerformances": "Performances Récentes",
    "section.recentPerformancesDescription": "Regardez les temps forts des sessions studio et performances live récentes.",

    // Services
    "service.studioSessions": "Sessions Studio",
    "service.studioSessionsDesc": "Enregistrement professionnel de violon pour albums, singles et bandes sonores. Délai rapide avec une qualité studio.",
    "service.livePerformance": "Performance Live",
    "service.livePerformanceDesc": "Apporter élégance et émotion aux mariages, événements corporatifs, concerts et fonctions privées.",
    "service.collaboration": "Collaboration",
    "service.collaborationDesc": "Partenariats créatifs avec producteurs, compositeurs et artistes de tous genres. Créons quelque chose d'unique.",
    "service.sheetMusic": "Partitions",
    "service.sheetMusicDesc": "Arrangements et transcriptions personnalisés pour violon. Du classique au contemporain, je peux vous aider à réaliser votre vision musicale.",

    // Buttons
    "button.watch": "Regarder",
    "button.bookNow": "Réserver",
    "button.learnMore": "En savoir plus",
    "button.viewFullGallery": "Voir la Galerie Complète",
    "button.subscribe": "S'abonner",

    // Footer
    "footer.joinNewsletter": "Rejoignez Notre Infolettre",
    "footer.copyright": "© 2025 Session Violinist · Tous droits réservés.",
    "footer.description": "Violoniste de session professionnel apportant âme et précision à chaque enregistrement et performance live. Collaboration avec des artistes de tous genres pour créer des expériences musicales mémorables.",

    // Language
    "language": "Langue",
    "language.en": "English",
    "language.fr": "Français",
  },
};

export type TranslationKey = keyof typeof translations.en;

export function t(locale: Language, key: TranslationKey): string {
  return translations[locale][key] || key;
}
