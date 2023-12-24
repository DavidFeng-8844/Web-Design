//Use HTML storage to store the planning form info   
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
        console.log(trainingDays);

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
        //The Traning days
        const trainingDays = [];
        document.querySelectorAll('.custom-checkbox input[type="checkbox"]:checked').forEach(function (checkbox) {
            trainingDays.push(checkbox.value);
        });
        //calculate the VO2max
        let vdot = findVDOT(personalBest, personalBestType);
        //calculate the pace
        let mPace = getPace(vdot, 'Marathon');
        let tPace = getPace(vdot, 'Threshold');
        let iPace = getPace(vdot, 'Interval');
        let rPace = getPace(vdot, 'Repeat');
        let ePace = getPace(vdot, 'Easy');

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
        <p><strong>Training Days:</strong> ${trainingDays.join(', ')}</p>
        <p><strong>Personal Best:</strong> ${personalBest} mins for ${personalBestType}</p>
        <p><strong>Your VO2max:</strong> ${vdot}</p>
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
        //The pace table
        content += '<h2 style="text-align: center; color: #0a0c0f;">Your Personal Pace Table</h2>';
        content += '<table style="margin: 0 auto; border-collapse: collapse; width: 80%; margin-top: 20px;" border="1">';
        content += '<thead style="background-color: #0a0c0f; color: #fff;"><tr><th style="padding: 10px;">Training Type</th><th style="padding: 10px;">Pace(min/km)</th></tr></thead>';
        content += '<tbody>';
        content += `<tr><td>Marathon Pace</td><td>${mPace}</td></tr>`;
        content += `<tr><td>Threshold</td><td>${tPace}</td></tr>`;
        content += `<tr><td>Interval</td><td>${iPace}</td></tr>`;
        content += `<tr><td>Repeat</td><td>${rPace}</td></tr>`;
        content += `<tr><td>Easy</td><td>${ePace}</td></tr>`;
        content += '</tbody></table>';
        //Plan table body
        content += '<h2 style="text-align: center; color: #0a0c0f;">Training Plan</h2>';
        content += '<table style="margin: 0 auto; border-collapse: collapse; width: 80%; margin-top: 20px;" border="1">';
        content += '<thead style="background-color: #0a0c0f; color: #fff;"><tr><th style="padding: 10px;">Week</th><th style="padding: 10px;">Day 1</th><th style="padding: 10px;">Day 2</th><th style="padding: 10px;">Day 3</th><th style="padding: 10px;">Day 4</th><th style="padding: 10px;">Day 5</th><th style="padding: 10px;">Day 6</th><th style="padding: 10px;">Day 7</th></tr></thead>';
        content += '<tbody>';
        for (let week = 1; week <= weeks; week++) {
            content += `<tr><td>${week}</td>`;
            for (let day = 1; day <= 7; day++) {
                // Generate more advanced plan details based on user input
                let trainingActivity = getTrainingActivity(day, trainingDays, weekDistance);
                content += `<td>${trainingActivity}</td>`;
            }
            content += '</tr>';
        }
        content += '</tbody></table>';
        // The VDOT table Explanation
        content += '<h2 style="text-align: center; color: #0a0c0f;">VDOT Table Explanation</h2>';
        content += '<p style="text-align: justify; color: #0a0c0f;">The VDOT table is used to calculate the training paces for each training activity. </p>';

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

        //The VDOT Pace Table Explanation
        content += '<h2 style="text-align: center; color: #0a0c0f;">VDOT Pace Table Explanation</h2>';
        content += '<p style="text-align: justify; color: #0a0c0f;">The VDOT Pace table is used to calculate the training paces for each training activity. The VDOT value is calculated based on the personal best time and the distance of the personal best. The VDOT value is then used to calculate the training paces for each training activity.</p>';

        // The VDOT Pace table align the item to the center
        content += '<h2 style="text-align: center; color: #0a0c0f;">VDOT Pace Table</h2>';
        content += '<table style="margin: 0 auto; border-collapse: collapse; width: 80%; margin-top: 20px;" border="1">';
        content += '<thead style="background-color: #0a0c0f; color: #fff;"><tr><th style="padding: 10px;">VDOT</th><th style="padding: 10px;">Easy</th><th style="padding: 10px;">Marathon</th><th style="padding: 10px;">Threshold</th><th style="padding: 10px;">Interval</th><th style="padding: 10px;">Repeat</th></tr></thead>';
        content += '<tbody>';
        content += '<tr><td>30</td><td>7:27</td><td>7:03</td><td>6:24</td><td>5:45</td><td>5:06</td></tr>';
        content += '<tr><td>35</td><td>6:36</td><td>6:15</td><td>5:39</td><td>5:03</td><td>4:27</td></tr>';
        content += '<tr><td>40</td><td>5:56</td><td>5:37</td><td>5:04</td><td>4:31</td><td>3:58</td></tr>';
        content += '<tr><td>45</td><td>5:23</td><td>5:06</td><td>4:36</td><td>4:06</td><td>3:37</td></tr>';
        content += '<tr><td>50</td><td>4:56</td><td>4:41</td><td>4:13</td><td>3:45</td><td>3:17</td></tr>';
        content += '<tr><td>55</td><td>4:33</td><td>4:19</td><td>3:54</td><td>3:29</td><td>3:04</td></tr>';
        content += '<tr><td>60</td><td>4:13</td><td>4:00</td><td>3:37</td><td>3:14</td><td>2:51</td></tr>';
        content += '<tr><td>65</td><td>4:00</td><td>3:48</td><td>3:26</td><td>3:04</td><td>2:42</td></tr>';
        content += '<tr><td>70</td><td>3:48</td><td>3:37</td><td>3:16</td><td>2:55</td><td>2:34</td></tr>';
        content += '<tr><td>75</td><td>3:38</td><td>3:27</td><td>3:07</td><td>2:46</td><td>2:27</td></tr>';
        content += '<tr><td>80</td><td>3:30</td><td>3:18</td><td>2:59</td><td>2:39</td><td>2:20</td></tr>';
        content += '<tr><td>85</td><td>3:23</td><td>3:11</td><td>2:52</td><td>2:33</td><td>2:14</td></tr>';
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
    //Function to get th Pace from the vo2max and the training type
    function getPace(vdot, trainingType) {
        const vdotValues = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
        const trainingTypes = ['Easy', 'Marathon', 'Threshold', 'Interval', 'Repeat'];

        // Find the index of the VDOT value and Training type
        const vdotIndex = vdotValues.indexOf(vdot);
        const trainingTypeIndex = trainingTypes.indexOf(trainingType);

        // If the VDOT value or Training type is not valid, return an error message
        if (vdotIndex === -1 || trainingTypeIndex === -1) {
          return "Invalid VDOT value or Training type";
        }

        // Pace table with corresponding values
        const paceTable = [
          [ '7:27', '7:03', '6:24', '5:45', '5:06', '4:27' ],
          [ '6:36', '6:15', '5:39', '5:03', '4:27', '3:51' ],
          [ '5:56', '5:37', '5:04', '4:31', '3:58', '3:25' ],
          [ '5:23', '5:06', '4:36', '4:06', '3:37', '3:08' ],
          [ '4:56', '4:41', '4:13', '3:45', '3:17', '2:49' ],
          [ '4:33', '4:19', '3:54', '3:29', '3:04', '2:39' ],
          [ '4:13', '4:00', '3:37', '3:14', '2:51', '2:28' ],
          [ '4:00', '3:48', '3:26', '3:04', '2:42', '2:20' ],
          [ '3:48', '3:37', '3:16', '2:55', '2:34', '2:13' ],
          [ '3:38', '3:27', '3:07', '2:46', '2:27', '2:07' ],
          [ '3:30', '3:18', '2:59', '2:39', '2:20', '2:01' ],
          [ '3:23', '3:11', '2:52', '2:33', '2:14', '1:56' ]
        ];

        // Return the pace based on the VDOT value and Training type
        return paceTable[vdotIndex][trainingTypeIndex];
    }

    // Sample test
    /*
    const vdotValue = 55;
    const trainingType = 'Interval';
    const pace = getPace(vdotValue, trainingType);
    console.log(`Pace for VDOT ${vdotValue} and ${trainingType}: ${pace}`);
    */

    //Functions to generate the plan
    function getDayOfWeek(day) {
      const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      const index = (day - 1 + daysOfWeek.length) % daysOfWeek.length;
      return daysOfWeek[index];
    }

    function getTrainingType(dayOfWeek) {
      //Determine the training type based on the day of the week
      const trainingTypes = ['Marathon', 'Threshold', 'Interval', 'Easy'];
      const index = Math.floor(trainingTypes.length * (dayOfWeek.charCodeAt(0) % 4) / 4);
      return trainingTypes[index];
    }

    //Function to get the training activity
    function getTrainingDistance(weekDistance, vdotValue, trainingType) {
        // Define base distances and set factors
        const baseDistances = {
          Marathon: 20,
          Easy: 15,
          Threshold: 9,
          Tempo: 1.6,
          Interval: 0.8,
          Repeat: 0.6,
        };
    
        const baseSets = {
          Interval: 3,
          Tempo: 6,
          Repeat: 9,
        };
    
        // Determine distance factor based on weekDistance and vdotValue
        let distanceFactor;
        if (weekDistance >= 60) {
          distanceFactor = 1.1;
        } else if (weekDistance >= 40) {
          distanceFactor = 1.0;
        } else {
          distanceFactor = 0.9;
        }
    
        // Use distance factor to calculate distance
        const baseDistance = baseDistances[trainingType];
        const distance = (baseDistance * distanceFactor).toFixed(1);
    
        // Determine set factor based on training type
        const setFactor = baseSets[trainingType] || 1;
    
        // Calculate distance considering sets for applicable training types
        const totalDistance = trainingType === 'Marathon' || trainingType === 'Easy'
          ? distance
          : (distance * setFactor).toFixed(1);
    
        // Round sets to the nearest integer
        const roundedSets = Math.round(setFactor);
    
        return { distance: parseFloat(totalDistance), sets: roundedSets };
    }

    function getTrainingActivity(day, trainingDays, weekDistance) {
        const dayOfWeek = getDayOfWeek(day);

        if (!trainingDays.includes(dayOfWeek)) {
          return "Rest day";
        }
        // Get the VDOT value
        const personalBest = $("#personalBest").val();
        const personalBestSelect = document.getElementById("personalBestType");
        const pbselectedIndex = personalBestSelect.selectedIndex;
        const personalBestType = personalBestSelect.options[pbselectedIndex].innerHTML;
        let vdotValue = findVDOT(personalBest, personalBestType);
        const trainingType = getTrainingType(dayOfWeek);
        const pace = getPace(vdotValue, trainingType);
        const { distance, sets } = getTrainingDistance(weekDistance, vdotValue, trainingType);
        //console.log(`Training distance for ${trainingType}: ${distance} km, Sets: ${sets}`);
        // Return the training activity
        return `${distance} km ${trainingType} (${pace} pace), ${sets} sets`;
    }

    //Function to show the draggable modal window
    document.getElementById('openModalIcon').addEventListener('click', function () {
        $('#draggableModal').modal('show');
    });
    
    // Add an event listener for drag and drop functionality
    let dragged;
    
    document.addEventListener('dragstart', function (event) {
      // store a reference to the dragged element
      dragged = event.target;
      // make it half transparent
      event.target.style.opacity = .5;
    });
    
    document.addEventListener('dragover', function (event) {
      // prevent default to allow drop
      event.preventDefault();
    });
    
    document.addEventListener('drop', function (event) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged element to the top of the list
      if (event.target.className === 'draggable-card') {
        event.target.parentNode.insertBefore(dragged, event.target);
      } else if (event.target.className === 'modal-body') {
        event.target.appendChild(dragged);
      }
    });

    // Function to add an item to the comparison modal
    function addItemToModal(content) {
        let container = document.getElementById('modal-cards-container');
        let newCard = document.createElement('div');
        newCard.className = 'draggable-card';
        newCard.draggable = true;
        newCard.innerHTML = `
        <p>${content}</p>
        <span class="remove-icon" style="position: relative" onclick="removeCard(this)">&#128465;</span>
      `;
        container.appendChild(newCard); 
        saveCardOrder();
      }

    // Function to save the order of cards to localStorage
    function saveCardOrder() {
        let cards = document.querySelectorAll('.draggable-card');
        let order = [];
        cards.forEach(function (card) {
          order.push(card.outerHTML);
        });   
        localStorage.setItem('cardOrder', JSON.stringify(order));
    }

    // Function to load the order of cards from localStorage
    function loadCardOrder() {
        let order = localStorage.getItem('cardOrder');
        if (order) {
          order = JSON.parse(order);
          let container = document.getElementById('modal-cards-container');
          container.innerHTML = order.join('');
        }
    }

    // Add an event listener to the icons to add items to the comparison modal
    let addButtons = document.querySelectorAll('.add-to-comparison');
    addButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        let content = button.getAttribute('shoe-comparsion-content');
        addItemToModal(content);
      });
    });

    document.addEventListener('dragend', function (event) {
      // reset the transparency
      event.target.style.opacity = '';
      // save the order of cards to localStorage
      saveCardOrder();
    });

    // Load the initial order of cards when the page is loaded
    loadCardOrder();
    

    // Add an event listener to the buttons to add content to the comparison modal
    let addButtonTemplates = document.querySelectorAll('.add-to-modal');
    addButtonTemplates.forEach(function (button) {
      button.addEventListener('click', function () {
        let content = button.getAttribute('shoe-comparsion-content');
        addItemToModal(content);
      });
    });
    

    // Function to remove a card from the comparison modal
    window.removeCard = function (element) {
        let card = element.parentNode;
        card.parentNode.removeChild(card);
        // save the order of cards to localStorage
        saveCardOrder();
    };
  

});


