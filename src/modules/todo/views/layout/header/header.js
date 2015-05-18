var Marionette = require('backbone.marionette');

var tpl = require('./header.hbs');

/**
 * @version 1.0.0
 * @description Header View
 * @module views/layout/header/header
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
        input: '#new-todo'
    },

    /** events */
    events: {
        'submit form': 'onSubmit'
    },

    /**
     * @desc onSubmit event handler
     * @func onSubmit
     * @param e
     */
    onSubmit: function (e) {
        // prevent form original submit
        e.preventDefault();

        var todoText = this.ui.input.val().trim();
        if (todoText) {
            this.collection.create({
                title: todoText
            });
            this.ui.input.val('');
        }
    }

});