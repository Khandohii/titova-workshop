$(function(){
	// Проверка браузера
	if ( !supportsCssVars() ) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Ленивая загрузка
	setTimeout(function(){
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: function(el) {
				el.classList.add('loaded')
			}
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() +'px')


	// Аккордион
	$('body').on('click', '.accordion .item .open_btn', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.item')
		let accordion = $(this).closest('.accordion')

		if( parent.hasClass('active') ) {
			parent.removeClass('active')
			parent.find('.data').slideUp(300)
		} else {
			accordion.find('.item').removeClass('active')
			accordion.find('.data').slideUp(300)

			parent.addClass('active')
			parent.find('.data').slideDown(300)
		}
	})


	// Всплывающие окна
	$('.modal_link').click(function(e){
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src  : $(this).data('content'),
			type : 'inline',
			opts : {
				touch : false,
				speed : 300,
				backFocus : false,
				trapFocus : false,
				autoFocus : false,
				mobile : {
				    clickSlide: "close"
				}
			}
		})
	})


	// Увеличение картинки
	$('.fancy_img').fancybox({
		backFocus : false,
		mobile : {
		    clickSlide: "close"
		}
	})


	// Моб. меню
	$('body').on('click', '.mob_menu_link', function(e) {
    	e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active')

			$('body').removeClass('lock')
			$('header').removeClass('visible')
		} else {
			$(this).addClass('active')

			$('body').addClass('lock')
			$('header').addClass('visible')
		}
    })

	// Кастомный select
	$('select').niceSelect()


	// Маска ввода
	// $('input[type=tel]').inputmask('+38 (999) 99-99-999')

	function initMasking(maskedInput) {
		// get the format fromt intl-tel-input placeholder
		var format = $(maskedInput).attr('value') ? $(maskedInput).attr('value') : $(maskedInput).attr('placeholder');

		console.log(format)

		// replace all digits to zero and use is as the mask
		$(maskedInput).inputmask(format.replace(/[0-9]/g, 9));
	}

	let href = document.location.origin;
	$('input[type=tel]').intlTelInput({
		utilsScript: href + '/js/utils.js',
		preferredCountries: ['ua'],
		autoPlaceholder: 'aggressive',
		initialCountry: "auto",
		hiddenInput: "full_number",
		geoIpLookup: function(success, failure) {
			$.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
				var countryCode = (resp && resp.country) ? resp.country : "us";
				success(countryCode);
			});
		},
		separateDialCode: true,
		nationalMode: true,
	});

	setTimeout(function() {
		$('input[type=tel]').each( (el, element) => {
			if (!$(element).attr('value')) {
				$(element).trigger("countrychange");
			} else{
				initMasking(element)
			}
		})
	}, 1000)

	// update the mask format when changing country
	$("input[type=tel]").on("countrychange", function (e, countryData) {
		$(this).val('');
		let format = $(e.target).attr('placeholder').replace(/[^0-9]/g, '');
		$(e.target).attr('data-length', format.length);

		initMasking(this)

		let countryTel = $(e.target).closest('.iti').find('.iti__selected-dial-code').text();
		$(e.target).attr('data-country', countryTel);

		let countryCode = $(e.target).closest('.iti').find('.iti__country-list .iti__active ').attr('data-country-code');

		if (countryCode == 'ua') $('#country').val('Україна')
		checkCountry($('input#country'))
	});

	$('body').on('change', 'input#country', function(e) {
		checkCountry($(this))
	})

    $('input#country').keyup(function(e){
		checkCountry($(this))
    });

    function checkCountry(el) {
    	let val = $(el).val();
    	let uaNames = ['Україна', 'Украина', 'Ukraine', 'Ukraina'];

	    if( uaNames.indexOf(val) != -1) {
	    	$('.checkout .delivery_way').slideDown(300)
	    } else{
	    	$('.checkout .delivery_way').slideUp(300)
	    }
    }


    // Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function(e) {
		e.preventDefault()

	    if( !$(this).hasClass('active') ) {
	    	let parent = $(this).closest('.tabs_container')
		    let activeTab = $(this).data('content')
        	let level = $(this).data('level')

		    parent.find('.tabs:first').find('button').removeClass('active')
		    parent.find('.tab_content.' + level).removeClass('active')

		    $(this).addClass('active')
		    $(activeTab).addClass('active')
	    }
	})

	if( locationHash && $('.tabs_container').length ) {
		let activeTab = $('.tabs button[data-content='+ locationHash +']')
		let parent = activeTab.closest('.tabs_container')
    	let level = activeTab.data('level')

		parent.find('.tabs:first').find('button').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		$(locationHash).addClass('active')

		$('html, body').stop().animate({
		   	scrollTop: $(locationHash).offset().top
		}, 1000)
	}


	// Мини всплывающие окна
	firstClick = false

	$('.mini_modal_link').click(function(e){
	    e.preventDefault()

	    let modalId = $(this).data('modal-id')

	    if( $(this).hasClass('active') ){
	        $(this).removeClass('active')
	      	$('.mini_modal').removeClass('active')

	        firstClick = false

			if( $(window).width() < 1024 ){
				$('body').css('cursor', 'default')
			}

			$('.overlay').fadeOut(200)
	    }else{
	        $('.mini_modal_link').removeClass('active')
	        $(this).addClass('active')

	        $('.mini_modal').removeClass('active')
	        $(modalId).addClass('active')

	        firstClick = true

			if( $(window).width() < 1024 ){
				$('body').css('cursor', 'pointer')
			}

			$('.overlay').fadeIn(200)
	    }
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(function(e){
	    if ( !firstClick && $(e.target).closest('.mini_modal').length == 0 ){
	    	if( $('.mini_modal_link').hasClass('active') ){
				$('.overlay').fadeOut(200)
			}

	        $('.mini_modal, .mini_modal_link').removeClass('active')

			if( $(window).width() < 1024 ){
				$('body').css('cursor', 'default')
			}
	    }

	    firstClick = false
	})

	// Закрываем всплывашку при клике на крестик во всплывашке
	$('body').on('click', '.mini_modal .close', function(e) {
	    e.preventDefault()

	    $('.mini_modal, .mini_modal_link').removeClass('active')

	    if( $(window).width() < 1024 ){
			$('body').css('cursor', 'default')
		}

		$('.overlay').fadeOut(200)

	    firstClick = false
	})


    // Плавная прокрутка к якорю
	$('body').on('click', '.scroll_link', function(e) {
		e.preventDefault()

		let href = $(this).data('anchor')

		$('html, body').stop().animate({
		   	scrollTop: $(href).offset().top
		}, 1000)


		if ( $(window).width() < 1024 ) {
			$('.mob_menu_link').removeClass('active')

			$('header').fadeOut(300)
		}
	})

    // Добавление/Удаление товара в избранное/из избранного
	$('body').on('click', '.favorite_btn', function(e) {
    	e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active')
			// Здесь запрос на удаление товара из избранного
		} else {
			$(this).addClass('active')

			// Здесь запрос на добавление товара в избранное
		}
    })


    // Плавная прокрутка к якорю
	$('body').on('click', '.up_btn button', function(e) {
		e.preventDefault()

		$('html, body').stop().animate({
		   	scrollTop: 0
		}, 1000)
	})


    // Плавная прокрутка к якорю
	$('body').on('click', '.show_password button', function(e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$(this).closest('.field_password').find('.input').attr('type', 'password');
		} else{
			$(this).addClass('active')
			$(this).closest('.field_password').find('.input').attr('type', 'text');
		}
	})
})


// Вспомогательные функции
function widthScroll() {
    let div = document.createElement('div')
    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)

    return scrollWidth
}


var supportsCssVars = function() {
    var s = document.createElement('style'),
        support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}


function setHeight(className){
    let maxheight = 0

    className.each(function() {
    	let elHeight = $(this).outerHeight()

        if( elHeight > maxheight ) {
        	maxheight = elHeight
        }
    })

    className.outerHeight( maxheight )
}