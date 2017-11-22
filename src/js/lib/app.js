(function ($) {
  "use strict";

  function InputNumber(element) {
    this.$el = $(element);
    this.$input = this.$el.find('[type=text]');
    this.$inc = this.$el.find('[data-increment]');
    this.$dec = this.$el.find('[data-decrement]');
    this.min = this.$el.attr('data-min') || false;
    this.max = this.$el.attr('data-max') || false;
    this.init();
  }

  InputNumber.prototype = {
    init: function () {
      this.$dec.on('click', $.proxy(this.decrement, this));
      this.$inc.on('click', $.proxy(this.increment, this));
    },

    increment: function (e) {
      var value = this.$input[0].value;
      value++;
      if (!this.max || value <= this.max) {
        this.$input[0].value = value++;
        this.$input.trigger('change');
      }
    },

    decrement: function (e) {
      var value = this.$input[0].value;
      value--;
      if (!this.min || value >= this.min) {
        this.$input[0].value = value;
        this.$input.trigger('change');
      }
    }
  };

  $.fn.inputNumber = function (option) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data('inputNumber');

      if (!data) {
        $this.data('inputNumber', (data = new InputNumber(this)));
      }
    });
  };

  $.fn.inputNumber.Constructor = InputNumber;
})(jQuery);

window.Mockup = (function () {
  var stickyInit = function () {
    var navigation = $('.product-registration-sticky'),
      sidebarOffset = navigation.offset().top,
      sidebarHeight = navigation.height(),
      documentHeight = $(document).height(),
      parent = $('.wrap-sticky').offset().top,
      parentHeight = $('.wrap-sticky').height() - 80,
      bottomOffset = parent + parentHeight - sidebarHeight;

    $(window).scroll(function () {
      $(window).scrollTop() > sidebarOffset ? navigation.addClass('sticky') : navigation.removeClass('sticky');
      $(window).scrollTop() >= bottomOffset ? navigation.addClass('sticky-1') : navigation.removeClass('sticky-1');
    });
  };

  var Mockup = {
    openModal: function($modal) {
      var duration = 150;
      $modal.fadeIn(duration);
      $($modal).find('.block').fadeIn(duration, function() {
        $modal.trigger('openModal.app');
      });
    }
  };

  Mockup.initComponents = function($scope) {
    var local$ = _.partialRight($, $scope);
    (function ($) {
      $('.input-number').inputNumber();
      $('select').dropdown({
        mobile: true
      });

      //палец на прокрутке
      $('.finger-block').scroll(function () {
        if ($(this).scrollLeft() > 1) {
          $('.finger').fadeOut(150)
        }
      });

      // показать редактируемые данные
      $('.edit-btn').on('click', function () {
        $('.product-registration-edit').hide();
        $('.product-registration-hidden').show();
        if ($('.product-registration-sticky').length) {
          stickyInit();
        }
      });

      // сменить пароль
      $('.change-password').on('click', function () {
        $(this).hide();
        $('.change-password-hidden').show();
      });
    })(local$);
  };

  $(document).ready(onReady);

  function onReady() {
    Mockup.initComponents($('body'));

    if ($('.product-registration-sticky').length) {
      stickyInit();
    }

    // technical-conclusion-item
    $('.technical-conclusion-item .hidden-block').on('click', function () {
      $(this).toggleClass('open');
      $(this).find('.visible-text').slideToggle(150);
      $(this).find('.hidden-text').slideToggle(150);
    });

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
    $('[data-modal]').on('click', function (evt) {
      evt.preventDefault();
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
    $(".accordeon .accordeon-inner").prev().on('click', function () {
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
    // отзывы
    $('.reviews-item-link').on('click', function () {
      $(this).parents('.reviews-item').find('.paragraph').toggleClass('open');
      $(this).text() == 'читать полностью' ? $(this).text('свернуть') : $(this).text('читать полностью');
    });
    // открыть форму на мобиле
    $('.open-header-form').on('click', function () {
      $('.header-middle-serch').show().find('input').focus();
    });
    // textarea
    $('textarea').each(function () {
      $(this).focus(function () {
        $(this).parent().addClass('focus');
      });
      $(this).focusout(function () {
        if ($(this).val() === '') {
          $(this).parent().removeClass('focus');
        } else {
          $(this).parent().addClass('focus');
        }
      });
    });
    var div = document.querySelectorAll('.label_textarea');
    var ta = document.querySelector('textarea');
    [].forEach.call(div, function (itm, idx) {
      var t = itm.children[0],
        d = itm;
      t.addEventListener('keydown', function () {
        setTimeout(function () {
          t.style.cssText = 'height:0px';
          var height = Math.min(20 * 10, t.scrollHeight);
          d.style.cssText = 'height:' + height + 'px';
          t.style.cssText = 'height:' + height + 'px';
        }, 0);
      });
    });
    // открыть/закрыть меню
    $('.absurd-desktop').on('click', function () {
      $('.content-menu-block').slideToggle(150, function () {
        if ($('.product-registration-sticky').length) {
          stickyInit();
        }
      });

    });
    // меню
    $('.absurd-hidden').on('click', function () {
      $('.content-menu').fadeToggle(0);
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
    // открыть / закрыть инфу в ЛК
    $('.my-orders .more').on('click', function () {
      $(this).parents('.my-orders-item').find('.hidden-info').slideToggle(150);
      $(this).toggleClass('open');
      $(this).hasClass('open') ? $(this).text('Свернуть') : $(this).text('Подробнее');
    });
    // выбор в ЛК
    $('.wrap-btn .simple-btn').on('click', function () {
      $(this).parent().find('.simple-btn').removeClass('active');
      $(this).addClass('active');
    });
    // удалить товар в ЛК
    $('.active-orders .delete').on('click', function () {
      var root = $(this).parents('.wrap-active-orders');
      $(this).parents('.my-orders-item').remove();
      if ($('.my-orders-item', root).length === 0) {
        $(root).text('У вас сейчас нет активных заказов')
      }
    });
    $('.completed-orders .delete').on('click', function () {
      var root = $(this).parents('.wrap-completed-orders');
      $(this).parents('.my-orders-item').remove();
      if ($('.my-orders-item', root).length === 0) {
        $(root).text('У вас нет выполненных заказов')
      }
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
      slidesToScroll: 5,
      prevArrow: $('.wrap-labels-slider .prev'),
      nextArrow: $('.wrap-labels-slider .next'),
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
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
      slidesToScroll: 4,
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
        slidesToScroll: 4,
        dots: true,
        appendDots: $(this).parents('.wrap-items-slider').find('.dots'),
        prevArrow: $(this).parents('.wrap-items-slider').find('.prev'),
        nextArrow: $(this).parents('.wrap-items-slider').find('.next'),
        responsive: [
          {
            breakpoint: 1023,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    });
    // слайдер
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
      slidesToScroll: 5,
      dots: true,
      appendDots: $('.wrap-sertificate-slider .dots'),
      prevArrow: $('.wrap-sertificate-slider .prev'),
      nextArrow: $('.wrap-sertificate-slider .next'),
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
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
      slidesToScroll: 3,
      asNavFor: '.slider-item-main',
      arrows: false,
      focusOnSelect: true
    });
  }

  return Mockup;
})();
