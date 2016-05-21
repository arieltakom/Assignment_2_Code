
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


// Code for LocationWeatherCache class and other shared code.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";

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
    this.locationAtIndex = function(index) 
    {
    //index = this.length() -1
    //return locations.index
    // Var can u explain to me why this code is like this? Y LIEK DIEZ?
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
   

    this.addLocation = function(latitude, longitude, nickname)
    { 
        var index = locations.length;
        locations[index] = {
            "Latitude" : latitude ,
            "Longitude" : longitude,
            "Nickname" : nickname,
            "Forecast" : ""
            }
        var strLoc = JSON.stringify(locations);
        localStorage.setItem(APP_PREFIX,strLoc);
    }

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
        localStorage.removeItem(APP_PREFIX)
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() {
        var onlyPublicWeather =
        {
            locations : locations ,
            callbacks : callbacks
        };
        return onlyPublicWeather ;
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
        locations = locationWeatherCachePDO.locations;
        callbacks = locationWeatherCachePDO.callbacks;
    };

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
    };
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) {
    };

    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    {
    }
}

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations()
{
}

//SECOND VERSION STARTS HERE
//SECOND VERSION STARTS HERE
//SECOND VERSION STARTS HERE
//SECOND VERSION STARTS HERE
//SECOND VERSION STARTS HERE
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


// Code for LocationWeatherCache class and other shared code.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";

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
    this.locationAtIndex = function(index) 
    {
    //index = this.length() -1
    return locations[index]
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
   

    this.addLocation = function(latitude, longitude, nickname)
    { 
        var index = locations.length;
        locations[index] = {
            "Latitude" : latitude ,
            "Longitude" : longitude,
            "Nickname" : nickname,
            "Forecast" : {}
            }
        locations.push(nickname)
        return locations.indexOf(nickname)
        
    }

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
        locations.splice(index, 1) ;
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() {
        var onlyPublicWeather =
        {
            locations : locations ,
            callbacks : callbacks
        };
        return onlyPublicWeather ;
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
       var parseLoc = JSON.parse(locationWeatherCachePDO) ;
        for(i=0;i<parseLoc.length;i++) { 
        locations.push(parseLoc[i])
        }
        return locations ;
    };

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
     
        // forecasts property value should be the daily weather forecast object returned by forecast.io  of the form “{lat},{lng},{date}”
        forecastsProperty =  String(locations[index].latitude) + "," + String(locations[index].longitude) + "," + date.prototype.simpleDateString ; //ok when they say JS Date instance do they mean normal just date or do i convert it to the required format for Forecast.io? 
        if (locations[index].forecasts.hasOwnProperty(forecastsProperty)) //hasOwnProperty can be used to determine whether an object has the specified property(defined in the brackets), in this case forecastsProperty is the Property we are looking for. 
            //Checking if the property is already stored in the array
         {
             
           callback(index,locations[index].forecasts[weatherObject]);
            
         }
        else //get data from forecast.io using JSONP query string
         {
             var script = document.createElement("script");
             //https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE,TIME
             //LATITUDE,LONGITUDE,TIME is the same format as weatherObject
             //exclude minutely,hourly and currently
             //set callback to weatherResponse function 
             script.src = "https://api.forecast.io/forecast/a1245f6ea0f0edeb3d460a4ed49cadd6/" + forecastsProperty + "?exclude=[currently,minutely,hourly]&callback=LocationWeatherCache.weatherResponse" ;
             document.body.appendChild(script);   
         }
        
        //saving the callback
        if (callbacks.hasOwnProperty(callbacks.name) !== true ) 
        {
            callbacks[forecastsProperty] = callback; 
        }
       };
            
            
        
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) {
    };

    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    var x = -1 ; 
    { for (var j =0;j<locations.length;j++) {
        if (latitude = locations.latitude[j]) && (longitude == locations.longitude[i])
        {
        x = j ;
        }
       return x     
    }
    }
}

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
 localStorage.getItem(APP_PREFIX)
LocationWeatherCache.initialiseFromPDO(localStorage[APP_PREFIX]);
    
}


// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations()
{
if(typeof(Storage) !== "undefined") {
   var strLoc = LocationWeatherCache.toJSON() ;
    localStorage.setItem(APP_PREFIX,strLoc) ;
} else {
    alert("Sorry, Local Storage is not supported by your browser")
}
}
