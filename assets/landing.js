var slideContent = [
     {
        title: 'Bloc Jams',
        description: 'A music website built using the Bloc curriculum',
        photoUrl: 'images/blocJamsHomepage.png',
        projectUrl: 'https://github.com/jacobtjackson/bloc-jams/tree/master'
    },
    {
        title: 'test',
        description: 'a test website to make sure carousel is working',
        photoUrl: 'images/test.jpg',
        projectUrl: 'https://www.facebook.com'
    }
];

$('.smooth').on('click', function() {
    $.smoothScroll({
        scrollElement: $('body'),
        scrollTarget: '#' + this.id
    });
    
    return false;
});

var buildSlideTemplate = function(slide) {
    var template = 
    '<a href="' + slide.projectUrl + '" title= "' + slide.title + '" class="url">'
    +   '<div class="item-container slide-' + (slideContent.indexOf(slide) + 1) +'" '
    +   'style="background-image: url(' + slide.photoUrl + '); background-repeat: no-repeat; width: 100%; height: 100%;">'
    +       '<h1 class="item-title-1">' + slide.title + '</h1><br>'
    +       '<p class="description">' + slide.description + '</p>'
    +   '</div>'
    +'</a>'
    ;
    return template;
};

var slider = function() {
    delay = 10000;
    
    var numSlides = $(slideContent).length;
    var prevSlide = numSlides;
    var currentSlide = 1;
    var nextSlide = 2;
    
    var carouselWidth = $('.portfolio-carousel').width() + 2;
    
    var sizeSlides = function() {
        $('.item-container').width(carouselWidth);
    };
    sizeSlides();
    
    for (var i = 1; i <= numSlides; i++) {
        $('#dots').find('ul').append($('<li class="dot ' + i + '"></li>'));
    };
    
    var resetSlides = function() {
        $('.item-container').css({"left": carouselWidth + "px"});
        $('.item-container').first().css({"left": "0px"});
        $('.1').addClass('active');
    };
    resetSlides();
    
    var slideNext = function() {
        $('.slide-' + nextSlide).css({"left": carouselWidth+"px"});
		$('.slide-' + currentSlide).animate({left: carouselWidth * -1}, 1000);
		$('.slide-' + nextSlide).animate({left: "0px"}, 1000);
		currentSlide = nextSlide;
		increaseSlides();
	};
    
    var slidePrev = function() {
        $('.slide-' + prevSlide).css({"left": (carouselWidth * -1) + "px"});
        $('.slide-' + currentSlide).animate({left: carouselWidth}, 1000);
        $('.slide-' + prevSlide).animate({left: "0px"}, 1000);
        currentSlide = prevSlide;
        increaseSlides();
    };
    
    var increaseSlides = function() {
        if (currentSlide === numSlides) {
            nextSlide = 1;
            prevSlide = currentSlide -1;
        } else {
            nextSlide = currentSlide + 1;
            if (currentSlide === 1) {
                prevSlide = numSlides;
            } else {
                prevSlide = currentSlide - 1;
            };
        };
        
        $('#dots').find('li').removeClass('active');
        $('#dots').find('.' + currentSlide).addClass('active');
    };
    
    moveSlides = setInterval(function() {
		slideNext();
	}, delay);
    
    
    $('.next').click(function() {
        clearInterval(moveSlides);
        moveSlides = setInterval(function() {
            slideNext();
        }, delay);
        slideNext();
    });
    
    $('.previous').click(function() {
        clearInterval(moveSlides);
        moveSlides = setInterval(function() {
            slideNext();
        }, delay);
        slidePrev();
    });
    
    $('.dot').click(function() {
		buttonPressed = $('li').index(this) + 1;
		if(buttonPressed !== currentSlide) {
			clearInterval(moveSlides);
			moveSlides = setInterval(function() {
				slideNext();
			}, delay);
			if(currentSlide < buttonPressed) {
				nextSlide = buttonPressed;
				slideNext();
			} else {
				prevSlide = buttonPressed;
				slidePrev();
			}
		}
	});
};

var sections = $('section');
var navigationLinks = $('nav a');
 
sections.waypoint({
    handler: function(event, direction) {
        var active_section;
        active_section = $(this);
        if (direction === "up") active_section = active_section.prev();

        var active_link = $('a[href="#' + active_section.attr("class") + '"]');
        navigationLinks.removeClass("selected");
        active_link.addClass("selected");
    },
    offset: '35%'
  });

$(window).load( function() {
    
    slider();

    var $portfolioContainer = $('.portfolio-carousel');
    
    $portfolioContainer.empty();
    
    for (var i = 0; i < slideContent.length; i++) {
    var $newSlide = buildSlideTemplate(slideContent[i]);
        $portfolioContainer.append($newSlide);
        };
    
    /*var waypointPortfolio = new Waypoint({
        element: $('.portfolio-carousel'),
        handler: function(direction) {
            $('.navbar-link').removeClass('active');
            $("a[href$='#portfolio']").addClass('active');
        },
        offset: "100px"
    });
    
    var waypointAbout = new Waypoint({
        element: $('.about-me'),
        handler: function(direction) {
            $('.navbar-link').removeClass('active');
            $("a[href$='#about-me']").addClass('active');
        },
        offset: "100px"
    });
    
    var waypointTop = new Waypoint({
        element: $('.top'),
        handler: function(direction) {
            $('.navbar-link').removeClass('active');
            $("a[href$='#top'").addClass('active');
        },
        offset: "-100px"
    });*/
});