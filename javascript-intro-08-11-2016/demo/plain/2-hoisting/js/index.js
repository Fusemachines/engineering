/**
 * @author Marcellin<mars@fusemachines.com>
 */
(function(){
	'use strict';
	var entityList, len, period, step;

	entityList = [{
		parent: document.querySelector('div.entity-1'),
		refreshInterval: null
	}, {
		parent: document.querySelector('div.entity-2'),
		refreshInterval: null
	}, {
		parent: document.querySelector('div.entity-3'),
		refreshInterval: null
	}];

	// every 10 sec, we refresh the data - looking for new/updated connections
	period = 10000;
	step = 1000;
	len = entityList.length;
	for(var i = 0; i < len; i++) {

		(function(entity, period, step){
			var periodTimeHolder, ccHolder;
			periodTimeHolder =
			entity.parent.querySelector('div.data-refresh > span.refresh-period');
			ccHolder = entity.parent.querySelector('div.connections > span.connection-count');

			entity.refreshInterval =
			window.setInterval(function(){

				period = period - step;
				periodTimeHolder.textContent = (period/step) + 'secs';

				if(period <= 0 ) {
					// @TODO refresh the data
					ccHolder.textContent = window.Math.floor(window.Math.random() * 100) + 1;
					// restart the timer
					period = 10000;
				}

			}, step);

		})(entityList[i], period, step);

	}
})();

// concepts
// - scope
// - hoisting
// - closure
// - pass by value vs pass by reference
// - data types
// - concatenation
