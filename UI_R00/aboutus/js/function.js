$(document).ready(function(){
	var show = 1;
	$('.show').on('click',function(){
		if(show===1){
			$('.menuleft').addClass("menuleft2");
			show = 0;
		}else{
			$('.menuleft').removeClass("menuleft2");
			show = 1;
		}
	});
});


$(document).ready(function () {
	var carousel = $("#carousel").waterwheelCarousel({
	  flankingItems: 3,
	  movingToCenter: function ($item) {
		$('#callback-output').prepend('movingToCenter: ' + $item.attr('id') + '<br/>');
	  },
	  movedToCenter: function ($item) {
		$('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
	  },
	  movingFromCenter: function ($item) {
		$('#callback-output').prepend('movingFromCenter: ' + $item.attr('id') + '<br/>');
	  },
	  movedFromCenter: function ($item) {
		$('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
	  },
	  clickedCenter: function ($item) {
		$('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
	  }
	});

	$('.banner-content-all .prev').bind('click', function () {
	  carousel.prev();
	  return false
	});

	$('.banner-content-all .next').bind('click', function () {
	  carousel.next();
	  return false;
	});

	$('#reload').bind('click', function () {
	  newOptions = eval("(" + $('#newoptions').val() + ")");
	  carousel.reload(newOptions);
	  return false;
	});

});