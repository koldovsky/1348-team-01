if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
      initAccordion();
  });
} else {
  initAccordion();
}

function initAccordion() {
  const headers = document.querySelectorAll(".accordion-faq__header");

  headers.forEach(header => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;

      headers.forEach(h => {
        if (h !== this) {
          h.classList.remove("active");
          h.nextElementSibling.style.maxHeight = null;
          h.nextElementSibling.style.marginBottom = null;
        }
      });

      this.classList.toggle("active");

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.marginBottom = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.marginBottom = "10px";
      }
    });
  });
}
