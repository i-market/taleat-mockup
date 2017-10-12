$(document).ready(function () {
  // модалка
  $('.modal').click(function (event) {
    if ($(event.target).closest(".modal>.block").length)
      return;
    $(".modal>.block, .modal").fadeOut(150);
    event.stopPropagation();
  });
  $('.modal .close-modal').click(function () {
    $('.modal, .modal>.block').hide();
  });
  $('[data-modal]').on('click', function () {
    var dataModal = $(this).attr('data-modal'),
      dataId = $('#' + dataModal);
    dataId.fadeIn(150);
    $(dataId).find('.block').fadeIn(150);
  });
  // аккордион
  $(".accordeon .accordeon-inner").hide().prev().on('click', function () {
    $('.accordeon-inner', '.accordeon').not(this).slideUp(150);
    $(this).next().not(':visible').slideDown(150);
    $('.accordeon-title', '.accordeon').not(this).removeClass('active');
    $(this).toggleClass('active');
  });
  // открыть форму на мобиле
  $('.open-header-form').on('click', function () {
    $('.header-middle-serch').show().find('input').focus();
  });
  // открыть/закрыть меню
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
  // скрол шапки
  var resizeWindow = function () {
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
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
  $('.items-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    appendDots: $('.wrap-items-slider .dots'),
    prevArrow: $('.wrap-items-slider .prev'),
    nextArrow: $('.wrap-items-slider .next'),
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
});
