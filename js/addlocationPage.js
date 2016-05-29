// Code for the Add Location page.
var timer, map, geocoder, infowindow, marker, lat, lng, formattedAddress;

// Initializing the map object on map DOM.
initMap();

// Search for the map location based on address in user input
function searchAddress()
{
	if (document.getElementById("inputAddress").value != "")
		{
			if ((infowindow != null) || (marker != null))
			{
				marker.setMap(null);
				infowindow.close();	
			}
			
			geocoder = new google.maps.Geocoder();
			geocodeAddress(geocoder, map);
		}
}

// Creates a new map object instance.
function initMap() 
{
	map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8
  });
}

// Finds the location of the address provided by user and shows it on the map.
function geocodeAddress(geocoder, resultsMap) 
{
  var address = document.getElementById("inputAddress").value;
  geocoder.geocode({'address': address}, function(results, status) 
	{
	  if (status === google.maps.GeocoderStatus.OK) 
	  {
		  resultsMap.setCenter(results[0].geometry.location);
		  infowindow = new google.maps.InfoWindow({
			  content: results[0].formatted_address
		  });
		  marker = new google.maps.Marker({
			  map: resultsMap,
			  position: results[0].geometry.location
		  });
		  infowindow.open(map, marker);
		  lat = results[0].geometry.location.lat();
		  lng = results[0].geometry.location.lng();
		  formattedAddress = results[0].formatted_address;
	  }
	  
	  // Alerts the user if address provided does not correspond to any location on Earth.
	  else if (status === google.maps.GeocoderStatus.ZERO_RESULTS)
		  {
			  alert("No results found. Continue typing your address or enter a new one. \n \n Click OK to continue.")
		  }
  	});
}

// Saves the location provided by user, along with nickname (if any) into local storage.
function saveLocationToStorage()
{
	var nickname = document.getElementById("inputLabel").value;
	var temp = document.getElementById("inputAddress").value;
	if ((lat == null) || (lng == null) || (temp == ""))
	{
		alert("Error: No address provided \n \nPlease provide the correct address. \n \nClick OK to continue.")
	}
	else if (nickname == "")
	{
		locationsObject.addLocation(lat, lng, formattedAddress);
		saveLocations();
		location.href = "index.html"
	}
	else 
	{
		locationsObject.addLocation(lat, lng, nickname);
		saveLocations();
		location.href = "index.html"
	}
}
