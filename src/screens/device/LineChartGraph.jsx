import React, { useEffect } from 'react';
// import CanvasJSReact from './canvasjs.react'; // Assuming correct import path for canvasjs.react
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


const MonthlySalesChart = (props) => {
    const { dataa } = props;
console.log('data',dataa)
    useEffect(() => {
        const chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "FIO2 and SPO2"
            },
            axisX: {
                valueFormatString: dataa // Example format for month abbreviation
            },
            axisY: {
                labelFormatter: addSymbols
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: toggleDataSeries
            },
            data: [
                {
                    type: "line",
                    name: "Expected Sales",
                    showInLegend: true,
                    yValueFormatString: "$#,##0", // Example format for currency
                    dataPoints: dataa?.map((point, index) => ({ x: index, y: point })) // Assuming dataa is an array of numbers
                },
            ]
        });

        chart.render();

        function addSymbols(e) {
            var suffixes = ["", "K", "M", "B"];
            var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);

            if (order > suffixes.length - 1)
                order = suffixes.length - 1;

            var suffix = suffixes[order];
            return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
        }

        function toggleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
            e.chart.render();
        }

        return () => {
            chart.destroy(); // Clean up chart on unmount (if needed)
        };

    }, [dataa]); // Include dataa in the dependency array if it may change and affect chart rendering

    return (
        <div id="chartContainer" style={{ height: '370px', width: '100%' }}></div>
    );
};

export default MonthlySalesChart;
