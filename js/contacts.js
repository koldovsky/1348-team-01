function init() {
    import("./header-navigation.js");
    import("./header_burger-menu.js");
    import("./shop_products.js");
    import('./contacts-faq_accordion.js');
  }
  
  const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]'
  ).length;
  let loadedPartialsCount = 0;
  
  document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
  });
  