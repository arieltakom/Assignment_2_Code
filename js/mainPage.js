// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

        function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
}
   
var length = LocationWeatherCache.length() ; //should be constructor
var info, var list = " ";

var date = new Date() ; 
date = date.forecastDateString(); 

var listRef = document.getElementById("list");

for (var i = 0 ; i<length;i++) { 
info = LocationWeatherCache.locationAtIndex(i) ;
var nickname = info.nickname ; 
    
    list += "<li class='mdl-list__item mdl-list__item--two-line' onclick='viewLocation("+(i+1)+");'>";
    list += "<span class='mdl-list__item-primary content'>";
    list += "<img class='mdl-list__item-icon' id='icon"+(i+1)+"' src='images/loading.png' class='list-avatar' />";
    list += "<span id= 'nickname'>"+nickname+"</span>" 
    list += "<span id='weather1" + (i+1)+"' class='mdl-list__item-sub-title'>Min: - , Max : - </span>";
    list+= "</span>";
    list+= "</li>";
    
    //Display the List 
    listRef.innerHTML += list;
    list = ' ';
    
}
//Get weather info
for (var i = 0; i<length,i++){
    LocationWeatherCache.getWeatherAtIndexForDate(i,date,Weather);
}

//Callback
function displayWeather(index,info){
    var min =  info.data[0].temperatureMin ; 
    var max = info.data[0].temperatureMax ; 
    var img = 'images/' + info.data[0].icon + '.png'

var refTemp = document.getElementById('weather'+String(index+1));

refTemp.innerHTML = 'Min:' + min + ', Max: ' + max;
refImg.src = img;
}

