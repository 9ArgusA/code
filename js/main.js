window.onscroll = () => {
    const nav = document.querySelector('.nav')
    const scrol = window.scrollY
    
    if(scrol > 500) {
        nav.classList.add('nav_fix')
    } else if (scrol < 100) {
        nav.classList.remove('nav_fix')
    }
};

$('.slicknav_btn').on('click', function () {
    $('.burger').toggle('.burger_active');
  });
  

const swiper = new Swiper('.swiper' , {
    direction: 'horizontal',
    loop: true,
    pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
    speed: 300,
    stopOnLastSlide: false,
    autoplay: {
      delay: 3000
    },
    
  }); 

  const swiper1 = new Swiper('.mySwiper' , {
    direction: 'horizontal',
    loop: true,
    pagination: {
            el: ".myswiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".s-button-next",
            prevEl: ".s-button-prev",
          },
    speed: 300,
    stopOnLastSlide: false,
    autoplay: {
      delay: 3000
    }
  }); 
  

$('.call').on('click', function () {
  $('.wrapper__madal').fadeIn();
  $('.overlay').fadeIn();
  
});

$('.form-book').on('click', function() {
  $('.wrapper__madal').fadeOut();
  $('.overlay').fadeOut();
});

$('.overlay').on('click', function() {
    $('.wrapper__madal').fadeOut();
    $('.overlay').fadeOut();
    $('.message-for-user').fadeOut();
});

$('.close').on('click', function() {
  $('.wrapper__madal').fadeOut();
  $('.overlay').fadeOut();
});

$('.form-book').children().on('click', function(e){
  e.stopPropagation();
});




$(document).ready(function() {
    $('[data-submit]').on('click', function(e){
    e.preventDefault();
     $(this).parent('form').submit();
    })
   });


//Валидация и отправка формы

$(document).ready(function() {
  $('[data-submit]').on('click', function(e) {
      e.preventDefault();
      $(this).parent('form').submit();
  })
  $.validator.addMethod("regex", function(value, element, regexp) {
          var re = new RegExp(regexp);
          return this.optional(element) || re.test(value);
      },
      "Пожалуйста, проверьте свой ввод."
  );

  // Функция валидации и вывода сообщений
  function valEl(el) {
      el.validate({
          rules: {
              tel: {
                  required: true,
                  regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
              },
              name: {
                  required: true,
                  regex : "[А-Яа-я]{1,32}"
              },
              email: {
                  required: true,
                  email: true
              },
              country : {
                required: true,
                regex : "[A-Za-zА-Яа-я]{1,32}"
                }, 
                city : {
                    required: true,
                    regex : "[A-Za-zА-Яа-я]{1,32}"
                },
                street : {
                    required: true,
                    regex : "[A-Za-zА-Яа-я]{1,32}"
                },
                house : {
                    required: true,
                    regex : "[0-9A-Za-zА-Яа-я]{1,32}"
                },
                apartment : {
                    required: true,
                    regex : "[0-9]{1,32}"
                }

          },
          messages: {
              tel: {
                  required: 'Поле обязательно для заполнения',
                  regex: 'Телефон может содержать символы + - ()'
              },
              name: {
                  required: 'Поле обязательно для заполнения',
              },
              email: {
                  required: 'Поле обязательно для заполнения',
                  email: 'Неверный формат E-mail'
              },
              country : {
                required: 'Поле обязательно для заполнения',
                
            }, 
            city : {
                required: 'Поле обязательно для заполнения',
                
            },
            street : {
                required: 'Поле обязательно для заполнения',
                
            },
            house : {
                required: 'Поле обязательно для заполнения',
                
            },
            apartment : {
                required: 'Поле обязательно для заполнения',
               
            }
          },

          // Начинаем проверку id="" формы
          submitHandler: function(form) {
              var $form = $(form);
              var $formId = $(form).attr('id');
              switch ($formId) {
                case 'order__form':
                    $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                        })
                        .always(function() {
                           console.log('Always');
                           setTimeout(function () {
                            $form.trigger('reset');
                        },1000 );
                        }); 
                    break;
                case 'form':
                    $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                        })
                        .always(function() {
                           console.log('Always');
                           setTimeout(function () {
                            $form.trigger('reset');
                            $('#message__user').fadeIn();
                           },1000);
                           setTimeout(function (){
                            $('#message__user').fadeOut();
                           },6000);
                        }); 
                    break;
                  case 'form-modal':
                      $.ajax({
                              type: 'POST',
                              url: $form.attr('action'),
                              data: $form.serialize()
                          })
                          .done(function() {
                              console.log('Success');
                          })
                          .fail(function() {
                            console.log('Fail');
                        })
                          .always(function() {
                              console.log('Always');
                              setTimeout(function() {   
                                  $form.trigger('reset');             
                              }, 500);
                              setTimeout(function() {
                                $('#wrapper__madal').fadeOut();   
                                $('#message-for-user').fadeIn();
                                $('.message-for-user__close-btn').on('click', function() {
                                    $('.message-for-user').fadeOut();
                                    $('.overlay').fadeOut();
                                  });
                              },600);   
                          });
                      break;
              }
              return false;
          }
      })
  }
  $('.js-form').each(function() {
      valEl($(this));
  });
  
});


$(document).ready(function(){
    $("#arrow").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});


$('.nav-link').on('click', function(event){
    event.preventDefault();
    var currTab = $(this).index();
  
    $('.nav-link').removeClass('nav-link_active');
    $(this).addClass('nav-link_active');
  
    $('.show').removeClass('show_active');
    $('.show').eq(currTab).addClass('show_active');
  })


  ymaps.ready(init);
        function init(){
            var myMap = new ymaps.Map("map", {
                center: [40.828737, 16.548533],
                zoom: 10,
                controls: ['zoomControl']
            });
        }