$(function(){
	if ($('.reviews .slider').length) {
		$reviewsSwiper = new Swiper('.reviews .slider', {
			spaceBetween: 0,
			loop: true,
			slidesPerView: 'auto',
			centeredSlides: true,
			speed: 500,
			effect: 'creative',
			creativeEffect: {
				prev: {
					translate: [-200, 0, 0],
					scale: .83,
				},
				next: {
					translate: [200, 0, 0],
					scale: .83,
				},
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			watchOverflow: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
				},
				'480': {
					spaceBetween: 15,
				},
				'768': {
					spaceBetween: 30,
					/*creativeEffect: {
						prev: {
							translate: [-40, 0, 0],
							scale: .91,
						},
						next: {
							translate: [40, 0, 0],
							scale: .91,
						},
					},*/
				},
				'1025': {
					spaceBetween: 40,
					freeMode: false,
					/*creativeEffect: {
						prev: {
							translate: [-45, 0, 0],
							scale: .91,
						},
						next: {
							translate: [45, 0, 0],
							scale: .91,
						},
					},*/
				},
				'1200': {
					spaceBetween: 40,
					/*creativeEffect: {
						prev: {
							translate: [-80, 0, 0],
							scale: .91,
						},
						next: {
							translate: [80, 0, 0],
							scale: .91,
						},
					},*/
				},
			},
		})
	}


	// Звездочки отзыва
	$('input.wow').rating({
		callback: function(index, el){
			if ($(this).closest('.article_info').length) {
				$(this).closest('.column').find('.submit').fadeIn(300);
			} else if ($(this).closest('.reviews.comments').length) {
				$(this).closest('.wrap_rating').find('.submit').fadeIn(300)
			}
		}
	});


	// Изменение количества товара
    $('body').on('click', '.amount .minus', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.amount')
	    let input = parent.find('input')
	    let inputVal = parseFloat( input.val() )
	    let minimum = parseFloat( input.data('minimum') )
	    let step = parseFloat( input.data('step') )

	    if( inputVal > minimum ){
	    	input.val( inputVal-step )
	    }
	})

	$('body').on('click', '.amount .plus', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.amount')
	    let input = parent.find('input')
	    let inputVal = parseFloat( input.val() )
	    let maximum = parseFloat( input.data('maximum') )
	    let step = parseFloat( input.data('step') )

	    if( inputVal < maximum ){
	    	input.val( inputVal+step )
	    }
	})


	// Карточка товара
	if ($('.product_info .big .swiper').length) {
		$productSwiper = new Swiper('.product_info .big .swiper', {
			spaceBetween: 0,
			loop: true,
			speed: 500,
			preloadImages: true,
			watchOverflow: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			on: {
				slideChange: function (swiper) {
					$('.product_info .thumbs .item button').removeClass('active');

					$('.product_info .thumbs .item:eq(' + swiper.realIndex +')').find('button').addClass('active')
				}
			}
		})
	}

	$('body').on('click', '.product_info .thumbs .item button', function(e) {
	    e.preventDefault()

	    let indexThis = $(this).closest('.item').index();

	    if (!$(this).hasClass('active')) {
	    	$('.product_info .thumbs .item button').removeClass('active');

	    	$(e).addClass('active');

	    	$productSwiper.slideToLoop(indexThis)
	    }
	})


	// Products
	if ($(".products .swiper").length) {
		new Swiper('.products .swiper', {
			loop: false,
			speed: 750,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				'320': {
					spaceBetween: 12,
					slidesPerView: 1,
				},
				'480': {
					spaceBetween: 24,
					slidesPerView: 2,
				},
				'768': {
					spaceBetween: 20,
					slidesPerView: 3,
				},
				'1025': {
					spaceBetween: 33,
					slidesPerView: 4,
				},
			},
			on: {
				init: function (swiper) {
					$(swiper.$el).find('.swiper-wrapper').wrap('<div class="swiper-wrap"></div>')

					$(swiper.$el).find('.name').height('auto')

					setTimeout(function(){
						setHeight( $(swiper.$el).find('.name') )
					}, 100)
				},
				resize: function (swiper) {
					$(swiper.$el).find('.name').height('auto')

					setTimeout(function(){
						setHeight( $(swiper.$el).find('.name') )
					}, 100)
				},
			}
		})
	}



	$('body').on('click', '.open_filter_btn', function(e) {
	    e.preventDefault()

	    $('.filter .col_l').addClass('visible')
	    $('body').addClass('lock')
	})

	$('body').on('click', '[data-filter-close]', function(e) {
	    e.preventDefault()

	    $('.filter .col_l').removeClass('visible')
	    $('body').removeClass('lock')
	})



})