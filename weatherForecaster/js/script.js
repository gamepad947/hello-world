$(document).ready(function () {

	var location = document.getElementById('location'),
		success = false; // no condition has been displayed yet

	// Get geolocation
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			console.log('No location detected');
		}
	};

	function showPosition(position) {
		// Call Dark Sky API for current location position
		$.ajax({
			// Input current geolocation coords into API endpoint
			url: 'https://api.darksky.net/forecast/1b61864e4ceed121fb77c58ebbc10d8c/' + position.coords.latitude + ',' + position.coords.longitude,
			// Use jsonp 
			dataType: 'jsonp',
			success: function (response) {
				console.log('responded', response);
				// Print current location
				location.innerHTML = 'Location: ' + response.timezone;

				var summary = document.getElementById('summary'),
					temperature = document.getElementById('temperature');

				// Print weather summary and temperature rounded to nearest integer
				summary.innerHTML = '<p>' + response.currently.icon + '</p>';
				temperature.innerHTML = '<p>' + Number(response.currently.temperature).toFixed(0) + '&#176;F</p>';

				// Weather conditions - clear-day, clear-night, rain, snow, sleet,
				// wind, fog, cloudy, partly-cloudy-day, partly-cloudy-night
				var condition = response.currently.icon,
					weatherIcon = document.getElementById('weatherIcon');


				// Execute function that displays corresponding weather icon
				displayIcon(condition);

				// Allows toggling between Celsius/Fahrenheit
				success = true;
			}
		});
	}

	function displayIcon(condition) {
		// Switch statements for each weather condition
		// Each case displays different SVG weather icon
		switch (condition) {
			case 'clear-day':
				$('#weatherIcon i').addClass('wi-day-sunny');
				break;
			case 'clear-night':
				$('#weatherImage').addClass('wi-night-clear');
				break;
			case 'rain':
				$('#weatherImage').addClass('wi-rain');
				break;
			case 'snow':
				$('#weatherImage').addClass('wi-snow');
				break;
			case 'sleet':
				$('#weatherImage').addClass('wi-sleet');
				break;
			case 'wind':
				$('#weatherImage').addClass('wi-windy');
				break;
			case 'fog':
				$('#weatherImage').addClass('wi-fog');
				break;
			case 'cloudy':
				$('#weatherImage').addClass('wi-cloudy');
				break;
			case 'partly-cloudy-day':
				$('#weatherImage').addClass('wi-day-cloudy');
				break;
			case 'partly-cloudy-night':
				$('#weatherImage').addClass('wi-night-alt-cloudy');
				break;
		}
	}

	// Function to convert temperature to Celsius
	function changeToC() {
		// get numbers from temperature div
		var currTempF = $('#temperature').text().match(/\d+/),
			tempC = (currTempF - 32) / 1.8,
			updateTemp = document.getElementById('temperature');

		//console.log(tempC);
		// Round temperature to 0 decimal places
		tempC = Number(tempC).toFixed(0);
		// Print temp in Celsius
		updateTemp.innerHTML = '<p>' + tempC + '&#176;C</p>';
	}

	// Function to convert temperature to Fahrenheit
	function changeToF() {
		// get numbers from temperature div
		var currTempC = $('#temperature').text().match(/\d+/),
			tempF = (currTempC * 1.8) + 32,
			updateTemp = document.getElementById('temperature');

		//console.log(tempF);
		// Round temperature to 0 decimal places
		tempF = Number(tempF).toFixed(0);
		// Print temp in Fahrenheit
		updateTemp.innerHTML = '<p>' + tempF + '&#176;F</p>';
	}

	// Button toggles Celsius/Fahrenheit
	$('#tempBtn').on('click', function () {
		if (success === true) {
			if ($('#temperature').hasClass('fahrenheit')) {
				// change to Celsius
				$('#temperature').removeClass('fahrenheit').addClass('celsius');
				changeToC();
			} else {
				// change to Fahrenheit
				$('#temperature').removeClass('celsius').addClass('fahrenheit');
				changeToF();
			}
		} else {
			console.log('No weather condition detected');
		}
	});

	// Run function
	getLocation();
});
