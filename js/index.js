function init() {
  import("./header-navigation.js");
  import("./header_burger-menu.js");
  import("./index-popular.js");
  import("./render-products.js");
  import("./countdown.js")
  import("./index-sales.js")
  import('./index-real-stories.js');
  import('./index-deals-accordion.js');
  import('./index-deals-countdown.js');
  import('./index.partners.js');
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
