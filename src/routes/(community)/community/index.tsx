import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { SITE } from "~/config.mjs";

interface Partner {
  name: string;
  description: string;
  image: string;
  website: string;
}

const COMMUNITY_PARTNERS: Partner[] = [
  {
    name: "Hintonburg Pottery",
    description:
      "Hintonburg Pottery is a vibrant clay studio where the community comes together to create, fostering wellness and artistic expression through hands-on pottery experiences. Extra line to test fifth line of height.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    website: "https://www.hintonburgpottery.ca/",
  },
  {
    name: "Wellington West BIA",
    description:
      "Wellington West BIA cultivates cultural connections, enriching the area with diverse arts and music programs that celebrate local heritage.",
    image: "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?w=400&q=80",
    website: "https://www.wellingtonwest.ca/",
  },
  {
    name: "Somerset Health & Wellness",
    description:
      "The Ottawa Rape Crisis Centre champions environmental sustainability and local green initiatives, promoting a healthier planet and community.",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&q=80",
    website: "https://somersethealth.ca/",
  },
  {
    name: "PLEO",
    description:
      "PLEO empowers local youth through dynamic programs and creative projects, nurturing talent and innovation within the community.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
    website: "https://pleo.on.ca/",
  },
  {
    name: "Soul Space",
    description:
      "Soul Space offers mentorship and skill-building opportunities, rooting local youth in growth and development through supportive programs.",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
    website: "https://www.soulspaceottawa.ca/",
  },
  {
    name: "Parkdale Food Centre",
    description:
      "Parkdale Food Centre builds strong community bonds by organizing gatherings and offering educational workshops on nutrition and sustainability.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    website: "https://parkdalefoodcentre.ca/",
  },
  {
    name: "Ottawa Rape Crisis Centre",
    description:
      "The Ottawa Rape Crisis Centre champions environmental sustainability and local green initiatives, promoting a healthier planet and community.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80",
    website: "https://orcc.net/",
  },
];

// Helper function to extract domain from URL
const getDomain = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch (e) {
    return url;
  }
};

export default component$(() => {
  const expandedPartner = useSignal<string | null>(
    COMMUNITY_PARTNERS[0].name
  ); // Default to first partner

  // Function to distribute partners in row-major order
  const distributePartners = (
    partners: typeof COMMUNITY_PARTNERS,
    columns: number
  ) => {
    const result = Array.from({ length: columns }, () => [] as typeof COMMUNITY_PARTNERS);
    partners.forEach((partner, index) => {
      const columnIndex = index % columns;
      result[columnIndex].push(partner);
    });
    return result;
  };

  const lgColumns = 4;
  const columns = distributePartners(COMMUNITY_PARTNERS, lgColumns);

  return (
    <section class="relative overflow-hidden py-12 md:py-16 bg-gradient-to-b from-black via-tertiary-950 to-black">
      <div class="relative max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div class="text-center mb-12">
          <h1 class="!text-5xl md:!text-5xl font-bold mb-6">
            <span class="bg-gradient-to-r xdxd from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
              Collaborations
            </span>
          </h1>
          <p class="text-xl text-tertiary-300 max-w-3xl mx-auto">
            We partner with venues, labels, and organizations across the industry.
            From recording studios to live venues, our collaborations bring
            exceptional musical experiences to audiences everywhere.
          </p>
        </div>

        {/* Flexbox Layout for Columns */}
        <div class="flex flex-col sm:flex-row sm:[&>*:nth-child(n+3)]:hidden lg:[&>*:nth-child(n+3)]:flex gap-5">
          {columns.map((columnPartners, index) => (
            <div
              key={index}
              class="flex-1 flex flex-col gap-5"
              style={{ minWidth: "0" }}
            >
              {columnPartners.map((partner) => (
                <div
                  key={partner.name}
                  class={[
                    "group backdrop-blur-sm border-2 pt-4 rounded-2xl transition-all duration-500 ease-in-out",
                    "hover:shadow-xl hover:border-primary-600/50 hover:bg-tertiary-900/50",
                    expandedPartner.value === partner.name
                      ? "bg-tertiary-900/60 border-primary-600/50 z-10"
                      : "bg-gradient-to-br from-tertiary-900/50 to-black border-tertiary-800/50",
                  ]}
                  style={{
                    transitionProperty:
                      "transform, box-shadow, background-color, border-color",
                    transform:
                      expandedPartner.value === partner.name
                        ? "scale(1.02)"
                        : "scale(1)",
                    minHeight: "200px",
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedPartner.value === partner.name}
                >
                  {/* Image */}
                  {partner.image && (
                    <div
                      class="h-32 sm:h-40 w-full bg-center bg-contain bg-no-repeat rounded-t-2xl"
                      style={{ backgroundImage: `url('${partner.image}')` }}
                    />
                  )}

                  {/* Info */}
                  <div class="flex flex-col items-center p-3 pt-2">
                    <div class="relative w-full flex flex-col items-center justify-center mb-2 group/link">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${partner.name} website`}
                        class="flex items-center gap-2 group/link"
                      >
                        <h3 class="text-lg font-semibold text-white transition-colors duration-200 ease-in-out">
                          {partner.name}
                        </h3>

                      </a>
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-sm text-primary-400 mt-1 transition-all duration-200 ease-in-out group-hover:text-secondary-400 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4"
                      >
                        {getDomain(partner.website)}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: `${SITE.title} - Connections`,
  meta: [
    {
      name: "description",
      content:
        "Discover our community partners and learn about their role in fostering connection and creativity.",
    },
  ],
};