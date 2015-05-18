var Marionette = require('backbone.marionette');
var tpl = require('./footer.hbs');

/**
 * @version 1.0.0
 * @description Footer View
 * @module views/layout/footer/footer
 * @link {http://marionettejs.com/}
 */
module.exports = Marionette.ItemView.extend({

    /** template */
    template: tpl,

    /**
     * @desc UI bindings create cached attributes that
     * point to jQuery selected objects
     */
    ui: {
        filters: '#filters a'
    },

    /** events */
    events: {
        'click #clear-completed': 'onClearClick'
    },

    /** collectionEvents */
    collectionEvents: {
        'all': 'render'
    },

    /** templateHelpers */
    templateHelpers: {
        activeCountLabel: (this.activeCount === 1 ? 'item' : 'items') + ' left'
    },

    /**
     * @func serializeData
     * @returns {{activeCount: number, totalCount: *, completedCount: number}}
     */
    serializeData: function () {
        var active = this.collection.getActive().length;
        var total = this.collection.length;

        return {
            activeCount: active,
            totalCount: total,
            completedCount: total - active
        };
    },

    /**
     * @desc use onRender only for update after
     * first render / show
     * @func onRender
     */
    onRender: function() {
        this.update();
    },

    /**
     * @desc use onShow rather than onRender
     * because DOM is not ready
     * and this.$el find or parent will
     * return nothing
     * @func onShow
     */
    onShow: function () {
        this.update();
    },

    /**
     * @desc onClearClick event handler
     * @func onClearClick
     */
    onClearClick: function () {
        var completed = this.collection.getCompleted();
        completed.forEach(function (todo) {
            todo.destroy();
        });
    },

    /**
     * @func update
     */
    update: function() {
        this.$el.parent().toggle(this.collection.length > 0);
    }

});