var url;

function createMarkers(callback) {
	var my_json_str = php_params.my_arr.replace(/&quot;/g, '"');
	var my_php_arr = jQuery.parseJSON(my_json_str);	
	url = php_params.link_plugin.replace(/&quot;/g, '"');

	callback(my_php_arr);

}

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}       

function initialize(markers) {

 var latlng = new google.maps.LatLng('38.7281', '-9.1607');
 
 var mapOptions = {
   zoom: 12,
   center: latlng,
   mapTypeId: google.maps.MapTypeId.ROADMAP,
   styles: [{featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]/**/},{featureType:"administrative.locality",stylers:[{visibility:"off"}]},{featureType:"administrative.neighborhood",stylers:[{visibility:"on"}]/**/},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:-25},{saturation:-97}]}]

 };

 var map = new google.maps.Map(document.getElementById('map'),
   mapOptions);

 var infowindowlayout = new google.maps.InfoWindow({
  content: ''
});

 $.each(markers, function(key, value) {
   var placelatlng = new google.maps.LatLng(value['lat'], value['lng']);


   var marker = new RichMarker({
     position: placelatlng,
     map: map,
     draggable: false,
     flat: true,
     content: '<div style="margin-top:25px; display:block;"><span class="place-number">'+value['number']+'</span></div>'
   });

   var infoWindowContent = '<div class="custom-info-window"><span class="place-number">'+value['number']+'</span><a class="info-window-url" href="'+value['url']+'"><h3 class="info-window-title">'+value['title']+'</h3></a></div>';
   

   google.maps.event.addListener(marker, 'click', function() {
    infowindowlayout.setContent(infoWindowContent);
    infowindowlayout.open(map, this);
  });

   if (value['number'] == getUrlParameter('q')) {
      infowindowlayout.setContent(infoWindowContent);
      infowindowlayout.open(map, marker);
      map.setZoom(15);
      map.setCenter(marker.position);
   };

 });

}
