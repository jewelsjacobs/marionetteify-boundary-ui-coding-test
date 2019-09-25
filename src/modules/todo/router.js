var Marionette = require('backbone.marionette');

/**
 * @version 1.0.0
 * @description Handle routes to show the active vs complete todo items.
 * @module router
 * @link {http://marionettejs.com/}
 */
module.exports = Marionette.AppRouter.extend({

    /**
     * @desc extend AppRouter to tell the controller
     * when the router is ok
     * @constructor
     * @param options
     */
    constructor: function(options) {
        Marionette.AppRouter.prototype.constructor.call(this, options);
        this._getController().triggerMethod('start');
    },

    /** routes */
    appRoutes: {
        '*filter': 'filterItems'
    }

});