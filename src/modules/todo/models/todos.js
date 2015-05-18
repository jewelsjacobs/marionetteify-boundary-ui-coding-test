var Backbone = require('backbone');
Backbone.LocalStorage = require("backbone.localstorage");

var TodoModel = require('./todo');


/**
 * TodoListCollection
 * @version 1.0.0
 * @description Todo Collection - requires the module {@link module:todo/models/todo}
 * @module todo/models/todos
 * @link {http://backbonejs.org/}
 * @link {http://documentup.com/jeromegn/backbone.localStorage}
 * @requires module:todo/models/todo
 */
module.exports = Backbone.Collection.extend({

    /** Todo Model */
    model: TodoModel,

    /** localStorage */
    localStorage: new Backbone.LocalStorage('todos-backbone-marionette-browserify'),

    /**
     * @func getCompleted
     * @returns {*}
     */
    getCompleted: function () {
        return this.filter(this._isCompleted);
    },

    /**
     * @func getActive
     * @returns {*}
     */
    getActive: function () {
        return this.reject(this._isCompleted);
    },

    /**
     * @func comparator
     * @param todo
     * @returns {*}
     */
    comparator: function (todo) {
        return todo.get('created');
    },

    /**
     * @func _isCompleted
     * @param todo
     * @returns {*}
     * @private
     */
    _isCompleted: function (todo) {
        return todo.isCompleted();
    }

});