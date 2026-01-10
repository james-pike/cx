import { component$, useSignal, $, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { tursoClient } from "~/lib/turso";
import { Carousel } from '@qwik-ui/headless';
import { LuChevronLeft, LuChevronRight, LuChevronDown } from '@qwikest/icons/lucide';

interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
  date: string;
  role: string;
}

// Database loader
export const useReviewsLoader = routeLoader$(async (event) => {
  try {
    const client = tursoClient(event);
    const result = await client.execute('SELECT * FROM reviews ORDER BY position ASC');
    return result.rows.map((row: any) => ({
      id: Number(row.id) || 0,
      name: String(row.name) || '',
      review: String(row.review) || '',
      rating: Number(row.rating) || 0,
      date: String(row.date) || '',
      role: String(row.role) || '',
    })) as Review[];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
});

export default component$(() => {
  const reviewsData = useReviewsLoader();
  const reviews = useSignal<Review[]>([]);
  const isAutoPlaying = useSignal(false);
  const slidesPerViewSig = useSignal(3);
  const expandedReviews = useSignal<number[]>([]);
  const overflowingReviews = useSignal<number[]>([]);

  // Load reviews data
  useVisibleTask$(() => {
    reviews.value = reviewsData.value;
  });

  // Detect which reviews are overflowing and need expand button
  useVisibleTask$(({ track }) => {
    track(() => reviews.value);

    if (reviews.value.length === 0) return;

    // Wait for DOM to render
    setTimeout(() => {
      const overflowing: number[] = [];
      reviews.value.forEach((review) => {
        const element = document.querySelector(`[data-review-id="${review.id}"] .review-content`);
        if (element) {
          // Check if content is clamped (scrollHeight > clientHeight)
          if (element.scrollHeight > element.clientHeight) {
            overflowing.push(review.id);
          }
        }
      });
      overflowingReviews.value = overflowing;
    }, 100);
  });

  const toggleExpand = $((reviewId: number) => {
    if (expandedReviews.value.includes(reviewId)) {
      expandedReviews.value = expandedReviews.value.filter(id => id !== reviewId);
    } else {
      expandedReviews.value = [...expandedReviews.value, reviewId];
    }
  });

  const handleSlideChange = $(() => {
    // On mobile, collapse all expanded reviews when slide changes
    if (window.matchMedia('(max-width: 767px)').matches) {
      expandedReviews.value = [];
    }
  });

  // Responsive slidesPerView
  useVisibleTask$(({ cleanup }) => {
    const updateSlidesPerView = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        slidesPerViewSig.value = 3;
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        slidesPerViewSig.value = 2;
      } else {
        slidesPerViewSig.value = 1;
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    cleanup(() => {
      window.removeEventListener('resize', updateSlidesPerView);
    });
  });

  useStyles$(`
    .review-content-wrapper {
      position: relative;
    }
    .review-content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 8;
      overflow: hidden;
      transition: all 0.3s ease-in-out;
    }
    .review-content.expanded {
      -webkit-line-clamp: unset;
      overflow: visible;
    }
    .review-content-wrapper:not(.expanded)::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: linear-gradient(transparent, rgba(0,0,0,0.95));
      pointer-events: none;
    }
    .review-card-wrapper {
      transition: transform 0.2s ease-in-out;
    }
    .review-card-wrapper.has-overflow {
      cursor: pointer;
    }
    .review-card-wrapper.has-overflow:hover {
      transform: scale(1.02);
    }
    .review-card-wrapper.has-overflow:hover .review-content:not(.expanded) {
      -webkit-line-clamp: 12;
    }
    .expand-indicator {
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .review-card-wrapper.has-overflow:hover .expand-indicator {
      opacity: 1;
    }
    .carousel-scroller {
      align-items: flex-start !important;
    }
    @media (max-width: 767px) {
      .carousel-scroller {
        align-items: flex-end !important;
      }
    }
  `);

  const arrowButtonClass = "w-10 h-10 flex items-center justify-center rounded-full bg-tertiary-800/80 hover:bg-tertiary-700 text-white shadow-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed";

  // Fixed typing issue with Intl.DateTimeFormatOptions
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return date.toLocaleDateString("en-US", options);
  }

  function formatRelativeDate(dateString: string) {
    const now = new Date();
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) {
      return "in the future";
    }
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth > 0) return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;
    if (diffWeek > 0) return `${diffWeek} week${diffWeek > 1 ? "s" : ""} ago`;
    if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
    if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
    if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
    return "just now";
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        class={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <>
      <section class="relative overflow-hidden py-12 md:py-16 bg-gradient-to-b from-black via-tertiary-950 to-black">
        <div class="relative max-w-7xl mx-auto px-5 sm:px-6">
          <div class="text-center mb-12">
            <h2 class="!text-5xl md:text-6xl px-4 font-bold mb-6">
              <span class="bg-gradient-to-r xdxd from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
                Client Reviews
              </span>
            </h2>
          </div>

          <div class="relative max-w-6xl mx-auto">
            {reviews.value.length === 0 ? (
              <div class="text-center py-12 text-tertiary-300 text-lg">
                Loading reviews...
              </div>
            ) : (
              <Carousel.Root
                class="carousel-root relative"
                slidesPerView={slidesPerViewSig.value}
                gap={24}
                autoPlayIntervalMs={3000}
                bind:autoplay={isAutoPlaying}
                draggable={true}
                align="start"
                sensitivity={{ mouse: 2.5, touch: 2.0 }}
                onChange$={handleSlideChange}
              >
                <Carousel.Scroller class="carousel-scroller">
                  {reviews.value.map((review: Review) => (
                    <Carousel.Slide key={review.id} class="h-auto">
                      <div
                        data-review-id={review.id}
                        class={`review-card-wrapper ${overflowingReviews.value.includes(review.id) ? 'has-overflow' : ''} bg-gradient-to-br from-tertiary-900/70 via-black/70 to-tertiary-950/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary-600/50 border-2 border-tertiary-800/50`}
                        onClick$={() => overflowingReviews.value.includes(review.id) && toggleExpand(review.id)}
                      >
                        <div class="flex justify-center mb-4 pt-6">
                          <div class="flex space-x-1">{renderStars(review.rating)}</div>
                        </div>
                        <div class={`review-content-wrapper px-6 mb-2 ${expandedReviews.value.includes(review.id) ? 'expanded' : ''}`}>
                          <blockquote class={`review-content text-lg pb-3 text-tertiary-200 ${expandedReviews.value.includes(review.id) ? 'expanded' : ''}`}>
                            "{review.review}"
                          </blockquote>
                        </div>
                        <div class="flex items-center justify-between px-6 mb-1">
                          <div class="text-left">
                            <h4 class="font-bold text-white">
                              {review.name}
                            </h4>
                          </div>
                          {overflowingReviews.value.includes(review.id) && (
                            <div class="expand-indicator">
                              <LuChevronDown class={`w-5 h-5 text-primary-400 transition-transform duration-200 ${expandedReviews.value.includes(review.id) ? 'rotate-180' : ''}`} />
                            </div>
                          )}
                        </div>
                        <p class="text-tertiary-400 text-xs pb-3 px-6">
                          {formatRelativeDate(review.date)}
                        </p>
                      </div>
                    </Carousel.Slide>
                  ))}
                </Carousel.Scroller>

                {/* Navigation and Pagination */}
                <div class="flex items-center justify-end mt-6 gap-4">
                  <Carousel.Pagination class="flex space-x-2">
                    {reviews.value.map((_, index) => (
                      <Carousel.Bullet key={index} />
                    ))}
                  </Carousel.Pagination>
                  <div class="flex gap-2">
                    <Carousel.Previous class={arrowButtonClass}>
                      <LuChevronLeft class="h-5 w-5" />
                    </Carousel.Previous>
                    <Carousel.Next class={arrowButtonClass}>
                      <LuChevronRight class="h-5 w-5" />
                    </Carousel.Next>
                  </div>
                </div>
              </Carousel.Root>
            )}
          </div>
        </div>
      </section>

      {/* Media Articles Section */}
      <section id="news" class="scroll-mt-20 relative overflow-hidden py-16 md:py-16 bg-gradient-to-br from-tertiary-950/50 to-black">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div class="text-center mb-12">
            <h2 class="!text-4xl md:text-4xl font-bold mb-6">
              <span class="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
                In The News
              </span>
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 px-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                id: 1,
                title: "Rising Star: Session Violinist Making Waves",
                publication: "Music Weekly",
                date: "2025-08-16",
                url: "#",
                image: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=800&q=80"
              },

            ].map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                class="group bg-gradient-to-br from-tertiary-900/50 to-black rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-2 border-tertiary-800/50 hover:border-primary-600/50"
              >
                <div class="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-semibold text-primary-400">
                      {article.publication}
                    </span>
                    <span class="text-xs text-tertiary-400">
                      {formatDate(article.date)}
                    </span>
                  </div>
                  <h3 class="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
                    {article.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
});