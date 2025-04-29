rol");
  if (volumeControl) {
    volumeControl.querySelector('[data-action="unmute"]').hidden = !event.target.muted;
    volumeControl.querySelector('[data-action="mute"]').hidden = event.target.muted;
  }
};
/**
 * Do action when the slide settles
 */
onSlideSettle_fn = function(event) {
  const videoList = Array.from(event.detail.cell.querySelectorAll("video"));
  if (__privateGet(this, _SlideshowCarousel_instances, autoplayPauseOnVideo_get) && this.cells.length > 1 && videoList.length > 0) {
    this.player?.pause();
    event.detail.cell.addEventListener("ended", __privateGet(this, _onVideoEndedListener), { capture: true, once: true });
  }
};
/**
 * If the merchant decide to autorotate but to stop autoplay when video is playing, we register a listener that
 * will move to the next slide (if any)
 */
onVideoEnded_fn = function() {
  this.next();
};
/**
 * Scroll to the next section when the button is clicked, by leveraging JS native scroll
 */
onNextButtonClicked_fn = function() {
  this.closest(".shopify-section").nextElementSibling?.scrollIntoView({ block: "start", behavior: "smooth" });
};
handleAutoplayProgress_fn = async function(event) {
  switch (event.type) {
    case "player:start":
      let autoplayDuration = this.getAttribute("autoplay");
      if (__privateGet(this, _SlideshowCarousel_instances, autoplayPauseOnVideo_get) && this.selectedCell.getAttribute("media-type") === "video") {
        const video = Array.from(this.selectedCell.querySelectorAll("video")).filter((video2) => video2.offsetParent).pop();
        if (isNaN(video.duration)) {
          await new Promise((resolve) => {
            video.onloadedmetadata = () => resolve();
          });
        }
        autoplayDuration = video.duration;
      }
      this.style.setProperty("--slideshow-progress-duration", `${autoplayDuration}s`);
      this.style.setProperty("--slideshow-progress-play-state", "running");
      break;
    case "player:stop":
      this.style.setProperty("--slideshow-progress-duration", `0s`);
      this.style.setProperty("--slideshow-progress-play-state", "paused");
      break;
    case "player:visibility-pause":
      this.style.setProperty("--slideshow-progress-play-state", "paused");
      break;
    case "player:visibility-resume":
      this.style.setProperty("--slideshow-progress-play-state", "running");
      break;
  }
};
if (!window.customElements.get("slideshow-carousel")) {
  window.customElements.define("slideshow-carousel", SlideshowCarousel);
}

// js/sections/testimonials.js
import { animate as animate23 } from "vendor";
var TestimonialCarousel = class extends EffectCarousel {
  createOnChangeAnimationControls(fromSlide, toSlide, { direction }) {
    return {
      leaveControls: () => animate23(fromSlide, { opacity: [1, 0], transform: ["translateY(0)", "translateY(-15px)"] }, { duration: 0.4, easing: [0.55, 0.055, 0.675, 0.19] }),
      enterControls: () => animate23(toSlide, { opacity: [0, 1], transform: ["translateY(15px)", "translateY(0)"] }, { duration: 0.4, delay: 0, easing: [0.25, 0.46, 0.45, 0.94] })
    };
  }
};
if (!window.customElements.get("testimonial-carousel")) {
  window.customElements.define("testimonial-carousel", TestimonialCarousel);
}

// js/sections/text-with-icons.js
import { animate as animate24 } from "vendor";
var TextWithIconsCarousel = class extends EffectCarousel {
  createOnChangeAnimationControls(fromSlide, toSlide) {
    return {
      leaveControls: () => animate24(fromSlide, { opacity: [1, 0], transform: ["translateY(0)", "translateY(-10px)"] }, { duration: 0.3, easing: "ease-in" }),
      enterControls: () => animate24(toSlide, { opacity: [0, 1], transform: ["translateY(10px)", "translateY(0px)"] }, { duration: 0.3, delay: 0.2, easing: "ease-out" })
    };
  }
};
if (!window.customElements.get("text-with-icons-carousel")) {
  window.customElements.define("text-with-icons-carousel", TextWithIconsCarousel);
}

// js/sections/timeline.js
import { animate as animate25, timeline as timeline15 } from "vendor";
var TimelineCarousel = class extends EffectCarousel {
  createOnBecameVisibleAnimationControls(toSlide) {
    return animate25(toSlide.querySelectorAll(".timeline__item-content"), { opacity: [0, 1], transform: ["translateY(10px)", "translateY(0)"] }, { duration: 0.5 });
  }
  createOnChangeAnimationControls(fromSlide, toSlide) {
    return timeline15([
      [fromSlide.querySelectorAll(".timeline__item-content"), { opacity: [1, 0] }, { duration: 0.3 }],
      [fromSlide.querySelector(".timeline__item-image-wrapper :is(img, svg)"), { opacity: [1, 0], transform: ["translateX(0)", "translateX(-15px)"] }, { duration: 0.5, at: "<", easing: [0.645, 0.045, 0.355, 1] }],
      [toSlide.querySelector(".timeline__item-image-wrapper :is(img, svg)"), { opacity: [0, 1], transform: ["translateX(-15px)", "translateX(0)"] }, { duration: 0.5, at: "<" }],
      [toSlide.querySelectorAll(".timeline__item-content"), { opacity: [0, 1], transform: ["translateY(10px)", "translateY(0)"] }, { duration: 0.5, at: "-0.1" }]
    ]);
  }
};
if (!window.customElements.get("timeline-carousel")) {
  window.customElements.define("timeline-carousel", TimelineCarousel);
}

// js/theme.js
import { Delegate as Delegate11 } from "vendor";
(() => {
  const delegateDocument = new Delegate11(document.documentElement);
  delegateDocument.on("click", 'a[href*="#"]', (event, target) => {
    if (event.defaultPrevented || target.matches("[allow-hash-change]") || target.pathname !== window.location.pathname || target.search !== window.location.search) {
      return;
    }
    const url = new URL(target.href);
    if (url.hash === "") {
      return;
    }
    const anchorElement = document.querySelector(url.hash);
    if (anchorElement) {
      event.preventDefault();
      anchorElement.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: no-preference)").matches ? "smooth" : "auto" });
      document.documentElement.dispatchEvent(new CustomEvent("hashchange:simulate", { bubbles: true, detail: { hash: url.hash } }));
    }
  });
  if (navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
    document.head.querySelector('meta[name="viewport"]').content = "width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0, maximum-scale=1.0";
  }
  Array.from(document.querySelectorAll(".prose table")).forEach((table) => {
    table.outerHTML = '<div class="table-scroller">' + table.outerHTML + "</div>";
  });
})();
export {
  AccordionDisclosure,
  AccountLogin,
  AnnouncementBarCarousel,
  ArticleToolbar,
  BeforeAfter,
  BlogPosts,
  BuyButtons,
  CarouselNavigation,
  CarouselNextButton,
  CarouselPrevButton,
  CartCount,
  CartDot,
  CartDrawer,
  CartNote,
  CollectionBanner,
  CollectionLayoutSwitch,
  ConfirmButton,
  CopyButton,
  CountdownTimer,
  CountdownTimerFlip,
  CountdownTimerFlipDigit,
  CountrySelector,
  CustomDetails,
  DialogCloseButton,
  DialogElement,
  Drawer,
  EffectCarousel,
  FacetLink,
  FacetsDrawer,
  FacetsForm,
  FacetsSortPopover,
  FaqToc,
  FeaturedCollectionsCarousel,
  FreeShippingBar,
  GestureArea,
  GiftCardRecipient,
  Header,
  HeightObserver,
  ImageParallax,
  ImageWithText,
  ImageWithTextOverlay,
  ImagesWithTextScroll,
  LineItemQuantity,
  Listbox,
  LoadingBar,
  MarqueeText,
  MediaGrid,
  MenuDisclosure,
  Modal,
  ModelMedia,
  MultiColumn,
  MultipleMediaWithText,
  NewsletterPopup,
  OpenLightBoxButton,
  Player,
  PopIn,
  Popover,
  PredictiveSearch,
  PriceRange,
  PrivacyBanner,
  ProductCard,
  ProductForm,
  ProductGallery,
  ProductGalleryNavigation,
  ProductList,
  ProductLoader,
  ProductRecommendations,
  ProductRerender,
  ProductStickyBar,
  ProgressBar,
  QrCode,
  QuantityInput,
  QuantitySelector,
  QuickBuyModal,
  QuickOrderList,
  RecentlyViewedProducts,
  SafeSticky,
  ScrollCarousel,
  ShareButton,
  ShippingEstimator,
  ShopTheLookDesktopCarousel,
  ShopTheLookMobileCarousel,
  ShopTheLookPopover,
  ShopTheLookProductListCarousel,
  SlideshowCarousel,
  Tabs,
  TestimonialCarousel,
  TextWithIconsCarousel,
  TimelineCarousel,
  VariantPicker,
  VideoMedia,
  cachedFetch,
  createMediaImg,
  debounce,
  deepQuerySelector,
  extractSectionId,
  fetchCart,
  generateSrcset,
  imageLoaded,
  matchesMediaQuery,
  mediaQueryListener,
  throttle,
  videoLoaded,
  waitForEvent
};


function handleDropdownState() {
  const details = document.querySelectorAll(".footer-dropdown");

  if (window.innerWidth > 1024) {
    details.forEach((detail) => {
      detail.setAttribute("open", "true");
    });
  }
}

window.addEventListener("resize", handleDropdownState);
document.addEventListener("DOMContentLoaded", handleDropdownState);

function moveCarousel(parentContainer, direction) {
  const carousel = parentContainer.querySelector('.color-container-searcher');
  if (!carousel) return;

  const scrollAmount = 164;
  carousel.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth',
  });

  console.log(`Moviendo hacia ${direction}`);
}

const observer = new MutationObserver(() => {
  console.log("Detectando cambios en el buscador...");
  attachEventListeners();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

function attachEventListeners() {
  document.querySelectorAll('.product-card').forEach((card) => {
    const prevArrow = card.querySelector('.carousel-arrow.left');
    const nextArrow = card.querySelector('.carousel-arrow.right');

    if (prevArrow && !prevArrow.hasAttribute('data-listener')) {
      prevArrow.addEventListener('click', () => moveCarousel(card, 'left'));
      prevArrow.setAttribute('data-listener', 'true');
    }

    if (nextArrow && !nextArrow.hasAttribute('data-listener')) {
      nextArrow.addEventListener('click', () => moveCarousel(card, 'right'));
      nextArrow.setAttribute('data-listener', 'true');
    }
  });
}

document.addEventListener('DOMContentLoaded', attachEventListeners);
