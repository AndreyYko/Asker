$(document).ready(function () {
	$(".header-nav-mobile-version-visible-button").on('click', function() {
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$(".header-nav-mobile-version > ul").slideToggle();
		} else {
			$(this).addClass('open');
			$(".header-nav-mobile-version > ul").slideToggle();
		}
	});

	$("#pop-up-button-yes").on('click', function() {
		$("#buttons-visible").hide();
		$("#pop-up-h3").html("Enter your answer");
		$("#pop-up-form").fadeIn();
		$("#pop-up-section").animate({
			scrollTop: document.querySelector('.pop-up').scrollHeight
		}, 500);
	});

	if ($(window).width() <= 768) {
		$("#inputs-first").append("<div class='line-under-input'></div>");
	}

	// $("#send-qustion-button").on('click', function() {
	// 	$(".pop-up").css('display', 'flex')
 //    .hide()
 //    .fadeIn();
	// 	return false;
	// });

	$("#pop-up-button-no").on('click', function() {
		$(".pop-up").css('display', 'none');
	});

	$("#pop-up-button-cancel").on('click', function() {
		$(".pop-up").css('display', 'none');
	});
});