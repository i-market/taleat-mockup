window.Mockup = {
  openModal: function($modal) {
    var duration = 150;
    $modal.fadeIn(duration);
    $($modal).find('.block').fadeIn(duration, function() {
      $modal.trigger('openModal.app');
    });
  }
};
$(document).ready(function () {
  // модалка
  $('.modal').click(function (event) {
    if ($(event.target).closest(".modal>.block").length)
      return;
    $(".modal>.block, .modal").fadeOut(150);
    event.stopPropagation();
  });
  $('.modal .close').click(function () {
    $('.modal, .modal>.block').hide();
  });
  $('[data-modal]').on('click', function () {
    var dataModal = $(this).attr('data-modal'),
      dataId = $('#' + dataModal);
    Mockup.openModal(dataId);
  });
  // якоря
  $("[data-href]").on("click", function (t) {
    var anchor = $(this).data('href');
    $("html, body").stop().animate({
      scrollTop: $("[data-anchor=" + anchor + "]").offset().top
    }, 700);
    t.preventDefault();
  });
  // аккордион
  $(".accordeon .accordeon-inner").hide().prev().on('click', function () {
    $('.accordeon-inner', '.accordeon').not(this).slideUp(150);
    $(this).next().not(':visible').slideDown(150);
    $('.accordeon-title', '.accordeon').not(this).removeClass('active');
    $(this).toggleClass('active');
  });
  // табы
  $(function () {
    $('[data-tabLinks]').on('click', function () {
      var targetNode = $('[data-tabContent=' + $(this).attr('data-tabLinks') + ']');
      $(this).parent().find('[data-tabLinks]').removeClass('active').filter(this).addClass('active');
      targetNode.parent().find('[data-tabContent]').hide().filter(targetNode).show();
    });
    $('[data-tabLinks]').parent().find('[data-tabLinks]').filter(':first-child').trigger('click');
  });
  // открыть форму на мобиле
  $('.open-header-form').on('click', function () {
    $('.header-middle-serch').show().find('input').focus();
  });
  // открыть/закрыть меню
  $('.absurd-desktop').on('click', function () {
    $('.content-menu-block').slideToggle(150);
  });
  // 
  $('.absurd-hidden').on('click', function () {
    $('.content-menu').show();
    $('html, body').addClass('open');
  });
  $('.catalog-menu-close').on('click', function () {
    $('.content-menu').hide();
    $('html, body').removeClass('open');
  });
  // открыть/закрыть меню
  $('.header-middle-hamburger').on('click', function () {
    $('.menu-hidden').show();
    $('.content-menu').hide();
    $('html, body').addClass('open');
  });
  $('.menu-hidden-close').on('click', function () {
    $('.menu-hidden').hide();
    $('html, body').removeClass('open');
  });
  // открыть / закрыть характеристики товара
  $('.open-catalog-hidden-block').on('click', function () {
    $(this).toggleClass('open')
    $('.catalog-hidden-block').slideToggle(150);
  });
  // открыть / закрыть меню ЛК
  $('.rigistered .name').on('click', function () {
    $(this).toggleClass('open')
    $('.dd_rigistered').fadeToggle(0);
  });
  // скрол шапки
  var resizeWindow = function () {
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      scroll > 100 ? $('.scroll-top').addClass('scroll') : $('.scroll-top').removeClass('scroll');
      if ($(window).width() < 768) {
        if (scroll > 59) {
          $('.header-bottom, .content').addClass('scroll');
        } else {
          $('.header-bottom, .content').removeClass('scroll');
        }
      } else {
        $('.header-bottom, .content').removeClass('scroll');
      }
    });
  };
  $(window).on('load resize', function () {
    resizeWindow();
  });
  // селекты
  $('select').dropdown({
    mobile: true
  });
  // галерея
  $('[data-fancybox]').fancybox({
    slideShow: false,
    fullScreen: false,
    thumbs: false,
    //loop: false
  });
  // слайдер с логотипами
  $('.labels-slider').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: $('.wrap-labels-slider .prev'),
    nextArrow: $('.wrap-labels-slider .next'),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '80px',
        }
    }
  ]
  });
  // слайдер с магазинами
  $('.shops-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: $('.wrap-shops-slider .prev'),
    nextArrow: $('.wrap-shops-slider .next'),
  });
  // слайдер с товарами
  $('.items-slider').each(function (idx, item) {
    var carouselId = "carousel" + idx;
    this.id = carouselId;
    $(this).slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: true,
      appendDots: $(this).parents('.wrap-items-slider').find('.dots'),
      prevArrow: $(this).parents('.wrap-items-slider').find('.prev'),
      nextArrow: $(this).parents('.wrap-items-slider').find('.next'),
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 3
          }
    },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1
          }
    }
  ]
    });
  });
  // слайдер с сертификатами
  $('.useful-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    appendDots: $('.wrap-useful-slider .dots')
  });
  // слайдер с сертификатами
  $('.sertificate-slider').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    appendDots: $('.wrap-sertificate-slider .dots'),
    prevArrow: $('.wrap-sertificate-slider .prev'),
    nextArrow: $('.wrap-sertificate-slider .next'),
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3
        }
    },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
    }
  ]
  });
  // слайдер товара в каталоге
  $('.slider-item-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-item-thumbs'
  });
  $('.slider-item-thumbs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-item-main',
    arrows: false,
    focusOnSelect: true
  });
});
