import { component$, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "~/components/common/RouterHead";
import styles from "~/assets/styles/global.css?inline";
import PersistentPlayer from "./components/widgets/PersistentPlayer";

export default component$(() => {
  useStyles$(styles);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        {/* Preload Dancing Script weight 400 only */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&display=block"
          as="style"
        />
        {/* Load all Dancing Script weights as stylesheet */}
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;700&display=block"
          rel="stylesheet"
        />
        {/* Define font-face for weight 400 with font-display: block */}
        <style>
          {`
            @font-face {
              font-family: 'Dancing Script';
              font-style: normal;
              font-weight: 600;
              src: url('https://fonts.gstatic.com/s/dancingscript/v24/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSo3Sup5.ttf') format('truetype');
              font-display: block;
            }
          `}
        </style>
        {/* Load Della Respira normally */}
        <link href="https://fonts.googleapis.com/css2?family=Della+Respira&display=swap" rel="stylesheet" />
        <RouterHead />
        <ServiceWorkerRegister />
        {/* Logo preloads */}
        <link rel="preload" href="/images/logo22.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/images/logo2-cropped.svg" as="image" type="image/svg+xml" />
      </head>
      <body class="antialiased bg-gradient-to-b from-gray-50 via-stone-50 to-gray-50 pb-20">
        <div class="relative md:border-x md:border-stone-200/50 mx-auto max-w-7xl overflow-x-hidden">
          {/* Light mode background layers */}
          <div class="absolute inset-0 z-[-1] bg-gradient-to-br from-stone-50 via-[#F8F6F2] to-gray-50" aria-hidden="true"></div>
          <div class="absolute inset-0 z-[-1] bg-gradient-to-t from-stone-100/40 via-[#F8F6F2]/50 to-gray-50/60" aria-hidden="true"></div>
          <div class="absolute top-0 left-5 w-[700px] h-[800px] z-[-1] bg-amber-200/20 rounded-full blur-xl animate-float" aria-hidden="true"></div>
          <div class="absolute top-0 right-0 w-[800px] h-[800px] z-[-1] bg-stone-300/20 rounded-full blur-xl animate-float" aria-hidden="true"></div>
          <div class="absolute top-5 md:left-[650px] w-[490px] h-[80px] z-[-1] bg-amber-100/30 rounded-full blur-xl animate-float" aria-hidden="true"></div>
          <RouterOutlet />
        </div>
        <PersistentPlayer />
      </body>
    </QwikCityProvider>
  );
});