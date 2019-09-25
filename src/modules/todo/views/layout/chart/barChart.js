var d3 = require('d3');
require('nvd3');

module.exports = function(all, active, completed) {

    (function (all, active, completed) {
        function barData() {
            return [
                {
                    key: "Todo Tasks",
                    values: [
                        {
                            "label": "All",
                            "value": all
                        },
                        {
                            "label": "Active",
                            "value": active
                        },
                        {
                            "label": "Completed",
                            "value": completed
                        }
                    ]
                }
            ];

        }

        d3.selectAll("#chart svg > *").remove();

        window.nv.addGraph(function () {
            var chart = window.nv.models.discreteBarChart()
                .x(function (d) {
                    return d.label
                })
                .y(function (d) {
                    return d.value
                })
                .tooltips(false)
                .showValues(true);

            d3.select('#chart svg')
                .datum(barData())
                .call(chart);

            window.nv.utils.windowResize(chart.update);
            return chart;
        });

    })(all, active, completed);

};