
/**
 * main body
 * @closure index
 */
(function(app){
	'use strict';
	var period, step, entity, view;
	// every 10 sec, we refresh the data - looking for new/updated connections
	period = 10000;
	step = 1000;

	debugger;
	if (!app) {
		throw new window.Error('application is not defined');
	}
	if (!app.ViewManager) {
		throw new window.Error('ViewManager function is required');
	}
	
	entity = document.querySelector('div.entity-1');
	view = new app.ViewManager(entity, period, step);
	view.updateView();

	window.setInterval(function(){

		view.updateLeftTime();

		if( !view.isLeftTime() ) {
			view.updateView();
		}

	}, view.step);

})(window.CONNECTIONS || {});

// concepts
// - function declaration
// - function expression
// - Constructor
// - methods
