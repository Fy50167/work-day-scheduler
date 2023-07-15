// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.






$(function () {

  // Applying event listeners to save buttons.
  var calendarEvents = { // Empty object to save the time block events to.
  };

  var buttons = $('.saveBtn');
  buttons.each(function() {
    $(this).on('click', function() {
      calendarEvents[$(this).parent().attr('id')] = $(this).parent().children().eq(1).val(); // First traverse to the save buttons parent, then go back down to the first child which is the textarea.
      localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
    })
  })



  // Following code for applying time classes.
  $('#currentDay').text(dayjs().format('dddd, MMM DD'));
  var blocks = $('.time-block');
  var currentTime = dayjs().hour();

  blocks.each(function() {
    var blockTime = $(this).children().eq(0).text(); // Get the current time from the block.
    
    if (blockTime.includes('PM')) { // Converting time to int for comparison with current time.
      blockTime = Number(blockTime.slice(0, -2));
      blockTime = blockTime + 12;
      if (blockTime === 24) { // Special case for 12PM since we shouldn't be adding 12 to it.
        blockTime = blockTime - 12;
      };
    } else {
      blockTime = Number(blockTime.slice(0,-2));
    };
    

    if (currentTime - blockTime === 0) { // Performing time comparisons
      $(this).addClass('present');
    } else if (currentTime - blockTime > 0) {
      $(this).addClass('past');
    } else {
      $(this).addClass('future');
    };
  });


  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
