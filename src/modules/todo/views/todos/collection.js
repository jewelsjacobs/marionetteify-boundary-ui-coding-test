var Marionette = require('backbone.marionette');

var TodoItemView = require('./item');
var tpl = require('./collection.hbs');


/**
 * @version 1.0.0
 * @description Item List View - Controls the rendering of the items, including the
 * filtering of active vs completed items for display.
 * Requires the module {@link module:views/todos/item}.
 * @module views/todos/collection
 * @requires module:views/todos/item
 * @link {http://marionettejs.com/}
 */
module.exports = Marionette.CompositeView.extend({

    /** template */
    template: tpl,

    /** itemView */
    itemView: TodoItemView,

    /** itemViewContainer */
    itemViewContainer: '#todo-list',

    /**
     * @desc UI bindings create cached attributes that
     * point to jQuery selected objects
     */
    ui: {
        toggle: '#toggle-all'
    },

    /** click events */
    events: {
        'click @ui.toggle': 'onToggleAllClick'
    },

    /** collection events */
    collectionEvents: {
        'all': 'update'
    },

    /**
     * @desc use onShow rather than onRender because DOM is not ready
     * and this.$el find or parent will return nothing
     * @func onShow
     */
    onShow: function () {
        this.update();
    },

    /**
     * @func update
     */
    update: function () {

        /**
         * @func reduceCompleted
         * @param left
         * @param right
         * @returns {*}
         */
        function reduceCompleted(left, right) {
            return left && right.get('completed');
        }

        var allCompleted = this.collection.reduce(reduceCompleted, true);

        this.ui.toggle.prop('checked', allCompleted);
        this.$el.parent().toggle(!!this.collection.length);
    },

    /**
     * @desc toggle all click event handler
     * @func onToggleAllClick
     * @param e - event
     */
    onToggleAllClick: function (e) {
        var isChecked = e.currentTarget.checked;

        this.collection.each(function (todo) {
            todo.save({ 'completed': isChecked });
        });
    }

});
