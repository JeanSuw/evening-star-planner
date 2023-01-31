// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var today = dayjs();
$('#currentDay').text(today.format('MMM D, YYYY'));

//$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  


  // TODO: Add code to display the current date in the header of the page.

//});

// When the user click save button, it should save in 
var saveBtn = $(".saveBtn");
saveBtn.on("click", function ()
  {
    var eventPlan, eventTime;
    eventPlan = $(this).siblings(".description").val();
    eventTime = $(this).siblings(".hour").text();
    localStorage.setItem(eventTime, eventPlan);
  }
);

// Helper method for changeColor
function switchToNumber(){
  var currentTimeID = $(this).attr("id");
  switch (currentTimeID) {
    case 'hour-9':
      return 9;
    case 'hour-10':
      return 10;
    case 'hour-11':
      return 11;
    case 'hour-12':
      return 12;
    case 'hour-13':
      return 13;
    case 'hour-14':
      return 14;
    case 'hour-15':
      return 15;
    case 'hour-16':
      return 16;
    case 'hour-17':
      return 17;
    default:
      return -1;
  }
}

// helper method for changeColor ()
function isBeforeWorkHour(){
  var todayHour = today.hour();
  if (todayHour >= 0 && todayHour < 9){
    return true;
  }
}

// Change color to determine if the blocks are past, present or future
function changeColor (){
  var todayHour = today.hour();
  $(".time-block").each(function() {
    var hourInTimeBlock = switchToNumber();

    if (hourInTimeBlock > todayHour || isBeforeWorkHour()){
      $(this).removeClass("present");
      $(this).removeClass("past");
      $(this).addClass("future");
      
    }else if (hourInTimeBlock === todayHour){
      $(this).removeClass("past");
      $(this).removeClass("future");
      $(this).addClass("present");
    }else{
      $(this).removeClass("future");
      $(this).removeClass("present");
      $(this).addClass("past");
    }
  })
};

// Display updated events when the user change
function keepPlans(){
  $(".hour").each(function() {
    var currentHour = $(this).text();
    var getCurrentPlan = localStorage.getItem(currentHour);
    if (getCurrentPlan !== null){
      $(this).siblings(".description").val(getCurrentPlan);
    }
  });
}

changeColor();
keepPlans();