var Marionette = require('backbone.marionette');
var HeaderView = require('./header/header');
var TodosView = require('../todos/collection');
var ChartView = require('./chart/chart');
var FooterView = require('./footer/footer');
var tpl = require('./layout.hbs');

/**
 * @version 1.0.0
 * @description Layout View - Root layout view. Requires the modules
 * {@link module:views/layout/header/header},
 * {@link module:views/todos/collection},
 * {@link module:views/layout/chart/chart},and
 * {@link module:views/layout/footer/footer}
 * @module views/layout/layout
 * @requires module:views/layout/header/header
 * @requires module:views/layout/chart/chart
 * @requires module:views/todos/collection
 * @requires module:views/layout/footer/footer
 * @link {http://marionettejs.com/}
 */
module.exports = Marionette.Layout.extend({

    /** template */
    template: tpl,

    /**
     * @desc UI bindings create cached attributes that
     * point to jQuery selected objects
     */
    ui: {
        app: '#todoapp'
    },

    /** regions */
    regions: {
        header: '#header',
        main: '#main',
        chart: '#chart',
        footer: '#footer'
    },

    /**
     * @func updateFilter
     * @param filter
     */
    updateFilter: function(filter) {
        this.ui.app.attr('class', 'filter-' + filter);
    },

    /**
     * @func onShow
     */
    onShow: function() {
        var options = {collection: this.options.todosCollection};

        this.header.show(new HeaderView(options));
        this.main.show(new TodosView(options));
        this.chart.show(new ChartView(options));
        this.footer.show(new FooterView(options));
    }

});
