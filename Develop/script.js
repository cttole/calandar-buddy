
// current date function
var currentDate = dayjs().format("MMM D, YYYY");
console.log(currentDate);

function addElement() {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newDate = document.createTextNode(currentDate);

  // add the text node to the newly created div
  newDiv.appendChild(newDate);

  // add the newly created element and its content into the DOM
  const currentDayElement = document.getElementById("currentDay");
  currentDayElement.appendChild(newDiv);
}

// Call the addElement function to display the current date
addElement();



//changing color based on the past pres and future

// Get the current time in military time 
var currentTime = dayjs().format("H");

// Function to update the class of time blocks
function updateTimeBlocks() {
  
  var timeBlocks = document.querySelectorAll(".time-block");
  timeBlocks.forEach(function (timeBlock) {
    
    var hour = parseInt(timeBlock.id.split("-")[1]);
    //console.log("hours:" + hour);
    var formattedHour = Number(dayjs().hour(hour).format("H"));
    //console.log("formattedHour:" + formattedHour);

    // Compare the current time with the time of the time block
    if (currentTime > formattedHour) {
      timeBlock.classList.remove("present", "future");
      timeBlock.classList.add("past");
    } else if (currentTime == formattedHour) {
      timeBlock.classList.remove("past", "future");
      timeBlock.classList.add("present");
    } else {
      timeBlock.classList.remove("past", "present");
      timeBlock.classList.add("future");
    }
  });
}
console.log(currentTime)

updateTimeBlocks();

// update the classes every minute to give the current time
setInterval(updateTimeBlocks, 60000);


// function to save the event to local storage
function saveEvent(event) {
  const timeBlock = event.target.parentNode;
  const timeBlockId = timeBlock.id;
  const eventText = timeBlock.querySelector('.description').value;

  if (eventText) {
    localStorage.setItem(timeBlockId, eventText);
    console.log(`Event saved for ${timeBlockId}`);
  } else {
    localStorage.removeItem(timeBlockId);
    console.log(`Event removed for ${timeBlockId}`);
  }
}

// function to load saved events from local storage
function loadEvents() {
  const timeBlocks = document.getElementsByClassName('time-block');

  for (let i = 0; i < timeBlocks.length; i++) {
    const timeBlock = timeBlocks[i];
    const timeBlockId = timeBlock.id;
    const eventText = localStorage.getItem(timeBlockId);

    if (eventText) {
      timeBlock.querySelector('.description').value = eventText;
    }
  }
}

// load saved events when the page loads
window.addEventListener('load', loadEvents);

// Attach click event listener to each save button
const saveButtons = document.getElementsByClassName('saveBtn');
for (let i = 0; i < saveButtons.length; i++) {
  saveButtons[i].addEventListener('click', saveEvent);
}









  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.