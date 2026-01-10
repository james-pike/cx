// src/components/widgets/Team.tsx
import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { SITE } from "~/config.mjs";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
 {
  name: "Ginger",
  role: "Facilitator",
  description: "Ginger took her first pottery course over 35 years ago and was immediately drawn to the tactile joy of shaping clay. Over time, she shifted from making things to discovering in clay a grounding and fulfilling experience of connection - to self, to others and to the earth.\n\nThe vision for earthen vessels was seeded by a small pottery community in Venezuela. Years later, that inspiration grew to the creation of the first 'Touch the Earth' workshops. Ginger blends clay workshops with her studies at The Centre for Courage and Renewal - a global community founded by Parker J Palmer, whose work centers on living and leading with integrity. In earthen vessels, clay becomes a practice of slowing down, allowing creativity to open up new possibilities.\n\nIn 2012 Ginger also founded Hintonburg Pottery, rooted in the local community, a studio that welcomes children and adults and offers ceramic artists a place to showcase their work.",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
},
  {
    name: "Michelle",
    role: "Facilitator",
    description:
      "Michelle's journey with clay began in 2002, and since then, she has immersed herself in the craft—taking countless courses, working as a studio potter, and teaching at Hintonburg Pottery. Now, she brings her passion for clay to earthen vessels as a facilitator. With over 30 years in education as a teacher, guidance counselor, and school principal, Michelle has dedicated her career to supporting growth and well-being. She holds a Master's Degree in Counselling from the University of Ottawa and a Certificate in Positive Psychology from Wilfrid Laurier University. Her experience leading wellness initiatives in schools, combined with her love of pottery, has led her to earthen vessels, where she shares the joy of clay as a source of grounding, meditation, renewal, and fun.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    name: "Mary",
    role: "Facilitator",
    description:
      "Mary's journey with clay began in the embrace of family, surrounded by mountains, forests, and lakes. Over the years, this practice deepened into a passion—not just for creativity, but for sharing it with others. She is driven by a desire to connect hearts and nurture community well-being. At earthen vessels, she has found both a creative home and a space to pour her love for community. As she shapes clay, she draws inspiration from the wonder of the natural world and the tertiary's generous gifts. Mary's enthusiasm and strong skills bring added energy to earthen vessels where participants feel inspired, supported and empowered in their creative exploration.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80",
  },
  {
    name: "Natalie",
    role: "Facilitator",
    description:
      "Natalie has been working with clay for over ten years. She was first drawn to pottery as a way to find tranquility and reconnect with herself amidst the busyness of raising a family. Through her journey with clay, she has discovered not only a creative outlet but also a deep sense of presence and grounding. Natalie spent 20 years working in the field of mental health. Her work took her beyond Canada, as she lived and served in communities in East Africa and Haiti, providing individual and group support, teaching, and fostering connection. Natalie is excited to bring together her love of pottery and facilitation experience to earthen vessels.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
  },
  {
    name: "Diane",
    role: "Facilitator",
    description:
      "Diane Black is a Kingston artist who began her training in the field of book illustration and spent many years in the commercial art world. She now has a full time studio practice with a focus on figurative clay sculpture, painting, drawing and teaching. Diane's work is exhibited in Galleries and shows throughout Ontario and can be found in private collections both in Canada and internationally. She teaches workshops in drawing, painting and sculpture and has coordinated art workshops which attract participants internationally. In addition to her regular studio practice, Diane runs an art program for adults with disabilities.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  },

  {
    name: "Kandis",
    role: "Facilitator",
    description:
      "Kandis is a Naturopathic Doctor and Embodiment Coach with over 15 years of experience guiding patients on their health journeys. Her approach goes beyond treating symptoms or prescribing supplements—she helps individuals uncover the deeper connections between their health and their life patterns, empowering them to create lasting transformations. As a recent addition to the earthen vessels facilitator team, Kandis is excited to bring her expertise in embodiment awareness into the clay workshops. By integrating her knowledge as a naturopathic doctor with her skills in embodiment coaching, she offers a unique and holistic approach to the creative process. Her ability to connect the wisdom of the body with hands-on exploration makes her a strong and insightful facilitator.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  },
];

const ROLE_GRADIENTS: Record<string, string> = {
  Facilitator: 'bg-gradient-to-r from-primary-800/50 to-primary-700/50 text-primary-300 border-primary-600/50 shadow-primary-900/50',
  Default: 'bg-gradient-to-r from-tertiary-800/50 to-tertiary-700/50 text-tertiary-300 border-tertiary-600/50 shadow-tertiary-900/50',
};

const getRoleColor = (role: string) => {
  return ROLE_GRADIENTS[role] || ROLE_GRADIENTS.Default;
};

export default component$(() => {
  const expandedMember = useSignal<string | null>(null);

  return (
    <section class="relative overflow-hidden py-12 md:py-16 bg-gradient-to-b from-black via-tertiary-950 to-black">
      <div class="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div class="text-center mb-12">
          <h1 class="!text-5xl md:text-6xl xdxd font-bold mb-6">
            <span class="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
              Meet The Team
            </span>
          </h1>
          <p class="text-xl text-tertiary-300 max-w-3xl mx-auto">
            Our talented musicians bring years of experience and passion to every performance and collaboration.
          </p>
        </div>

        {/* MASONRY COLUMN LAYOUT */}
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-4">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              class={[
                "break-inside-avoid group backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-in-out",
                "hover:shadow-xl hover:border-primary-600/50 hover:bg-tertiary-900/50",
                expandedMember.value === member.name
                  ? "bg-tertiary-900/60 border-primary-600/50"
                  : "bg-gradient-to-br from-tertiary-900/50 to-black border-tertiary-800/50",
              ]}
              style={{
                minHeight: "300px", // Ensures consistent height for collapsed states
                transitionProperty: "transform, opacity, margin, box-shadow, background-color, border-color",
                transform: expandedMember.value === member.name ? "scale(1.02)" : "scale(1)",
              }}
              role="button"
              tabIndex={0}
              aria-expanded={expandedMember.value === member.name}
              onClick$={() => {
                expandedMember.value = expandedMember.value === member.name ? null : member.name;
              }}
            >
              <div class="flex flex-col items-center p-3 pt-6">
                <img
                  src={member.image}
                  alt={member.name}
                  class="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-[3px] border-primary-600/50 mb-4 group-hover:scale-105 transition-transform duration-300"
                  width={160}
                  height={160}
                />
                <h3 class="text-xl sm:text-2xl font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <span
                  class={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getRoleColor(member.role)}`}
                >
                  {member.role}
                </span>
                <p
                  class={[
                    "text-tertiary-300 !text-md sm:!text-md text-center mt-4",
                    expandedMember.value === member.name
                      ? "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      : "transition-all duration-300 ease-in-out line-clamp-3",
                  ]}
                  style={{
                    maxHeight: expandedMember.value === member.name ? "1000px" : "4.5em", // Adjust max-height for smooth expansion
                    overflow: "hidden",
                    transitionProperty: "max-height",
                  }}
                >
                  {member.description}
                </p>
                <div class="flex justify-center mt-2">
                  <svg
                    class={[
                      "w-4 h-4 text-primary-400 transition-transform duration-300",
                      expandedMember.value === member.name && "transform rotate-180",
                    ]}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: `${SITE.title} - This Is Us`,
  meta: [
    {
      name: "description",
      content: "Meet our expert team of pottery facilitators dedicated to fostering creativity and community.",
    },
  ],
};