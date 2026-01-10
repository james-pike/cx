import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { tursoClient } from "~/lib/turso";

interface Faq {
  id?: number;
  question: string;
  answer: string;
  isHtml?: boolean; // Add this to support HTML content in answers
}

// ---- Loader ----
export const useFaqsLoader = routeLoader$(async (event) => {
  try {
    const client = tursoClient(event);
    const result = await client.execute("SELECT * FROM faqs ORDER BY position ASC");
    return result.rows.map((row: any) => ({
      id: Number(row.id),
      question: String(row.question),
      answer: String(row.answer),
      // You can add an isHtml column to your database or determine this programmatically
      isHtml: String(row.answer).includes('<') // Simple check for HTML content
    })) as Faq[];
  } catch (error) {
    console.error("Error loading FAQs:", error);
    return [];
  }
});

export default component$(() => {
  const loaderData = useFaqsLoader();
  const faqs = useSignal<Faq[]>([]);
  
  // Track which item is open
  const openItems = useSignal<number | null>(null);
  
  // Detect mobile for controlling open item behavior
  const isMobile = useSignal(false);

  // Load data and set up responsive behavior
  useVisibleTask$(() => {
    faqs.value = loaderData.value;
    
    if (faqs.value.length === 0) return; // No FAQs to work with
    
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    isMobile.value = mediaQuery.matches;

    // Set default open item:
    if (isMobile.value) {
      openItems.value = faqs.value[0]?.id || null; // Always first FAQ on mobile
    } else {
      const randomFaq = faqs.value[Math.floor(Math.random() * faqs.value.length)];
      openItems.value = randomFaq?.id || null; // Random one on desktop
    }

    const handler = (e: MediaQueryListEvent) => {
      isMobile.value = e.matches;
      if (isMobile.value) {
        openItems.value = faqs.value[0]?.id || null;
      } else {
        const randomFaq = faqs.value[Math.floor(Math.random() * faqs.value.length)];
        openItems.value = randomFaq?.id || null;
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  });

  // Toggle FAQ item
  const toggleItem = $((id: number) => {
    if (openItems.value === id) {
      openItems.value = null;
    } else {
      openItems.value = id;
    }
  });

  // Split FAQ items into two columns
  const leftColumn = faqs.value.filter((_, i) => i % 2 === 0);
  const rightColumn = faqs.value.filter((_, i) => i % 2 === 1);

  // Show loading state if no FAQs yet
  if (faqs.value.length === 0) {
    return (
      <section class="relative overflow-hidden py-12 md:py-16 bg-gradient-to-b from-black via-tertiary-950 to-black">
        <div class="relative max-w-5xl mx-auto px-5 sm:px-6 text-center">
          <h2 class="!text-5xl md:text-6xl xdxd font-bold mb-6">
            <span class="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section class="faq-section relative overflow-hidden py-12 md:py-16 bg-gradient-to-b from-black via-tertiary-950 to-black">
      <div class="relative max-w-5xl mx-auto px-5 sm:px-6">
        {/* Section Header */}
        <div class="text-center mb-12">
          <h2 class="!text-5xl md:text-6xl xdxd font-bold mb-6">
            <span class="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div class="flex flex-col md:flex-row md:gap-8">
          {/* Left Column */}
          <div class="flex-1 flex flex-col gap-4">
            {leftColumn.map((item) => (
              <div key={item.id} class="group">
                <div class="bg-gradient-to-br from-tertiary-900/50 to-black rounded-2xl border border-tertiary-800/50 shadow-lg hover:shadow-xl hover:border-primary-600/50 transition-all duration-300">
                  <button
                    onClick$={() => toggleItem(item.id!)}
                    class="w-full px-6 py-5 flex items-center justify-between text-left transition-all"
                    aria-expanded={openItems.value === item.id}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <div class="flex items-center gap-3">
                      <img src="/images/logo2-cropped.svg" alt="FAQ Icon" class="w-5 h-5 mr-2 md:w-[25px] md:h-[25px]" />
                      <h3 class="!text-xl md:!text-xl font-semibold text-white">
                        {item.question}
                      </h3>
                    </div>
                    <div
                      class={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        openItems.value === item.id
                          ? "bg-primary-600 text-white"
                          : "bg-tertiary-800 text-primary-400"
                      }`}
                    >
                      <svg
                        class={`w-5 h-5 transition-transform ${
                          openItems.value === item.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <div
                    id={`faq-answer-${item.id}`}
                    class={`overflow-hidden transition-all duration-300 ${
                      openItems.value === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div class="px-6 pb-5">
                      {item.isHtml ? (
                        <div class="text-tertiary-300" dangerouslySetInnerHTML={item.answer} />
                      ) : (
                        <p class="text-tertiary-300">{item.answer}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div class="flex-1 flex flex-col gap-4 mt-4 md:mt-0">
            {rightColumn.map((item) => (
              <div key={item.id} class="group">
                <div class="bg-gradient-to-br from-tertiary-900/50 to-black rounded-2xl border border-tertiary-800/50 shadow-lg hover:shadow-xl hover:border-primary-600/50 transition-all duration-300">
                  <button
                    onClick$={() => toggleItem(item.id!)}
                    class="w-full px-6 py-5 flex items-center justify-between text-left transition-all"
                    aria-expanded={openItems.value === item.id}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <div class="flex items-center gap-3">
                      <img src="/images/logo2-cropped.svg" alt="FAQ Icon" class="w-5 h-5 mr-2 md:w-[25px] md:h-[25px]" />
                      <h3 class="!text-xl md:!text-xl font-semibold text-white">
                        {item.question}
                      </h3>
                    </div>
                    <div
                      class={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        openItems.value === item.id
                          ? "bg-primary-600 text-white"
                          : "bg-tertiary-800 text-primary-400"
                      }`}
                    >
                      <svg
                        class={`w-5 h-5 transition-transform ${
                          openItems.value === item.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <div
                    id={`faq-answer-${item.id}`}
                    class={`overflow-hidden transition-all duration-300 ${
                      openItems.value === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div class="px-6 pb-5">
                      {item.isHtml ? (
                        <div class="text-tertiary-300" dangerouslySetInnerHTML={item.answer} />
                      ) : (
                        <p class="text-tertiary-300">{item.answer}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});