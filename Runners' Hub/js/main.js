function generateTrainingPlan() {
    // Retrieve form data
    const name = document.getElementById('userName').value;
    const month = document.getElementById('planMonth').value;
    const year = document.getElementById('planYear').value;
    // Test print the data in the console 
    console.log(name, month, year);
    
    // Create a new jsPDF instance  
    const doc = new jsPDF();

    // Set the document title
    doc.setFontSize(18);
    doc.text(`Training Plan - ${name}`, 20, 20);

    // Set the month and year
    doc.setFontSize(14);
    doc.text(`${getMonthName(month)} ${year}`, 20, 30);

    // Set the table headers
    const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    doc.autoTable({
        startY: 40,
        head: [headers],
    });

    // Set the start day of the month and the number of days
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    // Initialize variables for tracking the current day and week
    let currentDay = 1;
    let currentWeek = 1;

    // Set the initial position for the first day
    let xPosition = 20 + (firstDay * 20);
    let yPosition = 60;

    // Loop through each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
        // Add the day to the table
        doc.autoTableText(i.toString(), xPosition, yPosition);
    
        // Move to the next day and update the position
        xPosition += 20;
        currentDay++;
    
        // Check if the next day is in a new week
        if (currentDay > 7) {
            // Reset the day and update the position for the new week
            currentDay = 1;
            currentWeek++;
            xPosition = 20;
            yPosition += 10;
        }
    }

    // Save the PDF or open it in a new tab
    doc.save('training_plan.pdf');
}

function getMonthName(month) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
}



$(document).ready(function () {

    //Make gears-intro fade out on scroll
    $(window).scroll(function () {
        $(".gears-intro").css("opacity", 1 - $(window).scrollTop() / 500);
    });

    // Add a new icon to vertical navagation bar's button
    let navPlanButton = $('.nav-plan');
    navPlanButton.wrapInner('<span class="button-text"></span>');
    let newIcon = '<img src="images/plan-icon.png" alt="New Icon" class="new-icon">';
    navPlanButton.append(newIcon);
    
});


