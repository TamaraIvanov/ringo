(function($) {
	$(document).ready(function() {
		var $window = $(window);

		var windowSize = $(window).width();


		$(window).resize(function() {
			searchResponsive(windowSize);
		});


		$window.on("load", function() {

			$("#top").find(".description-content-wrapper").css({"right": 0});
		});


		var descHeight = $(".description").height();
		$(".scroll_effect").height(descHeight);


		$(".scrolling_buttons button").click(function(){

			var data_id = $(this).data('id');

			$('html, body').animate({
				scrollTop: $( '#' + data_id).offset().top
			}, 2000);

		});


		/**********  EFFECTS ON CLICK READ MORE *********/

		$(".footer span").click(function () {

			var $this = $(this);
			var $article = $this.closest(".main-section");
			var $description = $article.find(".description");

			$article.find(".slide_read_more").fadeOut(10);
			$article.toggleClass('open');

			if ($article.hasClass('open')) {

				setTimeout(function () {

					$article.find(".read_more_wrapper").css({'width':'80%'});
					$article.find(".footer span").toggleClass('no-display');
					if (windowSize <= 991) {
						$article.find(".read_more_wrapper").css({'width':'100%'});

					}
				}, 400);
				setTimeout(function () {
					$article.find(".slide_read_more").fadeIn(600);

				}, 1200);

				setTimeout(function () {

					$description.find(".scroll_effect").fadeOut(200);
					$description.css({'opacity': '.5'},1000);
					$article.find(".description_wrapper").css({'width':'20%'});
					if (windowSize <= 991) {
						$article.find(".description_wrapper").css({'width':'100%'});
					}
				}, 800);

			}else{
				$article.find(".footer span").toggleClass('no-display');
				$article.find(".read_more_wrapper").css({'width': 0});
				$article.find(".description_wrapper").css({'width':''});
				$description.find(".scroll_effect").fadeIn(500);
				$description.css('opacity', '1');

			}
			searchResponsive($article);
		});



		/**********  SLIDE CONTENT IN SECTION  *********/

		$(".bullet").click(function(){
			var $this = $(this);

			var activeSlide = $this.index();

			active($this, activeSlide);

		});



		/**********  EFFECTS ON SCROLL  *********/


		scrollingEffect($window);

		$window.scroll(function() {
			scrollingEffect($window);
		});

		$(".slide_btn").on('click', slideClick);

		//slide articles
		function slideClick() {

			var $this = $(this);
			$this.off();

			var type = $this.data('type');
			var $slides = $this.closest('.main-section').find('.scroll_effect');

			slideArticles(type, $slides);

			setTimeout(function() {
				$this.on('click', slideClick);
			}, 1000);
		}

		//clone 1st slide article after last one in each section
		$('.main-section').each(function() {
			var $article = $(this).find('.scroll_effect');
			$article.first().clone().insertAfter($article.last());
			$article.first().addClass('active');
		});


		/**********  RESPONSIVE CHANGES  *********/

		function searchResponsive(width,$article) {

			if (width <= 991) {
				$article.find(".read_more_wrapper").css({'width':'100%'});

			}
		}
	});

	function active($this, activeSlide) {
		$this.addClass("active");
		$this.siblings().removeClass("active");

		//slider
		var $slide = $this.closest('.main-section').find(".slide_read_more").eq(activeSlide);

		$slide.addClass("active");
		$slide.siblings().removeClass("active");

	}

	var activeIndex = 0;

	function slideArticles(type, $slides){

		var $container = $slides.closest('.description_content');
		var slideLength = $slides.length;
		var slideHeight = $slides.closest('.description').height();


		if(type == 'up') {
			activeIndex++;
			$container.animate({'margin-top': '-='+slideHeight}, 700, function(){
				if(activeIndex == slideLength - 1) {
					activeIndex = 0;
					$container.css({'margin-top': 0});
				}
			});

		} else {

			if(activeIndex == 0) {
				activeIndex = slideLength - 1;
				var marginValue = (1- slideLength) * 813;
				$container.css({'margin-top': marginValue});
			}

			activeIndex--;
			$container.animate({'margin-top': '+='+slideHeight}, 700);
		}

	}

	function scrollingEffect($window) {

		if ($window.width() > 1000) {
			$(".main-section").each(function () {

				var $this = $(this);
				var $articleWrapper = $this.find(".description-content-wrapper");

				var objectBottom = $this.position().top + $this.outerHeight();
				var windowBottom = $window.scrollTop() + $window.innerHeight() * 1.5;

				// If the object is completely visible in the window, fade it in
				if (objectBottom <= windowBottom) {
					if ($this.css('opacity') == 0.5) {
						$this.fadeTo(500, 1);
						setDirectionEffect($articleWrapper, 0);
					}
				} else {
					if ($this.css('opacity') == 1) {
						$this.fadeTo(500, 0.5);
						setDirectionEffect($articleWrapper, 2000);
					}
				}

			});
		}
	}

	function setDirectionEffect(elem, value) {

		if (elem.closest(".description_wrapper").hasClass("float-right")) {
			elem.css({"left": value});
		} else {
			elem.css({"right": value});
		}

		//elem.closest(".description").hasClass("float-right") ? elem.css({"left": value}) : elem.css({"right": value});

	}



})(jQuery);