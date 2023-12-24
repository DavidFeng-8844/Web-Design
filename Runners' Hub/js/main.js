//Function to close the events article
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

//Function to search for contents
function searchAndNavigate() {
    // Get the search input value
    var searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Get all elements with the class 'class'
    var classElements = document.getElementsByClassName('class');

    // Loop through each class element
    for (var i = 0; i < classElements.length; i++) {
        var classNumber = classElements[i].getAttribute('data-class-number');

        // Check if the class number matches the search term
        if (classNumber && classNumber.includes(searchTerm)) {
            // Scroll to the class element
            classElements[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
            break; // Stop searching after finding the first match
        }
    }
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
});


