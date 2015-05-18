var Marionette = require('backbone.marionette');

var tpl = require('./item.hbs');

/**
 * @version 1.0.0
 * @description Todo List Item View -
 * Display an individual todo item, and respond to changes
 * that are made to the item, including marking completed.
 * @module views/todos/item
 * @link {http://marionettejs.com/}
 */
module.exports = Marionette.ItemView.extend({

    /** tag name */
    tagName: 'li',

    /** template */
    template: tpl,

    /**
     * @desc UI bindings create cached attributes that
     * point to jQuery selected objects
     */
    ui: {
        edit: '.edit'
    },

    /** events */
    events: {
        'click .destroy':       'destroy',
        'click .toggle':        'toggle',
        'dblclick label':       'onEditClick',
        'keydown  @ui.edit':    'onEditKeypress',
        'focusout @ui.edit':    'onEditFocusout'
    },

    /** model events */
    modelEvents: {
        'change': 'render'
    },

    /**
     * @func onRender
     */
    onRender: function () {
        this.$el.removeClass('active completed');

        if (this.model.get('completed')) {
            this.$el.addClass('completed');
        } else {
            this.$el.addClass('active');
        }
    },

    /**
     * @func destroy
     */
    destroy: function () {
        this.model.destroy();
    },

    /**
     * @func toggle
     */
    toggle: function () {
        this.model.toggle().save();
    },

    /**
     * @desc edit click event handler
     * @func onEditClick
     */
    onEditClick: function () {
        this.$el.addClass('editing');
        this.ui.edit.focus();
        this.ui.edit.val(this.ui.edit.val());
    },

    /**
     * @desc edit focus out event handler
     * @func onEditFocusout
     */
    onEditFocusout: function () {
        var todoText = this.ui.edit.val().trim();
        if (todoText) {
            this.model.set('title', todoText).save();
            this.$el.removeClass('editing');
        } else {
            this.destroy();
        }
    },

    /**
     * @desc edit key press event handler
     * @func onEditKeypress
     * @param e - event
     */
    onEditKeypress: function (e) {
        var ENTER_KEY = 13, ESC_KEY = 27;

        if (e.which === ENTER_KEY) {
            this.onEditFocusout();
            return;
        }

        if (e.which === ESC_KEY) {
            this.ui.edit.val(this.model.get('title'));
            this.$el.removeClass('editing');
        }
    }
});

