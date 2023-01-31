var today = dayjs();
$('#currentDay').text(today.format('MMM D, YYYY'));

// When the user click save button, it should save and store in local storage
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
function switchToNumber(index){
  var currentTimeID = $(".time-block").get(index).id;
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
  var numHour = 0;
  $(".time-block").each(function() {
    
    var hourInTimeBlock = switchToNumber(numHour);
    if (hourInTimeBlock > todayHour ){
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
    numHour++;
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