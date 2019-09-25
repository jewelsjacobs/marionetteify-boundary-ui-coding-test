var d3 = require('d3');
require('nvd3');

module.exports = function(all, active, completed) {

    (function (all, active, completed) {

        function pieData() {
            return [
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
            ];
        }

        d3.selectAll("#chart svg > *").remove();

        window.nv.addGraph(function () {
            var chart = window.nv.models.pieChart()
                .x(function (d) {
                    return d.label;
                })
                .y(function (d) {
                    return d.value;
                })
                .showLabels(true);

            d3.select('#chart svg')
                .datum(pieData())
                .transition().duration(350)
                .call(chart);

            return chart;
        });

    })(all, active, completed);

};