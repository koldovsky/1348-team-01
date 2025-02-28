// Liubomyr Bishko

$(".in-store-services__cards").slick({
  slidesToShow: 3,
  prevArrow:
    '<button class="in-store-services__button in-store-services__button--prev"><svg class="arrow-svg_1j4" viewBox="0 0 30 30"><defs><path d="M19.533 15l-9.1-9.45c-.577-.6-.577-1.5 0-2.1.578-.6 1.445-.6 2.023 0l10.11 10.5c.29.3.434.75.434 1.05 0 .45-.144.75-.433 1.05l-10.111 10.5c-.29.3-.578.45-1.012.45-.433 0-.722-.15-1.01-.45-.578-.6-.578-1.5 0-2.1l9.1-9.45z" id="a-1736417173378"></path></defs><use fill-rule="nonzero" opacity=".8" xlink:href="#a-1736417173378" transform="scale(-1,1) translate(-30,0)"></use></svg></button>',
  nextArrow:
    '<button class="in-store-services__button in-store-services__button--next"><svg class="arrow-svg_1j4" viewBox="0 0 30 30"><defs><path d="M19.533 15l-9.1-9.45c-.577-.6-.577-1.5 0-2.1.578-.6 1.445-.6 2.023 0l10.11 10.5c.29.3.434.75.434 1.05 0 .45-.144.75-.433 1.05l-10.111 10.5c-.29.3-.578.45-1.012.45-.433 0-.722-.15-1.01-.45-.578-.6-.578-1.5 0-2.1l9.1-9.45z" id="a-1736417173378"></path></defs><use fill-rule="nonzero" opacity=".8" xlink:href="#a-1736417173378"></use></svg></button>',
  isFinite: true,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});
