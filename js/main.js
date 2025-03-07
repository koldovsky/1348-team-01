function init() {
  import("./header-navigation.js");
  import("./header_burger-menu.js");
  import("./index-popular.js");
  import("./render-products.js");
  import("./index-sales.js")
  import("./shop_products.js");
  import("./countdown.js");
  import("./about_us.our-story-carousel.js");
  import("./about_us.in-store_services-carousel.js");
  import('./contacts-faq_accordion.js');
  import('./product-status-updater.js');
  import('./index-deals-accordion.js');
  import('./index-deals-countdown.js');
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
