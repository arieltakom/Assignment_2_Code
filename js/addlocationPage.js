// Code for the Add Location page.
var map, geocoder;
location = new LocationWeatherCache()

function searchAddress()
{
	if (document.getElementById("inputAddress").value != "")
		{
			initMap();
			geocoder = new google.maps.Geocoder();
			geocodeAddress(geocoder, map);
		}
}

function initMap() 
{
	map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  
}

function geocodeAddress(geocoder, resultsMap) 
{
  var address = document.getElementById("inputAddress").value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function saveLocation()
{
	location.addLocation()
}
