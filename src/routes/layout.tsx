import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { inject } from "@vercel/analytics";

import Footer from "~/components/widgets/Footer";
import Header from "~/components/widgets/Header";
import { tursoClient } from "~/lib/turso";
//

interface Banner {
  length: number; id: number; title: string; subtitle: string; message: string; gif?: string;
}

export const useBannerLoader = routeLoader$(async (event) => { try { const client = tursoClient(event); const result = await client.execute("SELECT * FROM banners LIMIT 1"); if (result.rows.length === 0) { return null; } const row = result.rows[0]; return { id: Number(row.id) || 0, title: String(row.title) || '', subtitle: String(row.subtitle) || '', message: String(row.message) || '', gif: row.gif ? String(row.gif) : undefined, } as Banner; } catch (error) { console.error("Error loading banner:", error); return null; } });

export default component$(() => {
  const location = useLocation();

  useVisibleTask$(() => {
    inject(); // Runs only on client sides
  });

  // Handle hash scrolling after navigation
  useVisibleTask$(({ track }) => {
    track(() => location.url.href);

    const hash = window.location.hash;
    if (hash) {
      // Longer delay for mobile to ensure DOM and modals are fully closed
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  });

  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
