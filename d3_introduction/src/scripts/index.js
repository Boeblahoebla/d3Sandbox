// Imports
//////////

// D3
import { select, arc } from 'd3';

// Styling
import '../styles/index.scss';


// Functionality
////////////////

// Fetch the svg from the dom
const svg = select('svg');

// Set the width & height for the smiley face svg
const width = +svg.attr('width');
const height = +svg.attr('height');

// Add a group to add elements to with similar properties
const smileyFace = svg.append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`);

// Add the circle for the face
const circle = smileyFace.append('circle')
    .attr('r', height / 2)
    .attr('fill', 'yellow')
    .attr('stroke', 'black');

// Set the constants to use when drawing the face
const eyeSpacing = 100;
const eyeYOffset = -70;
const eyeRadius = 30;
const eyebrowWidth = 50;
const eyebrowHeight = 20;
const eyebrowYOffset = -70;

// Add the eyes group to add elements to with similar properties
const eyesGroup = smileyFace.append('g')
    .attr('transform', `translate(0, ${eyeYOffset})`);

// Draw the left Eye
const leftEye = eyesGroup.append('circle')
    .attr('r', eyeRadius)
    .attr('cx', - eyeSpacing);

// Draw the right eye
const rightEye = eyesGroup.append('circle')
    .attr('r', eyeRadius)
    .attr('cx', + eyeSpacing);

// Add the eyebrowsGroup to add elements to with similar properties
const eyebrowsGroup = eyesGroup.append('g')
    .attr('transform', `translate(0, ${eyebrowYOffset})`);

// Draw the left eyebrow
const leftEyebrow = eyebrowsGroup.append('rect')
    .attr('x', -eyeSpacing - eyebrowWidth / 2)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight);

// Draw the right eyebrow
const rightEyebrow = eyebrowsGroup.append('rect')
    .attr('x', eyeSpacing - eyebrowWidth / 2)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight);

// Draw the mouth
const mouth = smileyFace.append('path')
    .attr('d', arc()({
        innerRadius: 150,
        outerRadius: 170,
        startAngle: Math.PI / 2,
        endAngle: Math.PI * 3 / 2
    }));
