// Imports
//////////

// D3
import { select, csv } from 'd3';

// Styling
import '../styles/index.scss';


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
    console.log(data);
});