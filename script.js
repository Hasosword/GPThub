document.addEventListener('DOMContentLoaded', function() {
  // Function to parse and evaluate mathematical expressions
  function evaluateExpression(expression) {
    return Function(`'use strict'; return (${expression});`)();
  }

  // Variables for graph and dragging
  const graphElement = document.getElementById('graph');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let isDragging = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startOffsetX = 0;
  let startOffsetY = 0;
  let currentOffsetX = 0;
  let currentOffsetY = 0;

  // Variables for graph view
  let graphX = 0;
  let graphY = 0;
  let cellSize = 50;

  // Adjust the drag sensitivity here (lower value = more sensitive)
  const dragSensitivity = 5;

  // Function to generate and display the graph
  function generateGraph(expression) {
    canvas.width = graphElement.offsetWidth;
    canvas.height = graphElement.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const xRange = canvas.width / cellSize;
    const yRange = canvas.height / cellSize;

    // Draw grid lines
    ctx.strokeStyle = '#eee';
    for (let x = 0; x < xRange; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cellSize, 0);
      ctx.lineTo(x * cellSize, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < yRange; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellSize);
      ctx.lineTo(canvas.width, y * cellSize);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2); // x-axis
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height); // y-axis
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#000';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let x = 1; x < xRange; x++) {
      ctx.fillText((x + graphX).toString(), canvas.width / 2 + x * cellSize, canvas.height / 2 + 5);
      ctx.fillText((-(x + graphX)).toString(), canvas.width / 2 - x * cellSize, canvas.height / 2 + 5);
    }
    for (let y = 1; y < yRange; y++) {
      ctx.fillText((y + graphY).toString(), canvas.width / 2 + 5, canvas.height / 2 - y * cellSize);
      ctx.fillText((-(y + graphY)).toString(), canvas.width / 2 + 5, canvas.height / 2 + y * cellSize);
    }

    // Plot graph
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let x = 0; x <= canvas.width; x++) {
      const xPos = x - canvas.width / 2;
      const yPos = evaluateExpression(expression.replace(/x/g, (xPos + graphX) / cellSize));
      ctx.lineTo(x, canvas.height / 2 - yPos * cellSize);
    }

    ctx.stroke();

    graphElement.innerHTML = '';
    graphElement.appendChild(canvas);
  }

  // Initial graph generation
  generateGraph('x');

  // Event listener for the Graph button
  document.getElementById('graphBtn').addEventListener('click', function() {
    const expression = document.getElementById('expression').value;
    generateGraph(expression);
  });

  // Event listener for the Zoom In button
  document.getElementById('zoomInBtn').addEventListener('click', function() {
    cellSize *= 1.5;
    generateGraph(document.getElementById('expression').value);
  });

  // Event listener for the Zoom Out button
  document.getElementById('zoomOutBtn').addEventListener('click', function() {
    cellSize /= 1.5;
    generateGraph(document.getElementById('expression').value);
  });

  // Event listener for mouse down event
  canvas.addEventListener('mousedown', function(event) {
    isDragging = true;
    startMouseX = event.clientX;
    startMouseY = event.clientY;
    startOffsetX = currentOffsetX;
    startOffsetY = currentOffsetY;
  });

  // Event listener for mouse move event
  canvas.addEventListener('mousemove', function(event) {
    if (isDragging) {
      const currentMouseX = event.clientX;
      const currentMouseY = event.clientY;

      const diffX = (currentMouseX - startMouseX) * dragSensitivity;
      const diffY = (currentMouseY - startMouseY) * dragSensitivity;

      currentOffsetX = startOffsetX + diffX;
      currentOffsetY = startOffsetY + diffY;

      graphX = -currentOffsetX / cellSize;
      graphY = currentOffsetY / cellSize;

      generateGraph(document.getElementById('expression').value);
    }
  });

  // Event listener for mouse up event
  canvas.addEventListener('mouseup', function() {
    isDragging = false;
  });

  // Event listener for mouse leave event
  canvas.addEventListener('mouseleave', function() {
    isDragging = false;
  });
});
