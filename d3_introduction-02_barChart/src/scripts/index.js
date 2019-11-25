// Imports
//////////

// D3
import { select, csv } from 'd3';

// Styling
import '../styles/index.scss';


// Helper functions
///////////////////

/**
 * Function to generate the bar chart
 * @parameter: Array
 ************************************/
const generateBarChart = data => {
    // D3 data mapping to map all the data to the future
    // rectangles for our bar chart (data join)
    // https://www.amphinicy.com/blog/post/manipulating-svg-using-d3js-library
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', 300)
        .attr('height', 300)
};



// Functionality
////////////////

// Fetch the svg from the dom
const svg = select('svg');

// Set the width & height for the bar chart svg
const width = +svg.attr('width');
const height = +svg.attr('height');

// Load the data from the population.csv file using d3
csv('../src/dataFiles/population.csv')
    .then(data => {
        // Resulting data is converted to an array of objects

        // Loop through each row 'D'atarow & read the population field
        // as a number using the +prefix. Then Multiply by 1000
        // Since data is in "thousands" (x thousand ppl)
        data.forEach(d => {
            d.population = +d.population * 1000;
        });

        // Generate the bar chart
        generateBarChart(data);

        console.log(data);
});