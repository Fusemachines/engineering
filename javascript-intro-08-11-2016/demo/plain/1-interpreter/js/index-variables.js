/**
 * @author Marcellin<mars@fusemachines.com>
 */
(function(){
	'use strict';
 	// variable declaration
 	var periodTimeHolder, ccHolder, period, leftTime, step, min;

 	// variable assignment
 	periodTimeHolder =
 		document.querySelector('div.data-refresh > span.refresh-period');
 	ccHolder = document.querySelector('div.connections > span.connection-count');

 	// every 10 sec, we refresh the data - looking for new/updated connections
 	period = 10000;
 	leftTime = period;

 	// variable assignment
 	step = 1000;
 	min = 0;
 	window.setInterval(function(){

		// change values assigned to a variable
 		leftTime = leftTime - step;
 		periodTimeHolder.textContent = leftTime;

 		if(period <= min ) {
 			// @TODO make data refresh
 			ccHolder.textContent = window.Math.floor(window.Math.random() * 100) + 1;

 			// restart the timer
 			leftTime = period;
 		}

 	}, step);

entity = {
	text: "Mars"
	connections: 1
}
window.setInterval(function(){
  viewer.title = entity.text; // property

  leftTime = updateTime(period, leftTime, step);
  if(leftTime === period) {
		// property
    entity.connections = getRandom(1, 100);
  }
}, step);

})();

// concepts
// - javascript intepreter => browser
// - window vs document
// - strict mode
// - variables
