var Backbone = require('backbone');

/**
 * @version 1.0.0
 * @description Todo Model
 * @link {http://backbonejs.org/}
 * @module todo/models/todo
 */
module.exports = Backbone.Model.extend({

    /** defaults */
    defaults: {
        title: '',
        completed: false,
        created: 0
    },

    /**
     * @func initialize
     */
    initialize: function () {
        if (this.isNew()) {
            this.set('created', Date.now());
        }
    },

    /**
     * @func toggle
     */
    toggle: function () {
        return this.set('completed', !this.isCompleted());
    },

    /**
     * @func isCompleted
     */
    isCompleted: function () {
        return this.get('completed');
    }

});