function getLocation() {
    document.getElementById("demoLocation").classList.toggle("d-none");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("demoLocation").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

    // Coordinates of the specified cities
    const cities = [
        { name: "Boston", latitude: 42.3601, longitude: -71.0589 },
        { name: "New York", latitude: 40.7128, longitude: -74.0060 },
        { name: "Berlin", latitude: 52.5200, longitude: 13.4050 },
        { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
        { name: "Chicago", latitude: 41.8781, longitude: -87.6298 },
        { name: "London", latitude: 51.5074, longitude: -0.1278 }
    ];

    // Calculate distances
    const distances = cities.map(city => {
        const dLat = deg2rad(city.latitude - userLatitude);
        const dLon = deg2rad(city.longitude - userLongitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(deg2rad(userLatitude)) * Math.cos(deg2rad(city.latitude)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = 6371 * c; // Radius of Earth in kilometers
        return { name: city.name, distance };
    });

    // Find the nearest city
    const nearestCity = distances.reduce((min, current) => (min.distance < current.distance) ? min : current);

    // Coordinates of continents bounding boxes
    const continents = [
        { name: "North America", minLat: 24.396308, maxLat: 71.538800, minLon: -125.000000, maxLon: -66.934570 },
        { name: "Europe", minLat: 36.673900, maxLat: 71.538800, minLon: -25.000000, maxLon: 45.000000 },
        { name: "Asia", minLat: -11.000000, maxLat: 71.538800, minLon: 25.000000, maxLon: 180.000000 },
        // Add more continents as needed
    ];

    // Detect continent
    const detectedContinent = continents.find(continent =>
        userLatitude >= continent.minLat &&
        userLatitude <= continent.maxLat &&
        userLongitude >= continent.minLon &&
        userLongitude <= continent.maxLon
    );

    document.getElementById("demoLocation").innerHTML =
        "Your location:<br>Latitude: " + userLatitude + "<br>Longitude: " + userLongitude + (detectedContinent ? "<br>Continent: " + detectedContinent.name : "<br>Continent not detected") +
        "<br>Nearest Major city Marathon: " + nearestCity.name + " (" + nearestCity.distance.toFixed(2) + " km away)";
}

// Helper function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}