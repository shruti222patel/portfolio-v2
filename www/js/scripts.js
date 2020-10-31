
$(document).ready(function() {
	
	"use strict";
	
	FirstLoad();
	AjaxExpander();
	VirtualScr();
	SectionScroll();
	ContactForm();
	Shortcodes();
		
});

$(window).on("load", function() {
	LazyLoad();
});






/*--------------------------------------------------
Function Firs tLoad
---------------------------------------------------*/

	function FirstLoad() {		

		// Animate Hero Title
		// $('.title-intro').each(function(){
		// 	var words = $(this).text().split(" ");
		// 	var total = words.length;
		// 	$(this).empty();
		// 	for (index = 0; index < total; index ++){
		// 		$(this).append($("<span /> ").text(words[index]));
		// 	}
		// });
		
		// Animate Hero SubTitle
		$('.subtitle-intro').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});
		
        // Showcase Hover Change Image
		$('.showcase-img:nth-child(1)').addClass('active');
	
		$('.showcase-list li a').on('mouseenter', function() {
			$('.showcase-list li a').addClass('disable');
			$(this).removeClass('disable');	
			var aux = $(this).data('aux'),
			preview = $('.showcase-img[data-aux="' + aux + '"]');	
			$('#showcase-gallery').find('.showcase-img').removeClass('active');
			preview.addClass('active');
		}).on('mouseleave', function() {
			$('.showcase-list li a').removeClass('disable');
		});
		
		// Scroll To Portfolio
		$('.scroll-down').on('click', function() {
			$('html, body').animate({ scrollTop: $('#showcase').offset().top +1 },700);
			return false;
		});	
		
	}// End First Load
	
	
/*--------------------------------------------------
Function Ajax Expander
---------------------------------------------------*/	

	function AjaxExpander() {
				
		$('.showcase-list li a').on('click', function() {
			$('.showcase-img.active').addClass('on-top');
			$(window).off('scroll')
			var url = $(this).data('url');
			if ($('.showcase-img.on-top').hasClass("light-content")) {
				$('#loader-mask').addClass("light-content");
			}
			$('#main-content').addClass('hidden');
			$('#loader-mask').removeClass('disable');			
			setTimeout(function() {				
				$('#showcase-gallery').addClass('full');					
				setTimeout(function() {
					$('#main-content').addClass('disable');
					setTimeout(function() {
						if ($('.showcase-img.on-top').hasClass("light-content")) {
							$('header').addClass("light-content");
						}
					}, 400);
					$("#main").append('<div id="showcase-height"></div>');
				}, 300);
			}, 150);
			
	
			setTimeout(function() {
				$('#project-holder #project-data').load(url + ' .project-content', function() {
					Shortcodes();
					HeaderColor();
					$('.showcase-img').removeClass('active');
					$('.project-content').waitForImages({
						finished: function() {
							setTimeout(function() {								
								$('#project-holder').addClass('open');
								setTimeout(function() {
									$('html, body').animate({scrollTop : 250},800);
								}, 400);
							}, 100);
							$('#loader-mask').addClass('disable');
							$('#close-project').removeClass('disable');								
						},
						waitForAll: true
					});
				});
			}, 1000);
	
			return false;
		});
	
		$('#close-project').on('click', function() {
			$(this).addClass('disable');
			$('.showcase-img.on-top').addClass('active');
			setTimeout(function() {
				$('#project-holder').removeClass('open');
			}, 200);
			$('html, body').animate({scrollTop : 0},1000);
			
			setTimeout(function() {
				$('.project-content').remove();
						
					setTimeout(function() {
						$('#showcase-gallery').removeClass('full');
						$('header').removeClass('light-content');
						$('#main-content').removeClass('disable');
						$('html, body').animate({ scrollTop: $('#showcase').offset().top },10);					
						$('.showcase-img').removeClass('on-top');
						$('#loader-mask').removeClass("light-content");
						setTimeout(function() {
							$('#main-content').removeClass('hidden');							
							$('#showcase-height').remove();
							$(window).on('scroll', SectionScroll);									
						}, 400);															
					}, 400);
				
			}, 1200);
			
		});

	}// End AjaxExpander
	

/*--------------------------------------------------
Function SectionColor
---------------------------------------------------*/

	function SectionScroll() {	
	
		if ($('body').hasClass("bg-change")) {
			var distance = $('#contact').offset().top;
			
			$(window).scroll(function() {
				if ( $(window).scrollTop() >= distance ) {
						$("#page-content").css('background-color', '#222');
						$("#page-content").addClass('light-content');
					} else {
						$("#page-content").css('background-color', '#fff');
						$("#page-content").removeClass('light-content');
					}
			});
		}
		
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();		
			if (scroll >= 30) {				
				$(".scroll-down").addClass('disable');				
			} else {								
				$(".scroll-down").removeClass('disable');
			}
		});	
	
	
	}// End SectionColor
	
	
/*--------------------------------------------------
Function Header Color
---------------------------------------------------*/

	function HeaderColor() {			
		
		$(window).scroll(function() {
			
			var scroll = $(window).scrollTop();
			
			if ($('.showcase-img.on-top').hasClass("light-content")) {
				
				if (scroll >= $("#showcase-height").height() - 80) {					
					$('header').removeClass('light-content');
				} else { 
					$('header').addClass('light-content');
				}
			}
			
		});

	}// End Header Color
	
	
	
/*--------------------------------------------------
Function Virtual Scroll
---------------------------------------------------*/

	function VirtualScr() {		
		
		if ($('body').hasClass("virtual-scroll")) {
		
			new SmoothScroll();
	
			function SmoothScroll(el) {
			var t = this, h = document.documentElement;
			el = el || window;
			t.rAF = false;
			t.target = 0;
			t.scroll = 0;
			t.animate = function() {
			t.scroll += (t.target - t.scroll) * 0.1;
			if (Math.abs(t.scroll.toFixed(5) - t.target) <= 0.47131) {
			cancelAnimationFrame(t.rAF);
			t.rAF = false;}
			if (el == window) scrollTo(0, t.scroll);
			else el.scrollTop = t.scroll;
			if (t.rAF) t.rAF = requestAnimationFrame(t.animate);};
			el.onmousewheel = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var scrollEnd = (el == window) ? h.scrollHeight - h.clientHeight : el.scrollHeight - el.clientHeight;
			t.target += (e.wheelDelta > 0) ? -100 : 100;
			if (t.target < 0) t.target = 0;
			if (t.target > scrollEnd) t.target = scrollEnd;
			if (!t.rAF) t.rAF = requestAnimationFrame(t.animate);};
			el.onscroll = function() {
			if (t.rAF) return;
			t.target = (el == window) ? pageYOffset || h.scrollTop : el.scrollTop;
			t.scroll = t.target;};
			}
		
		}
		
	}// End Virtual Scroll
	
	
	
/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {		
		
		$("html,body").animate({scrollTop: 0}, 1);
		
		setTimeout(function(){
			$('body').removeClass('hidden');
			$('#intro').addClass('animate');
		} , 200 );
		
		setTimeout(function(){
			$('.scroll-down').removeClass('disable');
		} , 600 );
		
		$.fn.smartBackgroundImage = function(url){
		var t = this;
		
		$('<img />')
			.attr('src', url)
			.load(function(){ 
				t.each(function(){ 
					$(this)
						.css('backgroundImage', "url('"+url+"')" )
						.addClass("loaded")
					});
				});
		
			return this;
		 }
		 
		$(".showcase-img:nth-child(1)").each(function() { 
			$(this).smartBackgroundImage($(this).data('src'));					
		});	
		
	
		$('body').waitForImages({
			finished: function() {
				$(".showcase-img").each(function() { 
					$(this).smartBackgroundImage($(this).data('src'));					
				});				
			},
			waitForAll: true
		});
	
	}// End Lazy Load
	
	
	
/*--------------------------------------------------
Function Contact Formular
---------------------------------------------------*/	
		
	function ContactForm() {	
	
		if( jQuery('#contact-formular').length > 0 ){
			$('#contactform').submit(function(){
				var action = $(this).attr('action');
				$("#message").slideUp(750,function() {
					$('#message').hide();
					$('#submit').attr('disabled','disabled');		
					$.post(action, {
						name: $('#name').val(),
						email: $('#email').val(),
						comments: $('#comments').val()
					},
					function(data){
						document.getElementById('message').innerHTML = data;
						$('#message').slideDown('slow');
						$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
						$('#submit').removeAttr('disabled');
						if(data.match('success') != null) $('#contactform').slideUp('slow');		
					}
				);		
				});		
				return false;		
			});		
		}

	}//End ContactForm			



/*--------------------------------------------------
Function Shortcodes
---------------------------------------------------*/	
		
	function Shortcodes() {	
		
		// Text Carousel
		if( $('.text-carousel').length > 0 ){		
			$(".text-carousel").owlCarousel({	
				loop:true,
				dots:true,
				dotsEach: 1,
				items:1,
				autoplay:true,
				smartSpeed: 750,
				autoplayHoverPause:true
			});		  
		}
		
		// Appear Item Animation
		$('.has-animation').each(function() {	
			$(this).appear(function() {				
				$(this).delay($(this).attr('data-delay')).queue(function(next){
					$(this).addClass('animate-in');
					next();
				});				 		
			});		
		});	
		
		// Light Box
		if( $('.image-link').length > 0 ){
			$('.image-link').magnificPopup({
				type: 'image',
				mainClass: 'mfp-with-zoom',	
				gallery: {
				  enabled:true
				},		
				zoom: {
					enabled: true, 			
					duration: 300, 
					easing: 'ease-in-out', 
					opener: function(openerElement) {
						return openerElement.is('img') ? openerElement : openerElement.find('img');
					}
				}			
			});
		}
		
		// Slider
		if( $('.slider').length > 0 ){
			$('.slider').owlCarousel({
				loop:true,
				margin:0,
				autoHeight:false,
				nav:true,
				navSpeed: 600,
				items:1,			
			});
		}
				
		// Carousel
		if( $('.carousel').length > 0 ){
			$('.carousel').owlCarousel({
				loop:true,
				autoplay:true,
				margin:20,
				autoHeight:true,
				navSpeed: 600,
				responsive:{
					0:{
						items:1
					},
					479:{
						items:2
					},
					1024:{
						items:3
					},
					1466:{
						items:4
					}
				}
			});
		}
	
	}//End Shortcodes	

/*--------------------------------------------------
	Custom
---------------------------------------------------*/		
var TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
	this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
	this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
	delta = this.period;
	this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
	this.isDeleting = false;
	this.loopNum++;
	delta = 500;
	}

	setTimeout(function() {
	that.tick();
	}, delta);
};

window.onload = function() {
	var elements = document.getElementsByClassName('typewrite');
	console.log(elements);
	for (var i=0; i<elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
		  new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid}";
	document.body.appendChild(css);
};