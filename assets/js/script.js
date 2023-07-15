
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



  // Getting current date.
  $('#currentDay').text(dayjs().format('dddd, MMM DD'));
  
  
  // Following variables for applying time classes.
  var blocks = $('.time-block');
  var currentTime = dayjs().hour();
  
  // Following variables for getting local storage.
  var storedEvents = JSON.parse(localStorage.getItem('calendarEvents'));
  var eventsKeys = Object.keys(storedEvents);



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

    if (eventsKeys.includes($(this).attr('id'))) { // Check if the id of block is an existing key in local storage, and if so change textarea value to be equal to value of that key.
      $(this).children().eq(1).val(storedEvents[$(this).attr('id')]);
    };
  
  });
  
});
