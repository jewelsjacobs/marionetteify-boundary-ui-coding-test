var Marionette = require('backbone.marionette');
var tpl = require('./chart.hbs');
var BarChart = require('./barChart');
var PieChart = require('./pieChart');
var $ = require('jquery');
var chartToggleState = true;

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
        button: '#format'
    },

    /** events */
    events: {
        'click @ui.button': 'clickedButton'
    },

    clickedButton: function() {
        chartToggleState = !chartToggleState;

        var active = this.collection.getActive().length;
        var total = this.collection.length;
        var completedCount = total - active;

        if (chartToggleState) {
            PieChart(
                total,
                active,
                completedCount
            );
        } else {
            BarChart(
                total,
                active,
                completedCount
            );
        }
    },

    /** collectionEvents */
    collectionEvents: {
        'all': 'render'
    },

    /**
     * @desc use onRender only for update after
     * first render / show
     * @func onRender
     */
    onRender: function() {
        var active = this.collection.getActive().length;
        var total = this.collection.length;
        var completedCount = total - active;

        PieChart(
            total,
            active,
            completedCount
        );
    }

});