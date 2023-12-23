document.addEventListener('DOMContentLoaded', function () {
    function handleFormChange() {
        const getElementValue = (elementId) => {
            const element = document.getElementById(elementId);
            return element ? element.value : '';
        };

        const weekDistance = getElementValue('weekDistance');
        const distanceType = getElementValue('distanceType');
        const personalBest = getElementValue('personalBest');
        const personalBestType = getElementValue('personalBestType');
        const plannedDistance = getElementValue('plannedDistance');
        const weeks = getElementValue('weeks');

        const trainingDays = [];    
        document.querySelectorAll('.custom-checkbox input[type="checkbox"]:checked').forEach(function (checkbox) {
            trainingDays.push(checkbox.value);
        });

        const formData = {
            weekDistance,
            distanceType,
            personalBest,
            personalBestType,
            plannedDistance,
            weeks,
            trainingDays,
        };

        localStorage.setItem('runningPlanFormData', JSON.stringify(formData));
    }

    const formElements = document.querySelectorAll('.plan-form input, .plan-form select');
    formElements.forEach(function (element) {
        element.addEventListener('change', handleFormChange);
    });

    function initializeFormData() {
        const storedData = localStorage.getItem('runningPlanFormData');

        if (storedData) {
            const formData = JSON.parse(storedData);

            Object.entries(formData).forEach(([key, value]) => {
                const element = document.getElementById(key);

                if (element) {
                    // Check if the element is an input or select
                    if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
                        element.value = value || '';
                    } else if (element.tagName === 'CHECKBOX') {
                        // Special handling for checkboxes
                        element.checked = value = true;
                    }
                }
            });
        }
    }

    initializeFormData();
});

//Function to close the article
function closeArticle(articleId) {
    let article = document.getElementById(articleId);
    if (article) {
        article.style.display = 'none';
    }
}

//Function for progress bar
document.addEventListener('DOMContentLoaded', function () {
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const scrollPercentage = (scrolled / documentHeight) * 100;

        progressBar.style.width = scrollPercentage + '%';
        progressText.innerHTML = Math.round(scrollPercentage) + '%';

        if (scrollPercentage > 99) {
            progressText.innerHTML = "Completed";
        }
    }
    window.addEventListener('scroll', updateProgressBar);
});

//Get user geographic location
/*
function getLocation() {
    document.getElementById("demoLocation").classList.toggle("d-none");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        document.getElementById("demoLocation").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById("demoLocation").innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}
*/
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



//JQeury
$(document).ready(function () {
    //Update messages
    $('#updateModal').modal('show');

    //Make gears-intro fade out on scroll
    $(window).scroll(function () {
        $(".gears-jumbotron").css("opacity", 1 - $(window).scrollTop() / 500);
    });
    //Make the event container fade out on scroll
    $(window).scroll(function () {
        $(".event-head-container").css("opacity", 1 - $(window).scrollTop() / 500);
    });

    // Add a new icon to vertical navagation bar's button
    let navPlanButton = $('.nav-plan');
    navPlanButton.wrapInner('<span class="button-text"></span>');
    let newIcon = '<img src="images/plan-icon.png" alt="New Icon" class="new-icon">';
    navPlanButton.append(newIcon);

    let progressBar = $('#progress-bar-container');
    let progressBarInner = $('#progress-bar');

    $(document).ajaxStart(function () {
      progressBar.show();
    });

    $(document).ajaxStop(function () {
      progressBar.hide();
    });

    $(window).scroll(function() {
      let scrollPosition = $(document).scrollTop();
      let documentHeight = $(document).height();
      let windowHeight = $(window).height();
      let progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
      progressBarInner.width(progress + '%');
    });

//Generate plan
$("#generatePlan").click(function() {
    // Get user inputs
    let weeks = $("#weeks").val();
    let personalBest = $("#personalBest").val();
    let weekDistance = $("#weekDistance").val();
    //convert weekDistance to km according to the user's choice
    let distanceType = $("#distanceType").val();
    //For the personalBest's inner HTML
    const personalBestSelect = document.getElementById("personalBestType");
    const pbselectedIndex = personalBestSelect.selectedIndex;
    const personalBestType = personalBestSelect.options[pbselectedIndex].innerHTML;
    // For the planDistance's inner HTML
    const plannedDistanceSelect = document.getElementById("plannedDistance");
    const selectedIndex = plannedDistanceSelect.selectedIndex;
    const plannedDistanceType = plannedDistanceSelect.options[selectedIndex].innerHTML;
    //calculate the VO2max
    let vdot = findVDOT(personalBest, personalBestType);

    // Check if weeks is a valid number
    if (isNaN(weeks) || weeks <= 0) {
        alert("Please enter a valid number of weeks.");
        return;
    }

    // Process data and generate advanced plan content
    let content = `
    <body style="background-color: #1393b6; padding: 20px; border-radius: 10px;">
    <h2 style="text-align: center; color: #0a0c0f;">${plannedDistanceType} Training Plan</h2>
    <p><strong>Weeks:</strong> ${weeks}</p>
    <p><strong>Personal Best:</strong> ${personalBest} mins</p>
    <p><strong>VO2max:</strong> ${vdot}</p> 
    <!-- Include additional plan details here -->
    `;
    if (distanceType === "km") {
        content += `
        <p><strong>Current Week Distance:</strong> ${weekDistance} Kilometres</p>
        `;
    } else if (distanceType === "miles") {
        content += `
        <p><strong>Current Week Distance:</strong> ${weekDistance} Miles</p>
        `;
    }
    content += `
    <p><strong>Planned Distance:</strong> ${plannedDistanceType}</p>
    <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
    `;
    content += '<h2 style="text-align: center; color: #0a0c0f;">Training Plan</h2>';
    content += '<table style="margin: 0 auto; border-collapse: collapse; width: 80%; margin-top: 20px;" border="1">';
    content += '<thead style="background-color: #0a0c0f; color: #fff;"><tr><th style="padding: 10px;">Week</th><th style="padding: 10px;">Day 1</th><th style="padding: 10px;">Day 2</th><th style="padding: 10px;">Day 3</th><th style="padding: 10px;">Day 4</th><th style="padding: 10px;">Day 5</th><th style="padding: 10px;">Day 6</th><th style="padding: 10px;">Day 7</th></tr></thead>';
    content += '<tbody>';

    for (let week = 1; week <= weeks; week++) {
        content += `<tr><td>${week}</td>`;
        for (let day = 1; day <= 7; day++) {
            // Generate more advanced plan details based on user input
            let trainingActivity = getTrainingActivity(day);
            content += `<td>${trainingActivity}</td>`;
        }
        content += '</tr>';
    }
    content += '</tbody></table>';
    // The VDOT table Explanation
    content += '<h2 style="text-align: center; color: #0a0c0f;">VDOT Table Explanation</h2>';
    content += '<p style="text-align: justify; color: #0a0c0f;">The VDOT table is used to calculate the training paces for each training activity. The VDOT value is calculated based on the personal best time and the distance of the personal best. The VDOT value is then used to calculate the training paces for each training activity.</p>';

    // The VDOT table
    content += '<h2 style="text-align: center; color: #0a0c0f;">VDOT Table</h2>';
    content += '<table style="margin: 0 auto; border-collapse: collapse; width: 80%; margin-top: 20px;" border="1">';
    content += '<thead style="background-color: #0a0c0f; color: #fff;"><tr><th style="padding: 10px;">VDOT</th><th style="padding: 10px;">5K</th><th style="padding: 10px;">10K</th><th style="padding: 10px;">Half Marathon</th><th style="padding: 10px;">Marathon</th></tr></thead>';
    content += '<tbody>';
    content += '<tr><td>30</td><td>30</td><td>63</td><td>140</td><td>290</td></tr>';
    content += '<tr><td>35</td><td>27</td><td>56</td><td>126</td><td>256</td></tr>';
    content += '<tr><td>40</td><td>24</td><td>77</td><td>110</td><td>229</td></tr>';
    content += '<tr><td>45</td><td>22</td><td>45</td><td>100</td><td>208</td></tr>';
    content += '<tr><td>50</td><td>20</td><td>41</td><td>91</td><td>190</td></tr>';
    content += '<tr><td>55</td><td>18</td><td>38</td><td>84</td><td>176</td></tr>';
    content += '<tr><td>60</td><td>17</td><td>35</td><td>78</td><td>163</td></tr>';
    content += '<tr><td>65</td><td>16</td><td>33</td><td>72</td><td>151</td></tr>';
    content += '<tr><td>70</td><td>15</td><td>31</td><td>68</td><td>141</td></tr>';
    content += '<tr><td>75</td><td>14</td><td>29</td><td>64</td><td>132</td></tr>';
    content += '<tr><td>80</td><td>13</td><td>27</td><td>60</td><td>124</td></tr>';
    content += '<tr><td>85</td><td>12</td><td>26</td><td>57</td><td>117</td></tr>';
    content += '</tbody></table>';
    content += '</body>'

    // Create a new window with the content
    let printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Marathon Training Plan</title></head><body>' + content + '</body></html>');
    printWindow.document.close();   
    // Print the window
    printWindow.print();
});

// Function to get a training activity based on the day of the week
function getTrainingActivity(day) {
    // function to calculate the VO2max based on the personal best
    //getVO2max(personalBest, personalBestType);
    // function to genrate distance depanding on the VO2max
    // customize this function based on your specific training plan
    // returns a placeholder activity
    switch (day) {
        case 1:
            return 'Long Run';
        case 2:
            return 'Speed Workout';
        case 3:
            return 'Rest';
        case 4:
            return 'Tempo Run';
        case 5:
            return 'Hill Training';
        case 6:
            return 'Cross-training';
        case 7:
            return 'Rest';
        default:
            return '';
    }
}
// function to calculate the VO2max based on the personal best
function findVDOT(time, distance) {
    //VDOT data
    const vdotData = [
      [30, 30, 63, 140, 290],
      [35, 27, 56, 126, 256],
      [40, 24, 77, 110, 229],
      [45, 22, 45, 100, 208],
      [50, 20, 41, 91, 190],
      [55, 18, 38, 84, 176],
      [60, 17, 35, 78, 163],
      [65, 16, 33, 72, 151],
      [70, 15, 31, 68, 141],
      [75, 14, 29, 64, 132],
      [80, 13, 27, 60, 124],
      [85, 12, 26, 57, 117]
    ];  

    // Find the index of the distance column
    const distanceIndex = ['5K', '10K', 'Half Marathon', 'Marathon'].indexOf(distance);
  
    // If the distance is not valid, return an error message
    if (distanceIndex === -1) {
      return "Invalid distance";
    }
  
    // Find the row in the VDOT data with the closest time in the specified distance column
    const closestRow = vdotData.reduce((closest, entry) => {
      const entryTime = entry[distanceIndex + 1]; // Adjusting the index to the selected distance column
      const currentDiff = Math.abs(entryTime - time);
      const closestDiff = Math.abs(closest[distanceIndex + 1] - time);
  
      return currentDiff < closestDiff ? entry : closest;
    });
  
    // Return the VDOT value from the closest row
    return closestRow[0];
  }
  
  //const vdotValue = findVDOT(38, '10K');
  //console.log(`VDOT Value: ${vdotValue}`);
  
});


