
// Returns a date in the format "YYYY-MM-DD".
Date.prototype.simpleDateString = function() {
    function pad(value)
    {
        return ("0" + value).slice(-2);
    }

    var dateString = this.getFullYear() + "-" + 
            pad(this.getMonth() + 1, 2) + '-' + 
            pad(this.getDate(), 2);
    
    return dateString;
}

// Date format required by forecast.io API.
// We always represent a date with a time of midday,
// so our choice of day isn't susceptible to time zone errors.
Date.prototype.forecastDateString = function() {
    return this.simpleDateString() + "T12:00:00";
}


// Date instances created each time the app loads to obtain the weather forecasts
var dateInstance = new Date();

// Initialising the date string format for forecast.io API.
var date = dateInstance.forecastDateString();

// Code for LocationWeatherCache class and other shared code.

// Prefix to use for Local Storage.
var APP_PREFIX = "weatherApp";

// Object containing PDO of LocationWeatherCache().
var locationsObjectPDO;

// Construct the Cache anytime a page is opened.
var locationsObject = new LocationWeatherCache();

// Checks if local storage contains any locations, and loads them.
if (localStorage.getItem(APP_PREFIX) != null)
	{
		loadLocations();
	}


// Constructor for the Cache that contains locations and weather informations, as the methods to manipulate these data.
function LocationWeatherCache()
{
    // Private attributes:

    var locations = [];
    var callbacks = {};
	
    // Public methods:
    
    // Returns the number of locations stored in the cache.
    //
    this.length = function() {
		return locations.length;
    };
    
    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function(index) {
		return locations[index];
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //	
    this.addLocation = function(latitude, longitude, nickname)
    {
		var index = locations.length;
		locations[index] = {
			latitude : latitude,
			longitude : longitude,
			nickname : nickname,
			forecast : {}
		};
    }

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
		locations.splice(index, 1);
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() {
		
		return locations
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
		for (var i = 0; i < locationWeatherCachePDO.length; i++)
		{
			locations[i] = {
				latitude : locationWeatherCachePDO[i].latitude,
				longitude : locationWeatherCachePDO[i].longitude,
				nickname : locationWeatherCachePDO[i].nickname,
				forecast : locationWeatherCachePDO[i].forecast
			};
		}
		
		locationWeatherCachePDO = null;
    };
	
	// API Key from forecast.io, declared as private variable for security reasons.
	var apiKey = "8e90d8f8757cdda014491497c5f4e64f";

    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the 
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the 
    // weather object for that location.
    // 
    this.getWeatherAtIndexForDate = function(index, date, callback) {
		var locationCheck = this.locationAtIndex(index);
		var lat = locationCheck.latitude;
		var lng = locationCheck.longitude;
		var dateLatLong = "" + lat + ',' + lng + ',' + date;
		callbacks[dateLatLong] = callback;
		//locations.forecast[dateLatLong] = callback;
		//console.log(callbacks);
		//console.log("testing gtWeathAtIndex")
	
	// Request weather data through Dark Sky Forecast API using JSONP.
	
		var script = document.createElement('script');
		script.src = 'https://api.forecast.io/forecast/' + apiKey + '/'  + dateLatLong + '?units=ca&exclude=[currently,minutely,hourly]&callback=locationsObject.weatherResponse';
    	document.body.appendChild(script);
		
	};
		
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) {
		var weatherDetails = response;
		console.log(response);
		var dateLatLong = ""+ response.latitude +","+ response.longitude + ","+ date;
		var index = indexForLocation(response.latitude, response.longitude);
		
		callbacks[dateLatLong](index, weatherDetails);
		locations[index].forecast.dateLatLong = response;
    };
	 
    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    {
		var x = -1;
		for (var i = 0; i < locations.length; i++)
			{
				if ((locations[i].latitude == latitude) && (locations[i].longitude == longitude))
					{
						x = i;
					}
			}
		return x
    }
}

// Restore the singleton locationWeatherCache from Local Storage.
function loadLocations()
{
	locationsObjectPDO = JSON.parse(localStorage.getItem(APP_PREFIX));
	locationsObject.initialiseFromPDO(locationsObjectPDO);
}

// Save the singleton locationWeatherCache to Local Storage.
function saveLocations()
{
	localStorage.setItem(APP_PREFIX, JSON.stringify(locationsObject));
}
