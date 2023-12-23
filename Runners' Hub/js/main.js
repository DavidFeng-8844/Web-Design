document.addEventListener('DOMContentLoaded', function () {
    function handleFormChange() {
        const getElementValue = (elementId) => {
            const element = document.getElementById(elementId);
            return element ? element.value : '';
        };

        const currentDistance = getElementValue('currentDistance');
        const distanceType = getElementValue('distanceType');
        const personalBest = getElementValue('PersonalBest');
        const personalBestType = getElementValue('personalBestType');
        const plannedDistance = getElementValue('plannedDistance');
        const weeks = getElementValue('weeks');

        const trainingDays = [];
        document.querySelectorAll('.custom-checkbox input[type="checkbox"]:checked').forEach(function (checkbox) {
            trainingDays.push(checkbox.value);
        });

        const formData = {
            currentDistance,
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
                        element.checked = value === true;
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
    let age = $("#age").val();
    let location = $("#demoLocation").val();

    // Check if weeks is a valid number
    if (isNaN(weeks) || weeks <= 0) {
        alert("Please enter a valid number of weeks.");
        return;
    }

    // Process data and generate advanced plan content
    let content = `
    <h2 style="text-align: center; color: #007bff;">Advanced Marathon Training Plan</h2>
    <p><strong>Weeks:</strong> ${weeks}</p>
    <p><strong>Personal Best:</strong> ${personalBest}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Location:</strong> ${location}</p>
    <!-- Include additional plan details here -->
    <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
    `;
    content += '<h2 style="text-align: center; color: #007bff;">Training Plan</h2>';
    content += '<table style="margin: 0 auto; border-collapse: collapse; width: 80%; margin-top: 20px;" border="1">';
    content += '<thead style="background-color: #007bff; color: #fff;"><tr><th style="padding: 10px;">Week</th><th style="padding: 10px;">Day 1</th><th style="padding: 10px;">Day 2</th><th style="padding: 10px;">Day 3</th><th style="padding: 10px;">Day 4</th><th style="padding: 10px;">Day 5</th><th style="padding: 10px;">Day 6</th><th style="padding: 10px;">Day 7</th></tr></thead>';
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

});


