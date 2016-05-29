// Code for the main app page (locations list).

// Initialize the location list HTML output.
var outputRef = document.getElementById("locationList");
var listHTML = "";

// Loops through each stored location and place it as a list in the HTML page, 
// and find the weather information for that location.
 for (var i = 0; i < locationsObject.length(); i++)
	{
		locationsObject.getWeatherAtIndexForDate(i, date, updateLocationList);
		listHTML+= '<li class="mdl-list__item mdl-list__item--two-line" id="location' + i + '"' + '>'
		listHTML+= '<span class="mdl-list__item-primary-content" onclick="viewLocation(' + i + ')"' + '>'
		listHTML+= '<img class="mdl-list__item-icon" id="iconLocation' + i + '" src="images/loading.png" class="list-avatar" />'
		listHTML+= '<span>' + locationsObject.locationAtIndex(i).nickname + '</span>'
		listHTML+= '<span id="weather' + i + '"class="mdl-list__item-sub-title"> Loading </span>';
		listHTML+= '</span>'
		listHTML+= '</li>'
		saveLocations()
	}
outputRef.innerHTML = listHTML;


// Callback function to retrieve the weather condition of the locations.
function updateLocationList(locationIndex, weatherObject)
	{
		var listHTML = document.getElementById('weather'+locationIndex);
		var iconHTML = document.getElementById('iconLocation'+locationIndex);
		listHTML.innerHTML = "Min: " + weatherObject.daily.data[0].apparentTemperatureMin + "\xB0C , Max : " + weatherObject.daily.data[0].apparentTemperatureMax + "\xB0C </span>";
		iconHTML.src = "images/" + weatherObject.daily.data[0].icon + ".png";
	}

// Views the selected location.
function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
}
