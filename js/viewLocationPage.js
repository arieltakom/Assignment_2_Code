// Code for the View Location page.


// Obtaining the index of the choosen location.
var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 

// Obtain the location from the cache, through the index obtained above.
var selectedLocation = locationsObject.locationAtIndex(locationIndex);

// Set the location name at the Header of the Page.
var locationName = selectedLocation.nickname;
document.getElementById("headerBarTitle").textContent = locationName;

// Display the date of today.
document.getElementById("dateForLocation").innerHTML = "Weather of " + dateInstance.simpleDateString();


// Obtain the coordinates of the location to display on the map.
var locationLat = selectedLocation.latitude;
var locationLng = selectedLocation.longitude;
locationsObject.getWeatherAtIndexForDate(locationIndex, date, displayWeatherInfo);


// Callback function to obtain and display the weather forecast of location.
function displayWeatherInfo(index, weatherObject)
{
	document.getElementById("weatherSummary").innerHTML = "Weather Summary: " + weatherObject.daily.data[0].summary;
    document.getElementById("minTemp").innerHTML = "Minimum Temperature: " + weatherObject.daily.data[0].apparentTemperatureMin + "\xB0C";
    document.getElementById("maxTemp").innerHTML = "Maximum Temperature: " + weatherObject.daily.data[0].apparentTemperatureMax + "\xB0C";
	var humidityPercent = weatherObject.daily.data[0].humidity * 100;
    document.getElementById("humidity").innerHTML = "Humidity: " + humidityPercent + "%";
    document.getElementById("windSpeed").innerHTML = "Wind Speed: " + weatherObject.daily.data[0].windSpeed + "km/h";
}

// Removes the location in-view from storage.
function removeLocation(index)
{
	locationsObject.removeLocationAtIndex(index)
	saveLocations();
	location.href = "index.html";
}

// Function to retrieve the weather info of past dates (when user pulls slider back).
function daySlider(index)
{
    //Set the "loading" message
    document.getElementById("weatherSummary").innerHTML = "Loading...";
    document.getElementById("minTemp").innerHTML = "Loading...";
    document.getElementById("maxTemp").innerHTML = "Loading...";
    document.getElementById("humidity").innerHTML = "Loading...";
    document.getElementById("windSpeed").innerHTML = "Loading...";
    
    //Get the index of the location.
    var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 
    
    //Get the date of today.
    var dateObject = new Date;
    var todayDate = dateObject.simpleDateString();
    
    //Set the date according to the slider.
    dateObject.setDate(dateObject.getDate() +(index-29));
    
    //The date of the chosen day.
    var thisDate = dateObject.simpleDateString();
    document.getElementById("dateForLocation").innerHTML = "Weather of " + dateObject.simpleDateString();
    
    //Obtain the weather details.
    desiredDate = dateObject.forecastDateString();
    locationsObject.getWeatherAtIndexForDate(locationIndex, desiredDate, displayWeatherInfo); 
}

// Initializes the Map of the Location
function initMap() 
{
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 10
	});
	map.setCenter({lat: locationLat, lng: locationLng});
	var infowindow = new google.maps.InfoWindow({
          content: locationName
        });
	var infowindow = new google.maps.InfoWindow({
		content: locationName,
		position: {lat: locationLat, lng: locationLng}
	});
	infowindow.open(map);
}
