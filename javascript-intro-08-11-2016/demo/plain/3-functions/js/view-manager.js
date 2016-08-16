/**
 * given a parent object, it updates some of the child element
 * @author Marcellin<mars@fusemachines.com>
 * @Namespace CONNECTIONS
 */
window.CONNECTIONS = window.CONNECTIONS || {};
window.CONNECTIONS.ViewManager =
(function(){
  'use strict';

  // START Object creation
  /**
   * @class ViewManager
   */
  function ViewManager(parent, period, step) {
    // set default values
    if(!parent.querySelector) {
      parent = document;
    }
    if(typeof period !== 'number') {
      parent = 10000;
    }
    if(typeof step !== 'number') {
      step = 1000;
    }

    this.period = period;
    this.step = step;
    this.lastTimeHolder =
    parent.querySelector('div.data-refresh > span.last-refresh');
    this.periodTimeHolder =
    parent.querySelector('div.data-refresh > span.refresh-period');
    this.nextTimeHolder =
    parent.querySelector('div.data-refresh > span.next-refresh');
  }

	/**
	 * @method updateView
	 */
	ViewManager.prototype.updateView = function() {
		var lastRefresh, nextRefresh;
		// compute the last-refresh time
		lastRefresh = Date.now();

		// restart the timer
		this.leftTime = this.period;

		nextRefresh = lastRefresh + this.leftTime;

		// update data in the view
		this.lastTimeHolder.textContent = lastRefresh;
		this.nextTimeHolder.textContent = nextRefresh;
	};
	/**
	 * @method updateLeftTime
	 */
	ViewManager.prototype.updateLeftTime = function() {
		this.leftTime = this.leftTime - this.step;
		this.periodTimeHolder.textContent = this.leftTime;
	};
	/**
	 * @method isLeftTime
	 */
	ViewManager.prototype.isLeftTime = function() {
		return this.leftTime > 0;
	};

  // END object creation
	return ViewManager;
})();
