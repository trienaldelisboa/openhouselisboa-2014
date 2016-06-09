var allPlaces;

function checkListHeaders() {
	$('section.tag-section').each(function(){
		var totalPlacesShownForZone = $(this).find('ul li').filter(function(){ return $(this).css('display') != 'none';}).length
		if (totalPlacesShownForZone == 0) {
			$(this).hide();
		} else {
			$(this).show();
		}
		
	});	
}

function removeHiddenElements() {
	$('section.tag-section ul li:hidden').remove();
}
function filter(textToFilter, checkHeaders, rewriteAll) {

	if(rewriteAll || $('section.tag-section ul li').length == 0) {
		$('div#places_wrapper').html(allPlaces);
	}
	var counter = 0;
	$('section.tag-section').each(function(){
		$(this).find('ul li').filter(function(){ return $(this).css('display') != 'none';}).each(function() {
			var text = $(this).find('div.place-thumb a h4.place-name').text().toLowerCase();
			(text.indexOf(textToFilter.toLowerCase()) == -1) ? $(this).hide() : $(this).show();         
		});
	});
	if (checkHeaders) {
		checkListHeaders()
	}
	removeHiddenElements();

}

function filterPlaces() {
	$('div#places_wrapper').html(allPlaces);
	$('section.tag-section ul li').hide();
	var counter = 0;
	$('input[name="timeslot"]').each(function() {
		if($(this).is(":checked")) {
			$('section.tag-section ul li[timeslots-data*="'+$(this).attr("value")+'"]').show();
			//$('section.tag-section ul li:not([timeslots-data*="'+$(this).attr("value")+'"])').hide();
			counter++;
		} 
	});
	if (counter == 0 || counter == 4) {
		$('section.tag-section ul li').show();
		$('.timeslots-selector').removeClass('selector-active');
		$('p#no_selection:hidden').show();
		$('p#selection:visible').hide();


	} else if(counter > 0 && counter<4) {
		if(!$('.timeslots-selector').hasClass('selector-active')) {
			$('.timeslots-selector').addClass('selector-active');
		}
			$('p#no_selection:visible').hide();
			$('p#selection:hidden').show();
			$('p#selection span').html(""+counter); 
			removeHiddenElements();

	}
	var searchInput = $('.search-filter p input[name="search"]');
	if (searchInput.val().length > 0) {
		filter(searchInput.val(), false, false);
	}
	checkListHeaders()

}

$(document).ready(function () {

	allPlaces = $('div#places_wrapper').html();

	$('input[name="timeslot"]').change(function () {
		filterPlaces();
	});

	$(".timeslots-status").on('click', function(e) {
		$(this).parent().toggleClass('dropdown-closed');
	});
	
	$('.search-filter p input[name="search"]').each(function() {
		var elem = $(this);
   		// Save current value of element
   		elem.data('oldVal', elem.val());

   		//$('.search-filter p').append('<p>'+ elem.val() +'</p>');
   		// Look for changes in the value
   		elem.on("propertychange keyup input paste", function(event){
      		if (elem.data('oldVal') != elem.val()) {
       			if (elem.data('oldVal').length > elem.val().length) {
       				filterPlaces();
       			}
       			elem.data('oldVal', elem.val());
       			filter(elem.val(), true, false);
   			}
		});
   	});
})