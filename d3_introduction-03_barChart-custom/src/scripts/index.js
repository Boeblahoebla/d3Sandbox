// Imports
//////////

// D3
import { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom, format } from 'd3';

// Styling
import '../styles/index.scss';


// Helper functions
///////////////////

/**
 * Function to generate the bar chart
 * @parameter: Array
 ************************************/
const generateBarChart = data => {

    // Generate the value accessors
    const xValue = d => d.population;
    const yValue = d => d.country;

    // Set up the d3 margin convention
    // https://bl.ocks.org/mbostock/3019563
    const margin = { top: 40, right: 45, bottom:100, left:175 };
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    // Generate an instance of scaleLinear for our X axis
    // https://www.dashingd3js.com/d3js-scales
    const xScale = scaleLinear()
        // The data domain going from 0 to the max of all the values
        .domain([0, max(data, d => xValue(d))])

        // The visual range along the x scale in pixels going from 0 to the max width of the svg
        .range([0, innerWidth]);

    // Generate an instance of scaleBand for our Y axis
    const yScale = scaleBand()
        // The data domain containing all the countries
        .domain(data.map(d => yValue(d)))
        .range([0, innerHeight])
        .padding(0.05);

    // Generate the inner rectangle which holds our bars
    // using the d3 margin convention
    const innerRect = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Generate the Y axis group element by "calling" axisLeft(yScale)
    // after the new group gets appended using chaining
    const yAxisGroup = innerRect.append('g')
        .call(axisLeft(yScale))
        .selectAll('.domain, .tick line')
            .remove();

    // A custom tick format which replaces "G" by "B"
    const xAxisTickFormat = number =>
        format('.3s')(number)
            .replace('G', 'B');

    // Generate an X axis to which we can append more config lines
    const xAxis = axisBottom(xScale)
        .tickFormat(xAxisTickFormat) // Tickformat: http://www.shorturl.at/dnqsW
        .tickSize(-innerHeight);


    // Generate the X axis group element by "calling" axisBottom(xScale)
    // after the new group gets appended using chaining
    const xAxisGroup = innerRect.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);


    // Remove the domain from the xAxisGroup
    xAxisGroup.select('.domain').remove();


    // Generate a chart Title
    innerRect.append('text')
        .text('Top 10 most populated countries')
        .attr('y', '-10');


    // Generate a label for the x Axis
    xAxisGroup.append('text')
        .attr('y', 60)
        .attr('x', innerWidth / 2)
        .attr('fill', "#AAAAAA")
        .attr('class', 'axisLabel')
        .text('Population');


    // D3 data mapping to map all the data to the future rectangles
    // for our bar chart (data join)
    // https://www.amphinicy.com/blog/post/manipulating-svg-using-d3js-library
    innerRect.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
            // Assign y to the country values
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d))) // Assign the bar width to the xScale using the population field
            .attr('height', yScale.bandwidth()); // Assign the height to the bandwidth of all the bars
};


// Functionality
////////////////

// Fetch the svg from the dom
const svg = select('svg');

// Set the width & height for the bar chart svg
const width = +svg.attr('width');
const height = +svg.attr('height');

// Load the data from the population.csv file using d3
// Resulting data is converted to an array of objects
csv('../src/dataFiles/population.csv')
    .then(data => {
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