//Function to close the article
function closeArticle(articleId) {
    var article = document.getElementById(articleId);
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

    var progressBar = $('#progress-bar-container');
    var progressBarInner = $('#progress-bar');

    $(document).ajaxStart(function () {
      progressBar.show();
    });

    $(document).ajaxStop(function () {
      progressBar.hide();
    });

    $(window).scroll(function() {
      var scrollPosition = $(document).scrollTop();
      var documentHeight = $(document).height();
      var windowHeight = $(window).height();
      var progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
      progressBarInner.width(progress + '%');
    });

    //Generate plan
    $("#generatePlan").click(function() {
        // Get user inputs
        var weeks = $("#weeks").val();
        var personalBest = $("#personalBest").val();
        var age = $("#age").val();
        var location = $("#location").val();

        // Process data and generate PDF
        var content = `
            <h2>Marathon Training Plan</h2>
            <p>Weeks: ${weeks}</p>
            <p>Personal Best: ${personalBest}</p>
            <p>Age: ${age}</p>
            <p>Location: ${location}</p>
            <!-- Include additional plan details here -->

            <p>Generated on: ${new Date().toLocaleDateString()}</p>
        `;

        // Create a new window with the content
        var printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write('<html><head><title>Marathon Training Plan</title></head><body>' + content + '</body></html>');
        printWindow.document.close();

        // Print the window
        printWindow.print();
    });
});


