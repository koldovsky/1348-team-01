function init() {
    import("./header-navigation.js");
    import("./header_burger-menu.js");
    import("./render-products.js");
    import('./info-page-render.js');
    import('./info-page-slider.js');
  }
  
  const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]'
  ).length;
  let loadedPartialsCount = 0;
  
  document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
  });
  