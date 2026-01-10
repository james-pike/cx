// src/data/newsletters.ts
import type { Post } from "~/components/types";

export const newsletters: Post[] = [
  
  {
    id: "newsletter-2",
    slug: "october",
    title: "Welcome Fall at earthen vessels",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    excerpt: "As the air turns crisp and the leaves begin to drift",
    publishDate: new Date("2025-10-01"),
    tags: ["newsletter", "update"],
    content: `
As the air turns crisp and the leaves begin to drift, we're welcoming autumn with new offerings at earthen vessels. This season invites us inward—into reflection, into creativity, and into the grounding practice of working with clay. We continue to add new offerings, so there's always something fresh to explore.

## Open House – October 1st, 7 – 9pm

Drop in and visit our quiet studio space. All are welcome! Meet our facilitators, learn more about our programs, and discover the heart of earthen vessels.

During the evening, visitors are invited to:

- Create a meditation clay pinch pot to take home.
- Take part in hands-on demonstrations.
- Explore the beauty of texturing clay and discover how surface design can bring each vessel to life.

![Music performance](https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80)

## The Yoga of Clay

At earthen vessels, we see making with clay as a process of slowing down, listening, and shaping meaning. Just as yoga invites us into mindful movement, clay invites us into mindful making. With gentle guidance, we can shape not only bowls and mugs, but also moments of presence, bringing more meaning in the process of making.

![Live concert](https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80)


We look forward to welcoming you into the studio this fall season. For more information please reach out to us at hello@earthenvessels.ca.



    `,
    draft: false,
    metadata: {
      description: "October Newsletter - Welcome Fall at earthen vessels.",
    },
  },

  {
    id: "newsletter-1",
    slug: "august",
    title: "In the Heart of Summer",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
    excerpt: "Hello dear friends of earth and clay",
    publishDate: new Date("2025-08-01"),
    tags: ["newsletter", "update"],
    content: `
Hello dear friends of earth and clay,

We are in the fullness of summer now—sun-warmed days, slow evenings, and the grounding rhythm of hands at work. At earthen vessels, the clay is soft, the kiln is glowing, and the studio hums with creativity and care. We're delighted to share what's unfolding mid-season and what's beginning to take form for the months ahead.

- **Lantern Clay Workshops** invite reflection on our journey inward—through pattern, presence, and earth. These are reflective clay experiences that bring together making and meaning. [Book Now](https://bookeo.com/earthenvessels)
- **Open-like-a-Bowl Workshops** are a poetic vessel-making experience exploring openness, spaciousness, and the quiet beauty of what we hold. [Book Now](https://bookeo.com/earthenvessels)
- **Hug-in-a-Mug Workshops** invite you to hand-build your very own mugs—sturdy, soulful, and shaped with care. Each one holds not just your favorite drink, but the warmth of your presence and intention. [Book Now](https://bookeo.com/earthenvessels)
- **Like The Turtle - Exploring Patience, Persistence and Resilience** is a workshop about the powerful symbol of the turtle—patience, persistence, and resilience. In this workshop, we will explore the symbols of the turtle and what this creature can teach us about our inner world and how we show up in our day-to-day lives. [Book Now](https://bookeo.com/earthenvessels)

Workshops are two and a half hours long and offered at a rate of $125. Clay, supplies, and firings are all included. Each group will be a small gathering of six to eight participants.

In addition to these regular workshops, if you're looking for a private group session, a clay experience for your team or organization, or a meaningful gift experience, we'd be honored to shape something with you.

May your summer continue to offer light, space, and the sweet feel of clay in your hands. We look forward to seeing you in the studio.

If you have suggestions for hand-building clay workshops you'd like to see us design, please reach out to us at hello@earthenvessels.ca—we'd love to hear from you.

    `,
    draft: false,
    metadata: {
      description: "August Newsletter.",
    },
  },
];